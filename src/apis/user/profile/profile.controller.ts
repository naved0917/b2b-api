import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post('/buyer-add')
  async addProfile(@Body() payload: any) {
    return await this.profileService.addProfile(payload);
  }

  @Post('/buyer-get')
  async getProfileById(@Body() payload: any) {
    return await this.profileService.getProfile(payload);
  }

  @Post('/buyer-getByUserId')
  async getProfileByUserId(@Body() payload: any) {
    return await this.profileService.getProfileByUserId(payload);
  }

  @Post('/buyer-update')
  async updateProfile(@Body() payload: any) {
    return await this.profileService.updateProfile(payload);
  }

  @Post('/supplier-type-add')
  async addSupplierType(@Body() payload: any) {
    return await this.profileService.addSupplierType(payload);
  }

  @Post('/supplier-type-get')
  async getSupplierType(@Body() payload: any) {
    return await this.profileService.getSupplierType(payload);
  }

  @Post('/supplier-type-getByUserId')
  async getSupplierTypeUserId(@Body() payload: any) {
    return await this.profileService.getSupplierTypeByUserId(payload);
  }

  @Post('/supplier-type-update')
  async updateSupplierType(@Body() payload: any) {
    return await this.profileService.updateSupplierType(payload);
  }

  @Post('/company-profile-add')
  async addCompanyProfile(@Body() payload: any) {
    return await this.profileService.addCompanyProfile(payload);
  }

  @Post('/company-profile-get')
  async getCompanyProfileById(@Body() payload: any) {
    return await this.profileService.getCompanyProfile(payload);
  }

  @Post('/company-profile-getByUserId')
  async getCompanyProfileByUserId(@Body() payload: any) {
    return await this.profileService.getCompanyProfileByUserId(payload);
  }

  @Post('/company-profile-update')
  async updateCompanyProfile(@Body() payload: any) {
    return await this.profileService.updateCompanyProfile(payload);
  }

  @Post('/company-detail-add')
  async addCompanyDetail(@Body() payload: any) {
    return await this.profileService.addCompanyDetail(payload);
  }

  @Post('/company-detail-get')
  async getCompanyDetailById(@Body() payload: any) {
    return await this.profileService.getCompanyDetail(payload);
  }

  @Post('/company-detail-getByUserId')
  async getCompanyDetailByUserId(@Body() payload: any) {
    return await this.profileService.getCompanyDetailByUserId(payload);
  }

  @Post('/company-detail-update')
  async updateCompanyDetail(@Body() payload: any) {
    return await this.profileService.updateCompanyDetail(payload);
  }

  @Post('/exp-capibility-add')
  async addExpCability(@Body() payload: any) {
    return await this.profileService.addExpCability(payload);
  }

  @Post('/exp-capibility-get')
  async getExpCabilityById(@Body() payload: any) {
    return await this.profileService.getExpCability(payload);
  }

  @Post('/exp-capibility-getByUserId')
  async getExpCabilityByUserId(@Body() payload: any) {
    return await this.profileService.getExpCabilityByUserId(payload);
  }

  @Post('/exp-capibility-update')
  async updateExpCability(@Body() payload: any) {
    return await this.profileService.updateExpCability(payload);
  }

  @Post('/certificate-add')
  async addCertificate(@Body() payload: any) {
    return await this.profileService.addCertificate(payload);
  }

  @Post('/certificate-get')
  async getCertificateById(@Body() payload: any) {
    return await this.profileService.getCertificate(payload);
  }

  @Post('/certificate-getByUserId')
  async getCertificateByUserId(@Body() payload: any) {
    return await this.profileService.getCertificateByUserId(payload);
  }

  @Post('/certificate-update')
  async updateCertificate(@Body() payload: any) {
    return await this.profileService.updateCertificate(payload);
  }

  @Post('/control-add')
  async addQualControl(@Body() payload: any) {
    return await this.profileService.addQualControl(payload);
  }

  @Post('/control-get')
  async getQualControlById(@Body() payload: any) {
    return await this.profileService.getQualControl(payload);
  }

  @Post('/control-getByUserId')
  async getQualControlByUserId(@Body() payload: any) {
    return await this.profileService.getQualControlByUserId(payload);
  }

  @Post('/control-update')
  async updateQualControl(@Body() payload: any) {
    return await this.profileService.updateQualControl(payload);
  }

  @Post('/research-add')
  async addResearchDevelopment(@Body() payload: any) {
    return await this.profileService.addResearchDevelopment(payload);
  }

  @Post('/research-get')
  async getResearchDevelopmentById(@Body() payload: any) {
    return await this.profileService.getResearchDevelopment(payload);
  }

  @Post('/research-getByUserId')
  async getResearchDevelopmentByUserId(@Body() payload: any) {
    return await this.profileService.getResearchDevelopmentByUserId(payload);
  }

  @Post('/research-update')
  async updateResearchDevelopment(@Body() payload: any) {
    return await this.profileService.updateResearchDevelopment(payload);
  }
}
