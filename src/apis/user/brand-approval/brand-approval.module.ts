import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandApprovalController } from './brand-approval.controller';
import { BrandApprovalSchema } from './brand-approval.schema';
import { BrandApprovalService } from './brand-approval.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BrandApproval', schema: BrandApprovalSchema },
    ]),
  ],
  providers: [BrandApprovalService],
  controllers: [BrandApprovalController],
})
export class BrandApprovalModule { }
