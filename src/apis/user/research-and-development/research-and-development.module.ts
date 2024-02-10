import { Module } from '@nestjs/common';
import { ResearchAndDevelopmentService } from './research-and-development.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ResearchAndDevelopmentSchema } from './research-and-development.schema';
import { ResearchAndDevelopmentController } from './research-and-development.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ResearchAndDevelopment', schema: ResearchAndDevelopmentSchema },
    ]),
  ],
  providers: [ResearchAndDevelopmentService],
  controllers: [ResearchAndDevelopmentController],
})
export class ResearchAndDevelopmentModule { }
