import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { BloodSampleDocument } from './blood_sample.schema';
import { blood_sample_info_dto } from './blood_sample_info.dto';

@Injectable()
export class BloodSamplesService {
  constructor(
    @InjectModel('Blood_Sample')
    private blood_samples: Model<BloodSampleDocument>,
    private usersService: UsersService,
  ) {}

  async get_all_blood_samples() {
    try {
      return await this.blood_samples.find({});
    } catch (e) {
      throw new InternalServerErrorException('Database error: ' + e.message);
    }
  }

  async add_blood_sample_info(data: blood_sample_info_dto) {
    await this.check_hospital_id(data.hospital_id);
    if (
      await this.check_if_blood_type_exists_in_hospital(
        data.blood_type,
        data.hospital_id,
      )
    ) {
      throw new BadRequestException(
        'Blood type already exists in this hospital. Please use PUT endpoint to update.',
      );
    }

    try {
      await this.blood_samples.create({
        hospital_id: new mongoose.Types.ObjectId(data.hospital_id),
        blood_type: data.blood_type,
        blood_amount_in_litres: data.blood_amount_in_litres,
      });
    } catch (e) {
      throw new InternalServerErrorException('Database error: ' + e.message);
    }
    return { msg: 'blood sample added.' };
  }

  async get_blood_sample_info(data: {
    blood_type: string;
    hospital_id: string;
  }) {
    await this.check_hospital_id(data.hospital_id);

    const info = await this.blood_samples.find({
      hospital_id: new mongoose.Types.ObjectId(data.hospital_id),
      blood_type: data.blood_type,
    });
    if (info.length > 0) return info;
    else
      throw new NotFoundException(
        'No blood samples exist in the given hospital for the given blood type.',
      );
  }

  async update_blood_sample_info(data: blood_sample_info_dto) {
    await this.check_hospital_id(data.hospital_id);
    if (!await this.check_if_blood_type_exists_in_hospital(data.old_blood_type, data.hospital_id))
        throw new NotFoundException("the given pair of hospital and old_blood_type does not exist.")
    try {
      await this.blood_samples.findOneAndUpdate(
        {
          hospital_id: new mongoose.Types.ObjectId(data.hospital_id),
          blood_type: data.old_blood_type,
        },
        {
          hospital_id: new mongoose.Types.ObjectId(data.hospital_id),
          blood_type: data.blood_type,
          blood_amount_in_litres: data.blood_amount_in_litres,
        },
      );
    } catch (e) {
      throw new InternalServerErrorException('Database error: ' + e.message);
    }
    return { msg: 'blood sample updated.' };
  }

  async delete_blood_sample_info(data: {
    blood_type: string;
    hospital_id: string;
  }) {
    await this.check_hospital_id(data.hospital_id);
    await this.check_if_blood_type_exists_in_hospital(
      data.blood_type,
      data.hospital_id,
    );

    await this.blood_samples.findOneAndDelete({
      hospital_id: new mongoose.Types.ObjectId(data.hospital_id),
      blood_type: data.blood_type
    });
  }

  async check_hospital_id(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('hospital_id is invalid.');
    }

    if (!(await this.usersService.checkIfHospitalExistsById(id))) {
      throw new NotFoundException('Hospital with that id does not exist.');
    }
  }

  async check_if_blood_type_exists_in_hospital(
    blood_type: string,
    hospital_id: string,
  ) {
    const blood_samples = await this.blood_samples.find({
      blood_type: blood_type,
      hospital_id: new mongoose.Types.ObjectId(hospital_id),
    });
    return blood_samples.length > 0 ? blood_samples : false;
  }
}
