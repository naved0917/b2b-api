import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CertificateCenter,
  TypeCertificateCenter,
  LooseObject,
} from './certificate-center.schema';
@Injectable()
export class CertificateCenterService {
  constructor(
    @InjectModel('CertificateCenter')
    private readonly model: Model<CertificateCenter>,
  ) { }

  async addCertificateCenter(params: any) {
    const sellerType = new this.model(params);
    const queryResult = await sellerType.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Certificate Center Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getCertificateCenter(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Certificate Center Loaded`,
      },
      data: queryResult,
    };
  }

  async getCertificateCenterByUserId(userId: string) {
    const queryResult = await this.model.findOne({ userId: userId });
    return {
      code: 200,
      status: 'success',
      message: `Certificate Center get successfully.`,
      data: queryResult,
    };
  }

  async getCertificateCenterDetail(payload: any) {
    const queryResult = await this.model.findOne({ userId: payload.userId });
    return {
      code: 200,
      status: 'success',
      message: `Certificate Center Detail Loaded`,
      data: queryResult,
    };
  }

  async getCertificateCenterVerify(payload: any) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Certificate Center Verified`,
      data: queryResult,
    };
  }

  async getCertificateCenterList(index: number, length: number, query: string) {
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
        message: `Certificate Center List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateCertificateCenter(params: any) {
    const queryResult = await this.model.updateOne({ _id: params._id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Certificate Center  ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: queryResult,
    };
  }

  async deleteCertificateCenter(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Certificate Center ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
