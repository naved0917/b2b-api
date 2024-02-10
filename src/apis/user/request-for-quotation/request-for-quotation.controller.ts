import {
  Controller,
  Body,
  Request,
  Param,
  Post,
  Get,
  Put,
  Delete,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { RequestForQuotationStatus } from './request-for-quotation.schema';
import { RequestForQuotationService } from './request-for-quotation.service';

@Controller('request-quotation')
export class RequestForQuotationController {
  constructor(
    private readonly requestForQuotationService: RequestForQuotationService,
  ) { }

  @Get('/get/user/by-category')
  @UseGuards(JwtAuthGuard)
  async getRequestForQuotationCategory(@Request() req: any, @Query('paging') paging: string) {
    return await this.requestForQuotationService.getRequestForQuotationCategory(
      req.user._id, paging
    );
  }

  @Get('/get/user')
  @UseGuards(JwtAuthGuard)
  async getRequestForQuotationUser(@Request() req: any, @Query('paging') paging: string) {
    return await this.requestForQuotationService.getRequestForQuotationUser(
      req.user._id, paging
    );
  }

  @Post('/add')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async addRequestForQuotation(
    @Req() request: any,
    @Body('lookingFor') lookingFor: string,
    @Body('quantity') quantity: string,
    @Body('pieces') pieces: string,
    @Body('productName') productName: string,
    @Body('productCategory') productCategory: string,
    @Body('unit') unit: string[],
    @Body('sourcingType') sourcingType: string[],
    @Body('sourcingPurpose') sourcingPurpose: string[],
    @Body('budget') budget: string,
    @Body('currency') currency: string[],
    @Body('details') details: string,
    @Body('image') image: string,
    @Body('shipIn') shipIn: string,
    @Body('isCheck') isCheck: boolean,
  ) {
    return await this.requestForQuotationService.addRequestForQuotation({
      userId: request.userId,
      lookingFor: lookingFor,
      quantity: quantity,
      pieces: pieces,
      productName: productName,
      productCategory: productCategory,
      unit: unit,
      sourcingType: sourcingType,
      sourcingPurpose: sourcingPurpose,
      budget: budget,
      currency: currency,
      details: details,
      image: image,
      shipIn: shipIn,
      isCheck: isCheck,
      status: RequestForQuotationStatus.Pending,
      timestamp: new Date(),
    });
  }

  @Get('/get/:_id')
  async getRequestForQuotation(@Param('_id') _id: string) {
    return await this.requestForQuotationService.getRequestForQuotation(_id);
  }

  @Get('/get-list/:index/:length/:query')
  async getRequestForQuotationList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.requestForQuotationService.getRequestForQuotationList(
      index,
      length,
      query,
    );
  }

  @Get()
  async getAll(
    @Query('page') index: number,
    @Query('pageSize') length: number,
    @Query('status') status: string,
    @Query('category') category: string,
    @Query('date') date: string,
  ) {
    return await this.requestForQuotationService.etRequestForQuotationList2(
      index,
      length,
      JSON.stringify({}),
      status,
      category,
      date,
    );
  }

  @Post('updateStatus/all')
  @UseGuards(JwtAuthGuard)
  async updateAllStatus(@Body('status') status: string) {
    return await this.requestForQuotationService.updateBulkStatus(status);
  }

  @Post('updateStatus')
  @UseGuards(JwtAuthGuard)
  async updateStatus(
    @Body() payload: any,
  ) {
    return await this.requestForQuotationService.updateStatus(payload);
  }

  @Put('/update')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async updateRequestForQuotation(
    @Body('_id') _id: string,
    @Body('lookingFor') lookingFor: string,
    @Body('quantity') quantity: string,
    @Body('pieces') pieces: string,
    @Body('productName') productName: string,
    @Body('productCategory') productCategory: string,
    @Body('unit') unit: string[],
    @Body('sourcingType') sourcingType: string[],
    @Body('sourcingPurpose') sourcingPurpose: string[],
    @Body('budget') budget: string,
    @Body('currency') currency: string[],
    @Body('details') details: string,
    @Body('image') image: string,
    @Body('shipIn') shipIn: string,
    @Body('isCheck') isCheck: boolean,
    @Body('status') status: RequestForQuotationStatus,
  ) {
    return await this.requestForQuotationService.updateRequestForQuotation(
      _id,
      {
        lookingFor: lookingFor,
        quantity: quantity,
        pieces: pieces,
        productName: productName,
        productCategory: productCategory,
        unit: unit,
        sourcingType: sourcingType,
        sourcingPurpose: sourcingPurpose,
        budget: budget,
        currency: currency,
        details: details,
        image: image,
        shipIn: shipIn,
        isCheck: isCheck,
        status,
      },
    );
  }

  @Delete('/delete/:_id')
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async deleteRequestForQuotation(@Param('_id') _id: string) {
    return await this.requestForQuotationService.deleteRequestForQuotation(_id);
  }
}
