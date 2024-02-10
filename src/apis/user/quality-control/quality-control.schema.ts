import * as mongoose from 'mongoose';
export interface LooseObject {
  [key: string]: any;
}

export interface QualityControlProcess{
  processName: string;
  processDescription: string;
  image: string;
}

export interface TypeQualityControl {
  userId?: string;
  isQualityControl: string,
  qualityControl: QualityControlProcess[],
  timestamp?: Date;
  isVerify: boolean,
  isPreview: boolean,
}
export interface QualityControl extends TypeQualityControl, mongoose.Document { }
export const QualityControlSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true },
  isQualityControl: { type: String, required: true },
  qualityControl: {type: Array, required: false},
  timestamp: { type: Date, required: true },
  isVerify: { type: Boolean, required: false },
  isPreview: { type: Boolean, required: false },
});
