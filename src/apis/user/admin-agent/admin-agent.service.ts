import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/apis/auth/auth.schema';
import { MailService } from 'src/mail/mail.service';
import { AdminAgent } from './admin-agent.schema';

@Injectable()
export class AdminAgentService {
  saltOrRounds = 10;
  constructor(
    @InjectModel('AdminAgent')
    private readonly model: Model<AdminAgent>,
    @InjectModel('Auth')
    private readonly authModel: Model<Auth>,
    private mailService: MailService,
  ) { }

  async assignAgent(payload) {
    payload.isMail = false;
    payload.status = 'Not Verify';
    payload.isVerified = false;
    payload.isVerify = false;
    payload.isPreview = false;
    const profile = await new this.model({ ...payload }).save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Agent assign successfully',
      },
      data: {
        _id: profile._id as string,
      },
    };
  }

  async AssignAgentList(payload) {
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

  async sendMailSeller(payload) {
    payload.isMail = true;
    const queryResult = await this.model.updateOne(
      { _id: payload._id },
      payload,
    );
    // this.mailService.catelogVerification(payload);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Mail sent to seller successfully`,
      },
      data: {
        _id: payload._id,
      },
    };
  }

  async sellerVerify(payload) {
    const queryResult = await this.model.updateOne(
      { _id: payload._id },
      payload,
    );
    let authPayload: any;
    if (payload.isVerify === true) {
      authPayload.isVerify = true
    } else if (authPayload.isPreview === true) {
      authPayload.isPreview = true;
    }
    const authUpdate = await this.authModel.updateOne({ _id: payload.sellerId }, authPayload);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Seller verify successfully`,
      },
      data: {
        _id: payload._id,
        ...authUpdate
      },
    };
  }
}
