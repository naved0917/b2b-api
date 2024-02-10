import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MasterLocation,
  TypeMasterLocation,
} from './master-location.schema';

@Injectable()
export class MasterLocationService {
  constructor(
    @InjectModel('MasterLocation')
    private readonly model: Model<MasterLocation>,
  ) { }

  async addMasterLocation(params: TypeMasterLocation) {
    const masterLocation = new this.model(params);
    const queryResult = await masterLocation.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Master Location Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getMasterLocation(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Location Loaded`,
      },
      data: queryResult,
    };
  }

  async getMasterLocationList(index: number, length: number, query: string) {
    const queryObj = JSON.parse(query);
    const findQuery: any = {};
    if (queryObj['stateId'] !== undefined) {
      findQuery.stateId = {
        $regex: '.*' + queryObj.stateId + '.*',
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
        message: `Master Location List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateMasterLocation(_id: string, params: TypeMasterLocation) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Location ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteMasterLocation(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Location ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }

  async deleteMasterLocationByStateId(stateId: string) {
    const queryResult = await this.model.deleteMany({ stateId: stateId });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Locations ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        stateId: stateId,
      },
    };
  }

  async deleteMasterLocationByCountryId(countryId: string) {
    const queryResult = await this.model.deleteMany({ countryId: countryId });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Locations ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        countryId: countryId,
      },
    };
  }

  async getMasterLocationListAll(stateValue) {
    let queryResult;
    if (stateValue) {
      queryResult = await this.model.find({ state: String(stateValue) })
    } else {
      queryResult = await this.model.find();
    }
    if (queryResult) {
      queryResult = queryResult.sort((a, b) => a.name.localeCompare(b.name));
      return {
        data: queryResult,
        code: 200,
        status: 'success',
        message: `City List Loaded`,
      };
    }else{
      return {
        code: 200,
        status: 'success',
        message: `City not found`,
      };
    }
  }
}
