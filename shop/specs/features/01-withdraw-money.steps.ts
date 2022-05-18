import { Wallet } from '@shop/core';
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('shop/specs/features/01-withdraw-money.feature');

defineFeature(feature, (test) => {
  const wallet = new Wallet();

  test('Withdraw money from the wallet', ({ given, when, then, and }) => {
    let walletID: string;

    given('There is a wallet with $5', () => {
      const newWallet = wallet.createSingleWallet({ balance: 5 });
      walletID = newWallet.id;
    });

    when('I withdraw the money $2 from the wallet', () => {
      wallet.withdraw(walletID, 2);
    });

    then('I have $2 in money', () => {});

    and('$3 is left in the wallet', () => {
      const balance = wallet.getBalance(walletID);
      expect(balance).toBe(3);
    });
  });

  test('Can not withdraw money from the wallet if there is not enough founds', ({
    given,
    when,
    then,
  }) => {
    given('There is a wallet with $5', () => {});

    when('I withdraw the money $6 from the wallet', () => {});

    then('I see message "You have not enough money in your wallet."', () => {});
  });
});
