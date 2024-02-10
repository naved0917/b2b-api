import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QualityControlSchema } from './quality-control.schema';
import { QualityControlController } from './quality-control.controller';
import { QualityControlService } from './quality-control.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'QualityControl', schema: QualityControlSchema },
    ]),
  ],
  providers: [QualityControlService],
  controllers: [QualityControlController],
})
export class QualityControlModule { }
