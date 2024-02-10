import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { BuyingInterestService } from './buying-interest.service';

@Controller('buying-interest')
export class BuyingInterestController {
  constructor(
    private readonly buyingInterestService: BuyingInterestService
  ) { }

  @Post('/add')
  async addBuyingInterest(@Body() payload: any) {
    return await this.buyingInterestService.addBuyingInterest(payload);
  }

  @Get('/get')
  async getBuyingInterest() {
    return await this.buyingInterestService.getBuyingInterest();
  }

  @Get('/get/:_id')
  async getBuyingInterestById(@Param('_id') _id: string) {
    return await this.buyingInterestService.getBuyingInterestById(_id);
  }

  @Post('/update')
  async updateBuyingInterest(@Body() payload: any) {
    return await this.buyingInterestService.updateBuyingInterest(payload);
  }

  @Delete('/delete/:_id')
  async deleteBuyingInterest(@Param('_id') _id: string) {
    return await this.buyingInterestService.deleteBuyingInterest(_id);
  }
}
