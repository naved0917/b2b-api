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
import { QualityControlService } from './quality-control.service';
@Controller('quality-control')
export class QualityControlController {
  constructor(private readonly qualityControlService: QualityControlService) { }

  @Post('/add')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async addQualityControl(
    @Req() request: any,
  ) {
    return await this.qualityControlService.addQualityControl({
      userId: request.userId,
      isQualityControl: request.body.isQualityControl,
      qualityControl: request.body.qualityControl,
      timestamp: new Date(),
      isVerify: request.body.isVerify,
      isPreview: request.body.isPreview,
    });
  }

  @Get('/get/:_id')
  async getQualityControl(@Param('_id') _id: string) {
    return await this.qualityControlService.getQualityControl(_id);
  }

  @Get('/get-data/:userId')
  async getQualityControlByUserId(@Param('userId') userId: string) {
    return await this.qualityControlService.getQualityControlByUserId(userId);
  }

  @Post('/get-detail')
  async getQualityControlDetail(@Body() payload: any) {
    return await this.qualityControlService.getQualityControlDetail(payload);
  }

  @Post('/verify')
  async getQualityControlVerify(@Body() payload: any) {
    return await this.qualityControlService.getQualityControlVerify(payload);
  }

  @Get('/get-list/:index/:length/:query')
  async getQualityControlList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.qualityControlService.getQualityControlList(
      index,
      length,
      query,
    );
  }

  // @Put('/update')
  // @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  // async updateQualityControl(
  //   @Body('_id') _id: string,
  //   @Body('isQualityProcess') isQualityProcess: string,
  //   @Body('processName') processName: string,
  //   @Body('processDescription') processDescription: string,
  //   @Body('image') image: string,
  // ) {
  //   return await this.qualityControlService.updateQualityControl(_id, {
  //     isQualityProcess: isQualityProcess,
  //     processName: processName,
  //     processDescription: processDescription,
  //     image: image,
  //   });
  // }

  @Delete('/delete/:_id')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async deleteQualityControl(@Param('_id') _id: string) {
    return await this.qualityControlService.deleteQualityControl(_id);
  }
}
