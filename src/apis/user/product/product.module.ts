import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterCategorySchema } from 'src/apis/master/master-category/master-category.schema';
import { CategorySchema } from '../category/category.schema';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.schema';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'MasterCategory', schema: MasterCategorySchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
