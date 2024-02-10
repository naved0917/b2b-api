import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Put,
  Delete,
  Req,
  Query,
  UseGuards,Request,
} from '@nestjs/common';
import { MasterCategoryService } from './master-category.service';
import { TypeMasterFilter } from './master-category.schema';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guard';

@Controller('master-category')
export class MasterCategoryController {
  constructor(private readonly masterCategoryService: MasterCategoryService) {}

  @Get('get-list/user-parent')
  @UseGuards(JwtAuthGuard)
  async getCategoryListByUserParent(
    @Req() request: any
  ){
    return await this.masterCategoryService.getCategoryListByUserParent(request.user._id)
  }

  @Get()
  async filterMasterCategory(@Query('keyword') keyword: string) {
    const result = await this.masterCategoryService.filterMasterCategory(
      keyword,
    );
    return result;
  }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  @Roles(
    Role.Admin,
    Role.Agent,
    Role.Associate,
    Role.Buyer,
    Role.Seller,
    Role.BuyerSeller,
  )
  async addMasterCategory(
    @Req() request: any,
    @Body('name') name: string,
    @Body('icon') icon: string,
    @Body('image') image: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('keywords') keywords: string[],
    @Body('filters') filters: TypeMasterFilter[],
    @Body('level') level: number,
    @Body('parentId') parentId: string,
    @Body('isActivated') isActivated: boolean,
  ) {
    return await this.masterCategoryService.addMasterCategory({
      userId: request.userId,
      name: name,
      icon: icon,
      image: image,
      title: title,
      description: description,
      keywords: keywords,
      filters: filters,
      level: level,
      parentId: parentId,
      isActivated: isActivated,
      timestamp: new Date(),
    });
  }

  @Get('/get/:_id')
  async getMasterCategory(@Param('_id') _id: string) {
    return await this.masterCategoryService.getMasterCategory(_id);
  }

  @Get('/get-seller/:sellerId')
  async getCategoryBySeller(@Param('sellerId') sellerId: string) {
    return await this.masterCategoryService.getMasterCategoryBySeller(sellerId);
  }

 

  @Get('/get-list/user')
  @UseGuards(JwtAuthGuard)
  async getCategoryListByUser(
    @Req() request: any
  ){
    return await this.masterCategoryService.getAllMasterCategoryByUser(request.user._id)
  }


  @Get('/get-list/:index/:length/:query')
  async getMasterCategoryList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.masterCategoryService.getMasterCategoryList(
      index,
      length,
      query,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-recent')
  async getRecent(@Request() req) {
    return await this.masterCategoryService.getRecent(req.user._id);
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
  async updateMasterCategory(
    @Body('_id') _id: string,
    @Body('name') name: string,
    @Body('icon') icon: string,
    @Body('image') image: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('keywords') keywords: string[],
    @Body('filters') filters: TypeMasterFilter[],
    @Body('level') level: number,
    @Body('parentId') parentId: string,
    @Body('isActivated') isActivated: boolean,
  ) {
    return await this.masterCategoryService.updateMasterCategory(_id, {
      name: name,
      icon: icon,
      image: image,
      title: title,
      description: description,
      keywords: keywords,
      filters: filters,
      level: level,
      parentId: parentId,
      isActivated: isActivated,
    });
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
  async deleteMasterCategory(@Param('_id') _id: string) {
    return await this.masterCategoryService.deleteMasterCategory(_id);
  }
}
