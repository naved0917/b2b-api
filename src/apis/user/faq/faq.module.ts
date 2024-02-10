import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FaqController } from './faq.controller';
import { FaqSchema } from './faq.schema';
import { FaqService } from './faq.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Faq', schema: FaqSchema },
    ]),
  ],
  providers: [FaqService],
  controllers: [FaqController],
})
export class FaqModule { }
