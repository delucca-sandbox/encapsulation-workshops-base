import { Entity, ID } from '@shop/common';
import { Amount, Balance } from '@shop/core/wallet/domain/value-objects';

type WalletProperties = {
  balance: Balance;
};

type WalletIdentifier = 'id';
type WalletIdentifierObject = {
  [key in WalletIdentifier]: string;
};

export class Wallet implements Entity {
  public readonly id: ID;
  private readonly balance: Balance;

  public constructor(properties: WalletProperties) {
    this.id = new ID();
    this.balance = properties.balance;
  }

  /**
   * Based on the current state of this instance, it parses the identifiers as a plain
   * object and returns it.
   * @returns - An object containing all identifiers of this wallet
   */
  public getIdentifiersObject(): WalletIdentifierObject {
    return {
      id: this.id.toString(),
    };
  }

  /**
   * Withdraw a specific amount from this wallet balance
   * @param amount - The amount to withdraw
   */
  public withdraw(amount: Amount): void {
    this.balance.reduce(amount);
  }

  /**
   * Gets the balance of this wallet as a primitive number
   * @returns - The balance of this wallet
   */
  public getBalanceAsNumber(): number {
    return this.balance.getAmountAsNumber();
  }
}
