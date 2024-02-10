import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }


  @Post('/add')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async addBlog(
    @Req() request: any,
    @Body('blogId') blogId: string,
    @Body('postName') postName: string,
    @Body('category') category: string[],
    @Body('description') description: string,
    @Body('image') image: string,


  ) {
    return await this.blogService.addBlog({
      userId: request.userId,
      blogId:blogId,
      postName: postName,
      category: category,
      description: description,
      image:image,
      timestamp: new Date(),
    });
  }
  @Get('/getAll')
  async getAllBlog() {

    const blog = await this.blogService.getAllBlog();
    return blog;
  }

  @Get('/:_id')
  async getBlog(@Param('_id') _id: string) {
    return await this.blogService.getBlogOne(_id);
  }
 
  @Get('/get-list/:index/:length/:query')
  async getBlogList(
    @Param('index') index: number,
    @Param('length') length: number,
    @Param('query') query: string,
  ) {
    return await this.blogService.getBlogList(
      index,
      length,
      query,
    );
  }

  @Put('/update')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async updateBlog(
    @Body('_id') _id: string,
    @Body('blogId') blogId: string,
    @Body('postName') postName: string,
    @Body('category') category: string[],
    @Body('description') description: string,
    @Body('image') image: string,

  ) {
    return await this.blogService.updateBlog(_id, {
      blogId:blogId,
      postName: postName,
      category: category,
      description: description,
      image:image,
      timestamp: new Date(),
    });
  }

  @Delete('/delete/:_id')
  @Roles(Role.Admin, Role.Agent, Role.Associate, Role.Buyer, Role.Seller, Role.BuyerSeller)
  async deleteBlog(@Param('_id') _id: string) {
    return await this.blogService.deleteBlog(_id);
  }
}
