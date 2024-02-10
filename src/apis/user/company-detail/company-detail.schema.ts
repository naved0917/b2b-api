import * as mongoose from 'mongoose';

export interface LooseObject {
  [key: string]: any;
}

export interface TypeCompanyDetail {
  userId?: string;
  banners: string[];
  companyLogo: string,
  companyPicture: string[],
  contactPersonAlternateEmail: string,
  companyWebsite: string,
  googleBusiness: string,
  facebookBusiness: string,
  instagramBusiness: string,
  companyPage: string,
  accNumber: string,
  accType: string[],
  accIFSCCode: string,
  accBranch: string,
  accBankName: string,
  accSwiftCode: string,
  companyLanguageSpoken: string[],
  companyVision: string,
  companyDetail: string,
  companyPhilosophy: string,
  companyVideo: string,
  employeeStrength: string,
  attendTradeExpo: string,
  tradeShow: any[],
  contactPerson: any[],
  timestamp?: Date;
  isVerify: boolean,
  isPreview: boolean,
}

export interface CompanyDetail extends TypeCompanyDetail, mongoose.Document { }
export const CompanyDetailSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  banners: { type: Array, required: false, default: [] },
  companyLogo: { type: String, required: false },
  companyPicture: { type: [String], required: false },
  contactPersonAlternateEmail: { type: String, required: true },
  companyWebsite: { type: String, required: true },
  googleBusiness: { type: String, required: true },
  facebookBusiness: { type: String, required: true },
  instagramBusiness: { type: String, required: true },
  companyPage: { type: String, required: true },
  accNumber: { type: String, required: true },
  accType: { type: [String], required: true },
  accIFSCCode: { type: String, required: true },
  accBranch: { type: String, required: true },
  accBankName: { type: String, required: true },
  attendTradeExpo: { type: String, required: true },
  accSwiftCode: { type: String, required: true },
  companyLanguageSpoken: { type: [String], required: true },
  companyVision: { type: String, required: true },
  companyDetail: { type: String, required: true },
  companyPhilosophy: { type: String, required: true },
  companyVideo: { type: String, required: true },
  employeeStrength: { type: String, required: false },
  tradeShow: { type: Array, required: true },
  contactPerson: { type: Array, required: true },
  timestamp: { type: Date, required: true },
  isVerify: { type: Boolean, required: false },
  isPreview: { type: Boolean, required: false },
});
