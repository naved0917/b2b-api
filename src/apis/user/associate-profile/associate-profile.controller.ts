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
import { AssociateProfileService } from './associate-profile.service';

@Controller('associate-profile')
export class AssociateProfileController {
  constructor(private associateProfielService: AssociateProfileService) {}

  @Post('/add')
  @Roles(Role.Admin)
  async addAssociate(@Body() payload: any) {
    return await this.associateProfielService.addAssociate(payload);
  }

  @Get('/:_id')
  async getAssociateById(@Param('_id') _id: string) {
    return await this.associateProfielService.getAssociateById(_id);
  }

  @Post('/get')
  async getAssociateList(@Body() payload: any) {
    return await this.associateProfielService.getAssociateList(payload);
  }

  @Post('/approved')
  async getAssociateApproved(@Body() payload: any) {
    return await this.associateProfielService.getAssociateApproved(payload);
  }

  @Put('/update')
  async updateAssociate(@Body() payload:any) {
    return await this.associateProfielService.updateAssociate(payload);
  }

  @Delete('/delete/:_id')
  @Roles(Role.Admin)
  async deleteAssociate(@Param('_id') _id: string) {
    return await this.associateProfielService.deleteAssociate(_id);
  }
}
