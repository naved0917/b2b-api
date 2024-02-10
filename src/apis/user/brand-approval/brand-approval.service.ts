import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import {
  BrandApproval,
  TypeBrandApproval,
  LooseObject,
  BrandApprovalStatus,
} from './brand-approval.schema';

@Injectable()
export class BrandApprovalService {
  constructor(
    @InjectModel('BrandApproval')
    private readonly model: Model<BrandApproval>,
  ) {}

  async addBrandApproval(params: TypeBrandApproval) {
    const BrandApproval = new this.model(params);
    const queryResult = await BrandApproval.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Brand Approval Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getBrandApproval(_id: string) {
    const queryResult = await this.model.findOne({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Brand Approval Loaded`,
      },
      data: queryResult,
    };
  }

  async getBrandApprovalList(
    index: number,
    length: number,
    query: string,
    userId: string,
  ) {
    const queryObj = JSON.parse(query);
    const findQuery: LooseObject = { userId };
    
    if (findQuery['name'] !== undefined) {
      findQuery.name = { $regex: '.*' + queryObj.name + '.*', $options: 'i' };
    }
    const queryResult = await this.model
      .find({ ...findQuery, ...queryObj })
      .limit(length)
      .skip(index)
      .sort({
        name: 'asc',
      })
      .exec();
    const result = queryResult.map((i: any) => {
      i.addedOn = moment(new Date(i.timestamp)).format('YYYY-MM-DD hh:mm');
      return i;
    });
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Brand Approval List Loaded`,
      },
      data: result,
    };
  }

  async updateBrandApproval(_id: string, params: TypeBrandApproval) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Brand Approval ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteBrandApproval(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Brand Approval ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }

  async updateBrandStatus(status, _id) {
   
    const findOne = await this.model.findOne({ _id })
    if(findOne && findOne.status !== BrandApprovalStatus.Approved){
      await this.model.findOneAndUpdate({ _id }, { $set: { status } })
    }
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Brand Approval Status Update`,
      },
      data: {
        _id: _id,
      },
    };
  }

  async getAll({ page, pageSize }){
    const result = await this.model.find().skip((Number(page) - 1) * pageSize).limit(pageSize)
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Brand Approval List Loaded`,
      },
      data: result,
    };
  }
}
