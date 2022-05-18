import { Exception, ValueObject } from '@shop/common';
import { Amount, InvalidAmount } from './amount.value-object';

const DEFAULT_BALANCE = 0;

type BalanceProperties = {
  amount?: Amount;
};

export class Balance extends ValueObject<BalanceProperties> {
  public constructor(properties: BalanceProperties = {}) {
    super(properties);

    if (properties.amount === undefined) this.flush();
    this.validate();
  }

  /**
   * Reduces the balance by the given amount.
   * @param amount - The amount to reduce the balance by.
   */
  public reduce(amount: Amount): void {
    try {
      this.properties.amount = this.properties.amount.difference(amount);
    } catch (error) {
      if (error instanceof InvalidAmount)
        throw new InvalidBalance(error.metadata.amount);

      throw error;
    }
  }

  /**
   * Gets the available amount of this balance as a number
   * @returns The available amount of this balance as a number
   */
  public getAmountAsNumber(): number {
    return this.properties.amount.toPrimitive();
  }

  private flush(): void {
    this.properties.amount = new Amount();
  }

  private validate(): void {
    const amount = this.properties.amount.toPrimitive();
    const isInvalidNumber = isNaN(amount);

    if (isInvalidNumber) throw new InvalidBalance(amount);
  }
}

class InvalidBalance extends Exception {
  public readonly code = 'INVALID_BALANCE';

  public constructor(balance: any) {
    super(
      `The provided balance must be a positive number. ${String(
        balance,
      )} is not a valid balance.`,
    );
  }
}
