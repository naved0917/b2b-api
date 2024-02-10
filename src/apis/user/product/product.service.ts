import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MasterCategoryService } from 'src/apis/master/master-category/master-category.service';
import { MasterCategory } from '../../master/master-category/master-category.schema';
import { Category } from '../category/category.schema';
import { Product, LooseObject, ProductStatus } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly model: Model<Product>,
    @InjectModel('MasterCategory')
    private readonly categoryModel: Model<MasterCategory>,
    @InjectModel('Category')
    private readonly sellerCategoryModel: Model<Category>,
  ) { }

  async getCounts(userId, request) {
    // const result = await this.model.aggregate([
    //   {
    //     $group: {
    //       _id: { status: '$status' },
    //       count: { $sum: 1 },
    //     },
    //   },
    // ]);

    let approvedResult;
    let allResult;
    let allRejected;
    if (request.user.role === 'admin') {
      approvedResult = await this.model.find({ status: 'Approved' }).count();
      allResult = await this.model.count();
      allRejected = await this.model.find({ status: 'Rejected' }).count();
    } else {
      approvedResult = await this.model.find({ userId: userId, status: 'Approved' }).count();
      allResult = await this.model.find({ userId: userId }).count();
      allRejected = await this.model.find({ userId: userId, status: 'Rejected' }).count();
    }

    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Product Counts',
      },
      data: {
        approvedProducts: approvedResult,
        allProducts: allResult,
        allRejected: allRejected,
      },
    };
  }

  async updateStatus({ _id, status }) {
    const findOne = await this.model.findOne({ _id });
    if (findOne && findOne.status !== ProductStatus.Approved) {
      await this.model.findOneAndUpdate({ _id }, { $set: { status } });
    }
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Product Status Updated',
      },
      data: null,
    };
  }

  async getAllBySeller({ pageSize = 10, page = 1, userId, searchText }) {
    let queryResult: any;
    if (searchText === 'Approved') {
      queryResult = await this.model.find({ "userId": userId, "status": searchText }).skip((Number(page) - 1) * pageSize).limit(pageSize);
    } else {
      queryResult = await this.model
        .find({ userId })
        .skip((Number(page) - 1) * pageSize)
        .limit(pageSize);
    }

    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Seller Products',
      },
      data: queryResult,
    };
  }

  async getAll({ pageSize = 100, page = 1 }) {
    const queryResult = await this.model
      .find({})
      .skip((Number(page) - 1) * pageSize)
      .limit(pageSize);

    // const categoriesIds = new Set();
    // queryResult.forEach((i)=> categoriesIds.add(i.seller))

    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Seller Products',
      },
      data: queryResult,
    };
  }

  async searchProductBySeller({ search, seller, page, pageSize, categoryId }) {
    search = search.toLowerCase();

    const products = await this.model.find({ userId: seller });
    let searchedProducts = products.filter((product) => {
      if (search.trim().length === 0) return true;

      if (product.productName.toLowerCase().includes(search)) return true;

      let matched = false;
      product.productKeywords.forEach((keyword) =>
        keyword.toLowerCase().includes(search) ? (matched = true) : null,
      );

      return matched;
    });

    if (categoryId && typeof categoryId == 'string' && categoryId.length > 12) {

      searchedProducts = searchedProducts.filter((product) => {
        product.sellerOwnCategorySelect.find((i) => {
          return i === categoryId;
        });

        return product.sellerOwnCategorySelect.find((i) => i === categoryId);
      });

    }
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Search Results',
      },
      data: {
        products: searchedProducts.slice(
          page * pageSize - pageSize,
          page * pageSize,
        ),
        total: searchedProducts.length,
      },
    };
  }

  async searchProduct({ search, categoryId, page, pageSize, moq }) {
    search = search.toLowerCase();

    const products = await this.model.find();
    const allCategories = await this.categoryModel.find();

    let searchedProducts = products.filter((product) => {
      if (search.trim().length === 0) return true;

      if (product.productName.toLowerCase().includes(search)) return true;

      let matched = false;
      product.productKeywords.forEach((keyword) =>
        keyword.toLowerCase().includes(search) ? (matched = true) : null,
      );
      if (matched) return matched;

      if (
        product.productDescription.toLowerCase().includes(search.toLowerCase())
      )
        return true;
    });

    if (moq) {
      searchedProducts = this.filterAccordingToMoq(searchedProducts, moq);
    }

    const searchedCategoryObj = {};
    const allCategoriesObj = {};
    const filteredCategories = {};

    if (categoryId) {
      searchedProducts.forEach((product) => {
        product.sellerOwnCategorySelect.forEach((i) => {
          searchedCategoryObj[i] = true;
        });
      });

      allCategories.forEach((i) => {
        allCategoriesObj[i._id] = i;
      });

      Object.keys(searchedCategoryObj).forEach((cat) => {
        if (allCategoriesObj[cat])
          filteredCategories[cat] = allCategoriesObj[cat];
      });

      searchedProducts = searchedProducts.filter((product) => {
        if (!categoryId || categoryId.length === 0) return true;
        if (product.sellerOwnCategorySelect.join(',').includes(categoryId))
          return true;
      });
    }

    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Search Results',
      },
      data: {
        products: searchedProducts.slice(
          page * pageSize - pageSize,
          page * pageSize,
        ),
        total: searchedProducts.length,
        categories: Object.values(filteredCategories),
      },
    };
  }

  filterAccordingToMoq(products, moq) {
    return products.filter((i) => {
      return Number(i.moq) > Number(moq);
    });
  }

  async addProduct(params: any) {
    const product = new this.model(params);
    const queryResult = await product.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Product Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getProduct(_id: string) {
    const queryResult = await this.model.find({ _id: _id }).exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Product Loaded`,
      },
      data: queryResult,
    };
  }

  async getProductList(index: number, length: number, query: string) {
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
        message: `Product List Loaded`,
      },
      data: queryResult,
    };
  }

  async getProductCountByCategory(categoryId: string) {
    const result = await this.model.find({}).count();
    return result;
  }

  async updateProduct(_id: string, params: any) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Product ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }

  async updateVerifyProduct(payload: any) {
    const queryResult = await this.model.updateOne({ _id: payload._id }, payload);
    return {
      data: {
        _id: payload._id
      },
      code: 200,
      status: 'success',
      message: `Product ${!queryResult ? 'Not ' : ''}Verified`,
    };
  }

  async deleteProduct(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Product ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
