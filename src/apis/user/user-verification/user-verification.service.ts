import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, IsApprovedByAdmin } from 'src/apis/auth/auth.schema';
import { Buyer } from '../buyer-profile/buyer-profile.schema';
import { CompanyDetail } from '../company-detail/company-detail.schema';
import { CompanyProfile } from '../company-profile/company-profile.schema';

@Injectable()
export class UserVerificationService {
  constructor(
    @InjectModel('Auth')
    private readonly userModel: Model<Auth>,
    @InjectModel('CompanyDetail')
    private readonly companyDetailModel: Model<CompanyDetail>,
    @InjectModel('CompanyProfile')
    private readonly companyProfileModel: Model<CompanyProfile>,
    @InjectModel('Buyer')
    private readonly buyerProfile: Model<Buyer>,
  ) {}

  async approveReject(userId, status) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { isApprovedByAdmin: status },
    );
    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Buyer or Seller ' + status,
      },
      data: 'Status Updated',
    };
  }

  async getSellerAndBuyers({
    country,
    state,
    city,
    status: queryStatus,
    page,
    pageSize,
  }) {
    const result = await this.userModel.find({
      $or: [{ role: { $in: ['buyer', 'seller', 'buyer-seller'] } }],
    });
    const companyDetails = await this.companyDetailModel.find({});
    const companyDetailByUserId = {};

    const companyProfiles = await this.companyProfileModel.find({});
    const companyProfilesByUserId = {};

    companyDetails.forEach(
      (i) => (companyDetailByUserId[i.userId] = i.companyLogo),
    );
    companyProfiles.forEach(
      (i) => (companyProfilesByUserId[i.userId] = i.company),
    );

    const countrySet = new Set();
    const stateSet = new Set();
    const citySet = new Set();
    const status = [
      IsApprovedByAdmin.Pending,
      IsApprovedByAdmin.Verified,
      IsApprovedByAdmin.Unverified,
    ];

    result.forEach((i) => {
      countrySet.add(i.country);
      citySet.add(i.city);
    });

    let newList = [];
    result.forEach(
      ({
        company,
        fName,
        lName,
        email,
        phone,
        code,
        address1,
        city,
        country,
        role,
        timestamp,
        userId,
        _id,
        isApprovedByAdmin,
      }) =>
        newList.push({
          logo: companyDetailByUserId[_id],
          company,
          _id,
          name: fName + ' ' + lName,
          email,
          phone,
          code,
          address1,
          city,
          country,
          role,
          timestamp,
          isApprovedByAdmin,
        }),
    );
    if(country && country.length > 0 && country != 'undefined'){
      newList = newList.filter((i)=> i.country?.toLowerCase() == country?.toLowerCase())
    }
    if(queryStatus && queryStatus.length > 0 && queryStatus != 'undefined'){
      newList = newList.filter((i)=> i.isApprovedByAdmin?.toLowerCase() == queryStatus?.toLowerCase())
    }
    if(state && state.length > 0){
      // newList = newList.filter((i)=> i.state.toLowerCase() == state)
    }
    if(city && city.length > 0 && city != 'undefined'){
      newList = newList.filter((i)=> i.city?.toLowerCase() == city?.toLowerCase())
    }

    return {
      header: {
        code: 200,
        status: 'success',
        message: 'Buyers and Sellers',
      },
      data: {
        users: newList.slice(
          (Number(page) - 1) * Number(pageSize),
          Number(page) * Number(pageSize) + 1,
        ),
        country: [...countrySet],
        state: [...stateSet],
        city: [...citySet],
        status: status,
        total: newList.length
      },
    };
  }

  async getBuyerProfileById({ userId }) {
    const buyer = await this.userModel.findOne({ _id: userId });
    const buyerProfile = await this.buyerProfile.findOne({ userId });

    const obj = {};
    obj['_id'] = buyer?._id;
    obj['company'] = buyer?.company;
    obj['fName'] = buyer?.fName;
    obj['lName'] = buyer?.lName;
    obj['email'] = buyer?.email;
    obj['phone'] = buyer?.phone;
    obj['code'] = buyer?.code;
    obj['address1'] = buyer?.address1;
    obj['city'] = buyer?.city;
    obj['country'] = buyer?.country;
    obj['role'] = buyer?.role;
    obj['isApprovedByAdmin'] = buyer?.isApprovedByAdmin;

    if (buyer && buyerProfile) {
      return {
        header: {
          code: 200,
          status: 'success',
          message: 'Buyer Profile',
        },
        data: { buyer: obj, buyerProfile },
      };
    }

    return {
      header: {
        code: 400,
        status: 'error',
        message: 'Buyer Profile',
      },
      data: null,
    };
  }
}
