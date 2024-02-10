import { Module } from '@nestjs/common';
import { MasterCategoryModule } from './master-category/master-category.module';
import { MasterCountryModule } from './master-country/master-country.module';
import { MasterFilterModule } from './master-filter/master-filter.module';
import { MasterLocationModule } from './master-location/master-location.module';
import { MasterStateModule } from './master-state/master-state.module';

@Module({
  imports: [
    MasterCategoryModule,
    MasterCountryModule,
    MasterFilterModule,
    MasterLocationModule,
    MasterStateModule,
  ],
  exports: [ MasterCategoryModule]
})
export class MasterModule {}
