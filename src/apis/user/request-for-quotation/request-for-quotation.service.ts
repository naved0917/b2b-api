import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/apis/auth/auth.schema';
import { MasterCategory } from 'src/apis/master/master-category/master-category.schema';
import { CompanyProfile } from '../company-profile/company-profile.schema';
import {
  LooseObject,
  RequestForQuotation,
  RequestForQuotationStatus,
  TypeRequestForQuotation,
} from './request-for-quotation.schema';
import * as moment from "moment";

@Injectable()
export class RequestForQuotationService {
  constructor(
    @InjectModel('RequestForQuotation')
    private readonly model: Model<RequestForQuotation>,

    @InjectModel('Auth')
    private readonly userModel: Model<Auth>,

    @InjectModel('MasterCategory')
    private readonly categoryModel: Model<MasterCategory>,

    @InjectModel('CompanyProfile')
    private readonly companyProfileModel: Model<CompanyProfile>,
  ) { }

  categoriesList: any[] = [];
  async getChildrenCategories(parentId) {
    const children = await this.categoryModel.find({ parentId: parentId });

    for (let x = 0; x < children.length; x++) {
      this.categoriesList.push(children);
      await this.getChildrenCategories(children[x]._id);
    }
  }

  async getRequestForQuotationCategory(userId, paging) {
    // const user = await this.userModel.findById(userId);

    this.categoriesList = [];
    const companyProfile = await this.companyProfileModel.findOne({ userId });
    const mainCategory = companyProfile ? companyProfile.mainCategory : null;

    if (mainCategory) {
      await this.getChildrenCategories(mainCategory);
    }

    const ids = new Set();
    this.categoriesList.forEach((i) => {
      i.forEach((b) => ids.add(b._id));
    });

    let rfqs = undefined;
    if (paging === 'all') {
      rfqs = await this.model.find({ productCategory: { $in: [...ids, mainCategory] } }).sort({ length: -1 });
    } else {
      rfqs = await this.model.find({ productCategory: { $in: [...ids, mainCategory] } }).sort({ length: -1 }).limit(parseInt(paging));
    }
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Request Quotation  Loaded`,
      },
      data: rfqs,
    };
  }

  async addRequestForQuotation(params: TypeRequestForQuotation) {
    const rfqType = new this.model(params);
    const queryResult = await rfqType.save();
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Request Quotation Added',
      },
      data: {
        ...params,
        _id: queryResult._id as string,
      },
    };
  }

  async getRequestForQuotation(_id: string) {
    const queryResult = await this.model.findOne({ _id: _id });
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Request Quotation  Loaded`,
      },
      data: queryResult,
    };
  }

  async updateStatus(payload) {
    const findOne = await this.model.updateOne({ _id: payload._id, }, payload);
    // if (findOne && findOne.status !== RequestForQuotationStatus.Approved) {
    //   await this.model.findOneAndUpdate(
    //     { _id, status: 'Pending' },
    //     { $set: { status: status } },
    //   );
    // }
    return {
      code: 200,
      status: 'success',
      message: `Request Quotation Status Updated Successfully.`,
    };
  }

  async updateBulkStatus(status) {
    await this.model.findOneAndUpdate(
      { status: RequestForQuotationStatus.Pending },
      { $set: { status: status } },
    );
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Request Quotation Status.`,
      },
      data: null,
    };
  }

  async getRequestForQuotationUser(userId, paging) {
    let queryResult = undefined;

    if (paging === 'all') {
      queryResult = await this.model.find({ userId }).sort({ length: -1 });
    } else {
      queryResult = await this.model.find({ userId }).sort({ length: -1 }).limit(parseInt(paging));
    }
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Request Quotation  Loaded`,
      },
      data: queryResult,
    };
  }

  async getRequestForQuotationList(
    index: number,
    length: number,
    query: string,
  ) {
    const queryObj = JSON.parse(query);
    const findQuery: LooseObject = {};
    if (queryObj['userId'] !== undefined) {
      findQuery.userId = queryObj.userId;
    }

    const queryResult = await this.model
      .find(findQuery)
      .skip(index)
      .limit(length)
      .sort({
        name: 'asc',
      })
      .exec();
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Request For Quotation  List Loaded`,
      },
      data: queryResult,
    };
  }

  async etRequestForQuotationList2(
    index: number,
    length: number,
    query: string,
    status,
    category,
    date
  ) {
    const users = await this.userModel.find();
    const usersObj = {};
    users.forEach((i) => (usersObj[i._id] = i));

    const categories = await this.categoryModel.find();
    const categoryObj = {};
    categories.forEach((i) => (categoryObj[i._id] = i.name));

    const queryObj = JSON.parse(query);
    let findQuery: LooseObject = {};
    if (category && category.length && category !== 'All')
      findQuery = { productCategory: { $in: [category] } };
    if (status && status !== 'All') findQuery['status'] = status;
    if (queryObj['userId'] !== undefined) {
      findQuery.userId = queryObj.userId;
    }
    const queryResult = await this.model
      .find(findQuery)
      .skip((Number(index) - 1) * length)
      .limit(length)
      .sort({
        name: 'asc',
      })
      .exec();

    const categoryIds = [];
    const categoryObj2 = {};
    queryResult.forEach((i) => {
      if (i.productCategory !== 'others') {
        categoryIds.push(i.productCategory);
      }
    });
    const categoriesResult = await this.categoryModel.find({
      _id: { $in: categoryIds },
    });
    categoriesResult.forEach((i) => (categoryObj2[i._id] = i.name));
    let newList = [];
    queryResult.forEach(
      ({
        _id,
        userId,
        lookingFor,
        quantity,
        pieces,
        productName,
        productCategory,
        unit,
        sourcingType,
        sourcingPurpose,
        budget,
        details,
        image,
        currency,
        shipIn,
        isCheck,
        status,
        timestamp,
      }) => {
        let category = productCategory;
        newList.push({
          _id,
          userId,
          postedBy: usersObj[userId]?.fName + ' ' + usersObj[userId]?.lName,
          lookingFor,
          quantity,
          pieces,
          productName,
          productCategory,
          unit,
          category: category,
          categoryName: categoryObj2[category] || 'others',
          sourcingType,
          sourcingPurpose,
          budget,
          details,
          image,
          currency,
          shipIn,
          isCheck,
          status,
          timestamp,
        });
      },
    );

    if (status && status.length > 0 && status !== 'All' && status !== "") {
      newList = newList.filter((i) => i.status == status)
    }

    if (category && category.length > 0 && category !== 'All' && category !== "") {
      newList = newList.filter((i) => i.productCategory == category)
    }

    if (date && date.length > 0 && date !== 'All' && date !== "") {
      newList = newList.filter((i) => {
        return moment(i.timestamp).format("YYYY-MM-DD") == date
      }
      )
    }



    return {
      header: {
        code: 200,
        status: 'success',
        message: `Request For Quotation  List Loaded`,
      },
      data: newList,
    };
  }

  async updateRequestForQuotation(
    _id: string,
    params: TypeRequestForQuotation,
  ) {
    const queryResult = await this.model.updateOne({ _id: _id }, params);
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Request For Quotation   ${!queryResult ? 'Not ' : ''}Updated`,
      },
      data: {
        _id: _id,
        ...params,
      },
    };
  }
  async deleteRequestForQuotation(_id: string) {
    const queryResult = await this.model.deleteOne({ _id: _id });
    const isDeleted = queryResult.deletedCount !== 0;
    return {
      header: {
        code: 200,
        status: 'success',
        message: `Request For Quotation ${!isDeleted ? 'Not ' : ''}Deleted`,
      },
      data: {
        _id: _id,
      },
    };
  }
}
