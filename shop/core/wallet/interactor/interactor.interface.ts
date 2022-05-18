import { ID } from '@shop/common';
import { Balance, Wallet } from '../domain';

export interface WalletInteractor {
  create(balance: Balance): Wallet;

  getByID(id: ID): Wallet | undefined;

  update(wallet: Wallet): void;
}
