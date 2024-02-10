import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MasterCountrySchema } from './master-country.schema';
import { MasterCountryService } from './master-country.service';
import { MasterCountryController } from './master-country.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MasterCountry', schema: MasterCountrySchema },
    ]),
  ],
  providers: [MasterCountryService],
  controllers: [MasterCountryController],
})
export class MasterCountryModule { }
