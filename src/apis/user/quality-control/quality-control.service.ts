import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  QualityControl,
  TypeQualityControl,
  LooseObject,
} from './quality-control.schema';
@Injectable()
export class QualityControlService {
  constructor(
    @InjectModel('QualityControl')
    private readonly model: Model<QualityControl>,
  ) { }

  async addQualityControl(params: TypeQualityControl) {
    const sellerType = new this.model(params);
    const queryResult = await sellerType.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Quality Control Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getQualityControl(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Quality Control Loaded`,
      },
      data: queryResult,
    };
  }

  async getQualityControlDetail(payload: any) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Quality Control Details Loaded`,
      data: queryResult,
    };
  }

  async getQualityControlByUserId(userId: string) {
    const queryResult = await this.model.findOne({ userId: userId });
    return {
      code: 200,
      status: 'success',
      message: `Quality Control get successfully.`,
      data: queryResult,
    };
  }

  async getQualityControlVerify(payload: any) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Quality Control Verified`,
      data: queryResult,
    };
  }

  async getQualityControlList(index: number, length: number, query: string) {
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
        message: `Quality Control List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateQualityControl(_id: string, params: TypeQualityControl) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Quality Control  ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteQualityControl(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Quality Control ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
