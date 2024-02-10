import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { SellerProfileService } from './seller-profile.service';

@Controller('seller-profile')
export class SellerProfileController {
  constructor(private readonly sellerProfileService: SellerProfileService) { }


  @Post('/get')
  async getProfileById(@Body() payload: any) {
    return await this.sellerProfileService.getSellerProfile(payload);
  }


  @Post('/update')
  async updateProfile(@Body() payload: any) {
    return await this.sellerProfileService.updateSellerProfile(payload);
  }
}
