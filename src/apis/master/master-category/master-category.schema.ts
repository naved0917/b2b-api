import * as mongoose from 'mongoose';

export interface TypeMasterFilter {
  filter: string;
  fields: string[];
}

export const MasterFilterSchema = new mongoose.Schema({
  filter: { type: String, required: true },
  fields: { type: [String], required: false },
});

export interface LooseObject {
  [key: string]: any;
}

export interface TypeMasterCategory {
  userId?: string;
  name: string;
  icon: string;
  image: string;
  title: string;
  description: string;
  keywords: string[];
  filters: TypeMasterFilter[];
  level: number;
  parentId: string;
  isActivated: boolean;
  timestamp?: Date;
}

export interface MasterCategory extends TypeMasterCategory, mongoose.Document { }
export const MasterCategorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: false },
  image: { type: String, required: false },
  title: { type: String, required: true },
  description: { type: String, required: false },
  keywords: { type: [String], required: false },
  filters: { type: [MasterFilterSchema], required: false },
  level: { type: String, required: false },
  parentId: { type: String, required: false },
  isActivated: { type: Boolean, required: false },
  timestamp: { type: Date, required: true },
});
