import * as mongoose from 'mongoose';

export interface TypeAdminAgentObject {
  assignAgent: string;
  assignToAgent: boolean;
  agentId: string;
  city: string;
  company: string;
  country: string;
  email: string;
  isApprovedByAdmin: string;
  isVerified: boolean;
  nameAgent: string;
  password: string;
  phone: string;
  role: string;
  sellerId: string;
  sellerName: string;
  status: string;
  isMail: boolean;
  isVerify: boolean,
  isPreview: boolean,
}

export interface AdminAgent extends TypeAdminAgentObject, mongoose.Document { }
export const AdminAgentSchema = new mongoose.Schema({
  assignAgent: { type: String, required: true },
  assignToAgent: { type: Boolean, required: true },
  agentId: { type: String, required: false },
  city: { type: String, required: true },
  company: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  isApprovedByAdmin: { type: String, required: true },
  isVerified: { type: Boolean, required: true },
  nameAgent: { type: String, required: false },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true },
  status: { type: String, required: true },
  isMail: { type: Boolean, required: true },
  isVerify: { type: Boolean, required: false },
  isPreview: { type: Boolean, required: false },
});
