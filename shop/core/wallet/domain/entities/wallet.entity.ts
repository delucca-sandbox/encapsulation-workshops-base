import { ID } from '@shop/core/common';

type WalletIdentifier = 'id';
type WalletIdentifierObject = {
  [key in WalletIdentifier]: string;
};

export class Wallet {
  private readonly id: ID;

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
}
