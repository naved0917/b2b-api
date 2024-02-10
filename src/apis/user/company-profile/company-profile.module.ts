import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyProfileSchema } from './company-profile.schema';
import { CompanyProfileService } from './company-profile.service';
import { CompanyProfileController } from './company-profile.controller';
import { MasterCategorySchema } from 'src/apis/master/master-category/master-category.schema';
import { AuthSchema } from 'src/apis/auth/auth.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CompanyProfile', schema: CompanyProfileSchema },
      { name: 'MasterCategory', schema: MasterCategorySchema },
      { name: 'Auth', schema: AuthSchema },
    ]),
  ],
  providers: [CompanyProfileService],
  controllers: [CompanyProfileController],
})
export class CompanyProfileModule { }
