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
import { ExportCapabilityService } from './export-capability.service';
@Controller('export-capability')
export class ExportCapabilityController {
  constructor(
    private readonly exportCapabilityService: ExportCapabilityService,
  ) { }

  @Post('/add')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async addExportCapability(
    @Req() request: any,
    @Body('yearlyTurnover') yearlyTurnover: string,
    @Body('nearestPort') nearestPort: string,
    @Body('exportingScience') exportingScience: string,
    @Body('exportingPercent') exportingPercent: string,
    @Body('percents') percents: [],
    @Body('isVerify') isVerify: boolean,
    @Body('isPreview') isPreview: boolean,
  ) {
    return await this.exportCapabilityService.addExportCapability({
      userId: request.userId,
      yearlyTurnover: yearlyTurnover,
      nearestPort: nearestPort,
      exportingScience: exportingScience,
      exportingPercent: exportingPercent,
      percents: percents,
      timestamp: new Date(),
      isVerify: isVerify,
      isPreview: isPreview,
    });
  }

  @Get('/get/:_id')
  async getExportCapability(@Param('_id') _id: string) {
    return await this.exportCapabilityService.getExportCapability(_id);
  }

  @Get('/get-data/:userId')
  async getExportCapabilityByUserId(@Param('userId') userId: string) {
    return await this.exportCapabilityService.getExportCapabilityByUserId(userId);
  }

  @Post('/get-detail')
  async getExportCapabilityDetail(@Body() payload: any) {
    return await this.exportCapabilityService.getExportCapabilityDetail(payload);
  }

  @Post('/verify')
  async getExportCapabilityVerify(@Body() payload: any) {
    return await this.exportCapabilityService.getExportCapabilityVerify(payload);
  }

  @Get('/get-list/:index/:length/:query')
  async getExportCapabilityList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.exportCapabilityService.getExportCapabilityList(
      index,
      length,
      query,
    );
  }

  @Put('/update')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async updateExportCapability(
    @Body('_id') _id: string,
    @Body('yearlyTurnover') yearlyTurnover: string,
    @Body('nearestPort') nearestPort: string,
    @Body('exportingScience') exportingScience: string,
    @Body('exportingPercent') exportingPercent: string,
    @Body('percents') percents: [],
    @Body('isVerify') isVerify: boolean,
    @Body('isPreview') isPreview: boolean,
  ) {
    return await this.exportCapabilityService.updateExportCapability(_id, {
      yearlyTurnover: yearlyTurnover,
      nearestPort: nearestPort,
      exportingScience: exportingScience,
      exportingPercent: exportingPercent,
      percents: percents,
      isVerify: isVerify,
      isPreview: isPreview,
    });
  }

  @Delete('/delete/:_id')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async deleteExportCapability(@Param('_id') _id: string) {
    return await this.exportCapabilityService.deleteExportCapability(_id);
  }
}
