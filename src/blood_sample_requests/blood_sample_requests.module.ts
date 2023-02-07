import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { BloodSamplesModule } from 'src/blood_samples/blood_samples.module';
import { UsersModule } from 'src/users/users.module';
import { BloodSampleRequestSchema } from './blood_sample_request.schema';
import { BloodSampleRequestsController } from './blood_sample_requests.controller';
import { BloodSampleRequestsService } from './blood_sample_requests.service';

@Module({
  imports: [
    UsersModule,
    BloodSamplesModule,
    MongooseModule.forFeature([{name: "Blood_Sample_Request",schema: BloodSampleRequestSchema}]),
    AuthModule

  ],
  controllers: [BloodSampleRequestsController],
  providers: [BloodSampleRequestsService]
})
export class BloodSampleRequestsModule {}
