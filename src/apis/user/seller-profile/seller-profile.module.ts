import { Module } from '@nestjs/common';
import { SellerProfileService } from './seller-profile.service';
import { SellerProfileController } from './seller-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerSchema } from './seller-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Seller', schema: SellerSchema },
    ]),
  ],
  providers: [SellerProfileService],
  controllers: [SellerProfileController],
  exports:[SellerProfileService]
})
export class SellerProfileModule { }
