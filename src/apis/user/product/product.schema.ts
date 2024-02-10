import * as mongoose from 'mongoose';

export interface LooseObject {
  [key: string]: any;
}

interface PaymentType {
  type: string;
  value: string;
}

interface Shipping {
  quantity: string;
  loadTime: string;
}

interface BulkPrice {
  fobPrice: string;
  moq: string;
  fobUnit: string;
}

export enum ProductStatus {
  Approved = 'Approved',
  Reject = 'Rejected',
  InProgress = "InProgress",
  Pending = 'Pending'
}

export enum PriceType {
  SetOneFOBPrice = 'Set One FOB Price',
  SetUniformPriceofFOB = ' Set Uniform Price of FOB '
}

export interface TypeProduct {
  userId?: string;

  productName: string;
  productType: string;
  productBrand: string[];
  code: string;
  modelNo: string;
  productKeywords: string[];
  sellerOwnCategorySelect: string[];
  sellerOwnCategoryCreate: string;
  placeOfOrigin: string;
  otherDetailInfo: string[];

  productImage: string[];
  productVideoLink: string;
  productDescription: string;

  sellingPriceType: PriceType;
  fobPrice: string;
  moq: string;
  fobUnit: string;
  paymentTypes: PaymentType[];
  bulkPrice?: BulkPrice[]; // not required
  otherDetailTradeInfo: string[];

  shipping: Shipping[];
  shippingPort: string;
  shippingMode: string[];
  customizationAvailable: string;
  productPrivateLabeling: string;
  packagingDescription: string;

  category: string;
  isVerify: Boolean;
  isPreview: Boolean;
  variant: string;
  status: ProductStatus;
  timestamp?: Date;
}

export interface Product extends TypeProduct, mongoose.Document { }

export const ProductSchema = new mongoose.Schema({
  userId: { type: String, required: false },

  productName: { type: String, required: false },
  productType: { type: String, required: false },
  productBrand: { type: Array, required: false },
  code: { type: String, required: false },
  modelNo: { type: String, required: false },
  productKeywords: { type: Array, required: false },
  sellerOwnCategorySelect: { type: Array, required: false },
  sellerOwnCategoryCreate: { type: String, required: false },
  placeOfOrigin: { type: String, required: false },
  otherDetailInfo: { type: Array, required: false },

  productImage: { type: Array, required: false },
  productVideoLink: { type: String, required: false },
  productDescription: { type: String, required: false },

  sellingPriceType: { type: String, required: false },
  fobPrice: { type: String, required: false },
  moq: { type: String, required: false },
  fobUnit: { type: String, required: false },
  paymentTypes: { type: Array, required: false },
  bulkPrice: { type: Array, required: false },
  otherDetailTradeInfo: { type: Array, required: false },

  shipping: { type: Array, required: false },
  shippingPort: { type: String, required: false },
  shippingMode: { type: Array, required: false },
  customizationAvailable: { type: String, required: false },
  productPrivateLabeling: { type: String, required: false },
  packagingDescription: { type: String, required: false },

  variant: { type: String, required: false, default: "" },
  category: { type: String, required: false },
  status: { type: String, required: false, default: "Pending" },
  isVerify: { type: Boolean, required: false },
  isPreview: { type: Boolean, required: false },
  timestamp: { type: Date, required: false },
});
