import * as mongoose from 'mongoose';

export interface TypeDashboardObject {
}

export interface Dashboard extends TypeDashboardObject, mongoose.Document { }
export const DashboardSchema = new mongoose.Schema({
});
