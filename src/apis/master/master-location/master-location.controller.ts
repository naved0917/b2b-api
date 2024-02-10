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
import { MasterLocationService } from './master-location.service';

@Controller('master-location')
export class MasterLocationController {
  constructor(private readonly masterLocationService: MasterLocationService) {}

  @Post('/add')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async addMasterLocation(
    @Req() request: any,
    @Body('name') name: string,
    @Body('state') state: string,
  ) {
    return await this.masterLocationService.addMasterLocation({
      name: name,
      state: state,
    });
  }

  @Get('/get/:_id')
  async getMasterLocation(@Param('_id') _id: string) {
    return await this.masterLocationService.getMasterLocation(_id);
  }

  @Get('/get-list/:index/:length/:query')
  async getMasterLocationList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.masterLocationService.getMasterLocationList(
      index,
      length,
      query,
    );
  }

  @Post('/get-list')
  async getMasterLocationListAll(@Body('state') state: string) {
    return await this.masterLocationService.getMasterLocationListAll(state);
  }

  @Put('/update')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  // async updateMasterLocation(
  //   @Body('name') name: string,
  //   @Body('state') state: string,
  // ) {
  //   return await this.masterLocationService.updateMasterLocation(_id, {
  //     name: name,
  //     state: state,
  //   });
  // }

  @Delete('/delete/:_id')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async deleteMasterLocation(@Param('_id') _id: string) {
    return await this.masterLocationService.deleteMasterLocation(_id);
  }

  @Delete('/delete-by-state-id/:stateId')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async deleteMasterLocationByStateId(@Param('stateId') stateId: string) {
    return await this.masterLocationService.deleteMasterLocationByStateId(
      stateId,
    );
  }

  @Delete('/delete-by-country-id/:countryId')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async deleteMasterLocationByCountryId(@Param('countryId') countryId: string) {
    return await this.masterLocationService.deleteMasterLocationByCountryId(
      countryId,
    );
  }
}
