// import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type AssociateDocument = Associate & Document;

// @Schema()
// export class Associate {
//   @Prop()
//   companyName: string = '';
//   @Prop()
//   password: string = '';
//   @Prop()
//   confirmPassword: string = '';
//   @Prop()
//   country: string = '';
//   @Prop()
//   state: string = '';
//   @Prop()
//   city: string = '';
//   @Prop()
//   gstNo: string = '';
//   @Prop()
//   estYear: string = '';
//   @Prop()
//   registrationCertificate: any = [];
//   @Prop()
//   companyWebsite: string = '';
//   @Prop()
//   companyStrength: string = '';
//   @Prop()
//   existingclient: string = '';
//   @Prop()
//   assignedBy: string = '';
//   @Prop()
//   agreementLetter: string = '';
//   @Prop()
//   contactPerson: any = [];
//   @Prop()
//   userId: string = '';
// }

// export const AssociateSchema = SchemaFactory.createForClass(Associate);

import * as mongoose from 'mongoose';

export interface TypeAssociateObject {
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

export interface Associate extends TypeAssociateObject, mongoose.Document {}
export const AssociateSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  country: { type: String, required: false },
  state: { type: String, required: false },
  city: { type: String, required: false },
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
