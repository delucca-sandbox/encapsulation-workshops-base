import { NewWalletDTO } from '@shop/core/wallet/boundary/dtos';
import { Wallet } from '@shop/core/wallet/domain';

export interface WalletBoundary {
  createSingleWallet(properties: NewWalletDTO): Wallet;
}
