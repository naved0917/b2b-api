import * as mongoose from 'mongoose';

export interface LooseObject {
    [key: string]: any;
}

export interface ProfileObject {
    accountType: string;
    agree: boolean;
    companyName: string;
    contactPersonName: string;
    contactPersonSurName: string;
    country: string;
    state: string;
    city: string;
    email: string;
    address: string;
    address2: string;
    address3: string;
    role: string;
    createdDate: string;
    userId: string;
}

export interface Profile extends ProfileObject, mongoose.Document { }
export const ProfileSchema = new mongoose.Schema({
    accountType: { type: String, required: true },
    agree: { type: Boolean, required: true },
    companyName: { type: String, required: true },
    contactPersonName: { type: String, required: true },
    contactPersonSurName: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: true },
    address2: { type: String, required: false },
    address3: { type: String, required: false },
    email: { type: String, required: true },
    role: { type: String, required: true },
    createdDate: { type: String, required: true },
    userId: { type: String, required: true },
});
