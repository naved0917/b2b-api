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
import { MasterStateService } from './master-state.service';

@Controller('master-state')
export class MasterStateController {
  constructor(private readonly masterStateService: MasterStateService) {}

  @Post('/add')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async addMasterState(
    @Req() request: any,
    @Body('image') image: string,
    @Body('name') name: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('keywords') keywords: string[],
    @Body('countryId') countryId: string,
    @Body('isActivated') isActivated: boolean,
  ) {
    return await this.masterStateService.addMasterState({
      userId: request.userId,
      image: image,
      name: name,
      title: title,
      description: description,
      keywords: keywords,
      countryId: countryId,
      isActivated: isActivated,
      timestamp: new Date(),
    });
  }

  @Get('/get/:_id')
  async getMasterState(@Param('_id') _id: string) {
    return await this.masterStateService.getMasterState(_id);
  }

  @Get('/get-list/:index/:length/:query')
  async getMasterStateList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.masterStateService.getMasterStateList(
      index,
      length,
      query,
    );
  }

  @Post('/get-list')
  async getMasterStateListAll(@Body('country') country: string) {
    return await this.masterStateService.getMasterStateListAll(country);
  }

  @Put('/update')
  async updateMasterState(
    @Body('_id') _id: string,
    @Body('image') image: string,
    @Body('name') name: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('keywords') keywords: string[],
    @Body('countryId') countryId: string,
    @Body('isActivated') isActivated: boolean,
  ) {
    return await this.masterStateService.updateMasterState(_id, {
      image: image,
      name: name,
      title: title,
      description: description,
      keywords: keywords,
      countryId: countryId,
      isActivated: isActivated,
    });
  }

  @Delete('/delete/:_id')
  async deleteMasterState(@Param('_id') _id: string) {
    return await this.masterStateService.deleteMasterState(_id);
  }

  @Delete('/delete-by-country-id/:countryId')
  async deleteMasterStateByCountryId(@Param('countryId') countryId: string) {
    return await this.masterStateService.deleteMasterStateByCountryId(
      countryId,
    );
  }
}
