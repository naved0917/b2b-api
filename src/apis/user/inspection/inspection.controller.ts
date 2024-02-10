import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import { InspectionService } from './inspection.service';

@Controller('inspection')
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) { }

  @Post('/add')
  async addInspection(@Body() payload: any) {
    return await this.inspectionService.addInspection(payload);
  }

  @Post('/get')
  async getInspectionById(@Body() payload: any) {
    return await this.inspectionService.getInspection(payload);
  }

  @Post('/update')
  async updateInspection(@Body() payload: any) {
    return await this.inspectionService.updateInspection(payload);
  }
}
