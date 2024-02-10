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
import { CompanyProfileService } from './company-profile.service';

@Controller('company-profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) { }

  @Get('userId/:userId')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async getCompanyProfileByUserId(
    @Req() request: any,
    @Param('userId') userId: string,
  ) {
    if (!userId || (userId && userId.length)) {
      return await this.companyProfileService.getCompanyProfileByUserId(
        request.userId,
      );
    } else {
      return await this.companyProfileService.getCompanyProfileByUserId(userId);
    }
  }

  @Post('/add')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async addCompanyProfile(
    @Req() request: any,
    @Body('gstNo') gstNo: string,
    @Body('company') company: string,
    @Body('codeOfIE') codeOfIE: string,
    @Body('panNo') panNo: string,
    @Body('estYear') estYear: string,
    @Body('mainCategory') mainCategory: string,
    @Body('mainProduct') mainProduct: string[],
    @Body('tanNo') tanNo: string,
    @Body('regAddress') regAddress: string,
    @Body('email') email: string,
    @Body('division') division: string,
    @Body('regCountry') regCountry: string,
    @Body('regState') regState: string,
    @Body('regCity') regCity: string,
    @Body('businessCertificate') businessCertificate: string,
    @Body('additionalDetail') additionalDetail: any[],
    @Body('additionalMobile') additionalMobile: any[],
    @Body('additionalLandline') additionalLandline: any[],
    @Body('additionalFactoryDetails') additionalFactoryDetails: string,
    @Body('isVerify') isVerify: boolean,
    @Body('isPreview') isPreview: boolean,
  ) {
    return await this.companyProfileService.addCompanyProfile({
      userId: request.userId,
      gstNo: gstNo,
      company: company,
      codeOfIE: codeOfIE,
      panNo: panNo,
      estYear: estYear,
      mainCategory: mainCategory,
      mainProduct: mainProduct,
      tanNo: tanNo,
      regAddress: regAddress,
      regCountry: regCountry,
      regState: regState,
      division:division,
      email:email,
      regCity: regCity,
      businessCertificate: businessCertificate,
      additionalDetail: additionalDetail,
      additionalMobile: additionalMobile,
      additionalLandline: additionalLandline,
      additionalFactoryDetails: additionalFactoryDetails,
      timestamp: new Date(),
      isVerify,
      isPreview,
    });
  }

  @Get('/get/:_id')
  async getCompanyProfile(@Param('_id') _id: string) {
    return await this.companyProfileService.getCompanyProfile(_id);
  }

  @Get('/get-company/:userId')
  async getCompanyProfileDetailByUserId(@Param('userId') userId: string) {
    return await this.companyProfileService.getCompanyProfileDetailByUserId(userId);
  }

  @Get('/get-list/:index/:length/:query')
  async getCompanyProfileList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.companyProfileService.getCompanyProfileList(
      index,
      length,
      query,
    );
  }

  @Post('/get-detail')
  async getCompanyList(@Body() payload: any) {
    return await this.companyProfileService.getCompanyList(payload);
  }

  @Post('/verify')
  async updateCompanyVerification(@Body() payload: any) {
    return await this.companyProfileService.updateCompanyVerification(payload);
  }

  @Post('/update')
  async updateCompanyProfile(@Body() payload: any) {
    return await this.companyProfileService.updateCompanyProfile(payload);
  }

  @Delete('/delete/:_id')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async deleteCompanyProfile(@Param('_id') _id: string) {
    return await this.companyProfileService.deleteCompanyProfile(_id);
  }
}
