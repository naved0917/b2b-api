import { Controller, Post, Query } from '@nestjs/common';
import { ProductSearchService } from './product-search.service';

@Controller('product-search')
export class ProductSearchController {
  constructor(private productService: ProductSearchService) {}

  @Post()
  async searchProduct(
    @Query('search') search: string,
    @Query('categoryId') categoryId: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('moq') moq: string,
    @Query('productType') productType: string,
    @Query('max') max: string,
    @Query('min') min: string,
    @Query('countries') countries: string,
  ) {
    return await this.productService.searchProduct({
      search,
      categoryId,
      page,
      pageSize,
      moq,
      productType,
      max,
      min,
      countries
    });
  }
}
