import { PackedUserOperation } from './interfaces/useroperation.interface';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AccountAbstractionService } from './account-abstraction.service';

@Controller('account-abstraction')
export class AccountAbstractionController {
  constructor(
    private readonly accountAbstractionService: AccountAbstractionService,
  ) {}

  @Post('entrypoint/handleOps/erc20/transfer')
  async entryPointHandleOpsForTransferERC20(
    @Query('beneficiary') beneficiary: string,
  ) {
    const packedUserOperation: PackedUserOperation =
      await this.accountAbstractionService.createUserOperationForTransferERC20();
    console.log(packedUserOperation);

    const isSuccess: boolean = await this.accountAbstractionService.handleOps(
      [packedUserOperation],
      beneficiary,
    );

    return isSuccess;
  }

  @Get('simple-account')
  findAll() {
    return this.accountAbstractionService.getSimpleAccountThroughFactory();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.accountAbstractionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAccountAbstractionDto: UpdateAccountAbstractionDto,
  // ) {
  //   return this.accountAbstractionService.update(
  //     +id,
  //     updateAccountAbstractionDto,
  //   );
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.accountAbstractionService.remove(+id);
  // }
}
