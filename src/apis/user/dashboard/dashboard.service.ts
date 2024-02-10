import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/apis/auth/auth.schema';
import { Dashboard } from './dashboard.schema';
import { Product } from 'src/apis/user/product/product.schema';
import { Messages, MessagesDocument } from '../buyer-mails/messages.schema';
import { BuyerMails, BuyerMailsDocument } from '../buyer-mails/buyer-mails.schema';

@Injectable()
export class DashboardService {
  saltOrRounds = 10;
  constructor(
    @InjectModel('Dashboard')
    private readonly model: Model<Dashboard>,
    @InjectModel('Auth')
    private readonly authModel: Model<Auth>,
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
    @InjectModel(Messages.name)
    private readonly messagesModel: Model<MessagesDocument>,
    @InjectModel(BuyerMails.name)
    private readonly buyerModel: Model<BuyerMailsDocument>,
  ) { }

  async adminCount() {
    let todayDate = new Date();
    const totalSellerCount = await this.authModel.find({ role: 'seller' }).count();
    const todaySellerCount = await this.authModel.find({ role: 'seller', timestamp: todayDate }).count();
    const totalBuyerCount = await this.authModel.find({ role: 'buyer' }).count();
    const todayBuyerCount = await this.authModel.find({ role: 'buyer', timestamp: todayDate }).count();
    const totalProductCount = await this.productModel.find().count();
    const todayProductCount = await this.productModel.find({ timestamp: todayDate }).count();
    const sellerApprovedByAgent = await this.authModel.find({ role: 'seller', isVerify: true }).count();
    const todaySellerApprovedByAgent = await this.authModel.find({ role: 'seller', isVerify: true, timestamp: todayDate }).count();
    const totalSellerByAssociate = await this.authModel.find({ role: 'seller', assignAssociate: true }).count();
    const todaySellerByAssociate = await this.authModel.find({ role: 'seller', assignAssociate: true, timestamp: todayDate }).count();
    const totalVerifiedSeller = await this.authModel.find({ role: 'seller', isVerified: true }).count();
    const totalVerificationSeller = await this.authModel.find({ role: 'seller', isVerified: false }).count();
    return {
      code: 200,
      status: 'success',
      message: 'Dashboard count loaded successfully',
      data: {
        "totalSeller": totalSellerCount,
        "totalSellerToday": todaySellerCount,
        "totalBuyer": totalBuyerCount,
        "totalBuyerToday": todayBuyerCount,
        "totalProduct": totalProductCount,
        "totalProductToday": todayProductCount,
        "sellerApprovedByAgent": sellerApprovedByAgent,
        "todaySellerApprovedByAgent": todaySellerApprovedByAgent,
        "totalSellerByAssociate": totalSellerByAssociate,
        "todaySellerByAssociate": todaySellerByAssociate,
        "totalVerifiedSeller": totalVerifiedSeller,
        "totalVerificationSeller": totalVerificationSeller
      },
    };
  }

  async sellerCount(payload: any) {
    let todayDate = new Date();
    const totalProduct = await this.productModel.find().count();
    const verifiedProduct = await this.productModel.find({ status: 'Approved' }).count();
    const unVerifiedProduct = await this.productModel.find({ status: 'Pending' }).count();
    const messages = await this.messagesModel.find().count();
    const todayMessages = await this.messagesModel.find({ timestamp: todayDate }).count();
    const unReadMessage = await this.buyerModel.find({ unRead: true }).count();
    const repliedMessage = await this.messagesModel.find({ senderId: payload.sellerId }).count();
    return {
      code: 200,
      status: 'success',
      message: 'Dashboard count loaded successfully',
      data: {
        "totalProduct": totalProduct,
        "verifiedProduct": verifiedProduct,
        "unVerifiedProduct": unVerifiedProduct,
        "conversation": messages,
        "todayConversation": todayMessages,
        "unReadConversation": unReadMessage,
        "repliedMessage": repliedMessage
      }
    }
  }

  async buyerCount() {
    const unReadMessage = await this.buyerModel.find({ unRead: true }).count();
    return {
      code: 200,
      status: 'success',
      message: 'Dashboard count loaded successfully',
      data: {
        "unReadConversation": unReadMessage,
      }
    }
  }
}
