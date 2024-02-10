import * as mongoose from 'mongoose';

export interface TypeBuyingInterest {
  interest: string;
  timestamp?: Date;
}

export interface BuyingInterest extends TypeBuyingInterest, mongoose.Document { }
export const BuyingInterestSchema = new mongoose.Schema({
  interest: { type: String, required: true },
  timestamp: { type: Date, required: true },
});
