import * as mongoose from 'mongoose';

export interface LooseObject {
  [key: string]: any;
}

export interface TypeMasterFilter {
  userId?: string;
  filter: string;
  fields: string[];
  timestamp?: Date;
}

export interface MasterFilter extends TypeMasterFilter, mongoose.Document { }
export const MasterFilterSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  filter: { type: String, required: true },
  fields: { type: [String], required: false },
  timestamp: { type: Date, required: true },
});
