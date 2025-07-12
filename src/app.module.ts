import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
import { ListenerModule } from './listener/listener.module';


@Module({
  imports: [WalletModule, ListenerModule],
})
export class AppModule {}
