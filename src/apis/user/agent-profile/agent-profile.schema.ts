import * as mongoose from 'mongoose';

export interface TypeAgentObject {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  state: string;
  city: string;
  gstNo: string;
  estYear: string;
  registrationCertificate: string[];
  companyWebsite: string;
  companyStrength: string;
  existingclient: string;
  assignedBy: string;
  agreementLetter: string;
  contactPerson: string[];
  isVerified:boolean;
}

export interface Agent extends TypeAgentObject, mongoose.Document {}
export const AgentSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  gstNo: { type: String, required: true },
  estYear: { type: String, required: true },
  registrationCertificate: { type: Array, required: false },
  companyWebsite: { type: String, required: true },
  companyStrength: { type: String, required: true },
  existingclient: { type: String, required: true },
  assignedBy: { type: String, required: true },
  agreementLetter: { type: String, required: false },
  contactPerson: { type: Array, required: true },
  isVerified: { type: Boolean, required: false },
});
