import { DefaultWalletBoundary, WalletBoundary } from '@shop/core';
import { NewWalletRequest } from './requests';
import { NewWalletResponse } from './responses/new-wallet.response';

export class WalletAPI {
  private readonly wallet: WalletBoundary;

  public constructor() {
    this.wallet = new DefaultWalletBoundary();
  }

  /**
   * Create a new wallet based on provided properties
   * @param request - properties to use while creating a new wallet
   * @returns a new wallet
   */
  public createOne(request: NewWalletRequest = {}): NewWalletResponse {
    const newWalletProperties = {
      balance: request.balance ?? 0,
    };

    const wallet = this.wallet.createSingleWallet(newWalletProperties);

    return wallet.getIdentifiersObject();
  }
}
