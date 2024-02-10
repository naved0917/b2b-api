import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { SellerAdminService } from './seller-admin.service';

@Controller('seller-admin')
export class SellerAdminController {
  constructor(private sellerAdminService: SellerAdminService) {}

  @Post('/request-send')
  @Roles(Role.Seller)
  async requestSend(@Body() payload: any) {
    return await this.sellerAdminService.requestSend(payload);
  }

  @Post('/get-request')
  async getRequestList(@Body() payload: any) {
    return await this.sellerAdminService.getRequestList(payload);
  }

  @Put('/request/update')
  @Roles(Role.Admin)
  async updateAssociate(@Body() payload: any) {
    return await this.sellerAdminService.updateAssociate(payload);
  }
}
