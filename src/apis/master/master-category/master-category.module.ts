import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterCategorySchema } from './master-category.schema';
import { MasterCategoryService } from './master-category.service';
import { MasterCategoryController } from './master-category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MasterCategory', schema: MasterCategorySchema },
    ]),
  ],
  providers: [MasterCategoryService],
  controllers: [MasterCategoryController],
  exports: [ MasterCategoryService]
})
export class MasterCategoryModule { }
