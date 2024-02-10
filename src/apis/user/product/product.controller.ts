import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('/updateStatus')
  @UseGuards(JwtAuthGuard)
  async updateStatus(@Body('_id') _id: string, @Body('status') status: string) {
    return await this.productService.updateStatus({ _id, status });
  }


  @Get('/get-counts/:userId')
  @UseGuards(JwtAuthGuard)
  async getProductCounts(@Param('userId') userId: string,   @Req() request: any,
  ) {
    const result = await this.productService.getCounts(userId, request);
    return result;
  }

  @Get('/get-all')
  async getAllProducts(
    @Req() request: any,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    const result = await this.productService.getAll({
      pageSize,
      page,
    });
    return result;
  }

  @Get('/get-seller-all')
  async getAllProductByUser(
    @Req() request: any,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('searchText') searchText: string,
    @Query('userId') userId: string,
  ) {
    let payload = {
      userId: userId,
      pageSize,
      page,
      searchText,
    }
    const result = await this.productService.getAllBySeller(payload);
    return result;
  }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async addProduct(@Req() request: any) {
    const result = await this.productService.addProduct({
      userId: request.user._id,
      ...request.body,
      timestamp: new Date(),
    });
    return result;
  }



  @Get('/get/:_id')
  async getProduct(@Param('_id') _id: string) {
    return await this.productService.getProduct(_id);
  }

  @Get('/get-list/:index/:length/:query')
  async getProductList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.productService.getProductList(index, length, query);
  }

  @Put('/update')
  async updateProduct(
    @Body('_id') _id: string,
    @Body('productName') productName: string,
    @Body('productType') productType: string,
    @Body('productBrand') productBrand: string,
    @Body('productKeywords') productKeywords: string,
    @Body('sellerOwnCategorySelect') sellerOwnCategorySelect: string,
    @Body('sellerOwnCategoryCreate') sellerOwnCategoryCreate: string,
    @Body('placeOfOrigin') placeOfOrigin: string,
    @Body('modelNo') modelNo: string,
    @Body('otherDetails') otherDetails: string,

    @Body('image') image: string,
    @Body('videoLink') videoLink: string,
    @Body('productDescription') productDescription: string,

    @Body('quantity') quantity: string,
    @Body('estLoadTime') estLoadTime: string,
    @Body('shippingPort') shippingPort: string,
    @Body('shippingMode') shippingMode: string,
    @Body('packagingDescription') packagingDescription: string,
    @Body('customisationAvailableYes') customisationAvailableYes: string,
    @Body('customisationAvailableNo') customisationAvailableNo: string,
    @Body('productPrivateLabellingYes') productPrivateLabellingYes: string,
    @Body('productPrivateLabellingNo') productPrivateLabellingNo: string,

    @Body('sellingPrice') sellingPrice: string,
    @Body('unit') unit: string,
    @Body('moq') moq: string,
    @Body('fobUnit') fobUnit: string,
    @Body('fobPriceUnit') fobPriceUnit: string,
    @Body('moqPerUnit') moqPerUnit: string,
    @Body('paymentType') paymentType: string,
    @Body('timestamp') timestamp?: Date,
  ) {
    // return await this.productService.updateProduct(_id, {
    //   image: image,
    //   videoLink: videoLink,
    //   productDescription: productDescription,
    // });
  }

  @Post('/product-verify')
  async updateVerifyProduct(@Body() payload: any) {
    return this.productService.updateVerifyProduct(payload)
  }

  @Delete('/delete/:_id')
  async deleteProduct(@Param('_id') _id: string) {
    return await this.productService.deleteProduct(_id);
  }

  @Get('/seller')
  async searchProductBySeller(
    @Query('search') search: string,
    @Query('sellerId') seller: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('categoryId') categoryId: string,
  ) {
    return await this.productService.searchProductBySeller({
      search,
      seller,
      page,
      pageSize,
      categoryId,
    });
  }

  @Post()
  async searchProduct(
    @Query('search') search: string,
    @Query('categoryId') categoryId: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('moq') moq: string,
  ) {
    return await this.productService.searchProduct({
      search,
      categoryId,
      page,
      pageSize,
      moq,
    });
  }
}
