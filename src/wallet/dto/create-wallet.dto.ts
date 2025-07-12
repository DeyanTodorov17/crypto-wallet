import { IsString, IsUrl } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  userId: string;

  @IsUrl()
  webhookUrl: string;
}

export class GetWalletByUserId {
  @IsString()
  userId: string;
}

export class GetWalletByAddressId {
  @IsString()
  addressId: string;
}

