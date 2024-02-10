import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminAssociate } from './admin-associate.schema';
import { MailService } from 'src/mail/mail.service';
import { Auth } from 'src/apis/auth/auth.schema';

@Injectable()
export class AdminAssociateService {
  saltOrRounds = 10;
  constructor(
    @InjectModel('AdminAssociate')
    private readonly model: Model<AdminAssociate>,
    @InjectModel('Auth')
    private readonly authModel: Model<Auth>,
    private mailService: MailService,
  ) { }

  async assignAssociate(payload) {
    payload.isMail = false;
    payload.status = 'Not Verify';
    payload.isVerified = false;
    const profile = await new this.model({ ...payload }).save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Associate assign successfully',
      },
      data: {
        _id: profile._id as string,
      },
    };
  }

  async AssignAssociateList(payload) {
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
        message: `Associate List Loaded`,
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
    this.mailService.catelogVerification(payload);
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
    let authPayload = {
      "assignAssociate": true,
      "cataloging": "Done"
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
