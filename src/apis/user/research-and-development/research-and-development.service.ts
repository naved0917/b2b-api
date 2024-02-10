import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ResearchAndDevelopment,
  TypeResearchAndDevelopment,
  LooseObject,
} from './research-and-development.schema';
@Injectable()
export class ResearchAndDevelopmentService {
  constructor(
    @InjectModel('ResearchAndDevelopment')
    private readonly model: Model<ResearchAndDevelopment>,
  ) { }

  async addResearchAndDevelopment(params: TypeResearchAndDevelopment) {
    const sellerType = new this.model(params);
    const queryResult = await sellerType.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Research And Development Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getResearchAndDevelopment(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Research And Development Loaded`,
      },
      data: queryResult,
    };
  }

  async getResearchAndDevelopmentByUserId(userId: string) {
    const queryResult = await this.model.findOne({ userId: userId });
    return {
      code: 200,
      status: 'success',
      message: `Research And Development get successfully.`,
      data: queryResult,
    };
  }

  async getResearchAndDevelopmentDetail(payload: any) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Research And Development Detail Loaded`,
      data: queryResult,
    };
  }

  async getResearchAndDevelopmentVerify(payload: any) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Research And Development Verified`,
      data: queryResult,
    };
  }

  async getResearchAndDevelopmentList(
    index: number,
    length: number,
    query: string,
  ) {
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
        message: `Research And Development List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateResearchAndDevelopment(
    _id: string,
    params: TypeResearchAndDevelopment,
  ) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Research And Development  ${!queryResult ? 'Not ' : ''
          }Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteResearchAndDevelopment(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Research And Development ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
