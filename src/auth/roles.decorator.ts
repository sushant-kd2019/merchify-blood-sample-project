import { SetMetadata } from "@nestjs/common";
import { Role } from "./roles.enum";
;

export const Roles = (...roles: string[]) => SetMetadata("roles", roles);