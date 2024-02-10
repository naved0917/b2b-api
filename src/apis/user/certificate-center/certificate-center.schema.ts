import * as mongoose from 'mongoose';

export interface TypeCertificate {
  name: string;
  value: string;
  checked: boolean;
  expirtData: string;
}

export const CertificateSchema = new mongoose.Schema({
  name: { type: String, required: false },
  value: { type: String, required: false },
  checked: { type: Boolean, required: false },
  expirtData: { type: String, required: false },
});

export interface LooseObject {
  [key: string]: any;
}

export interface TypeCertificateCenter {
  userId?: string;
  certificateType: string;
  certificateNumber: string;
  certificateIssuer: string;
  image: string;
  certificates: TypeCertificate[];
  timestamp?: Date;
  isVerify: boolean,
  isPreview: boolean,
  certificateExpiry: string;
}

export interface CertificateCenter
  extends TypeCertificateCenter,
  mongoose.Document { }
  
export const CertificateCenterSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  certificateType: { type: String, required: false },
  certificateNumber: { type: String, required: false },
  certificateIssuer: { type: String, required: false },
  image: { type: String, required: false },
  certificates: { type: [CertificateSchema], required: false },
  timestamp: { type: Date, required: true },
  isVerify: { type: Boolean, required: false },
  isPreview: { type: Boolean, required: false },
  certificateExpiry: { type: String, reuired: false },
});

