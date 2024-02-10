import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BuyerMailsDocument = BuyerMails & Document;

export interface ProductQuantity {
    productImage: any;
    productId: string;
    quantity: string;
}

@Schema()
export class BuyerMails {
  @Prop({ type: String, required: true })
  senderId: string;

  @Prop({ type: String, required: true, })
  receiverId: string;

  @Prop({ type: Boolean, required: true, })
  unRead: boolean;
  
  @Prop({ type: Array, required: false, })
  product: ProductQuantity[];

  @Prop({ type: Date, required: true })
  timestamp: Date;
}

export const BuyerMailsSchema = SchemaFactory.createForClass(BuyerMails);
