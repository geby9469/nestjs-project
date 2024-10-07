import { PartialType } from '@nestjs/mapped-types';
import { CreateHdWalletDto } from './create-hd-wallet.dto';

export class UpdateHdWalletDto extends PartialType(CreateHdWalletDto) {}
