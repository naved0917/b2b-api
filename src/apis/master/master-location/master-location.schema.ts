import * as mongoose from 'mongoose';
export interface TypeMasterLocation {
  name: string;
  state: string;
}

export interface MasterLocation extends TypeMasterLocation, mongoose.Document { }
export const MasterLocationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
});
