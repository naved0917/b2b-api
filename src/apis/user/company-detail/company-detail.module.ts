import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyDetailService } from './company-detail.service';
import { CompanyDetailController } from './company-detail.controller';
import { CompanyDetailSchema } from './company-detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CompanyDetail', schema: CompanyDetailSchema },
    ]),
  ],
  providers: [CompanyDetailService],
  controllers: [CompanyDetailController],
})
export class CompanyDetailModule { }
