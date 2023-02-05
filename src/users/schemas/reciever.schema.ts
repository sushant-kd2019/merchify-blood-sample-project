import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RecieverDocument = HydratedDocument<Reciever>;

@Schema()
export class Reciever {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  blood_type: string;

  @Prop({ required: true, default: false })
  eligibility: boolean;

  @Prop({ required: true })
  hashed_password: string;
}

export const CatSchema = SchemaFactory.createForClass(Reciever);