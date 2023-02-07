import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HospitalDocument = HydratedDocument<Hospital>;

@Schema({timestamps: true})
export class Hospital {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);