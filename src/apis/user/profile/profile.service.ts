import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile')
    private readonly model: Model<Profile>,
  ) { }

  async addProfile(payload) {
    console.log('payload',payload);
    
    const queryResult = await new this.model({ ...payload }).save();
    console.log('queryResult',queryResult);
    return {
      code: 200,
      status: 'success',
      message: `Profile added successfully.`,
      data: queryResult
    };
  }

  async getProfile(payload) {
    const queryResult = await this.model.findOne({ _id: payload._id });
    return {
      code: 200,
      status: 'success',
      message: `Profile get successfully.`,
      data: queryResult
    };
  }

  async getProfileByUserId(payload) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Profile get successfully.`,
      data: queryResult
    };
  }

  async updateProfile(payload) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Profile updated successfully.`,
      data: queryResult
    };
  }

  async addSupplierType(payload) {
    const queryResult = await new this.model({ ...payload }).save();
    return {
      code: 200,
      status: 'success',
      message: `Supplier Type added successfully.`,
      data: queryResult
    };
  }

  async getSupplierType(payload) {
    const queryResult = await this.model.findOne({ _id: payload._id });
    return {
      code: 200,
      status: 'success',
      message: `Supplier Type get successfully.`,
      data: queryResult
    };
  }

  async getSupplierTypeByUserId(payload) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Supplier Type get successfully.`,
      data: queryResult
    };
  }

  async updateSupplierType(payload) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Supplier Type updated successfully.`,
      data: queryResult
    };
  }

  async addCompanyProfile(payload) {
    const queryResult = await new this.model({ ...payload }).save();
    return {
      code: 200,
      status: 'success',
      message: `Company Profile added successfully.`,
      data: queryResult
    };
  }

  async getCompanyProfile(payload) {
    const queryResult = await this.model.findOne({ _id: payload._id });
    return {
      code: 200,
      status: 'success',
      message: `Company Profile get successfully.`,
      data: queryResult
    };
  }

  async getCompanyProfileByUserId(payload) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Company Profile get successfully.`,
      data: queryResult
    };
  }

  async updateCompanyProfile(payload) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Company Profile updated successfully.`,
      data: queryResult
    };
  }
  
  async addCompanyDetail(payload) {
    const queryResult = await new this.model({ ...payload }).save();
    return {
      code: 200,
      status: 'success',
      message: `Company Detail added successfully.`,
      data: queryResult
    };
  }

  async getCompanyDetail(payload) {
    const queryResult = await this.model.findOne({ _id: payload._id });
    return {
      code: 200,
      status: 'success',
      message: `Company Detail get successfully.`,
      data: queryResult
    };
  }

  async getCompanyDetailByUserId(payload) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Company Detail get successfully.`,
      data: queryResult
    };
  }

  async updateCompanyDetail(payload) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Company Detail updated successfully.`,
      data: queryResult
    };
  }

  async addExpCability(payload) {
    const queryResult = await new this.model({ ...payload }).save();
    return {
      code: 200,
      status: 'success',
      message: `Export Cability added successfully.`,
      data: queryResult
    };
  }

  async getExpCability(payload) {
    const queryResult = await this.model.findOne({ _id: payload._id });
    return {
      code: 200,
      status: 'success',
      message: `Export Cability get successfully.`,
      data: queryResult
    };
  }

  async getExpCabilityByUserId(payload) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Export Cability get successfully.`,
      data: queryResult
    };
  }

  async updateExpCability(payload) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Export Cability updated successfully.`,
      data: queryResult
    };
  }


  async addCertificate(payload) {
    const queryResult = await new this.model({ ...payload }).save();
    return {
      code: 200,
      status: 'success',
      message: `Certificate added successfully.`,
      data: queryResult
    };
  }

  async getCertificate(payload) {
    const queryResult = await this.model.findOne({ _id: payload._id });
    return {
      code: 200,
      status: 'success',
      message: `Certificate get successfully.`,
      data: queryResult
    };
  }

  async getCertificateByUserId(payload) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Certificate get successfully.`,
      data: queryResult
    };
  }

  async updateCertificate(payload) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Certificate updated successfully.`,
      data: queryResult
    };
  }


  async addQualControl(payload) {
    const queryResult = await new this.model({ ...payload }).save();
    return {
      code: 200,
      status: 'success',
      message: `Quality Control added successfully.`,
      data: queryResult
    };
  }

  async getQualControl(payload) {
    const queryResult = await this.model.findOne({ _id: payload._id });
    return {
      code: 200,
      status: 'success',
      message: `Quality Control get successfully.`,
      data: queryResult
    };
  }

  async getQualControlByUserId(payload) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Quality Control get successfully.`,
      data: queryResult
    };
  }

  async updateQualControl(payload) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Quality Control updated successfully.`,
      data: queryResult
    };
  }


  async addResearchDevelopment(payload) {
    const queryResult = await new this.model({ ...payload }).save();
    return {
      code: 200,
      status: 'success',
      message: `Research Development added successfully.`,
      data: queryResult
    };
  }

  async getResearchDevelopment(payload) {
    const queryResult = await this.model.findOne({ _id: payload._id });
    return {
      code: 200,
      status: 'success',
      message: `Research Development get successfully.`,
      data: queryResult
    };
  }

  async getResearchDevelopmentByUserId(payload) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Research Development get successfully.`,
      data: queryResult
    };
  }

  async updateResearchDevelopment(payload) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Research Development updated successfully.`,
      data: queryResult
    };
  }


  
}
