import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterCategorySchema } from '../master/master-category/master-category.schema';
import { CompanyProfileSchema } from '../user/company-profile/company-profile.schema';
import { ProductSchema } from '../user/product/product.schema';
import { ProductSearchController } from './product-search.controller';
import { ProductSearchService } from './product-search.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'MasterCategory', schema: MasterCategorySchema }]),
    MongooseModule.forFeature([
      { name: 'CompanyProfile', schema: CompanyProfileSchema },
    ]),
  ],
  controllers: [ProductSearchController],
  providers: [ProductSearchService]
})
export class ProductSearchModule {}
