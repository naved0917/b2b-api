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
import { CompanyDetailService } from './company-detail.service';
@Controller('company-detail')
export class CompanyDetailController {
  constructor(private readonly companyDetailService: CompanyDetailService) { }

  @Post('/add')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async addCompanyDetail(
    @Req() request: any,
    @Body('companyLogo') companyLogo: string,
    @Body('companyPicture') companyPicture: string[],
    @Body('banners') banners: string[],
    @Body('contactPersonAlternateEmail') contactPersonAlternateEmail: string,
    @Body('companyWebsite') companyWebsite: string,
    @Body('googleBusiness') googleBusiness: string,
    @Body('facebookBusiness') facebookBusiness: string,
    @Body('instagramBusiness') instagramBusiness: string,
    @Body('companyPage') companyPage: string,
    @Body('accNumber') accNumber: string,
    @Body('accType') accType: string[],
    @Body('accIFSCCode') accIFSCCode: string,
    @Body('accBranch') accBranch: string,
    @Body('accBankName') accBankName: string,
    @Body('accSwiftCode') accSwiftCode: string,
    @Body('companyLanguageSpoken') companyLanguageSpoken: string[],
    @Body('companyVision') companyVision: string,
    @Body('companyDetail') companyDetail: string,
    @Body('companyPhilosophy') companyPhilosophy: string,
    @Body('companyVideo') companyVideo: string,
    @Body('tradeShow') tradeShow: any[],
    @Body('contactPerson') contactPerson: any[],
    @Body('isVerify') isVerify: boolean,
    @Body('isPreview') isPreview: boolean,
    @Body('employeeStrength') employeeStrength: string,
    @Body('attendTradeExpo') attendTradeExpo: string,
  ) {
    return await this.companyDetailService.addCompanyDetail({
      userId: request.userId,
      banners,
      companyLogo,
      companyPicture,
      contactPersonAlternateEmail,
      companyWebsite,
      googleBusiness,
      facebookBusiness,
      instagramBusiness,
      companyPage,
      accNumber,
      accType,
      accIFSCCode,
      accBranch,
      accBankName,
      accSwiftCode,
      companyLanguageSpoken,
      companyVision,
      companyDetail,
      companyPhilosophy,
      companyVideo,
      tradeShow,
      contactPerson,
      timestamp: new Date(),
      isVerify,
      isPreview,
      employeeStrength,
      attendTradeExpo,
    });
  }

  @Get('/get/:_id')
  async getCompanyDetail(@Param('_id') _id: string) {
    return await this.companyDetailService.getCompanyDetail(_id);
  }

  @Get('/get-data/:userId')
  async getCompanyDetailByUserId(@Param('userId') userId: string) {
    return await this.companyDetailService.getCompanyDetailByUserId(userId);
  }

  @Post('/get-detail')
  async getCompanyList(@Body() payload: any) {
    return await this.companyDetailService.getCompanyList(payload);
  }

  @Post('/verify')
  async updateCompanyVerification(@Body() payload: any) {
    return await this.companyDetailService.updateCompanyVerification(payload);
  }

  @Get('/get-list/:index/:length/:query')
  async getCertificateCenterList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.companyDetailService.getCompanyDetailList(
      index,
      length,
      query,
    );
  }

  @Post('/update')
  async updateCompanyDetail(@Body() payload: any) {
    return await this.companyDetailService.updateCompanyDetail(payload);
  }

  @Delete('/delete/:_id')
  async deleteCompanyDetail(@Param('_id') _id: string) {
    return await this.companyDetailService.deleteCompanyDetail(_id);
  }
}
