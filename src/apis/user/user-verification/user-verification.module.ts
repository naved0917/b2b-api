import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/apis/auth/auth.schema';
import { BuyerSchema } from '../buyer-profile/buyer-profile.schema';
import { CompanyDetailSchema } from '../company-detail/company-detail.schema';
import { CompanyProfileSchema } from '../company-profile/company-profile.schema';
import { UserVerificationController } from './user-verification.controller';
import { UserVerificationService } from './user-verification.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]),
    MongooseModule.forFeature([
      { name: 'CompanyDetail', schema: CompanyDetailSchema },
      { name: 'CompanyProfile', schema: CompanyProfileSchema },
      { name: 'Buyer', schema: BuyerSchema },
    ]),
  ],
  controllers: [UserVerificationController],
  providers: [UserVerificationService]
})
export class UserVerificationModule {}
