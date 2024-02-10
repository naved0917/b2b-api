import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/apis/auth/auth.schema';
import { MailModule } from 'src/mail/mail.module';
import { BuyerMails, BuyerMailsSchema } from '../buyer-mails/buyer-mails.schema';
import { Messages, MessagesSchema } from '../buyer-mails/messages.schema';
import { ProductSchema } from '../product/product.schema';
import { DashboardController } from './dashboard.controller';
import { DashboardSchema } from './dashboard.schema';
import { DashboardService } from './dashboard.service';


@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: 'Dashboard', schema: DashboardSchema }]),
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Messages.name, schema: MessagesSchema }]),
    MongooseModule.forFeature([{ name: BuyerMails.name, schema: BuyerMailsSchema },])
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule { }
