import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Buyer } from './buyer-profile.schema';

@Injectable()
export class BuyerProfileService {
  constructor(
    @InjectModel('Buyer')
    private readonly model: Model<Buyer>,
  ) { }

  async addBuyerProfile(payload) {
    const queryResult = await new this.model({ ...payload }).save();
    return {
      code: 200,
      status: 'success',
      message: `Buyer profile get successfully.`,
      data: queryResult
    };
  }

  async getBuyerProfile(payload) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Buyer profile get successfully.`,
      data: queryResult
    };
  }

  async updateBuyerProfile(payload) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Buyer profile updated successfully.`,
      data: queryResult
    };
  }
}
