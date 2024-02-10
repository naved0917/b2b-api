import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { BuyerProfileService } from './buyer-profile.service';

@Controller('buyer-profile')
export class BuyerProfileController {
  constructor(private readonly buyerProfileService: BuyerProfileService) { }


  @Post('/get')
  async getProfileById(@Body() payload: any) {
    return await this.buyerProfileService.getBuyerProfile(payload);
  }


  @Post('/update')
  async updateProfile(@Body() payload: any) {
    return await this.buyerProfileService.updateBuyerProfile(payload);
  }
}
