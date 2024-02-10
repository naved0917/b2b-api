import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/apis/auth/auth.schema';
import { MasterCategory } from 'src/apis/master/master-category/master-category.schema';
import {
  CompanyProfile,
  TypeCompanyProfile,
  LooseObject,
} from './company-profile.schema';
@Injectable()
export class CompanyProfileService {
  constructor(
    @InjectModel('CompanyProfile')
    private readonly model: Model<CompanyProfile>,
    @InjectModel('MasterCategory')
    private readonly masterCategory: Model<MasterCategory>,
    @InjectModel('Auth')
    private readonly authModel: Model<Auth>,
  ) { }

  async getCompanyProfileByUserId(userId) {
    const queryResult: any = await this.model.findOne({ userId });
    let category;
    if (queryResult) {
      const findMasterCategory = await this.masterCategory.findById(queryResult.mainCategory)
      category = findMasterCategory
    }

    const userInfo = await this.authModel.findById(userId);

    if (queryResult) return {
      header: {
        code: 200,
        status: 'success',
        message: `Company Profile Loaded`,
      },
      data: queryResult,
      isVerified: userInfo.isApprovedByAdmin,
      category
    };
    return {
      header: {
        code: 500,
        status: 'error',
        message: `Company Profile Not Found`,
      },
      data: null,
    };
  }

  async addCompanyProfile(params: TypeCompanyProfile) {
    const sellerType = new this.model(params);
    const queryResult = await sellerType.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Company Profile Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getCompanyProfile(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Company Profile Loaded`,
      },
      data: queryResult,
    };
  }

  async getCompanyList(payload: any) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Company List Loaded`,
      data: queryResult,
    };
  }

  async getCompanyProfileDetailByUserId(userId) {
    const queryResult = await this.model.findOne({ userId: userId });
    return {
      code: 200,
      status: 'success',
      message: `Company profile get successfully.`,
      data: queryResult,
    };
  }

  async updateCompanyVerification(payload: any) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Company Details Updated`,
      data: queryResult,
    };
  }

  async getCompanyProfileList(index: number, length: number, query: string) {
    const queryObj = JSON.parse(query);
    const findQuery: LooseObject = {};
    if (queryObj['userId'] !== undefined) {
      findQuery.userId = queryObj.userId;
    }
    const queryResult = await this.model
      .find(findQuery)
      .limit(length)
      .skip(index)
      .sort({
        name: 'asc',
      })
      .exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Company Profile List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateCompanyProfile(params: any) {
    const queryResult = await this.model.updateOne({ _id: params._id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Company Profile  ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: queryResult
    };
  }

  async deleteCompanyProfile(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Company Profile ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
