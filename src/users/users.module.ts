import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HospitalSchema } from './schemas/hospital.schema';
import { RecieverSchema } from './schemas/reciever.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "Hospital",schema: HospitalSchema}, {name: "Reciever",schema: RecieverSchema}])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
