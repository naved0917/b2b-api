import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    Blog,
    TypeBlogObject,
  LooseObject,
} from './blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blog') 
    private readonly model: Model<Blog>,
  ) { }

  async addBlog(params: TypeBlogObject) {
    const Blog = new this.model(params);
    const queryResult = await Blog.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Blog Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }
  async getAllBlog() {
    const blog = await this.model.find().exec();
    return blog;
  }


  async getBlogOne(_id) {
    
    const result = await this.model.findOne({ "_id": _id })

    if (result) return result
    else throw new NotFoundException("blog  Not Found .")
}
  async getBlogList(index: number, length: number, query: string) {
    const queryObj = JSON.parse(query);
    const findQuery: LooseObject = {};
    if (findQuery['name'] !== undefined) {
      findQuery.name = { $regex: '.*' + queryObj.name + '.*', $options: 'i' };
    }
    const queryResult = await this.model
      .find(findQuery)
      .limit(length)
      .skip(index)
      .sort({
        name: 'asc',
      })
      .exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Blog List Loaded`,
      },
      data: queryResult,
    };
  }

  async updateBlog(_id: string, params: TypeBlogObject) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Blog ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async deleteBlog(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Blog ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
