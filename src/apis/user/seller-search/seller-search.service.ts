import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Auth } from 'src/apis/auth/auth.schema';
import { MasterCategory } from 'src/apis/master/master-category/master-category.schema';
import { Category } from '../category/category.schema';
import { CertificateCenter } from '../certificate-center/certificate-center.schema';
import { CompanyDetail } from '../company-detail/company-detail.schema';
import { CompanyProfile } from '../company-profile/company-profile.schema';
import { ExportCapability } from '../export-capability/export-capability.schema';
import { Product } from '../product/product.schema';
import { QualityControl } from '../quality-control/quality-control.schema';
import { ResearchAndDevelopment } from '../research-and-development/research-and-development.schema';
import { SellerType } from '../seller-type/seller-type.schema';

interface SearchQuery {
  category?: string;
  search?: string;
  certification?: string;
  revenue?: string;
  employeeStrength?: string;
  businessType?: string;
  page?: number;
  pageSize: number;
}

@Injectable()
export class SellerSearchService {
  constructor(
    @InjectModel('Auth')
    private readonly authModel: Model<Auth>,
    @InjectModel('CompanyProfile')
    private readonly companyProfileModel: Model<CompanyProfile>,
    @InjectModel('CompanyDetail')
    private readonly companyDetailModel: Model<CompanyDetail>,
    @InjectModel('CertificateCenter')
    private readonly certificationCenterModel: Model<CertificateCenter>,
    @InjectModel('MasterCategory') private readonly categoryModel: Model<MasterCategory>,
    @InjectModel('ExportCapability')
    private readonly exportCapabilityModel: Model<ExportCapability>,
    @InjectModel('SellerType')
    private readonly sellerTypeModel: Model<SellerType>,
    @InjectModel('ResearchAndDevelopment')
    private readonly randdModel: Model<ResearchAndDevelopment>,
    @InjectModel('QualityControl')
    private readonly qualityControlModel: Model<QualityControl>,
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  async sellerAllDetails({ sellerId }){
    const supplier = await this.authModel.findById(sellerId);

    if (supplier) {
      const companyProfile = await this.companyProfileModel.findOne({
        userId: sellerId,
      });
      const companyDetail = await this.companyDetailModel.findOne({
        userId: sellerId,
      });
      const certification = await this.certificationCenterModel.findOne({
        userId: sellerId,
      });
      const exportCapabilities = await this.exportCapabilityModel.findOne({
        userId: sellerId,
      });
      const businessType = await this.sellerTypeModel.findOne({
        userId: sellerId,
      });
      const randd = await this.randdModel.findOne({ userId: sellerId })
      const qualityControl = await this.qualityControlModel.findOne({ userId: sellerId });
      
      
      return {
        header: {
          code: 200,
          status: 'success',
          message: 'Seller Result',
        },
        data: {
          qualityControl,
          randd,
          companyProfile,
          companyDetail,
          certification,
          exportCapabilities,
          businessType,
          sellerDetails: supplier,
        },
      };
    }

    return {
      header: {
        code: 500,
        status: 'success',
        message: 'No Seller Found',
      },
      data: {},
    }; 
  }

  async searchById({ sellerId }) {
    const supplier = await this.authModel.findById(sellerId);

    if (supplier) {
      const products = await this.productModel.find({ userId: sellerId }).count();
      const companyProfile = await this.companyProfileModel.findOne({
        userId: sellerId,
      });
      const companyDetail = await this.companyDetailModel.findOne({
        userId: sellerId,
      });
      const certification = await this.certificationCenterModel.findOne({
        userId: sellerId,
      });
      const exportCapabilities = await this.exportCapabilityModel.findOne({
        userId: sellerId,
      });
      const businessType = await this.sellerTypeModel.findOne({
        userId: sellerId,
      });
      
      let category = null;
      if(companyProfile){
        category = await this.categoryModel.findById(companyProfile.mainCategory);
      }
      delete supplier.password
      delete supplier.cpassword
      return {
        header: {
          code: 200,
          status: 'success',
          message: 'Seller Result',
        },
        data: {
          mainCategory: category,
          companyProfile,
          companyDetail,
          certification,
          exportCapabilities,
          businessType,
          sellerDetails: supplier,
          productCount: products
        },
      };
    }

    return {
      header: {
        code: 500,
        status: 'success',
        message: 'No Seller Found',
      },
      data: {},
    };
  }

  async sellerDetailsCompanyProfileBusinessType({ sellerId }) {
    return await this.searchById({ sellerId })
  }

  async search(props: SearchQuery) {
    const {
      search,
      category: searchedCategory,
      employeeStrength: searchedEmployeeStrength,
      certification: searchedCertification,
      revenue: searchedRevenue,
      businessType: searchedBusinessType,
      page,
      pageSize,
    } = props;
    const searchKeyword = search.toLowerCase();

    const suppliers = await this.authModel.find({ role: 'seller' });
    const companyProfiles = await this.companyProfileModel.find({});
    const companyDetails = await this.companyDetailModel.find({});
    const certifications = await this.certificationCenterModel.find({});
    const exportCapabilities = await this.exportCapabilityModel.find({});
    const businessTypes = await this.sellerTypeModel.find({});

    const mappedSeller = this.mapSellers(suppliers);
    let supplierDetailsById = {};
    let categories = await this.organizeCategoryById();

    mappedSeller.forEach((i) => {
      supplierDetailsById[i._id] = {
        companyProfile: {},
        companyDetail: {},
        certifications: {},
        exportCapabilities: {},
        businessType: {},
        sellerDetails: i,
      };
    });

    let searchedSellers = [];

    const result1 = await this.companyNameCategoryAndProductSearch({
      companyProfiles,
      searchKeyword,
      sellerLength: mappedSeller.length,
      categories,
      supplierDetailsById,
      searchedSellers,
    });
    supplierDetailsById = result1.supplierDetailsById;
    searchedSellers = result1.searchedSellers;

    const result2 = await this.companyDetailIntroductionSearch({
      companyDetails,
      searchKeyword,
      sellerLength: mappedSeller.length,
      supplierDetailsById,
      searchedSellers,
    });
    supplierDetailsById = result2.supplierDetailsById;
    searchedSellers = result2.searchedSellers;

    // final Result Manipulation -> Adding Profile or Details
    searchedSellers = this.addSellerMetaData({
      companyDetails,
      companyProfiles,
      searchedSellers,
      certifications,
      exportCapabilities,
      businessTypes,
    });

    const filteredCategoryList = this.filterCategoryList(
      searchedSellers,
      categories,
    );

    const { revenueList, certificatesList, businessTypeList } =
      this.generateFilterList(searchedSellers);

    if (searchedCategory) {
      searchedSellers = searchedSellers.filter((seller) => {
        if (searchedCategory && searchedCategory.trim().length === 0)
          return true;
        if (seller.companyProfile.mainCategory === searchedCategory)
          return true;
      });
    }
    if (searchedEmployeeStrength) {
      searchedSellers = searchedSellers.filter((seller) => {
        if (
          searchedEmployeeStrength &&
          searchedEmployeeStrength.trim().length === 0
        )
          return true;
        if (seller.companyProfile.mainCategory == searchedEmployeeStrength)
          return true;
      });
    }

    if (searchedCertification) {
      searchedSellers = searchedSellers.filter((seller) => {
        if (searchedCertification && searchedCertification.trim().length === 0)
          return true;
        return Boolean(
          seller.certifications.certificates.find(
            (i) => i.value == searchedCertification,
          ),
        );
        // if (seller.certifications.value == searchedCertification) return true;
      });
    }

    if (searchedRevenue) {
      searchedSellers = searchedSellers.filter((seller) => {
        if (searchedRevenue.trim().length === 0) return true;
        if (seller.exportCapabilities.yearlyTurnover == searchedRevenue)
          return true;
      });
    }

    if (searchedBusinessType) {
      searchedSellers = searchedSellers.filter((seller) => {
        if (searchedBusinessType.trim().length === 0) return true;
        return Boolean(
          seller.businessType.types.find(
            (i) => i.value === searchedBusinessType,
          ),
        );
      });
    }

    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Seller Result',
      },
      data: {
        searchedSellers: searchedSellers.slice(
          page * pageSize - pageSize,
          page * pageSize,
        ),
        categoryList: filteredCategoryList,
        revenueList,
        certificatesList,
        businessTypeList,
        total: searchedSellers.length,
      },
    };
  }

  generateFilterList(searchedSellers) {
    const revenue: any = new Set();
    const certificates = new Set();
    const businessTypes = new Set();

    searchedSellers.forEach((i) => {
      if (i.certifications) {
        i.certifications.certificates.forEach((c) => certificates.add(c.value));
      }

      if (i.exportCapabilities && i.exportCapabilities.yearlyTurnover) {
        revenue.add(i.exportCapabilities.yearlyTurnover);
      }

      if (i.businessType && i.businessType.types) {
        i.businessType.types.forEach((b) => businessTypes.add(b.value));
      }
    });

    return {
      revenueList: [...revenue],
      certificatesList: [...certificates],
      businessTypeList: [...businessTypes],
    };
  }

  filterCategoryList(searchedSellers, categories) {
    const set: any[] = [];

    searchedSellers.forEach((i) => {
      !set.includes(i.companyProfile.mainCategory)
        ? set.push(i.companyProfile.mainCategory)
        : undefined;
    });

    const categoriesObj = [];
    set.forEach((i) => categoriesObj.push(categories[i]));
    return categoriesObj;
  }

  addSellerMetaData(props): any[] {
    let {
      searchedSellers,
      companyDetails,
      companyProfiles,
      certifications,
      exportCapabilities,
      businessTypes,
    } = props;

    const companyDetailsObj = {};
    companyDetails.forEach((i) => (companyDetailsObj[i.userId] = i));

    const companyProfilesObj = {};
    companyProfiles.forEach((i) => (companyProfilesObj[i.userId] = i));

    const certificationsObj = {};
    certifications.forEach((i) => (certificationsObj[i.userId] = i));

    const exportCapabilitiesObj = {};
    exportCapabilities.forEach((i) => {
      return (exportCapabilitiesObj[i.userId] = i);
    });

    const businessTypeObj = {};
    businessTypes.forEach((i) => {
      return (businessTypeObj[i.userId] = i);
    });

    const result = searchedSellers.map((i) => {
      return {
        companyProfile: companyProfilesObj[i.sellerDetails._id],
        companyDetail: companyDetailsObj[i.sellerDetails._id],
        sellerDetails: i.sellerDetails,
        businessType: businessTypeObj[i.sellerDetails._id],
        certifications: certificationsObj[i.sellerDetails._id],
        exportCapabilities: exportCapabilitiesObj[i.sellerDetails._id],
      };
    });
    return result;
  }

  async companyNameCategoryAndProductSearch(props): Promise<any> {
    const {
      companyProfiles,
      supplierDetailsById,
      searchKeyword,
      categories,
      searchedSellers,
    } = props;

    const filteredList = companyProfiles.filter((companyProfile) => {
      if (companyProfile.company.toLowerCase().includes(searchKeyword))
        return true;
      const category = categories[companyProfile.mainCategory];

      let categoryMatched = false;
      if(category) {
        category.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(searchKeyword))
            categoryMatched = true;
        });
      }
      if (categoryMatched) return categoryMatched;
      
      let mainProduct = false;
      companyProfile.mainProduct.forEach((product) => {
        if (product.toLowerCase().includes(searchKeyword)) mainProduct = true;
      });
      if (mainProduct) return mainProduct;
    });

    filteredList.forEach((i) => {
      supplierDetailsById[i.userId].companyProfile = i;
      searchedSellers.push(supplierDetailsById[i.userId]);
    });

    return { supplierDetailsById, searchedSellers };
  }

  async companyDetailIntroductionSearch(props): Promise<any> {
    const {
      companyDetails,
      searchKeyword,
      sellerLength,
      supplierDetailsById,
      searchedSellers,
    } = props;

    const filteredCompanyDetails = companyDetails.filter((i) =>
      i.companyDetail.toLowerCase().includes(searchKeyword),
    );
    filteredCompanyDetails.forEach((i) => {
      supplierDetailsById[i.userId].companyDetail = i;
      searchedSellers.push(supplierDetailsById[i.userId]);
    });

    return { supplierDetailsById, searchedSellers };
  }

  async organizeCategoryById() {
    const result = await this.categoryModel.find({});
    const obj = {};
    result.forEach((i) => (obj[i._id] = i));
    return obj;
  }

  mapSellers(result) {
    return result.map(
      ({ _id, company, fName, lName, city, country, address1, isApprovedByAdmin }) => {
        return {
          _id,
          fName,
          lName,
          city,
          country,
          company,
          address1, isApprovedByAdmin
        };
      },
    );
  }

  // async findSellers(sellers: any[]) {
  //   const result = await this.authModel.find({
  //     _id: {
  //       $in: sellers,
  //     },
  //   });
  //   const mapped = this.mapSellers(result);
  //   return mapped;
  // }

  // async searchCompanyProfileByCategory(category: string) {
  //   const result = await this.companyProfileModel.find({
  //     mainCategory: category,
  //   });

  //   const companyProfileByUserId = {};

  //   const ids = [];
  //   result.forEach((i) => {
  //     companyProfileByUserId[i.userId] = i;
  //     ids.push(i.userId);
  //   });

  //   const filteredSeller = await this.findSellers(ids);
  //   const sellerObj = {};
  //   filteredSeller.forEach((i) => {
  //     sellerObj[i._id] = {
  //       userDetail: i,
  //       companyProfile: companyProfileByUserId[i._id],
  //     };
  //   });

  //   return Object.values(sellerObj);
  // }

  // async sellerSearch(search) {
  //   search = search.toLowerCase();
  //   const result = await this.authModel.find({ role: 'seller' });
  //   const filter = result.filter((i) => {
  //     if (i.fName.toLowerCase().includes(search)) return true;
  //     if (i.company.toLowerCase().includes(search)) return true;
  //   });
  //   const mappedValues = this.mapSellers(filter);
  //   return {
  //     header: {
  //       code: 200,
  //       status: 'success',
  //       message: `Search Result`,
  //     },
  //     data: mappedValues,
  //   };
  // }

  // async findCategoryByKeywords(search, categoryId?: string) {
  //   search = search.toLowerCase();
  //   const categories = await this.categoryModel.find({});

  //   const filteredCategory = categories.filter((i) => {
  //     if (categoryId) {

  //       if (i.name.toLowerCase().includes(search) && i._id === ) return true;

  //       let isPresent = false;
  //       i.keywords.forEach((keyword) =>
  //         keyword.toLowerCase().includes(search) ? (isPresent = true) : null,
  //       );

  //     } else {
  //       if (i.name.toLowerCase().includes(search)) return true;

  //       let isPresent = false;
  //       i.keywords.forEach((keyword) =>
  //         keyword.toLowerCase().includes(search) ? (isPresent = true) : null,
  //       );

  //       return isPresent;
  //     }
  //   });
  // }
}
