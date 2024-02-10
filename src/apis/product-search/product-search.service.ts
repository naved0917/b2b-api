import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MasterCategory } from '../master/master-category/master-category.schema';
import { CompanyProfile } from '../user/company-profile/company-profile.schema';
import { PriceType, Product, ProductStatus } from '../user/product/product.schema';

@Injectable()
export class ProductSearchService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
    @InjectModel('MasterCategory')
    private readonly masterCategory: Model<MasterCategory>,
    @InjectModel('CompanyProfile')
    private readonly companyProfile: Model<CompanyProfile>,
  ) { }

  async searchProduct({
    search,
    categoryId,
    page,
    pageSize,
    moq,
    productType,
    max,
    min,
    countries: queryCountry,
  }) {
    search = search.toLowerCase();
    let products;

    if (!productType || productType.toLowerCase() == 'all')
      products = await this.productModel.find({ status: ProductStatus.Approved });
    if (productType && productType.toLowerCase() == 'overstock')
      products = await this.productModel.find({ productType: 'overstock', status: ProductStatus.Approved });
    if (productType && productType.toLowerCase() == 'customization') {
      products = await this.productModel.find({
        customizationAvailable: 'Yes',
        status: ProductStatus.Approved
      });
    }

    const allCategories = await this.masterCategory.find({});

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

    const searchedCategoryObj = {};
    const allCategoriesObj = {};
    const filteredCategories = {};
    const sellerIds = [];
    searchedProducts.forEach((product) => {
      searchedCategoryObj[product.category] = true;
      sellerIds.push(product.userId);
    });
    allCategories.forEach((i) => {
      allCategoriesObj[i._id] = i;
    });

    const supplierCountries = [];
    const supplierCountriesObj = {};
    const countries = await this.companyProfile.find({
      userId: { $in: sellerIds },
    });
    countries.forEach((i) => {
      supplierCountries.push(i.regCountry);
      supplierCountriesObj[i.userId] = i.regCountry;
    });

    Object.keys(searchedCategoryObj).forEach((cat) => {
      if (allCategoriesObj[cat])
        filteredCategories[cat] = allCategoriesObj[cat];
    });

    if (moq && !isNaN(Number(moq))) {
      searchedProducts = this.filterAccordingToMoq(searchedProducts, moq);
    }

    if (min && !isNaN(Number(min))) {
      searchedProducts = this.filterOutMinPrice(searchedProducts, min);
    }

    if (max && !isNaN(Number(max))) {
      searchedProducts = this.filterOutMaxPrice(searchedProducts, max);
    }

    if (categoryId) {
      searchedProducts = searchedProducts.filter((product) => {
        if (!categoryId || categoryId.length === 0) return true;
        if (product.sellerOwnCategorySelect.join(',').includes(categoryId))
          return true;
      });
    }

    if (queryCountry && queryCountry.includes('-')) {
      // const splitCountries = queryCountry.split('-');
      // const companyProfiles = [];
      // countries.forEach((i)=> i.regCountry == );
      // searchedProducts = this.filterOutCountries(searchedProducts, supplierCountriesObj)
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
        supplierCountries,
      },
    };
  }

  filterAccordingToMoq(products, moq) {
    return products.filter((i) => {
      return isNaN(Number(i.moq)) ? false : Number(i.moq) < Number(moq);
    });
    // return products
  }

  filterOutMaxPrice(products, max) {
    const result = products.filter((product) => {
      if (product.sellingPriceType === PriceType.SetOneFOBPrice) {
        return Number(product.fobPrice) <= max;
      } else {
        const prices = [];
        product.bulkPrice.forEach((i) => prices.push(i.fobUnitPrice));
        const minFob = Math.min(...prices);
        return minFob <= max
      }
    });
    return result;
  }

  filterOutMinPrice(products, min) {
    const result = products.filter((product) => {
      if (product.sellingPriceType === PriceType.SetOneFOBPrice) {
        return Number(product.fobPrice) >= min;
      } else {
        const prices = [];
        product.bulkPrice.forEach((i) => prices.push(i.fobUnitPrice));
        const minFob = Math.min(...prices);
        return minFob >= min
      }
    });
    return result;
  }

  filterOutCountries(products, countriesObj) {
    return products.filter((product) => {
      if (countriesObj[product.userId]) return true;
    });
  }
}
