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
import { HelpComplainService } from './help-complain.service';

@Controller('help-complain')
export class HelpComplainController {
  constructor(private readonly helpComplainService: HelpComplainService) { }

  @Post('/add')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async addHelpComplain(
    @Req() request: any,
    @Body('type') type: string,
    @Body('subject') subject: string,
    @Body('description') description: string,
    @Body('file') file: string,
  ) {
    return await this.helpComplainService.addHelpComplain({
      userId: request.userId,
      type: type,
      subject: subject,
      description: description,
      file: file,
      timestamp: new Date(),
    });
  }

  @Get('/get/:_id')
  async getHelpComplain(@Param('_id') _id: string) {
    return await this.helpComplainService.getHelpComplain(_id);
  }

  @Get('/get-list/:userId')
  async getHelpComplainList(
    @Param('userId') userId: string,
  ) {
    return await this.helpComplainService.getHelpComplainList(
      userId
    );
  }

  @Put('/update')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async updateMasterCategory(
    @Body('_id') _id: string,
    @Body('type') type: string,
    @Body('subject') subject: string,
    @Body('description') description: string,
    @Body('file') file: string,
  ) {
    return await this.helpComplainService.updateHelpComplain(_id, {
      type: type,
      subject: subject,
      description: description,
      file: file,
    });
  }

  @Delete('/delete/:_id')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async deleteMasterCategory(@Param('_id') _id: string) {
    return await this.helpComplainService.deleteHelpComplain(_id);
  }
}
