import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HelpDisputeController } from './help-dipute.controller';
import { HelpDisputeSchema } from './help-dispute.schema';
import { HelpDisputeService } from './help-dispute.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'HelpDispute', schema: HelpDisputeSchema },
    ]),
  ],
  providers: [HelpDisputeService],
  controllers: [HelpDisputeController],
})
export class HelpDisputeModule { }
