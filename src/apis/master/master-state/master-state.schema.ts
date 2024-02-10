import * as mongoose from 'mongoose';

export interface LooseObject {
  [key: string]: any;
}

export interface TypeMasterState {
  userId?: string;
  image: string;
  name: string;
  title: string;
  description: string;
  keywords: string[];
  countryId: string;
  isActivated: boolean,
  timestamp?: Date;
}

export interface MasterState extends TypeMasterState, mongoose.Document { }
export const MasterStateSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  image: { type: String, required: false },
  name: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  keywords: { type: [String], required: false },
  countryId: { type: String, required: false },
  isActivated: { type: Boolean, required: false },
  timestamp: { type: Date, required: true },
});
