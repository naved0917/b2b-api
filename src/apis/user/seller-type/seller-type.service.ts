import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SellerType, TypeSellerType, LooseObject } from './seller-type.schema';
@Injectable()
export class SellerTypeService {
  constructor(
    @InjectModel('SellerType')
    private readonly model: Model<SellerType>,
  ) { }

  async addSellerType(params: TypeSellerType) {
    const sellerType = new this.model(params);
    const queryResult = await sellerType.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Seller Type Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getSellerType(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Certificate Center Loaded`,
      },
      data: queryResult,
    };
  }

  async getSellerTypeDetail(payload: any) {
    const queryResult = await this.model.findOne({ userId: payload.userId }).exec();
    return {
      code: 200,
      status: 'success',
      message: `Certificate details loaded`,
      data: queryResult,
    };
  }

  async getSellerTypeDetailVerify(payload: any) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Certificate details verified`,
      data: queryResult,
    };
  }

  async getSellerTypeList(index: number, length: number, query: string) {
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
        message: `Seller Type List Loaded`,
      },
      data: queryResult,
    };
  }

  async getSellerTypeByUserId(userId) {
    const queryResult = await this.model.findOne({ userId: userId });
    return {
      code: 200,
      status: 'success',
      message: `Seller type get successfully`,
      data: queryResult,
    };
  }

  async updateSellerType(_id: string, params: TypeSellerType) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Seller Type  ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteSellerType(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `SellerType ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
