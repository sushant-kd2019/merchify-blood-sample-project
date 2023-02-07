import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login.dto';
import { JwtPayload } from './interface/jwt.payload.interface';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ){}
    async validateUserByPassword(loginAttempt: LoginUserDto) {
        let user;
        console.log(loginAttempt);
        if (loginAttempt.type == 'hospital') {
            user = await this.usersService.getHospitalByEmail(loginAttempt.email); 
            // console.log(user)  
        }
        else if (loginAttempt.type == 'reciever'){
            user = await this.usersService.getRecieverByEmail(loginAttempt.email);
        }
        else throw new BadRequestException("The type of user is not recognised.")
        if (user.length==0) {
            throw new NotFoundException("User with that email not found.")
        }
        if (user[0].password == loginAttempt.password) {
            return this.createJwtPayload(user, loginAttempt.type);
        } else throw new UnauthorizedException();

        
    }

    async validateUserByJwt(payload: JwtPayload) { 
        let user;
        if (payload.type == 'hospital') {
            user = await this.usersService.getHospitalByEmail(payload.email);   
        }
        else if (payload.type == 'reciever'){
            user = await this.usersService.getRecieverByEmail(payload.email);
        }

        if(user){
            return this.createJwtPayload(user,payload.type);
        } else {
            throw new UnauthorizedException();
        }

    }

    createJwtPayload(user, type:string){

        let data: JwtPayload = {
            email: user.email,
            type: type
        };

        let jwt = this.jwtService.sign(data);

        return {
            expiresIn: 36000,
            token: jwt            
        }

    }

}
