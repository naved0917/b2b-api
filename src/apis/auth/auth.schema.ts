import * as mongoose from 'mongoose';

export interface LooseObject {
  [key: string]: any;
}

export enum IsApprovedByAdmin {
  Pending = 'pending',
  Verified = 'verified',
  Unverified = 'unverified'
}

export interface TypeAuth {
  userId?: string;
  company: string;
  fName: string;
  lName: string;
  email: string;
  phone: string;
  code: string;
  address1: string;
  city: string;
  country: string;
  state: string;
  role: string;
  password: string;
  cpassword: string;
  resetToken: string;
  secretToken: string;
  isPasswordReset: boolean;
  isVerified: boolean;
  isVerify: boolean;
  isPreview: boolean;
  assignAssociate: boolean;
  cataloging: string;
  isApprovedByAdmin: IsApprovedByAdmin;
  timestamp?: Date;
}

export interface Auth extends TypeAuth, mongoose.Document { }
export const AuthSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  company: { type: String, required: false },
  fName: { type: String, required: false },
  lName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: false },
  address1: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: true },
  state: { type: String, required: false },
  role: { type: String, required: true },
  password: { type: String, required: true },
  cpassword: { type: String, require: true },
  resetToken: { type: String, require: true },
  secretToken: { type: String, require: true },
  isPasswordReset: { type: Boolean, require: false },
  isVerified: { type: Boolean, require: false },
  isVerify: { type: Boolean, require: false },
  isPreview: { type: Boolean, require: false },
  assignAssociate: { type: Boolean, require: false },
  cataloging: { type: String, require: false, default: 'pending' },
  isApprovedByAdmin: { type: String, require: false, default: "pending" },
  timestamp: { type: Date, required: true },
});
