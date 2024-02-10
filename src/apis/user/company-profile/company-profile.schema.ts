import * as mongoose from 'mongoose';
export interface LooseObject {
  [key: string]: any;
}

export interface TypeCompanyProfile {
  userId?: string;
  gstNo: string;
  company: string;
  codeOfIE: string;
  panNo: string;
  estYear: string;
  mainCategory: string;
  mainProduct: string[];
  tanNo: string;
  regAddress: string;
  regCountry: string;
  regState: string;
  email: string;
  division:string;
  regCity: string;
  businessCertificate: string;
  additionalDetail: any[];
  additionalMobile: any[];
  additionalLandline: any[];
  additionalFactoryDetails: string;
  timestamp?: Date;
  isVerify: boolean,
  isPreview: boolean,
}

export interface CompanyProfile extends TypeCompanyProfile, mongoose.Document { }

export const CompanyProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  gstNo: { type: String, required: true },
  company: { type: String, required: true },
  codeOfIE: { type: String, required: true },
  panNo: { type: String, required: true },
  estYear: { type: String, required: true },
  mainCategory: { type: String, required: true },
  mainProduct: { type: [String], required: true },
  tanNo: { type: String, required: true },
  email: { type: String, required: false },
  division: { type: String, required: false },
  regAddress: { type: String, required: true },
  regCountry: { type: String, required: true },
  regState: { type: String, required: false },
  regCity: { type: String, required: false },

  additionalDetail: { type: Array, required: true },
  additionalMobile: { type: Array, required: true },
  additionalLandline: { type: Array, required: true },

  businessCertificate: { type: String, required: false },
  additionalFactoryDetails: { type: String, required: true },

  timestamp: { type: String, required: true },
  isVerify: { type: Boolean, required: false },
  isPreview: { type: Boolean, required: false },
});
