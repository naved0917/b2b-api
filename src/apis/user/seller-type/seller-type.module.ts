import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerTypeController } from './seller-type.controller';
import { SellerTypeSchema } from './seller-type.schema';
import { SellerTypeService } from './seller-type.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SellerType', schema: SellerTypeSchema },
    ]),
  ],
  providers: [SellerTypeService],
  controllers: [SellerTypeController],
})
export class SellerTypeModule { }
