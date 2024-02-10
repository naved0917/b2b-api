import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/apis/auth/auth.schema';
import { BuyerSchema } from '../buyer-profile/buyer-profile.schema';
import { CompanyDetailSchema } from '../company-detail/company-detail.schema';
import { ProductSchema } from '../product/product.schema';
import { BuyerMailsController } from './buyer-mails.controller';
import { BuyerMails, BuyerMailsSchema } from './buyer-mails.schema';
import { BuyerMailsService } from './buyer-mails.service';
import { Messages, MessagesSchema } from './messages.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: BuyerMails.name, schema: BuyerMailsSchema },
      { name: Messages.name, schema: MessagesSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Auth', schema: AuthSchema },
      { name: 'CompanyDetail', schema: CompanyDetailSchema },
      { name: 'Buyer', schema: BuyerSchema },
    ]),
  ],
  controllers: [BuyerMailsController],
  providers: [BuyerMailsService]
})
export class BuyerMailsModule {}
