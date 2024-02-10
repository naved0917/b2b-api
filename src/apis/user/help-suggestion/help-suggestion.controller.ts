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
import { HelpSuggestionService } from './help-suggestion.service';

@Controller('help-suggestion')
export class HelpSuggestionController {
  constructor(private readonly helpSuggestionService: HelpSuggestionService) { }

  @Post('/add')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async addHelpSuggestion(
    @Req() request: any,
    @Body('type') type: string,
    @Body('subject') subject: string,
    @Body('description') description: string,
    @Body('file') file: string,
    @Body('link') link: string,
  ) {
    return await this.helpSuggestionService.addHelpSuggestion({
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
  async getHelpSuggestion(@Param('_id') _id: string) {
    return await this.helpSuggestionService.getHelpSuggestion(_id);
  }

  @Get('/get-list/:userId')
  async getHelpSuggestionList(
    @Param('userId') userId: string,
  ) {
    return await this.helpSuggestionService.getHelpSuggestionList(
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
    return await this.helpSuggestionService.updateHelpSuggestion(_id, {
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
    return await this.helpSuggestionService.deleteHelpSuggestion(_id);
  }
}
