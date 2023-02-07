import { BadRequestException, Controller } from '@nestjs/common';
import { Body, Get, Post, Query, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { blood_sample_request_dto } from './blood_sample_request.dto';
import { BloodSampleRequestsService } from './blood_sample_requests.service';

@Controller('blood_sample_requests')
export class BloodSampleRequestsController {
  constructor(private bloodSampleRequestService: BloodSampleRequestsService) {}

  @Post()
  @Roles('reciever')
  async createRequest(@Body() body: blood_sample_request_dto) {
    if (
      !body ||
      !body.blood_amount_in_litres ||
      !body.hospital_id ||
      !body.reciever_id
    )
      throw new BadRequestException(
        'blood_amount_in_litres, recipient_id, hospital_id must be present in body.',
      );
    
    return await this.bloodSampleRequestService.request_blood_sample(body);
  }


  @Get()
  @Roles('hospital')
  async getAllRequests(@Query("hospital_id") hospital_id:string, @Query("blood_type") blood_type:string) {
    if (!hospital_id || !blood_type)
        throw new BadRequestException("hospital_id and blood_type must be present in query parameters.")
    
    return await this.bloodSampleRequestService.get_all_requests(hospital_id, blood_type);
  }

}
