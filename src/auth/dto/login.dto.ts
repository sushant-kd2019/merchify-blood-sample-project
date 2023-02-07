import { Role } from "../roles.enum";


export class LoginUserDto {
    email: string;
    password: string;
    type: string;
}
