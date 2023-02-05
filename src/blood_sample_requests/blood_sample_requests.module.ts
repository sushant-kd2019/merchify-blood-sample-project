import { Module } from '@nestjs/common';
import { BloodSampleRequestsController } from './blood_sample_requests.controller';
import { BloodSampleRequestsService } from './blood_sample_requests.service';

@Module({
  controllers: [BloodSampleRequestsController],
  providers: [BloodSampleRequestsService]
})
export class BloodSampleRequestsModule {}
