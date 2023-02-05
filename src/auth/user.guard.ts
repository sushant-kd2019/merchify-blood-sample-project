import {CanActivate, ExecutionContext, Injectable, SetMetadata} from '@nestjs/common';
import {Reflector} from "@nestjs/core";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || !roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    return roles.some((role) => {
      return role === request.headers.ROLE_HEADER;
    });
  }
}