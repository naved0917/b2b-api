import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterFilterSchema } from './master-filter.schema';
import { MasterFilterService } from './master-filter.service';
import { MasterFilterController } from './master-filter.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MasterFilter', schema: MasterFilterSchema },
    ]),
  ],
  providers: [MasterFilterService],
  controllers: [MasterFilterController],
})
export class MasterFilterModule { }
