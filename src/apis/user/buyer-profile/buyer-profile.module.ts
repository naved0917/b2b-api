import { Module } from '@nestjs/common';
import { BuyerProfileService } from './buyer-profile.service';
import { BuyerProfileController } from './buyer-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerSchema } from './buyer-profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Buyer', schema: BuyerSchema },
    ]),
  ],
  providers: [BuyerProfileService],
  controllers: [BuyerProfileController],
  exports: [BuyerProfileService]
})
export class BuyerProfileModule { }
