import { Controller, Get, Query } from '@nestjs/common';
import { SellerSearchService } from './seller-search.service';

@Controller('seller-search')
export class SellerSearchController {
  constructor(private sellerSearchService: SellerSearchService) {}

  @Get('all-details')
  async sellerAllDetails(
    @Query('sellerId') sellerId: string,
  ) {
    return this.sellerSearchService.sellerAllDetails({ sellerId });
  }

  @Get('company-profile-business-type')
  async sellerDetailsCompanyProfileBusinessType(
    @Query('sellerId') sellerId: string,
  ) {
    return this.sellerSearchService.sellerDetailsCompanyProfileBusinessType({ sellerId });
  }

  @Get('id')
  async sellerSearchById(
    @Query('sellerId') sellerId: string,
  ) {
    return this.sellerSearchService.searchById({ sellerId });
  }

  @Get('')
  async sellerSearch(
    @Query('search') search: string,
    @Query('category') category: string,
    @Query('businessType') businessType: string,
    @Query('certification') certification: string,
    @Query('revenue') revenue: string,
    @Query('employeeStrength') employeeStrength: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.sellerSearchService.search({
      search,
      certification,
      revenue,
      category,
      businessType,
      employeeStrength,
      page: Number(page), pageSize: Number(pageSize)
    });
  }
}
