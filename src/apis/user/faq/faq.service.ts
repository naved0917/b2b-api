import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Faq,
  TypeFaqObject
} from './faq.schema';

@Injectable()
export class FaqService {
  constructor(
    @InjectModel('Faq')
    private readonly model: Model<Faq>,
  ) { }

  async addFaq(params: TypeFaqObject) {
    const addFaq = new this.model(params);
    const queryResult = await addFaq.save();
    return {
      code: 200,
      status: 'success',
      message: 'Faq Added',
      data: queryResult
    };
  }

  async getFaq(_id: string) {
    const queryResult = await this.model.findOne({ _id: _id }).exec();
    return {
      code: 200,
      status: 'success',
      message: `Blog Loaded`,
      data: queryResult,
    };
  }

  async getFaqList() {
    const queryResult = await this.model.find().exec();
    return {
      code: 200,
      status: 'success',
      message: `Faq List Loaded`,
      data: queryResult,
    };
  }

  async updateFaq(params: any) {
    const queryResult = await this.model.updateOne({ _id: params._id }, params);
    return {
      code: 200,
      status: 'success',
      message: `Faq ${!queryResult ? 'Not ' : ''}Updated`,
      data: queryResult
    };
  }

  async deleteFaq(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      code: 200,
      status: 'success',
      message: `Faq ${!isDeleted ? 'Not ' : ''}Deleted`,
      data: queryResult
    };
  }
}

