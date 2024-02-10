import * as mongoose from 'mongoose';

export interface LooseObject {
  [key: string]: any;
}

export enum BrandApprovalStatus {
  Approved = 'Approved',
  Reject = 'Reject',
  InProgress = "InProgress",
  Pending = 'Pending'
}

export interface TypeBrandApproval {
  userId?: string;
  brandType: string;
  brandName: string;
  serialNumber: string;
  trademarkOffice: string;
  products: string[];
  image: string;
  status: BrandApprovalStatus;
  timestamp?: Date;
}

export interface BrandApproval extends TypeBrandApproval, mongoose.Document { }
export const BrandApprovalSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  brandType: { type: String, required: false },
  brandName: { type: String, required: false },
  serialNumber: { type: String, required: false },
  trademarkOffice: { type: String, required: false },
  products: { type: [String], required: false },
  image: { type: String, required: false },
  status: { type: String, required: false },
  timestamp: { type: Date, required: true },
});
