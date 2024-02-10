import * as mongoose from 'mongoose';

export interface LooseObject {
    [key: string]: any;
}

export interface TypeBuyerObject {
    userId?: string;
    company: string;
    fName: string;
    lName: string;
    email: string;
    phone: string;
    code: string;
    address: string;
    city: string;
    state: string;
    country: string;
    role: string;
    password: string;
    cpassword: string;
    resetToken: string;
    secretToken: string;
    isPasswordReset: boolean;
    isVerified: boolean;
    isVerify: boolean;
    isPreview: boolean;
    assignAssociate: boolean;
    cataloging: string;
    isApprovedByAdmin: false;
    timestamp?: Date;
}

export interface Buyer extends TypeBuyerObject, mongoose.Document { }
export const BuyerSchema = new mongoose.Schema({
    userId: { type: String, required: false },
    company: { type: String, required: false },
    fName: { type: String, required: false },
    lName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: false },
    role: { type: String, required: false },
    password: { type: String, required: false },
    cpassword: { type: String, require: false },
    resetToken: { type: String, require: false },
    secretToken: { type: String, require: false },
    isPasswordReset: { type: Boolean, require: false },
    isVerified: { type: Boolean, require: false },
    isVerify: { type: Boolean, require: false },
    isPreview: { type: Boolean, require: false },
    assignAssociate: { type: Boolean, require: false },
    cataloging: { type: String, require: false, default: 'pending' },
    isApprovedByAdmin: { type: String, require: false, default: "pending" },
    timestamp: { type: Date, required: false },
});
