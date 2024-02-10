import * as mongoose from 'mongoose';
export interface LooseObject {
    [key: string]: any;
}
export enum RequestForQuotationStatus {
    Approved = 'Approved',
    Reject = 'Rejected',
    InProgress = "In Progress",
    Pending = 'Pending'
}


export interface TypeRequestForQuotation {
    userId?: string;
    lookingFor: string;
    quantity: string;
    pieces: string;
    productName: string;
    productCategory: string;
    unit: string[];
    sourcingType: string[];
    sourcingPurpose: string[];
    budget: string;
    details: string;
    image: string;
    currency: string[];
    shipIn: string;
    isCheck: boolean;
    status: RequestForQuotationStatus;

    timestamp?: Date;
}
export interface RequestForQuotation extends TypeRequestForQuotation, mongoose.Document { }
export const RequestForQuotationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    lookingFor: { type: String, required: false },
    quantity: { type: String, required: false },
    pieces: { type: String, required: false },
    productName: { type: String, required: false },
    budget: { type: String, required: false },
    details: { type: String, required: false },
    productCategory: { type: String, required: false },
    unit: { type: [String], required: false },
    sourcingType: { type: [String], required: false },
    sourcingPurpose: { type: [String], required: false },
    currency: { type: [String], required: false },
    image: { type: String, required: false },
    shipIn: { type: String, required: false },
    isCheck: { type: Boolean, required: false },
    status: { type: String, required: true },

    timestamp: { type: Date, required: true },
});





// RequestForQuotation

// userId?: string;
// lookingFor: string;
// quantity: string;
// pieces: string;
// productName: string;
// productCategory: string[];
// unit: string[];
// sourcingType: string[];
// sourcingPurpose: string[];
// budget: string;
// currency: string;
// details: string;
// image: string;
// shipIn: string;