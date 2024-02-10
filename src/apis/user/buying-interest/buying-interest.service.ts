import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuyingInterest } from './buying-interest.schema';

@Injectable()
export class BuyingInterestService {
  constructor(
    @InjectModel('BuyingInterest')
    private readonly model: Model<BuyingInterest>,
  ) { }

  async addBuyingInterest(payload: any) {
    const BrandApproval = new this.model(payload);
    const queryResult = await BrandApproval.save();
    return {
      code: 200,
      status: 'success',
      message: 'Brand Approval Added',
      data: queryResult
    };
  }

  async getBuyingInterest() {
    const queryResult = await this.model.find().exec();
    return {
      code: 200,
      status: 'success',
      message: `Brand Approval Loaded`,
      data: queryResult,
    };
  }

  async getBuyingInterestById(_id: string) {
    const queryResult = await this.model.findOne({ _id: _id }).exec();
    return {
      code: 200,
      status: 'success',
      message: `Brand Approval Loaded`,
      data: queryResult,
    };
  }

  async updateBuyingInterest(payload: any) {
    const queryResult = await this.model.updateOne({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Brand Approval ${!queryResult ? 'Not ' : ''}Updated`,
      data: queryResult,
    };
  }

  async deleteBuyingInterest(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      code: 200,
      status: 'success',
      message: `Brand Approval ${!isDeleted ? 'Not ' : ''}Deleted`,
      data: queryResult,
    };
  }
}
