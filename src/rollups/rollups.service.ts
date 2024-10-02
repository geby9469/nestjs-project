import { Injectable } from '@nestjs/common';
import { CreateRollupDto } from './dto/create-rollup.dto';
import { UpdateRollupDto } from './dto/update-rollup.dto';
import { Alchemy, AlchemySettings, Network } from 'alchemy-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RollupsService {
  constructor(private readonly config: ConfigService) {}

  create(createRollupDto: CreateRollupDto) {
    return 'This action adds a new rollup';
  }

  async findBlockFromArbitrumSepolia() {
    console.log('Arbitrum Sepolia TEST start');

    const settings: AlchemySettings = {
      apiKey: this.config.get<string>('ALCHEMY_API_KEY'),
      network: Network.ARB_SEPOLIA,
    };

    const alchemy = new Alchemy(settings);

    const latestBlock = await alchemy.core.getBlockNumber();
    console.log(`Arbitrum Sepolia latest block number: ${latestBlock}`);

    console.log('Arbitrum Sepolia TEST end');
  }

  findOne(id: number) {
    return `This action returns a #${id} rollup`;
  }

  update(id: number, updateRollupDto: UpdateRollupDto) {
    return `This action updates a #${id} rollup`;
  }

  remove(id: number) {
    return `This action removes a #${id} rollup`;
  }
}
