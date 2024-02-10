import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterStateSchema } from './master-state.schema';
import { MasterStateService } from './master-state.service';
import { MasterStateController } from './master-state.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MasterState', schema: MasterStateSchema },
    ]),
  ],
  providers: [MasterStateService],
  controllers: [MasterStateController],
})
export class MasterStateModule { }
