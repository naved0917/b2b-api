import { Module } from '@nestjs/common';
import { SellerAdminService } from './seller-admin.service';
import { SellerAdminController } from './seller-admin.controller';
import { SellerAdmin, SellerAdminSchema } from './seller-admin.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    // MailModule,
    MongooseModule.forFeature([{ name: 'SellerAdmin', schema: SellerAdminSchema }]),
  ],
  providers: [SellerAdminService],
  controllers: [SellerAdminController],
})
export class SellerAdminModule {}
