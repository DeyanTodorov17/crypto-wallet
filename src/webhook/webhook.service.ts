import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { WebHookPayload } from 'src/types/webhook.types';
import { retryRequest } from 'src/utils/retryRequest';

@Injectable()
export class WebhookService {
  private logger = new Logger(WebhookService.name);
  private sentTxs = new Set<string>();
  private maxRetryAttempts = 3;

  async sendWebhook(url: string, payload: WebHookPayload) {
    if (this.sentTxs.has(payload.txHash)) return;

    try {
      await retryRequest(
        () => axios.post(url, payload, { timeout: 5000 }),
        this.maxRetryAttempts,
      );
      this.sentTxs.add(payload.txHash);
      this.logger.log(`Webhook sent: ${payload.txHash}`);
    } catch (error) {
      this.logger.error(
        `Failed webhook for tx: ${payload.txHash}`,
        error.message,
      );
      // You could add retry logic here
    }
  }
}
