import * as mongoose from 'mongoose';

export interface LooseObject {
    [key: string]: any;
}

export interface TypeFaqObject {
    category: string[];
    question: string;
    description: string;
    timestamp?: Date;
}

export interface Faq extends TypeFaqObject, mongoose.Document { }
export const FaqSchema = new mongoose.Schema({
    category: { type: [String], required: true },
    question: { type: String, required: true },
    description: { type: String, required: false },
    timestamp: { type: Date, required: false },
});
