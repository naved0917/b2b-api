import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { MasterFilterService } from './master-filter.service';

@Controller('master-filter')
export class MasterFilterController {
  constructor(private readonly masterFilterService: MasterFilterService) { }

  @Post('/add')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async addMasterFilter(
    @Req() request: any,
    @Body('filter') filter: string,
    @Body('fields') fields: string[],
  ) {
    return await this.masterFilterService.addMasterFilter({
      userId: request.userId,
      filter: filter,
      fields: fields,
      timestamp: new Date(),
    });
  }

  @Get('/get/:_id')
  async getMasterFilter(@Param('_id') _id: string) {
    return await this.masterFilterService.getMasterFilter(_id);
  }

  @Post('/get-list')
  async getMasterFilterList(@Body() payload: any,) {
    return await this.masterFilterService.getMasterFilterList(
      payload
    );
  }

  @Put('/update')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async updateMasterFilter(
    @Body('_id') _id: string,
    @Body('filter') filter: string,
    @Body('fields') fields: string[],
  ) {
    return await this.masterFilterService.updateMasterFilter(_id, {
      filter: filter,
      fields: fields,
    });
  }

  @Delete('/delete/:_id')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async deleteMasterFilter(@Param('_id') _id: string) {
    return await this.masterFilterService.deleteMasterFilter(_id);
  }
}
