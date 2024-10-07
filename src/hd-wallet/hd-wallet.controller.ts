import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HdWalletService } from './hd-wallet.service';
import { CreateHdWalletDto } from './dto/create-hd-wallet.dto';
import { UpdateHdWalletDto } from './dto/update-hd-wallet.dto';

@Controller('hd-wallet')
export class HdWalletController {
  constructor(private readonly hdWalletService: HdWalletService) {}

  @Post()
  create(@Body() createHdWalletDto: CreateHdWalletDto) {
    return this.hdWalletService.create(createHdWalletDto);
  }

  @Post('bls')
  createBLS() {
    return this.hdWalletService.createBLS();
  }

  @Post('bls-aggregation')
  aggregateBLS() {
    return this.hdWalletService.aggregateBSL();
  }

  @Get()
  findAll() {
    return this.hdWalletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hdWalletService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHdWalletDto: UpdateHdWalletDto,
  ) {
    return this.hdWalletService.update(+id, updateHdWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hdWalletService.remove(+id);
  }
}
