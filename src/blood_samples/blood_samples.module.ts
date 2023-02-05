import { Module } from '@nestjs/common';
import { BloodSamplesController } from './blood_samples.controller';
import { BloodSamplesService } from './blood_samples.service';

@Module({
  controllers: [BloodSamplesController],
  providers: [BloodSamplesService]
})
export class BloodSamplesModule {}
