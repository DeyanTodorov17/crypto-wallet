import { Injectable } from '@nestjs/common';
import { WalletService } from '../wallet/wallet.service';
import { WebhookService } from '../webhook/webhook.service';
import { confirmaitonsNeeded, webHookURL } from 'src/configs';
import { WebHookPayload } from 'src/types/webhook.types';
import { provider, usdcContract } from '../configs/ethClients';
import { ContractEventPayload } from 'ethers';
import { ethers } from 'ethers';

@Injectable()
export class ListenerService {
  constructor(
    private readonly walletService: WalletService,
    private readonly webHookService: WebhookService,
  ) {}

  startListening() {
    void usdcContract.on('Transfer', async (from, to, amount, event) => {
      try {
        // before creating the async callls I'm checking if the current wallet is created by me.
        const savedWallet = this.walletService.getWalletByAddressId(String(to));
        if (!savedWallet) return;

        const currentEvent = event as ContractEventPayload;
        const transaction = await currentEvent.getTransaction();
        const trxHash = transaction.hash;
        const confirmedTx = await provider.waitForTransaction(
          trxHash,
          confirmaitonsNeeded,
        );

        if (confirmedTx) {
          const confirmations = await confirmedTx.confirmations();
          const webhookPayload: WebHookPayload = {
            amount: ethers.formatUnits(amount),
            confirmations,
            from: String(from),
            txHash: transaction.hash,
            userId: savedWallet.userId,
          };
          await this.webHookService.sendWebhook(webHookURL, webhookPayload);
          console.log('testing');
        }
      } catch (error) {
        console.error('Error handling Transfer event:', error);
        // Add any additional error handling here
      }
    });
  }
}
