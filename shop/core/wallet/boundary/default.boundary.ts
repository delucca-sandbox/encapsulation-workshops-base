import { WalletBoundary } from '@shop/core';
import { Wallet } from '../domain';
import { NewWalletDTO } from './dtos';

export class DefaultWalletBoundary implements WalletBoundary {
  /**
   * Creates a new wallet considering the provided initial properties
   * as primitive values.
   * @param properties - The initial properties of the wallet
   * @returns The created wallet
   */
  public createSingleWallet(properties: NewWalletDTO): Wallet {}
}
