import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoticebarController } from './noticebar.controller';
import { NoticebarSchema } from './noticebar.schema';
import { NoticebarService } from './noticebar.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Noticebar', schema: NoticebarSchema },
    ]),
  ],
  providers: [NoticebarService],
  controllers: [NoticebarController],
})
export class NoticebarModule { }
