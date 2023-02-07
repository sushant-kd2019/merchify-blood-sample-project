import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { BloodSamplesService } from 'src/blood_samples/blood_samples.service';
import { UsersService } from 'src/users/users.service';
import { blood_sample_request_dto } from './blood_sample_request.dto';
import { BloodSampleRequestDocument } from './blood_sample_request.schema';

@Injectable()
export class BloodSampleRequestsService {
    constructor(
        private userService: UsersService,
        private bloodSampleRequestService: BloodSamplesService,
        @InjectModel('Blood_Sample_Request')
        private blood_sample_requests: Model<BloodSampleRequestDocument>,
        ){}

    async request_blood_sample(data: blood_sample_request_dto) {
        await this.bloodSampleRequestService.check_hospital_id(data.hospital_id);
        const reciever = await this.userService.getRecieverById(data.reciever_id);        
        const bloodSamples = await this.bloodSampleRequestService.check_if_blood_type_exists_in_hospital(reciever.blood_type, data.hospital_id);
        if (!bloodSamples)
            throw new NotFoundException("The given blood type does not exist in the given hospital.");
                
        const max_blood_amount = Number(bloodSamples[0].blood_amount_in_litres);
        if (Number(data.blood_amount_in_litres)>Number(max_blood_amount))
            throw new BadRequestException("There isn't enough blood in the hospital.")

        await this.blood_sample_requests.create({
            hospital_id: new mongoose.Types.ObjectId(data.hospital_id),
            reciever_id: new mongoose.Types.ObjectId(data.reciever_id),
            blood_type: reciever.blood_type,
            blood_amount_in_litres: Number(data.blood_amount_in_litres),
            request_date: new Date()
        })

        return {msg: "Blood sample request created."}
    }

    async get_all_requests(hospital_id: string, blood_type: string) {
        await this.bloodSampleRequestService.check_hospital_id(hospital_id);
        return await this.blood_sample_requests.find({
            hospital_id: new mongoose.Types.ObjectId(hospital_id),
            blood_type: blood_type
        })
    }

}
