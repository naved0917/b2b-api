
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { TradeShowController } from './tradeshow.controller';
// import { TradeShowSchema } from './tradeshow.schema';
// import { TradeshowService } from './tradeshow.service';

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       { name: 'Tradeshow', schema: TradeShowSchema},
//     ]),
//   ],
//   providers: [TradeshowService],
//   controllers: [TradeShowController],
// })
// export class TradeshowModule { }
// 


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeShowController } from './tradeshow.controller';
import { TradeShowSchema } from './tradeshow.schema';
import { TradeshowService } from './tradeshow.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TradeShow', schema: TradeShowSchema },
    ]),
  ],
  providers: [TradeshowService],
  controllers: [TradeShowController],
})
export class TradeshowModule { }
