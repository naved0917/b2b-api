import * as mongoose from 'mongoose';


export interface TypeMasterCountry {
  code: string;
  name: string;
  iso: string;
  dial_code: string;
}

export interface MasterCountry extends TypeMasterCountry, mongoose.Document { }
export const MasterCountrySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  code: { type: String, required: false },
  iso: { type: String, required: false },
  dial_code: { type: String, required: false },
});
