import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) { }

  @Get('/admin-count')
  async adminCount() {
    return await this.dashboardService.adminCount();
  }

  @Post('/seller-count')
  async sellerCount(@Body() payload: any) {
    return await this.dashboardService.sellerCount(payload);
  }

  @Get('/buyer-count')
  async buyerCount() {
    return await this.dashboardService.buyerCount();
  }
}

