import { Exception, ID } from '@shop/common';
import { Amount, Balance } from '@shop/core/wallet/domain/value-objects';
import { DefaultWalletInteractor, WalletInteractor } from '../interactor';
import { WalletBoundary } from './boundary.interface';
import { CreatedWalletDTO, NewWalletDTO } from './dtos';

export class DefaultWalletBoundary implements WalletBoundary {
  private readonly walletInteractor: WalletInteractor =
    new DefaultWalletInteractor();

  /**
   * Creates a new wallet considering the provided initial properties
   * as primitive values.
   * @param properties - The initial properties of the wallet
   * @returns The created wallet
   */
  public createSingleWallet(properties: NewWalletDTO): CreatedWalletDTO {
    const amount = new Amount({ value: properties.balance });
    const balance = new Balance({ amount });

    const wallet = this.walletInteractor.create(balance);

    return wallet.getIdentifiersObject();
  }

  /**
   * Reduces the amount of balance of a wallet with given ID by a specific amount
   * @param walletID - The ID of the wallet to reduce the balance
   * @param value - The amount to reduce the balance
   */
  public withdraw(walletID: string, value: number): void {
    const id = new ID({ value: walletID });
    const wallet = this.walletInteractor.getByID(id);
    if (!wallet) throw new WalletNotFoundException(walletID);

    const amountToWithdraw = new Amount({ value });
    wallet.withdraw(amountToWithdraw);

    this.walletInteractor.update(wallet);
  }

  /**
   * Gets the current balance of a given wallet
   * @param walletID - The ID of the wallet to get the balance
   * @returns The current balance of the wallet
   */
  public getBalance(walletID: string): number {
    const id = new ID({ value: walletID });
    const wallet = this.walletInteractor.getByID(id);
    if (!wallet) throw new WalletNotFoundException(walletID);

    return wallet.getBalanceAsNumber();
  }
}

class WalletNotFoundException extends Exception {
  public readonly code = 'WALLET_NOT_FOUND';

  constructor(id: string) {
    super(`There is no wallet with ID ${id}`);
  }
}
