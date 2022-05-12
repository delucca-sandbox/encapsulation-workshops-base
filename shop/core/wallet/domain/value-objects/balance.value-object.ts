import { Exception, ValueObject } from '@shop/core/common';

const DEFAULT_BALANCE = 0;

type BalanceProperties = {
  value?: number;
};

export class Balance extends ValueObject<BalanceProperties> {
  public constructor(properties: BalanceProperties) {
    super(properties);

    if (properties.value === undefined) this.flush();
    this.validate();
  }

  private flush(): void {
    this.properties.value = DEFAULT_BALANCE;
  }

  private validate(): void {
    const isInvalidNumber = isNaN(this.properties.value);

    if (isInvalidNumber) throw new InvalidBalance(this.properties.value);
  }
}

class InvalidBalance extends Exception {
  public readonly code = 'INVALID_BALANCE';

  public constructor(balance: any) {
    super(
      `The provided balance must be a number. ${String(
        balance,
      )} is not a valid balance.`,
    );
  }
}
