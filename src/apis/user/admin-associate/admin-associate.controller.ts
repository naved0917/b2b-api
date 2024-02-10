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
import { AdminAssociateService } from './admin-associate.service';

@Controller('admin-associate')
export class AdminAssociateController {
  constructor(private adminAssociateService: AdminAssociateService) {}

  @Post('/assign-associate')
  @Roles(Role.Admin)
  async assignAssociate(@Body() payload: any) {
    return await this.adminAssociateService.assignAssociate(payload);
  }

  @Post('/get-assign-associate')
  async AssignAssociateList(@Body() payload: any) {
    return await this.adminAssociateService.AssignAssociateList(payload);
  }

  @Post('/send-mail')
  async sendMailSeller(@Body() payload: any) {
    return await this.adminAssociateService.sendMailSeller(payload);
  }

  @Post('/verify')
  async sellerVerify(@Body() payload: any) {
    return await this.adminAssociateService.sellerVerify(payload);
  }
}

