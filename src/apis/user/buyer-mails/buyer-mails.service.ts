import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { Auth } from 'src/apis/auth/auth.schema';
import { Buyer } from '../buyer-profile/buyer-profile.schema';
import { CompanyDetail } from '../company-detail/company-detail.schema';
import { Product } from '../product/product.schema';
import { BuyerMails, BuyerMailsDocument } from './buyer-mails.schema';
import { Messages, MessagesDocument } from './messages.schema';

@Injectable()
export class BuyerMailsService {
  constructor(
    @InjectModel(BuyerMails.name)
    private readonly buyerMailModel: Model<BuyerMailsDocument>,
    @InjectModel(Messages.name)
    private readonly messagesModel: Model<MessagesDocument>,
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
    @InjectModel('Auth')
    private readonly userModel: Model<Auth>,
    @InjectModel('CompanyDetail')
    private readonly companyDetail: Model<CompanyDetail>,
    @InjectModel('Buyer')
    private readonly buyerProfileModel: Model<Buyer>,
  ) {}

  async insertMessageAndQuantity(payload) {
    try {
      const result = await new this.buyerMailModel({
        ...payload,
        unRead: true,
        timestamp: new Date(),
      }).save();
      await new this.messagesModel({
        requestId: result._id,
        message: payload.message,
        attachments: payload.attachments,
        senderId: payload.senderId,
        timestamp: new Date(),
      }).save();
      return {
        header: {
          code: 200,
          status: 'success',
          message: 'Purchase Request has been send to seller.',
        },
        data: {
          message: 'Message Sent',
          _id: result._id as string,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        header: {
          code: 400,
          status: 'error',
          message: 'Message Not Sent',
        },
        data: null,
      };
    }
  }

  async sendMessagesForAnRequestId(payload) {
    const result = await new this.messagesModel({
      ...payload,
      timestamp: new Date(),
    }).save();
    await this.unReadMessage(payload.requestId);
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Message Sent.',
      },
      data: {
        message: 'Message Sent',
        _id: result._id as string,
      },
    };
  }

  async getSellerOrBuyerLogo(userId, role) {
    if (role === 'seller') {
      const companyDetail = await this.companyDetail.findOne({ userId });
      return companyDetail.companyLogo || '';
    } else if (role === 'buyer') {
      const buyerProfile = await this.buyerProfileModel.findOne({ userId });
      return '';
    }
  }

  async getAllMessagesOfRequestId(requestId, userId) {
    const findRequestedEntry = await this.buyerMailModel.findById(requestId);
    if (
      findRequestedEntry.senderId === userId ||
      findRequestedEntry.receiverId === userId
    ) {
      const result = await this.messagesModel.find({ requestId });
      const userIds = [];
      const usersObj = {};
      const usersNameObj = {};
      const imageByUserId = {};
      result.forEach((i) => {
        userIds.push(i.senderId);
      });
      const findUsers = await this.userModel.find({ _id: { $in: userIds } });

      for (let x = 0; x < findUsers.length; x++) {
        usersObj[findUsers[x]._id] = findUsers[x].company;
        usersNameObj[findUsers[x]._id] = findUsers[x].fName + ' ' + findUsers[x].lName ;
        imageByUserId[findUsers[x]._id] = await this.getSellerOrBuyerLogo(
          findUsers[x]._id,
          findUsers[x].role,
        );
      }

      const newList = [];
      result.forEach(
        ({ requestId, message, attachments, senderId, timestamp, _id }) =>{
          newList.push({
            requestId,
            message,
            attachments,
            senderId,
            timestamp,
            senderName: usersNameObj[senderId],
            _id
          }),
        console.log('123');
        
        }
      );

      return {
        header: {
          code: 200,
          status: 'success',
          message: 'Messages',
        },
        data: { images: imageByUserId, messages: newList },
      };
    } else
      return {
        header: {
          code: 401,
          status: 'error',
          message: 'User not allowed to see this messages',
        },
        data: null,
      };
  }
  async getSentMessagesOfRequestId(requestId, userId) {
    const findRequestedEntry = await this.buyerMailModel.findById(requestId);

    if (userId) {
      const result = await this.messagesModel.find({
        requestId,
        senderId: userId,
      });

      const userIds = [];
      const usersObj = {};
      const imageByUserId = {};
      result.forEach((i) => {
        userIds.push(i.senderId);
      });
      const findUsers = await this.userModel.find({ _id: { $in: userIds } });
      for (let x = 0; x < findUsers.length; x++) {
        usersObj[findUsers[x]._id] = findUsers[x].company;
        imageByUserId[findUsers[x]._id] = await this.getSellerOrBuyerLogo(
          findUsers[x]._id,
          findUsers[x].role,
        );
      }

      return {
        header: {
          code: 200,
          status: 'success',
          message: 'Messages',
        },
        data: { images: imageByUserId, messages: result },
      };
    } else
      return {
        header: {
          code: 401,
          status: 'error',
          message: 'User not allowed to see this messages',
        },
        data: null,
      };
  }

  async getAllRequestIds(senderId, paging) {
    let requests = undefined;
    if (paging === 'all') {
      requests = await this.buyerMailModel
        .find({ senderId })
        .sort({ length: -1 });
    } else {
      requests = await this.buyerMailModel
        .find({ senderId })
        .sort({ length: -1 })
        .limit(parseInt(paging));
    }

    const userIds = [];
    const usersObj = {};
    requests.forEach((i) => {
      userIds.push(i.senderId, i.receiverId);
    });
    const findUsers = await this.userModel.find({ _id: { $in: userIds } });
    findUsers.forEach((i) => (usersObj[i._id] = i.company));

    const sellerCompanyProfile = await this.companyDetail.find({
      userId: { $in: userIds },
    });
    const companyDetailObj = {};
    sellerCompanyProfile.forEach(
      (i) => (companyDetailObj[i.userId] = i.companyLogo),
    );

    const productIds = [];
    const productsObj = {};
    const productImages = {};
    requests.forEach((i) => {
      i.product.forEach((product) => productIds.push(product.productId));
    });
    const findProducts = await this.productModel.find({
      _id: { $in: productIds },
    });
    findProducts.forEach((product) => {
      (productsObj[product._id] = product.productName),
        (productImages[product._id] = product.productImage);
    });

    const newList = [];
    requests.forEach((i) => {
      const products = [];
      i.product.forEach((a) =>
        products.push({
          productId: a.productId,
          quantity: a.quantity,
          productName: productsObj[a.productId],
          productImage: productImages[a.productId],
        }),
      );
      newList.push({
        senderId: i.senderId,
        senderName: usersObj[i.senderId],
        receiverId: i.receiverId,
        receiverName: usersObj[i.receiverId],
        receiverLogo: companyDetailObj[i.receiverId],
        products,
        timestamp: i.timestamp,
        _id: i._id,
      });
    });

    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Buyer Requests',
      },
      data: this.modifyArrayAccordingToDate(newList),
    };
  }

  async getAllRequestIdsSeller(receiverId, paging) {
    let requests = undefined;
    if (paging === 'all') {
      requests = await this.buyerMailModel
        .find({ receiverId })
        .sort({ length: -1 });
    } else {
      requests = await this.buyerMailModel
        .find({ receiverId })
        .sort({ length: -1 })
        .limit(parseInt(paging));
    }

    const userIds = [];
    const usersObj = {};
    requests.forEach((i) => {
      userIds.push(i.senderId, i.receiverId);
    });
    const findUsers = await this.userModel.find({ _id: { $in: userIds } });
    findUsers.forEach((i) => (usersObj[i._id] = i.company));

    const productIds = [];
    const productsObj = {};
    requests.forEach((i) => {
      i.product.forEach((product) => productIds.push(product.productId));
    });

    const findProducts = await this.productModel.find({
      _id: { $in: productIds },
    });
    findProducts.forEach(
      (product) => (productsObj[product._id] = product.productName),
    );

    const newList = [];
    requests.forEach((i) => {
      const products = [];
      i.product.forEach((a) =>
        products.push({
          productId: a.productId,
          quantity: a.quantity,
          productImage: a.productImage,
          productName: productsObj[a.productId],
        }),
      );
      newList.push({
        senderId: i.senderId,
        senderName: usersObj[i.senderId],
        receiverId: i.receiverId,
        receiverName: usersObj[i.receiverId],
        products,
        timestamp: i.timestamp,
        _id: i._id,
      });
    });

    return {
      header: {
        code: 200,
        status: 'error',
        message: 'Buyers Requests.',
      },
      data: this.modifyArrayAccordingToDate(newList),
    };
  }

  async readMessage(requestId) {
    await this.buyerMailModel.findOneAndUpdate(
      { _id: requestId },
      { unRead: false },
    );
  }

  async unReadMessage(requestId) {
    await this.buyerMailModel.findOneAndUpdate(
      { _id: requestId },
      { unRead: true },
    );
  }

  modifyArrayAccordingToDate(data) {
    const dates = {};
    data.forEach((i) => {
      if (dates[moment(new Date(i.timestamp)).format('YYYY-MM-DD')]) {
        dates[moment(new Date(i.timestamp)).format('YYYY-MM-DD')].push(i);
      } else {
        dates[moment(new Date(i.timestamp)).format('YYYY-MM-DD')] = [];
        dates[moment(new Date(i.timestamp)).format('YYYY-MM-DD')].push(i);
      }
    });

    const newList = [];
    const entries = Object.entries(dates);
    entries.forEach((i) => newList.push({ date: i[0], data: i[1] }));
    return newList;
  }
}
