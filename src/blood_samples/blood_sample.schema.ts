import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Hospital } from 'src/users/schemas/hospital.schema';

export type BloodSampleDocument = HydratedDocument<Blood_Sample>;

@Schema({timestamps: true})
export class Blood_Sample {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' })
  hospital_id: Hospital;

  @Prop({ required: true })
  blood_type: string;

  @Prop({ required: true })
  blood_amount_in_litres: number;  

}

export const BloodSampleSchema = SchemaFactory.createForClass(Blood_Sample);