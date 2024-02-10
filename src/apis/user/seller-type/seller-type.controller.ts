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
import { SellerTypeService } from './seller-type.service';
import { TypeType } from './seller-type.schema';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('seller-type')
export class SellerTypeController {
  constructor(private readonly sellerTypeService: SellerTypeService) { }

  @Post('/add')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async addSellerType(
    @Req() request: any,
    @Body('types') types: TypeType[],
    @Body('isVerify') isVerify: boolean,
    @Body('isPreview') isPreview: boolean,
  ) {
    return await this.sellerTypeService.addSellerType({
      userId: request.userId,
      types: types,
      timestamp: new Date(),
      isVerify,
      isPreview,
    });
  }

  @Get('/get/:_id')
  async getSellerType(@Param('_id') _id: string) {
    return await this.sellerTypeService.getSellerType(_id);
  }

  @Get('/get-seller/:userId')
  async getSellerTypeByUserId(@Param('userId') userId: string) {
    return await this.sellerTypeService.getSellerTypeByUserId(userId);
  }

  @Post('/get-detail')
  async getSellerTypeDetail(@Body() payload: any) {
    return await this.sellerTypeService.getSellerTypeDetail(payload);
  }

  @Post('/verify')
  async getSellerTypeDetailVerify(@Body() payload: any) {
    return await this.sellerTypeService.getSellerTypeDetailVerify(payload);
  }

  @Get('/get-list/:index/:length/:query')
  async getSellerTypeList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.sellerTypeService.getSellerTypeList(index, length, query);
  }

  @Put('/update')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async updateSellerType(
    @Body('_id') _id: string,
    @Body('types') types: TypeType[],
    @Body('isVerify') isVerify: boolean,
    @Body('isPreview') isPreview: boolean,
  ) {
    return await this.sellerTypeService.updateSellerType(_id, {
      types: types,
      isVerify,
      isPreview,
    });
  }

  @Delete('/delete/:_id')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async deleteSellerType(@Param('_id') _id: string) {
    return await this.sellerTypeService.deleteSellerType(_id);
  }
}
