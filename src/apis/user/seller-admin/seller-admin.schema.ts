import * as mongoose from 'mongoose';

export interface TypeSellerAdminObject {
  assignAssociate: string;
  assignToAssociate: boolean;
  associateId: string;
  catelogReuest: string;
  city: string;
  company: string;
  country: string;
  email: string;
  isApprovedByAdmin: string;
  isVerified: boolean;
  nameAssociate: string;
  password: string;
  phone: string;
  role: string;
  sellerId: string;
  sellerName: string;
  status: string;
}

export interface SellerAdmin extends TypeSellerAdminObject, mongoose.Document {}
export const SellerAdminSchema = new mongoose.Schema({
  assignAssociate: { type: String, required: true },
  assignToAssociate: { type: Boolean, required: true },
  associateId: { type: String, required: false },
  catelogReuest: { type: String, required: true },
  city: { type: String, required: true },
  company: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  isApprovedByAdmin: { type: String, required: true },
  isVerified: { type: Boolean, required: true },
  nameAssociate: { type: String, required: false },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true },
  status: { type: String, required: true },
});
