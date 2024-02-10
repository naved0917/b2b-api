import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MasterState,
  TypeMasterState,
  LooseObject,
} from './master-state.schema';

@Injectable()
export class MasterStateService {
  constructor(
    @InjectModel('MasterState')
    private readonly model: Model<MasterState>,
  ) { }

  async addMasterState(params: TypeMasterState) {
    const masterState = new this.model(params);
    const queryResult = await masterState.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Master State Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getMasterState(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master State Loaded`,
      },
      data: queryResult,
    };
  }

  async getMasterStateList(index: number, length: number, query: string) {
    const queryObj = JSON.parse(query);
    const findQuery: LooseObject = {};
    if (queryObj['countryId'] !== undefined) {
      findQuery.countryId = {
        $regex: '.*' + queryObj.countryId + '.*',
        $options: 'i',
      };
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
        message: `Master State List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateMasterState(_id: string, params: TypeMasterState) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master State ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteMasterState(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master State ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }

  async deleteMasterStateByCountryId(countryId: string) {
    const queryResult = await this.model.deleteMany({ countryId: countryId });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master States ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        countryId: countryId,
      },
    };
  }

  async getMasterStateListAll(country) {
    let queryResult;
    if (country === null) {
      queryResult = await this.model.find();
    } else {
      queryResult = await this.model.find({ name: country });
    }
    // if (queryResult?.states?.length > 0) {
    // queryResult = queryResult?.states?.sort((a, b) => a.name.localeCompare(b.name));
    return {
      code: 200,
      status: 'success',
      message: `Master Country List Loaded`,
      data: queryResult,
    };
    // } else {
    //   return {
    //     code: 500,
    //     status: 'error',
    //     message: `State not found related country`,
    //   };
    // }

  }
}
