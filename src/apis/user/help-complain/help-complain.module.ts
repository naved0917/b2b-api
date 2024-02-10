import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HelpComplainController } from './help-complain.controller';
import { HelpComplainSchema } from './help-complain.schema';
import { HelpComplainService } from './help-complain.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'HelpComplain', schema: HelpComplainSchema },
    ]),
  ],
  providers: [HelpComplainService],
  controllers: [HelpComplainController],
})
export class HelpComplainModule { }
