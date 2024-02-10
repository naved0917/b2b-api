import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MasterCategory,
  TypeMasterCategory,
  LooseObject,
} from './master-category.schema';

@Injectable()
export class MasterCategoryService {
  constructor(
    @InjectModel('MasterCategory')
    private readonly model: Model<MasterCategory>,
  ) {}

  async addMasterCategory(params: TypeMasterCategory) {
    params.keywords = params.keywords.map((str) => str.toLowerCase());
    const masterCategory = new this.model(params);
    const queryResult = await masterCategory.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Master Category Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getMasterCategory(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Category Loaded`,
      },
      data: queryResult,
    };
  }

  async getMasterCategoryBySeller(sellerId: string) {
    const queryResult = await this.model.find({ userId: sellerId }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: ` Category Loaded`,
      },
      data: queryResult,
    };
  }

  async getMasterCategoryList(index: number, length: number, query: string) {
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
    try {
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
          message: `Master Category List Loaded`,
        },
        data: queryResult,
      };
    } catch (error) {
      return {
        header: {
          code: 200,
          status: 'success',
          message: `Master Category List Loaded`,
        },
        data: [],
      };
    }
  }

  async updateMasterCategory(_id: string, params: TypeMasterCategory) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Master Category ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async getAllMasterCategoryByUser(userId) {
    const result = await this.model.find({ userId });
    return {
      header: {
        code: 200,
        status: 'success',
        message: ` Category Loaded`,
      },
      data: result,
    };
  }

  async getCategoryListByUserParent(userId) {
    const result = await this.model.find({ userId, level: "0" });
    return {
      header: {
        code: 200,
        status: 'success',
        message: ` Category Loaded`,
      },
      data: result,
    };
  }

  async getChildren(parentId) {
    const result = await this.model.find({ parentId });
    return result;
  }

  async deleteMasterCategory(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });

    const children = await this.getChildren(_id);
    children.forEach(async (i) => await this.deleteMasterCategory(i._id));

    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: ` Category ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }

  includeParents(originalArray, filteredArray, category): any[] {
    const parentId = category.parentId;
    if (Number(category.level) >= 0 && parentId.length !== 0) {
      const find = originalArray.find((category) => category._id == parentId);
      filteredArray.push(find);
      return this.includeParents(originalArray, filteredArray, find);
    } else return filteredArray;
  }

  async getRecent(userId) {
    const queryResult = await this.model.find({}).sort({ timestamp: -1 });

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

  async filterMasterCategory(keyword: string) {
    const result = await this.model.find();

    const filter = await this.model.find(
      { keywords: keyword },
    );
    // const filter = result.filter((category) => {
    //   const split = keyword.toLowerCase().split(' ');
    //   let valid = false;
    //   split.forEach((catWord:any) => {
    //     category.keywords.forEach((keyword)=>{
    //       if (keyword.toLowerCase().includes(catWord.toLowerCase())) {
    //         valid = true;
    //       }
    //     })
    //   });
    //   return valid;
    // });

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
