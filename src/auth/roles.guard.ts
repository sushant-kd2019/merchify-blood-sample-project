import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt.payload.interface';
import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || !roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization)
    return false;

    const base64Payload = request.headers.authorization.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    const decodedJwtAccessToken: JwtPayload = JSON.parse(
      payloadBuffer.toString(),
    ) as JwtPayload;
    return roles.some((role:string) => decodedJwtAccessToken.type==role)
  }
}
