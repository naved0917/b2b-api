import * as mongoose from 'mongoose';
export interface LooseObject {
  [key: string]: any;
}

export interface RandD {
  certificateName: string,
  certifiedBy: string,
  businessScope: string,
  certificateIssueDate: string;
  certificateExpiryDate: string;
}

export interface TypeResearchAndDevelopment {
  userId?: string;
  isResearchAndDevelopment: string;
  rnd: RandD[];
  timestamp?: Date;
  isVerify: boolean,
  isPreview: boolean,
}
export interface ResearchAndDevelopment
  extends TypeResearchAndDevelopment,
  mongoose.Document { }

export const ResearchAndDevelopmentSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  isResearchAndDevelopment: { type: String, required: true },
  rnd: { type: Array, required: false },
  timestamp: { type: Date, required: true },
  isVerify: { type: Boolean, required: false },
  isPreview: { type: Boolean, required: false },
});
