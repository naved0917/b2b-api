import * as mongoose from 'mongoose';

export interface LooseObject {
  [key: string]: any;
}

export interface TypeHelpComplaint {
  userId?: string;
  type: string;
  subject: string;
  description: string;
  file: string;
  timestamp?: Date;
}

export interface HelpComplain extends TypeHelpComplaint, mongoose.Document { }
export const HelpComplainSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  subject: { type: String, required: false },
  description: { type: String, required: false },
  file: { type: String, required: false },
  timestamp: { type: Date, required: true },
});
