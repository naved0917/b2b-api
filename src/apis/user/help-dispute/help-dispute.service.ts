import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  HelpDispute,
  TypeHelpDispute,
  LooseObject,
} from './help-dispute.schema';

@Injectable()
export class HelpDisputeService {
  constructor(
    @InjectModel('HelpDispute')
    private readonly model: Model<HelpDispute>,
  ) { }

  async addHelpDispute(params: TypeHelpDispute) {
    const HelpDispute = new this.model(params);
    const queryResult = await HelpDispute.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Help Dispute Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getHelpDispute(_id: string) {
    const queryResult = await this.model.findOne({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Help Dispute Loaded`,
      },
      data: queryResult,
    };
  }

  async getHelpDisputeList(userId: string) {
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
        message: `Help Dispute List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateHelpDispute(_id: string, params: TypeHelpDispute) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Help Dispute ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteHelpDispute(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Help Dispute ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
