import * as mongoose from 'mongoose';

export interface LooseObject {
    [key: string]: any;
}

export interface TypeNoticebarObject {
    title: string;
    timestamp?: Date;
}

export interface Noticebar extends TypeNoticebarObject, mongoose.Document { }
export const NoticebarSchema = new mongoose.Schema({
    title: { type: String, required: true },
    timestamp: { type: Date, required: true },
});
