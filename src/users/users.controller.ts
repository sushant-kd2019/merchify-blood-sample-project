import { BadRequestException, Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ){}

    @Post('/register_hospital')
    async register_hospital(@Body() body: {name: string, email: string, password: string}) {
        if (!body.name) throw new BadRequestException('name must be provided')
        if (!body.email) throw new BadRequestException('email must be provided')
        if (!body.password) throw new BadRequestException('password must be provided')

        if (await this.usersService.checkIfHospitalExists(body.email)){
            throw new ConflictException("Hospital with that email Already exists");
        }
        await this.usersService.createHospital(body);
        return {msg: "Hospital created."}
    }

    @Post('/register_reciever')
    async register_reciever(@Body() body: {name: string, email: string, password: string, blood_type:string}) {
        if (!body.name) throw new BadRequestException('name must be provided')
        if (!body.email) throw new BadRequestException('email must be provided')
        if (!body.password) throw new BadRequestException('password must be provided')
        if (!body.blood_type) throw new BadRequestException('blood_type must be provided')

        if (await this.usersService.checkIfHospitalExists(body.email)){
            throw new ConflictException("Reciever with that email Already exists");
        }
        await this.usersService.createReciever(body);
        return {msg: "Reciever created."}
    }


}