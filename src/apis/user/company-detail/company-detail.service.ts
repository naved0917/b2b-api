import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CompanyDetail,
  TypeCompanyDetail,
  LooseObject,
} from './company-detail.schema';
@Injectable()
export class CompanyDetailService {
  constructor(
    @InjectModel('CompanyDetail')
    private readonly model: Model<CompanyDetail>,
  ) { }

  async addCompanyDetail(params: TypeCompanyDetail) {
    const sellerType = new this.model(params);
    const queryResult = await sellerType.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Company Detail Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getCompanyDetail(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Company Detail Loaded`,
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

  async getCompanyDetailByUserId(userId) {
    const queryResult = await this.model.findOne({ userId: userId });
    return {
      code: 200,
      status: 'success',
      message: `Company detail get successfully.`,
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

  async getCompanyDetailList(index: number, length: number, query: string) {
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
        message: `Company Detail List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateCompanyDetail(params: any) {
    const queryResult = await this.model.updateOne({ _id: params._id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Company Detail  ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: queryResult
    };
  }

  async deleteCompanyDetail(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Company Detail ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
