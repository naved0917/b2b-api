import {
  Controller,
  Get,
  Param
} from '@nestjs/common';
import { MasterCountryService } from './master-country.service';

@Controller('master-country')
export class MasterCountryController {
  constructor(private readonly masterCountryService: MasterCountryService) { }

  // @Post('/add')
  // @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  // async addMasterCountry(
  //   @Req() request: any,
  //   @Body('image') image: string,
  //   @Body('name') name: string,
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  //   @Body('keywords') keywords: string[],
  //   @Body('isActivated') isActivated: boolean,
  // ) {
  //   return await this.masterCountryService.addMasterCountry({
  //     userId: request.userId,
  //     image: image,
  //     name: name,
  //     title: title,
  //     description: description,
  //     keywords: keywords,
  //     isActivated: isActivated,
  //     timestamp: new Date(),
  //   });
  // }

  @Get('/get/:_id')
  async getMasterCountry(@Param('_id') _id: string) {
    return await this.masterCountryService.getMasterCountry(_id);
  }

  @Get('/get-list')
  async getMasterCountryListAll() {
    return await this.masterCountryService.getMasterCountryListAll();
  }
  
  @Get('/get-list/:index/:length/:query')
  async getMasterCountryList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.masterCountryService.getMasterCountryList(
      index,
      length,
      query,
    );
  }

  // @Put('/update')
  // @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  // async updateMasterCountry(
  //   @Body('_id') _id: string,
  //   @Body('image') image: string,
  //   @Body('name') name: string,
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  //   @Body('keywords') keywords: string[],
  //   @Body('isActivated') isActivated: boolean,
  // ) {
  //   return await this.masterCountryService.updateMasterCountry(_id, {
  //     image: image,
  //     name: name,
  //     title: title,
  //     description: description,
  //     keywords: keywords,
  //     isActivated: isActivated,
  //   });
  // }

  // @Delete('/delete/:_id')
  // @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  // async deleteMasterCountry(@Param('_id') _id: string) {
  //   return await this.masterCountryService.deleteMasterCountry(_id);
  // }
}
