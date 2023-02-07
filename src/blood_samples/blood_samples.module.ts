import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { BloodSampleSchema } from './blood_sample.schema';
import { BloodSamplesController } from './blood_samples.controller';
import { BloodSamplesService } from './blood_samples.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: 'Blood_Sample', schema: BloodSampleSchema },
    ]),
  ],
  controllers: [BloodSamplesController],
  providers: [BloodSamplesService],
  exports: [BloodSamplesService]
})
export class BloodSamplesModule {}
