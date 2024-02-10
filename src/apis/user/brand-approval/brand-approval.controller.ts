import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Put,
  Delete,
  Req,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { BrandApprovalStatus } from './brand-approval.schema';
import { BrandApprovalService } from './brand-approval.service';

@Controller('brand-approval')
export class BrandApprovalController {
  constructor(private readonly brandApprovalService: BrandApprovalService) { }

  @Get('updateStatus')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async updateStatus(
    @Query('status') status: BrandApprovalStatus,
    @Query('_id') _id: string,
  ){
    return await this.brandApprovalService.updateBrandStatus(status, _id);
  }

  @Get('get-all')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async getAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ){
    return await this.brandApprovalService.getAll({page, pageSize});
  }

  @Post('/add')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async addBrandApproval(
    @Req() request: any,
    @Body('brandType') brandType: string,
    @Body('brandName') brandName: string,
    @Body('serialNumber') serialNumber: string,
    @Body('trademarkOffice') trademarkOffice: string,
    @Body('products') products: string[],
    @Body('image') image: string,
  ) {
    return await this.brandApprovalService.addBrandApproval({
      userId: request.userId,
      brandType: brandType,
      brandName: brandName,
      serialNumber: serialNumber,
      trademarkOffice: trademarkOffice,
      products: products,
      image: image,
      status: BrandApprovalStatus.Pending,
      timestamp: new Date(),
    });
  }

  @Get('/get/:_id')
  async getBrandApproval(@Param('_id') _id: string) {
    return await this.brandApprovalService.getBrandApproval(_id);
  }

  @Get('/get-list/:index/:length/:query')
  @UseGuards(JwtAuthGuard)
  async getBrandApprovalList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
    @Request() req: any
  ) {
    return await this.brandApprovalService.getBrandApprovalList(
      index,
      length,
      query,
      req.user._id
    );
  }

  @Put('/update')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async updateBrandApproval(
    @Body('_id') _id: string,
    @Body('brandType') brandType: string,
    @Body('brandName') brandName: string,
    @Body('serialNumber') serialNumber: string,
    @Body('trademarkOffice') trademarkOffice: string,
    @Body('products') products: string[],
    @Body('image') image: string,
    @Body('status') status: BrandApprovalStatus,
  ) {
    return await this.brandApprovalService.updateBrandApproval(_id, {
      brandType: brandType,
      brandName: brandName,
      serialNumber: serialNumber,
      trademarkOffice: trademarkOffice,
      products: products,
      image: image,
      status: status
    });
  }

  @Delete('/delete/:_id')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async deleteBrandApproval(@Param('_id') _id: string) {
    return await this.brandApprovalService.deleteBrandApproval(_id);
  }
}
