import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/apis/auth/auth.schema';
import { MasterCategorySchema } from 'src/apis/master/master-category/master-category.schema';
import { CategorySchema } from '../category/category.schema';
import { CertificateCenterSchema } from '../certificate-center/certificate-center.schema';
import { CompanyDetailSchema } from '../company-detail/company-detail.schema';
import { CompanyProfileSchema } from '../company-profile/company-profile.schema';
import { ExportCapabilitySchema } from '../export-capability/export-capability.schema';
import { ProductSchema } from '../product/product.schema';
import { QualityControlSchema } from '../quality-control/quality-control.schema';
import { ResearchAndDevelopmentSchema } from '../research-and-development/research-and-development.schema';
import { SellerTypeSchema } from '../seller-type/seller-type.schema';
import { SellerSearchController } from './seller-search.controller';
import { SellerSearchService } from './seller-search.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CompanyDetail', schema: CompanyDetailSchema },
      { name: 'MasterCategory', schema: MasterCategorySchema },
      { name: 'CompanyProfile', schema: CompanyProfileSchema },
      { name: 'Auth', schema: AuthSchema },
      { name: 'CertificateCenter', schema: CertificateCenterSchema },
      { name: 'ExportCapability', schema: ExportCapabilitySchema },
      { name: 'SellerType', schema: SellerTypeSchema },
      { name: 'QualityControl', schema: QualityControlSchema },
      { name: 'ResearchAndDevelopment', schema: ResearchAndDevelopmentSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  controllers: [SellerSearchController],
  providers: [SellerSearchService],
})
export class SellerSearchModule { }
