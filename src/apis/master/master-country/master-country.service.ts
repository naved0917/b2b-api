import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MasterCountry,
  TypeMasterCountry,
} from './master-country.schema';

@Injectable()
export class MasterCountryService {
  constructor(
    @InjectModel('MasterCountry')
    private readonly model: Model<MasterCountry>,
  ) { }

  async addMasterCountry(params: TypeMasterCountry) {
    const masterCountry = new this.model(params);
    const queryResult = await masterCountry.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Master Country Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getMasterCountry(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Country Loaded`,
      },
      data: queryResult,
    };
  }

  async getMasterCountryList(index: number, length: number, query: string) {
    const queryObj = JSON.parse(query);
    const findQuery: any = {};
    if (findQuery['name'] !== undefined) {
      findQuery.name = { $regex: '.*' + queryObj.name + '.*', $options: 'i' };
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
        message: `Master Country List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateMasterCountry(_id: string, params: TypeMasterCountry) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Country ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteMasterCountry(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Country ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }

  async getMasterCountryListAll() {
    let queryResult: any = await this.model
      .find()
      .exec();
    if (queryResult?.length > 0) {
      queryResult = queryResult?.sort((a, b) => a.name.localeCompare(b.name));
      queryResult = queryResult.map((d) => {
        return {
          "_id": d._id,
          "country": d.name,
          "code": d.code,
          "dial_code": d.dial_code
        }
      })
      return {
        code: 200,
        status: 'success',
        message: `Master Country List Loaded`,
        data: queryResult,
      };
    } else {
      return {
        code: 500,
        status: 'error',
        message: `No data found`,
        data: queryResult,
      };
    }
  }
}
