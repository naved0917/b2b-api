import * as mongoose from 'mongoose';

export interface LooseObject {
    [key: string]: any;
}

export interface InspectionObject {
    option: string;
    description: string;
}

export interface Inspection extends InspectionObject, mongoose.Document { }
export const InspectionSchema = new mongoose.Schema({
    option: { type: String, required: true },
    description: { type: String, required: true },
});
