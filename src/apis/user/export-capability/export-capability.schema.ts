import * as mongoose from 'mongoose';
export interface LooseObject {
  [key: string]: any;
}

export interface TypeExportCapability {
  userId?: string;
  yearlyTurnover: string;
  nearestPort: string;
  exportingScience: string;
  exportingPercent: string;
  percents: string[];
  timestamp?: Date;
  isVerify: boolean,
  isPreview: boolean,
}
export interface ExportCapability
  extends TypeExportCapability,
  mongoose.Document { }
export const ExportCapabilitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  yearlyTurnover: { type: String, required: false },
  nearestPort: { type: String, required: false },
  exportingScience: { type: String, required: false },
  exportingPercent: { type: String, required: false },
  percents: { type: Array, required: false },
  timestamp: { type: Date, required: true },
  isVerify: { type: Boolean, required: false },
  isPreview: { type: Boolean, required: false },
});
