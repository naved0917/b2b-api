import * as mongoose from 'mongoose';

export interface LooseObject {
  [key: string]: any;
}

export interface TypeCategory {
  name: string;
  title: string;
  description: string;
  keywords: string[];
  image: string;
  isChidlren: boolean;
  sellerId: string;
  isActivated: boolean;
  timestamp?: Date;
  parentId: string;
}

export interface Category extends TypeCategory, mongoose.Document { }
export const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  keywords: { type: [String], required: false },
  image: { type: String, required: false },
  isChildren: { type: Boolean, required: true },
  sellerId: { type: String, required: true },
  isActivated: { type: Boolean, required: false },
  timestamp: { type: Date, required: false },
  parentId: { type: String, required: false },
});
