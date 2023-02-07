import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, DateExpression, HydratedDocument } from 'mongoose';
import { Hospital } from 'src/users/schemas/hospital.schema';
import { Reciever } from 'src/users/schemas/reciever.schema';

export type BloodSampleRequestDocument = HydratedDocument<Blood_Sample_Request>;

@Schema({timestamps: true})
export class Blood_Sample_Request {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' })
  hospital_id: Hospital;

  @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Reciever'})
  reciever_id: Reciever;

  @Prop({ required: true })
  blood_type: string;

  @Prop({ required: true })
  blood_amount_in_litres: number;

  @Prop({ required: true, type: mongoose.Schema.Types.Date})
  request_date: Date

}

export const BloodSampleRequestSchema = SchemaFactory.createForClass(Blood_Sample_Request);