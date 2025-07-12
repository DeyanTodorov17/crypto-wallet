import { Module, OnModuleInit } from '@nestjs/common';
import { ListenerService } from './listener.service';
import { WebhookModule } from '../webhook/webhook.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [WalletModule, WebhookModule],
  providers: [ListenerService],
})
export class ListenerModule implements OnModuleInit {
  constructor(private readonly listenerService: ListenerService) {}

  onModuleInit() {
    this.listenerService.startListening();
  }
}
