import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { HospitalDocument } from './schemas/hospital.schema';
import { RecieverDocument } from './schemas/reciever.schema';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel("Hospital") private hospital: Model<HospitalDocument>,
        @InjectModel("Reciever") private reciever: Model<RecieverDocument>
    ){}

    async createHospital(createHospitalData: {name: string, email:string, password:string }) {
        try{
            const createdHospital = await this.hospital.create(createHospitalData);
        } catch (e) {
            throw new InternalServerErrorException(JSON.stringify(e));
        }
    }

    async checkIfHospitalExists(email:string) {
        const hospitals = await this.hospital.find({email: email});
        return (hospitals.length>0)?true:false;
    }

    async checkIfHospitalExistsById(id:string) {
        const hospitals = await this.hospital.find({_id: new mongoose.Types.ObjectId(id)} );
        return (hospitals.length>0)?true:false;

    }

    async getHospitalByEmail(email:string) {
        return await this.hospital.find({email: email});        
    }

    async createReciever(createHospitalData: {name: string, email:string, password:string, blood_type: string }) {
        try {
            const createdReciever = await this.reciever.create(createHospitalData);
        } catch (e) {
            throw new InternalServerErrorException(JSON.stringify(e));
        }
    }

    async checkIfRecieverExists(email:string) {
        const recievers = await this.reciever.find({email: email});
        return (recievers.length>0)?true:false;
    }

    async getRecieverById(recieverId:string) {
        const reciever = await this.reciever.find({_id: new mongoose.Types.ObjectId(recieverId)});
        return reciever[0];
    }

    async getRecieverByEmail(email: string){
        return await this.reciever.find({email: email});
    }

}
