import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inspection } from './inspection.schema';

@Injectable()
export class InspectionService {
  constructor(
    @InjectModel('Inspection')
    private readonly model: Model<Inspection>,
  ) { }

  async addInspection(payload) {
    const queryResult = await new this.model({ ...payload }).save();
    return {
      code: 200,
      status: 'success',
      message: `Inspection added successfully.`,
      data: queryResult
    };
  }

  async getInspection(payload) {
    const queryResult = await this.model.findOne({ _id: payload._id });
    return {
      code: 200,
      status: 'success',
      message: `Inspection get successfully.`,
      data: queryResult
    };
  }

  async updateInspection(payload) {
    const queryResult = await this.model.findOneAndUpdate({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: `Inspection updated successfully.`,
      data: queryResult
    };
  }
}
