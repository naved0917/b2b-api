import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from './seller-profile.schema';

@Injectable()
export class SellerProfileService {
  constructor(
    @InjectModel('Seller')
    private readonly model: Model<Seller>,
  ) { }

  async addSellerProfile(payload) {
    const queryResult = await new this.model({ ...payload }).save();
    return {
      code: 200,
      status: 'success',
      message: `Seller profile get successfully.`,
      data: queryResult
    };
  }

  async getSellerProfile(payload) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Seller profile get successfully.`,
      data: queryResult
    };
  }

  async updateSellerProfile(payload) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Seller profile updated successfully.`,
      data: queryResult
    };
  }
}
