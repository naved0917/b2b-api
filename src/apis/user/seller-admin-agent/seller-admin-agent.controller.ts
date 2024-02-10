import {
  Body, Controller, Post, Put
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { SellerAdminAgentService } from './seller-admin-agent.service';

@Controller('seller-admin-agent')
export class SellerAdminAgentController {
  constructor(private sellerAdminAgentService: SellerAdminAgentService) { }

  @Post('/request-send')
  @Roles(Role.Seller)
  async requestSend(@Body() payload: any) {
    return await this.sellerAdminAgentService.requestSend(payload);
  }

  @Post('/get-request')
  async getRequestList(@Body() payload: any) {
    return await this.sellerAdminAgentService.getRequestList(payload);
  }

  @Put('/request/update')
  @Roles(Role.Admin)
  async updateAssociate(@Body() payload: any) {
    return await this.sellerAdminAgentService.updateAssociate(payload);
  }
}
