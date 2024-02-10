import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterLocationSchema } from './master-location.schema';
import { MasterLocationService } from './master-location.service';
import { MasterLocationController } from './master-location.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MasterLocation', schema: MasterLocationSchema },
    ]),
  ],
  providers: [MasterLocationService],
  controllers: [MasterLocationController],
})
export class MasterLocationModule { }
