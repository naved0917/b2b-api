import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  TradeShow,
  TypeTradeShowObject,
  LooseObject,
} from './tradeshow.schema';

@Injectable()
export class TradeshowService {
  constructor(
    @InjectModel('TradeShow')
    private readonly model: Model<TradeShow>,
  ) { }

  async addTradeShow(params: TypeTradeShowObject) {
    const addTradeShow = new this.model(params);
    const queryResult = await addTradeShow.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'TradeShow Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getTradeShow(_id: string) {
    const queryResult = await this.model.findOne({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Blog Loaded`,
      },
      data: queryResult,
    };
  }

  async getTradeShowList() {
    const queryResult = await this.model
      .find().sort({
        name: 'asc',
      })
      .exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `TradeShow List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateTradeShow(_id: string, params: TypeTradeShowObject) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `TradeShow ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteTradeShow(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `TradeShow ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}

