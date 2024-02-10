import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  HelpSuggestion,
  TypeHelpSuggestion,
  LooseObject,
} from './help-suggestion.schema';

@Injectable()
export class HelpSuggestionService {
  constructor(
    @InjectModel('HelpSuggestion')
    private readonly model: Model<HelpSuggestion>,
  ) { }

  async addHelpSuggestion(params: TypeHelpSuggestion) {
    const HelpSuggestion = new this.model(params);
    const queryResult = await HelpSuggestion.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Help Suggestion Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getHelpSuggestion(_id: string) {
    const queryResult = await this.model.findOne({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Help Suggestion Loaded`,
      },
      data: queryResult,
    };
  }

  async getHelpSuggestionList(userId: string) {

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
        message: `Master Category List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateHelpSuggestion(_id: string, params: TypeHelpSuggestion) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Help Suggestion ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteHelpSuggestion(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Help Suggestion ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
