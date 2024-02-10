import * as mongoose from 'mongoose';

export interface LooseObject {
    [key: string]: any;
}

export interface TypeTradeShowObject {
    userId?: string;
    eventName: string;
    eventType: string;
    category:string[];
    item:string;
    phone: string;
    venue: string;
    country: string;
    state: string;
    city: string;
    fromDate: string;
    toDate: string;
    file:string;
    description:string;
    timestamp?: Date;
}

export interface TradeShow extends TypeTradeShowObject, mongoose.Document { }
export const TradeShowSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    category: { type: [String], required: false },
    item: { type: String, required: false },
    phone: { type: String, required: true },
    venue: { type: String, required: true },
    country: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    fromDate: { type: String, required: false },
    toDate: { type: String, required: false },
    file: { type: String, required: false },
    description: { type: String, required: true },
    timestamp: { type: Date, required: true },
});
