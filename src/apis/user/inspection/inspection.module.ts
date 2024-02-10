import { Module } from '@nestjs/common';
import { InspectionService } from './inspection.service';
import { InspectionController } from './inspection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InspectionSchema } from './inspection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Inspection', schema: InspectionSchema },
    ]),
  ],
  providers: [InspectionService],
  controllers: [InspectionController]
})
export class InspectionModule { }
