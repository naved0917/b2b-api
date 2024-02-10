import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessagesDocument = Messages & Document;

export interface ProductQuantity {
    productId: string;
    quantity: string;
}

@Schema()
export class Messages {
  @Prop({ type: String, required: true })
  requestId: string;

  @Prop({ type: String, required: true})
  message: string;

  @Prop({ type: Array, required: false })
  attachments: string[];
  
  @Prop({ type: String, required: true})
  senderId: string;
  
  @Prop({ type: Date, required: true })
  timestamp: Date;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
