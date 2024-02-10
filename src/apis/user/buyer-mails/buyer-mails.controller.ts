import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { ProductQuantity } from './buyer-mails.schema';
import { BuyerMailsService } from './buyer-mails.service';

@Controller('buyer-mails')
export class BuyerMailsController {
  constructor(private buyerMailService: BuyerMailsService) { }

  @Post('create-new-purchase-request')
  @UseGuards(JwtAuthGuard)
  async createPurchaseRequestToSeller(
    @Body('sellerId') sellerId: string,
    @Body('message') message: string,
    @Body('attachments') attachments: string[],
    @Body('product') product: ProductQuantity[],
    @Request() req: any,
  ) {
    const senderId = req.user._id;
    return await this.buyerMailService.insertMessageAndQuantity({
      receiverId: sellerId,
      senderId,
      message,
      attachments,
      product,
    });
  }

  @Post('send-message-for-requestid')
  @UseGuards(JwtAuthGuard)
  async sendMessageToSeller(
    @Body('requestId') requestId: string,
    @Body('message') message: string,
    @Body('attachments') attachments: string[],
    @Request() req: any,
  ) {
    const senderId = req.user._id;
    return await this.buyerMailService.sendMessagesForAnRequestId({
      senderId,
      requestId,
      attachments,
      message,
    });
  }

  @Get('get-requestid-messages')
  @UseGuards(JwtAuthGuard)
  async getAllMessagesOfRequestId(
    @Query('requestId') requestId: string,
    @Request() req: any,
  ) {
    const userId = req.user._id;
    return await this.buyerMailService.getAllMessagesOfRequestId(
      requestId,
      userId,

    );
  }

  @Get('get-requestid-messages-buyer')
  @UseGuards(JwtAuthGuard)
  async getRequestIds(@Request() req: any, @Query('paging') paging: string,) {
    const senderId = req.user._id;
    return await this.buyerMailService.getAllRequestIds(senderId, paging);
  }

  @Get('get-sent-messages')
  @UseGuards(JwtAuthGuard)
  async getSentMessage(@Request() req: any, @Query('requestId') requestId: string) {
    const userId = req.user._id;
    return await this.buyerMailService.getSentMessagesOfRequestId(requestId, userId);
  }

  @Get('get-requestid-messages-seller')
  @UseGuards(JwtAuthGuard)
  async getRequestIdsSeller(@Request() req: any, @Query('paging') pagiing: string) {
    const receiverId = req.user._id;
    return await this.buyerMailService.getAllRequestIdsSeller(receiverId, pagiing);
  }

  @Get('read-message')
  async readMessage(@Query('requestId') requestId: string) {
    return await this.buyerMailService.readMessage(requestId);
  }

  @Get('unread-message')
  async unReadMessage(@Query('requestId') requestId: string) {
    return await this.buyerMailService.unReadMessage(requestId);
  }
}
