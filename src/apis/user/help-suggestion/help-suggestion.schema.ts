import * as mongoose from 'mongoose';

export interface LooseObject {
  [key: string]: any;
}

export interface TypeHelpSuggestion {
  userId?: string;
  type: string;
  subject: string;
  description: string;
  file: string;
  link: string;
  timestamp?: Date;
}

export interface HelpSuggestion extends TypeHelpSuggestion, mongoose.Document { }
export const HelpSuggestionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  subject: { type: String, required: false },
  description: { type: String, required: false },
  file: { type: String, required: false },
  link: { type: String, required: false },
  timestamp: { type: Date, required: true },
});
