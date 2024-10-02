import { PartialType } from '@nestjs/mapped-types';
import { CreateRollupDto } from './create-rollup.dto';

export class UpdateRollupDto extends PartialType(CreateRollupDto) {}
