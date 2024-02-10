import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agent } from './agent-profile.schema';
import { MailService } from 'src/mail/mail.service';
import { Auth } from 'src/apis/auth/auth.schema';
import * as bcrypt from 'bcrypt';
import * as yup from 'yup';

const passwordValidationSchema = yup
  .string()
  .required()
  .min(8, 'Password must be 8 character')
  .max(24, 'Password must be lower than 24 character')
  .matches(/[A-Z]/, 'Must contain one uppercase')
  .matches(/([a-z])/, 'Must contain one lowercase')
  .matches(/(\d)/, 'Must contain one number')
  .matches(/(\W)/, 'Must contain one special character');

@Injectable()
export class AgentProfileService {
  saltOrRounds = 10;
  constructor(
    @InjectModel('Agent')
    private readonly model: Model<Agent>,
    @InjectModel('Auth')
    private readonly authModel: Model<Auth>,
    private mailService: MailService,
  ) { }

  async addAgent(payload) {
    const profile = await new this.model({
      ...payload,
      timeStamp: [{ date: new Date() }],
    }).save();
    await this.mailService.AgentVerification(
      profile._id as string,
      profile.email,
      profile.password,
    );
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Agent Profile Added',
      },
      data: {
        _id: profile._id as string,
      },
    };
  }

  async getAgentById(_id) {
    const result = await this.model.findOne({ _id: _id });
    if (result) return result;
    else throw new NotFoundException('Agent Not Found .');
  }

  async getAgentList(payload) {
    let queryResult: any;
    if (payload.query === 'Approved') {
      queryResult = await this.model
        .find({ status: payload.query })
        .skip((Number(payload.page) - 1) * payload.pageSize)
        .limit(payload.pageSize);
    } else {
      queryResult = await this.model
        .find()
        .skip((Number(payload.page) - 1) * payload.pageSize)
        .limit(payload.pageSize);
    }

    return {
      header: {
        code: 200,
        status: 'success',
        message: `Agent List Loaded`,
      },
      data: queryResult,
    };
  }

  async getAgentApproved(payload) {
    let profile: any;
    let authProfile: any;
    if (payload.isVerified === true) {
      profile = await this.model.findOneAndUpdate(
        { _id: payload._id },
        payload,
      );
    } else {
      profile = await this.model.findOneAndUpdate(
        { _id: payload._id },
        payload,
      );
    }
    await passwordValidationSchema.validate(profile.password);
    const hashedPassword = await bcrypt.hash(profile.password, this.saltOrRounds);
    let authObj = {
      company: profile.companyName,
      email: profile.email,
      password: hashedPassword,
      country: profile.country,
      city: profile.city,
      role: 'agent',
      isVerified: true,
      userId: profile._id as string,
      fName: profile.contactPerson[0].name,
      lName: profile.contactPerson[0].surName,
      phone: profile.contactPerson[0].phone,
      code: '+91',
      address1: '1234',
      resetToken: Math.floor(100000 + Math.random() * 9000).toString(),
      secretToken: Math.floor(100000 + Math.random() * 9000).toString(),
      timestamp: new Date(),
      isPasswordReset: false,
    };
    authProfile = await new this.authModel(authObj).save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Agent Profile Approved`,
      },
      data: authProfile,
    };
  }

  async updateAgent(payload) {
    const queryResult = await this.model.updateOne(
      { _id: payload._id },
      payload,
    );
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Agent ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: payload._id,
        ...payload,
      },
    };
  }

  async deleteAgent(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Agent ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
