import * as mongoose from 'mongoose';

export interface TypeType {
  name: string;
  value: string;
  checked: boolean;
}

export const TypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
  checked: { type: Boolean, required: false },
});

export interface LooseObject {
  [key: string]: any;
}

export interface TypeSellerType {
  userId?: string;
  types: TypeType[];
  timestamp?: Date;
  isVerify: boolean,
  isPreview: boolean,
}

export interface SellerType extends TypeSellerType, mongoose.Document { }
export const SellerTypeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  types: { type: [TypeSchema], required: false },
  timestamp: { type: Date, required: true },
  isVerify: { type: Boolean, required: false },
  isPreview: { type: Boolean, required: false },
});
