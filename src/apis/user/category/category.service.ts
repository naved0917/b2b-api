import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, LooseObject } from './category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private readonly model: Model<Category>,
  ) { }

  async addCategory(payload) {
    const category = new this.model(payload);
    const queryResult = await category.save();
    return {
      code: 200,
      status: 'success',
      message: ' Category Added Successfully.',
      data: {
        _id: queryResult._id as string,
      },
    };
  }

  async getCategory(_id: string) {
    const queryResult = await this.model.findOne({ _id: _id }).exec();
    return {
      code: 200,
      status: 'success',
      message: ` Category Loaded`,
      data: queryResult,
    };
  }

  async getCategoryBySeller(sellerId: string) {
    const queryResult = await this.model.find({ sellerId: sellerId }).exec();
    return {
      code: 200,
      status: 'success',
      message: ` Category Loaded`,
      data: queryResult,
    };
  }

  async getAllCategory(payload: any) {
    let queryResult;
    if (payload.query !== '') {
      queryResult = await this.model.find(payload.query).limit(payload.pageSize).skip(payload.page).sort({ name: 'asc', })
        .exec();
    } else {
      queryResult = await this.model.find().limit(payload.pageSize).skip(payload.page).sort({ name: 'asc', })
        .exec();
    }

    return {
      code: 200,
      status: 'success',
      message: ` Category List Loaded`,
      data: queryResult,
    };
  }

  async deleteCategory(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    return {
      code: 200,
      status: 'success',
      message: ` Category ${!queryResult ? 'Not ' : ''}Deleted`,
      data: {
        _id: _id,
      },
    };
  }

  async updateCategory(payload) {
    const queryResult = await this.model.updateOne({ _id: payload._id }, payload);
    return {
      code: 200,
      status: 'success',
      message: ` Category ${!queryResult ? 'Not ' : ''}Updated`,
      data: {
        _id: payload._id,
      },
    };
  }

  async getSubCategory(parentId: string) {
    const queryResult = await this.model.find({ parentId: parentId });
    return {
      code: 200,
      status: 'success',
      message: `Sub Category List Loaded`,
      data: queryResult,
    };
  }

  async getCategoryList(
    index: number,
    length: number,
    query: string,
    userId: string,
  ) {
    const queryObj = JSON.parse(query);
    const findQuery: LooseObject = { userId };
    if (queryObj['level'] !== undefined) {
      findQuery.level = { $regex: '.*' + queryObj.level + '.*', $options: 'i' };
    }
    if (queryObj['parentId'] !== undefined) {
      findQuery.parentId = {
        $regex: '.*' + queryObj.parentId + '.*',
        $options: 'i',
      };
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
        message: ` Category List Loaded`,
      },
      data: queryResult,
    };
  }

  async getCategoryListWithProductCount(
    index: number,
    length: number,
    query: string,
  ) {
    const queryObj = JSON.parse(query);
    const findQuery: LooseObject = {};
    if (queryObj['level'] !== undefined) {
      findQuery.level = { $regex: '.*' + queryObj.level + '.*', $options: 'i' };
    }
    if (queryObj['parentId'] !== undefined) {
      findQuery.parentId = {
        $regex: '.*' + queryObj.parentId + '.*',
        $options: 'i',
      };
    }
    const queryResult = await this.model
      .find(findQuery)
      .limit(length)
      .skip(index)
      .sort({
        name: 'asc',
      })
      .exec();

    //   const newList = [];
    // for await(let x of queryResult ){
    //   await this.productService.getProductCountByCategory(x._id)
    // }

    return {
      header: {
        code: 200,
        status: 'success',
        message: ` Category List Loaded`,
      },
      data: queryResult,
    };
  }

  async getAllCategoryByUser(userId) {
    const result = await this.model.find({ userId });
    return {
      header: {
        code: 200,
        status: 'success',
        message: ` Category Loaded`,
      },
      data: result
    };
  }

  async getChildren(parentId) {
    const result = await this.model.find({ parentId });
    return result
  }


  includeParents(originalArray, filteredArray, category): any[] {
    const parentId = category ? category.parentId : NaN;
    if (!isNaN(parentId) && Number(category.level) >= 0 && parentId.length !== 0) {
      const find = originalArray.find((category) => category._id == parentId);
      filteredArray.push(find);
      return this.includeParents(originalArray, filteredArray, find);
    } else return filteredArray;
  }

  async getRecent(userId) {
    const queryResult = await this.model
      .find({ userId })
      .sort({ timestamp: -1 });

    let filteredArray = [...queryResult.slice(0, 5)];
    filteredArray.forEach((category) => {
      filteredArray = this.includeParents(queryResult, filteredArray, category);
    });
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Category Loaded`,
      },
      data: {
        searchedCategories: queryResult.slice(0, 1),
        parents: filteredArray,
      },
    };
  }

  async filterCategory(keyword: string) {
    const result = await this.model.find();

    const filter = result.filter((category) => {
      const split = keyword.toLowerCase().split(' ');
      let valid = false;
      split.forEach((catWord) => {
        category.keywords.forEach((key) => {
          if (key.toLowerCase().includes(catWord)) {
            valid = true;
          }
        });
      });
      return valid;
    });

    let filteredArray = [...filter];
    filteredArray.forEach((category) => {
      filteredArray = this.includeParents(result, filteredArray, category);
    });
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Category Loaded`,
      },
      data: { searchedCategories: filter, parents: filteredArray },
    };
  }
}
