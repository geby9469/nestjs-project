import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RollupsService } from './rollups.service';
import { CreateRollupDto } from './dto/create-rollup.dto';
import { UpdateRollupDto } from './dto/update-rollup.dto';

@Controller('rollups')
export class RollupsController {
  constructor(private readonly rollupsService: RollupsService) {}

  @Post()
  create(@Body() createRollupDto: CreateRollupDto) {
    return this.rollupsService.create(createRollupDto);
  }

  @Get()
  findBlockFromArbitrumSepolia() {
    return this.rollupsService.findBlockFromArbitrumSepolia();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rollupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRollupDto: UpdateRollupDto) {
    return this.rollupsService.update(+id, updateRollupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rollupsService.remove(+id);
  }
}
