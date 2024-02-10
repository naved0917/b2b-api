import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Post,
  Put,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async filterCategory(@Query('keyword') keyword: string) {
    const result = await this.categoryService.filterCategory(keyword);
    return result;
  }

  @Post('/add')
  async addCategory(@Body() payload: any) {
    return await this.categoryService.addCategory(payload);
  }

  @Get('/get/:_id')
  async getCategory(@Param('_id') _id: string) {
    return await this.categoryService.getCategory(_id);
  }

  @Get('/get-seller/:sellerId')
  async getCategoryBySeller(@Param('sellerId') sellerId: string) {
    return await this.categoryService.getCategoryBySeller(sellerId);
  }

  @Get('/get-all')
  async getAllCategory(@Body() payload: any) {
    return await this.categoryService.getAllCategory(payload);
  }

  @Post('/update')
  async updateCategory(
    @Body() payload: any) {
    return await this.categoryService.updateCategory(payload);
  }

  @Delete('/delete/:_id')
  async deleteCategory(@Param('_id') _id: string) {
    return await this.categoryService.deleteCategory(_id);
  }

  @Get('/get-sub-category/:parentId')
  async getSubCategory(@Param('parentId') parentId: string) {
    return await this.categoryService.getSubCategory(parentId);
  }

  @Get('/get-list/user')
  @UseGuards(JwtAuthGuard)
  async getCategoryListByUser(
    @Req() request: any
  ) {
    return await this.categoryService.getAllCategoryByUser(request.user._id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-list/:index/:length/:query')
  async getCategoryList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
    @Request() req,
  ) {
    return await this.categoryService.getCategoryList(
      index,
      length,
      query,
      req.user._id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-recent')
  async getRecent(@Request() req) {
    return await this.categoryService.getRecent(req.user._id);
  }

}
