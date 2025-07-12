import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WebhookService } from '../webhook/webhook.service';
import {
  CreateWalletDto,
  GetWalletByUserId,
  GetWalletByAddressId,
} from './dto/create-wallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/')
  createWallet(@Body() body: CreateWalletDto) {
    const wallet = this.walletService.getOrCreateWallet(
      body.userId,
      body.webhookUrl,
    );

    return { depositAddress: wallet.address };
  }

  @Get('/user/:userId')
  getWalletByUserId(@Param() params: GetWalletByUserId) {
    const depositAddress = this.walletService.getWalletByUserId(params.userId);
    if (!depositAddress) throw new BadRequestException('Wallet not found');
    return { depositAddress: depositAddress.address };
  }

  @Get(':addressId')
  getWalletByAddressId(@Param() params: GetWalletByAddressId) {
    const depositAddress = this.walletService.getWalletByAddressId(
      params.addressId,
    );
    if (!depositAddress) throw new BadRequestException('Wallet not found');
    return { depositAddress: depositAddress.address };
  }

  @Get('/balance/:addressId')
  async getWalletTransfers(@Param() params: GetWalletByAddressId) {
    const wallet = this.walletService.getWalletByAddressId(params.addressId);
    if (!wallet) throw new BadRequestException('Wallet not found');

    const transfers = await wallet.getWalletBalance();
    return { transfers };
  }
}
