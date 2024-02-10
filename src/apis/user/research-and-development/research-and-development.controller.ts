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
import { ResearchAndDevelopmentService } from './research-and-development.service';

@Controller('research-and-development')
export class ResearchAndDevelopmentController {
  constructor(
    private readonly researchAndDevelopmentService: ResearchAndDevelopmentService,
  ) { }

  @Post('/add')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async addResearchAndDevelopment(
    @Req() request: any,
  ) {
    return await this.researchAndDevelopmentService.addResearchAndDevelopment({
      userId: request.userId,
      isResearchAndDevelopment: request.body.isResearchAndDevelopment,
      rnd: request.body.isResearchAndDevelopment === "No" ? [] : request.body.rnd,
      timestamp: new Date(),
      isVerify: request.body.isVerify,
      isPreview: request.body.isPreview,
    });
  }

  @Get('/get/:_id')
  async getResearchAndDevelopment(@Param('_id') _id: string) {
    return await this.researchAndDevelopmentService.getResearchAndDevelopment(
      _id,
    );
  }

  @Get('/get-data/:userId')
  async getResearchAndDevelopmentByUserId(@Param('userId') userId: string) {
    return await this.researchAndDevelopmentService.getResearchAndDevelopmentByUserId(
      userId,
    );
  }

  @Post('/get-detail')
  async getResearchAndDevelopmentDetail(@Body() payload: any) {
    return await this.researchAndDevelopmentService.getResearchAndDevelopmentDetail(
      payload
    );
  }

  @Post('/verify')
  async getResearchAndDevelopmentVerify(@Body() payload: any) {
    return await this.researchAndDevelopmentService.getResearchAndDevelopmentVerify(
      payload
    );
  }

  @Get('/get-list/:index/:length/:query')
  async getResearchAndDevelopmentList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.researchAndDevelopmentService.getResearchAndDevelopmentList(
      index,
      length,
      query,
    );
  }

  // @Put('/update')
  // @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  // async updateResearchAndDevelopment(
  //   @Body('_id') _id: string,
  //   @Body('isQualityProcess') isQualityProcess: string,
  //   @Body('certificateName') certificateName: string,
  //   @Body('certifiedBy') certifiedBy: string,
  //   @Body('businessScope') businessScope: string,
  //   @Body('certificateIssueDate') certificateIssueDate: string,
  //   @Body('certificateExpiryDate') certificateExpiryDate: string,
  // ) {
  //   return await this.researchAndDevelopmentService.updateResearchAndDevelopment(
  //     _id,
  //     {
  //       isQualityProcess: isQualityProcess,
  //       certificateName: certificateName,
  //       certifiedBy: certifiedBy,
  //       businessScope: businessScope,
  //       certificateIssueDate: certificateIssueDate,
  //       certificateExpiryDate: certificateExpiryDate,
  //     },
  //   );
  // }

  @Delete('/delete/:_id')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async deleteResearchAndDevelopment(@Param('_id') _id: string) {
    return await this.researchAndDevelopmentService.deleteResearchAndDevelopment(
      _id,
    );
  }
}
