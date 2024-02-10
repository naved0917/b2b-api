import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  HelpComplain,
  TypeHelpComplaint,
  LooseObject,
} from './help-complain.schema';

@Injectable()
export class HelpComplainService {
  constructor(
    @InjectModel('HelpComplain')
    private readonly model: Model<HelpComplain>,
  ) { }

  async addHelpComplain(params: TypeHelpComplaint) {
    const helpComplaint = new this.model(params);
    const queryResult = await helpComplaint.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: ' Help Complaint Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getHelpComplain(_id: string) {
    const queryResult = await this.model.findOne({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Help Complaint Loaded`,
      },
      data: queryResult,
    };
  }

  async getHelpComplainList(userId: string) {
    const queryResult = await this.model
      .find({ userId: userId })
      .sort({
        name: 'asc',
      })
      .exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Help Complaint List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateHelpComplain(_id: string, params: TypeHelpComplaint) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Help Complaint ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteHelpComplain(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Help Complaint ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
