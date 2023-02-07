import { BadRequestException, Controller } from '@nestjs/common';
import { Body, Delete, Get, Post, Put, Query } from '@nestjs/common/decorators';
import { BloodSamplesService } from './blood_samples.service';
import { blood_sample_info_dto } from './blood_sample_info.dto';

@Controller('blood_samples')
export class BloodSamplesController {
  constructor(private bloodSamplesService: BloodSamplesService) {}

  @Get("/all")
  async get_all_blood_samples() {
    return await this.bloodSamplesService.get_all_blood_samples();
  }

  @Get()
  async get_blood_sample_info(
    @Query('blood_type') blood_type: string,
    @Query('hospital_id') hospital_id: string,
  ) {
    if (!blood_type)
      throw new BadRequestException('blood_type must be provided.');
    if (!hospital_id)
      throw new BadRequestException('hospital_id must be provided.');

    return await this.bloodSamplesService.get_blood_sample_info({
      blood_type: blood_type,
      hospital_id: hospital_id,
    });
  }

  @Post()
  async add_blood_sample_info(@Body() body: blood_sample_info_dto) {
    if (
      !body.blood_type ||
      !body.hospital_id ||
      body.blood_amount_in_litres === null
    ) {
      throw new BadRequestException(
        'blood_type, hospital_id and blood_amount_in_litres must be provided.',
      );
    }
    return this.bloodSamplesService.add_blood_sample_info(body);
  }

  @Put()
  async update_blood_sample_info(@Body() body: blood_sample_info_dto) {
    if (
        !body.blood_type ||
        !body.hospital_id ||
        body.blood_amount_in_litres == null ||
        !body.old_blood_type
      ) {
        throw new BadRequestException(
          'blood_type, old_blood_type, hospital_id and blood_amount_in_litres must be provided.',
        );
      }
  
    return this.bloodSamplesService.update_blood_sample_info(body);
  }

  @Delete()
  async delete_blood_sample_info(
    @Query('blood_type') blood_type: string,
    @Query('hospital_id') hospital_id: string,
  ) {
    return this.bloodSamplesService.delete_blood_sample_info({
      blood_type: blood_type,
      hospital_id: hospital_id,
    });
  }
}
