import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyingInterestSchema } from './buying-interest.schema';
import { BuyingInterestController } from './buying-interest.controller';
import { BuyingInterestService } from './buying-interest.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BuyingInterest', schema: BuyingInterestSchema },
    ]),
  ],
  providers: [BuyingInterestService],
  controllers: [BuyingInterestController],
})
export class BuyingInterestModule { }
