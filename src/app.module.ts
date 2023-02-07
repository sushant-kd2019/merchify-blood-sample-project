import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BloodSamplesModule } from './blood_samples/blood_samples.module';
import { BloodSampleRequestsModule } from './blood_sample_requests/blood_sample_requests.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://merchify:merchify@merchify.wwen817.mongodb.net/?retryWrites=true&w=majority'),
    UsersModule,
    BloodSamplesModule,
    BloodSampleRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
