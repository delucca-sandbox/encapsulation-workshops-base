import { Exception, ValueObject } from '@shop/common';

const DEFAULT_AMOUNT = 0;

type AmountProperties = {
  value: number;
};

export class Amount extends ValueObject<AmountProperties> {
  public constructor(properties: AmountProperties = { value: DEFAULT_AMOUNT }) {
    super(properties);
    this.validate();
  }

  /**
   * Transforms this amount to a primitive value
   * @returns the primite amount as a number
   */
  public toPrimitive(): number {
    return this.properties.value;
  }

  /**
   * Gets the difference between this amount and a different one
   * @param amount - The amount to get the difference from
   * @returns A new amount with the difference
   */
  public difference(amount: Amount): Amount {
    return new Amount({ value: this.toPrimitive() - amount.toPrimitive() });
  }

  private validate(): void {
    const isInvalidNumber = isNaN(this.properties.value);
    const isNegativeNumber = !isInvalidNumber && this.properties.value < 0;

    if (isInvalidNumber || isNegativeNumber)
      throw new InvalidAmount(this.properties.value);
  }
}

type InvalidAmountMetadata = {
  amount: number;
};

export class InvalidAmount extends Exception<InvalidAmountMetadata> {
  public readonly code = 'INVALID_AMOUNT';

  public constructor(amount: any) {
    super(
      `The provided amount must be a positive number or zero. ${String(
        amount,
      )} is not a valid amount.`,
      {
        amount,
      },
    );
  }
}
