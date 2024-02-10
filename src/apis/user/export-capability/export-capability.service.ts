import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ExportCapability,
  TypeExportCapability,
  LooseObject,
} from './export-capability.schema';
@Injectable()
export class ExportCapabilityService {
  constructor(
    @InjectModel('ExportCapability')
    private readonly model: Model<ExportCapability>,
  ) { }

  async addExportCapability(params: TypeExportCapability) {
    const sellerType = new this.model(params);
    const queryResult = await sellerType.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Export Capability Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getExportCapability(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Export Capability Loaded`,
      },
      data: queryResult,
    };
  }

  async getExportCapabilityByUserId(userId: string) {
    const queryResult = await this.model.findOne({ userId: userId });
    return {
      code: 200,
      status: 'success',
      message: `Export Capability get successfully.`,
      data: queryResult,
    };
  }

  async getExportCapabilityDetail(payload: any) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Export Capability Detail Loaded`,
      data: queryResult,
    };
  }

  async getExportCapabilityVerify(payload: any) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Export Capability Verified`,
      data: queryResult,
    };
  }

  async getExportCapabilityList(index: number, length: number, query: string) {
    const queryObj = JSON.parse(query);
    const findQuery: LooseObject = {};
    if (queryObj['userId'] !== undefined) {
      findQuery.userId = queryObj.userId;
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
        message: `Export Capability List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateExportCapability(_id: string, params: TypeExportCapability) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Export Capability  ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteExportCapability(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Export Capability ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
