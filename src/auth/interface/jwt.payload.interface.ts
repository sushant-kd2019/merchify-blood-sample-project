import { Role } from "../roles.enum";

export interface JwtPayload {
    email: string;
    type: string;
}