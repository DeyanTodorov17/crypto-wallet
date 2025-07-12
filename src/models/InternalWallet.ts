import { ethers } from 'ethers';
import { provider } from '../configs/ethClients';

interface InternalWalletInterface {
  userId: string;
  webhookUrl: string;
  address: string;
  privateKey: string;

  getWalletBalance(): Promise<string>;
}

class InternalWallet implements InternalWalletInterface {
  constructor(
    public userId: string,
    public webhookUrl: string,
    public address: string,
    public privateKey: string,
  ) {}

  public async getWalletBalance() {
    const balance = await provider.getBalance(this.address);
    return ethers.formatEther(balance);
  }
}

export default InternalWallet;
