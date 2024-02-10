import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Noticebar,
  TypeNoticebarObject
} from './noticebar.schema';

@Injectable()
export class NoticebarService {
  constructor(
    @InjectModel('Noticebar')
    private readonly model: Model<Noticebar>,
  ) { }

  async addNoticebar(params: TypeNoticebarObject) {
    const addNoticebar = new this.model(params);
    const queryResult = await addNoticebar.save();
    return {
      code: 200,
      status: 'success',
      message: 'Noticebar Added',
      data: queryResult
    };
  }

  async getNoticebar(_id: string) {
    const queryResult = await this.model.findOne({ _id: _id }).exec();
    return {
      code: 200,
      status: 'success',
      message: `Blog Loaded`,
      data: queryResult,
    };
  }

  async getNoticebarList() {
    const queryResult = await this.model.find().exec();
    return {
      code: 200,
      status: 'success',
      message: `Noticebar List Loaded`,
      data: queryResult,
    };
  }

  async updateNoticebar(params: any) {
    const queryResult = await this.model.updateOne({ _id: params._id }, params);
    return {
      code: 200,
      status: 'success',
      message: `Noticebar ${!queryResult ? 'Not ' : ''}Updated`,
      data: queryResult
    };
  }

  async deleteNoticebar(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      code: 200,
      status: 'success',
      message: `Noticebar ${!isDeleted ? 'Not ' : ''}Deleted`,
      data: queryResult
    };
  }
}

