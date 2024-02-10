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
import { CertificateCenterService } from './certificate-center.service';
import { TypeCertificate } from './certificate-center.schema';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('certificate-center')
export class CertificateCenterController {
  constructor(
    private readonly certificateCenterService: CertificateCenterService,
  ) { }

  @Post('/add')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async addCertificateCenter(
    @Body() payload: any
  ) {
    return await this.certificateCenterService.addCertificateCenter({
      payload
    });
  }

  @Get('/get/:_id')
  async getCertificateCenter(@Param('_id') _id: string) {
    return await this.certificateCenterService.getCertificateCenter(_id);
  }

  @Get('/get-data/:userId')
  async getCertificateCenterByUserId(@Param('userId') userId: string) {
    return await this.certificateCenterService.getCertificateCenterByUserId(userId);
  }

  @Post('/get-detail')
  async getCertificateCenterDetail(@Body() payload: any) {
    return await this.certificateCenterService.getCertificateCenterDetail(payload);
  }

  @Post('/verify')
  async getCertificateCenterVerify(@Body() payload: any) {
    return await this.certificateCenterService.getCertificateCenterVerify(payload);
  }

  @Get('/get-list/:index/:length/:query')
  async getCertificateCenterList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.certificateCenterService.getCertificateCenterList(
      index,
      length,
      query,
    );
  }

  @Post('/update')
  async updateCertificateCenter(
    @Body() payload: any,
  ) {
    return await this.certificateCenterService.updateCertificateCenter(payload);
  }

  @Delete('/delete/:_id')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async deleteCertificateCenter(@Param('_id') _id: string) {
    return await this.certificateCenterService.deleteCertificateCenter(_id);
  }
}
