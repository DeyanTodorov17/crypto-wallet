import { ethers } from 'ethers';
import { BadRequestException, Injectable } from '@nestjs/common';
import { validUserIds } from '../configs';
import InternalWallet from 'src/models/InternalWallet';

@Injectable()
export class WalletService {
  private wallets = new Map<string, InternalWallet>();
  private walletCreationLock = new Map<string, Promise<InternalWallet>>();

  public getOrCreateWallet(userId: string, webhookUrl: string): InternalWallet {
    if (!validUserIds.includes(userId)) {
      throw new BadRequestException('Invalid userId');
    }

    const existing = this.wallets.get(userId);
    if (existing) return existing;

    // preventing race-condition here
    if (this.walletCreationLock.has(userId)) {
      throw new BadRequestException('Invalid request');
    }

    console.log('newly crated');

    const wallet = ethers.Wallet.createRandom();
    const internalWallet = new InternalWallet(
      userId,
      webhookUrl,
      wallet.address,
      wallet.privateKey,
    );

    this.wallets.set(userId, internalWallet);
    return internalWallet;
  }

  public getAllWallets() {
    return Array.from(this.wallets.values());
  }

  public getWalletByAddressId(addressId: string): InternalWallet | null {
    const wallet = this.getAllWallets().find(
      (wallet) => wallet.address.toLowerCase() === addressId.toLowerCase(),
    );

    if (!wallet) return null;

    return wallet;
  }

  public getWalletByUserId(userId: string): InternalWallet | null {
    const wallet = this.getAllWallets().find(
      (wallet) => wallet.userId.toLowerCase() === userId.toLowerCase(),
    );

    if (!wallet) return null;
    return wallet;
  }
}
