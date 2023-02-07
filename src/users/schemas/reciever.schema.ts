import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecieverDocument = HydratedDocument<Reciever>;

@Schema({timestamps: true})
export class Reciever {
  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  blood_type: string;
}

export const RecieverSchema = SchemaFactory.createForClass(Reciever);