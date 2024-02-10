import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MasterFilter,
  TypeMasterFilter,
  LooseObject,
} from './master-filter.schema';

@Injectable()
export class MasterFilterService {
  constructor(
    @InjectModel('MasterFilter')
    private readonly model: Model<MasterFilter>,
  ) { }

  async addMasterFilter(params: TypeMasterFilter) {
    const masterFilter = new this.model(params);
    const queryResult = await masterFilter.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Master Filter Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getMasterFilter(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Filter Loaded`,
      },
      data: queryResult,
    };
  }

  async getMasterFilterList(payload) {
    let queryResult;    
    if (payload.query !== '') {
      queryResult = await this.model.find({filter: payload.query})
    } else {
      queryResult = await this.model.find();
    }
    
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Filter List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateMasterFilter(_id: string, params: TypeMasterFilter) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Filter ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteMasterFilter(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Filter ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
