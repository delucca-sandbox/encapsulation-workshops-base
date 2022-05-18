import { ID } from '@shop/common';
import { Balance, Wallet, WalletRepository } from '../domain';
import { WalletInteractor } from './interactor.interface';

export class DefaultWalletInteractor implements WalletInteractor {
  private readonly repository: WalletRepository = new WalletRepository();

  /**
   * Based on provided properties, creates a new wallet.
   * @param balance - The initial balance of the wallet.
   * @returns The newly created wallet.
   */
  public create(balance: Balance): Wallet {
    const wallet = new Wallet({ balance });

    this.repository.save(wallet);

    return wallet;
  }

  /**
   * Gets a wallet based on a provided ID
   * @param id - The ID of the wallet to get.
   * @returns The wallet with the provided ID.
   */
  public getByID(id: ID): Wallet {
    return this.repository.findByID(id.toString());
  }

  /**
   * Updates a given wallet in our repository
   * @param wallet - The wallet to update.
   */
  public update(wallet: Wallet): void {
    this.repository.save(wallet);
  }
}
