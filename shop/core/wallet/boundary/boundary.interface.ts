import { CreatedWalletDTO, NewWalletDTO } from './dtos';

export interface WalletBoundary {
  createSingleWallet(properties: NewWalletDTO): CreatedWalletDTO;

  withdraw(walletId: string, amount: number): void;

  getBalance(walletId: string): number;
}
