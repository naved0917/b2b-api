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
import { HelpDisputeService } from './help-dispute.service';

@Controller('help-dispute')
export class HelpDisputeController {
  constructor(private readonly helpDisputeService: HelpDisputeService) { }

  @Post('/add')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async addHelpDispute(
    @Req() request: any,
    @Body('type') type: string,
    @Body('subject') subject: string,
    @Body('description') description: string,
    @Body('file') file: string,
    @Body('link') link: string,
  ) {
    return await this.helpDisputeService.addHelpDispute({
      userId: request.userId,
      type: type,
      subject: subject,
      description: description,
      file: file,
      link: link,
      timestamp: new Date(),
    });
  }

  @Get('/get/:_id')
  async getHelpDispute(@Param('_id') _id: string) {
    return await this.helpDisputeService.getHelpDispute(_id);
  }

  @Get('/get-list/:userId')
  async getHelpDisputeList(
    @Param('userId') userId: string,
  ) {
    return await this.helpDisputeService.getHelpDisputeList(
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
    @Body('link') link: string,
  ) {
    return await this.helpDisputeService.updateHelpDispute(_id, {
      type: type,
      subject: subject,
      description: description,
      file: file,
      link: link,
      timestamp: new Date(),
    });
  }

  @Delete('/delete/:_id')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async deleteMasterCategory(@Param('_id') _id: string) {
    return await this.helpDisputeService.deleteHelpDispute(_id);
  }
}
