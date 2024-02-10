import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SellerAdmin } from './seller-admin.schema';

@Injectable()
export class SellerAdminService {
  saltOrRounds = 10;
  constructor(
    @InjectModel('SellerAdmin')
    private readonly model: Model<SellerAdmin>,
  ) {}

  async requestSend(payload) {
    const profile = await new this.model({ ...payload }).save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Cateloging request send to admin',
      },
      data: {
        _id: profile._id as string,
      },
    };
  }

  async getRequestList(payload) {
    let queryResult: any;
    if (payload.query === 'Approved') {
      queryResult = await this.model
        .find({ status: payload.query })
        .skip((Number(payload.page) - 1) * payload.pageSize)
        .limit(payload.pageSize);
    } else {
      queryResult = await this.model
        .find()
        .skip((Number(payload.page) - 1) * payload.pageSize)
        .limit(payload.pageSize);
    }

    return {
      header: {
        code: 200,
        status: 'success',
        message: `Associate List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateAssociate(payload) {
    const queryResult = await this.model.updateOne(
      { _id: payload._id },
      payload,
    );
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Request ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: payload._id,
        ...payload,
      },
    };
  }
}
