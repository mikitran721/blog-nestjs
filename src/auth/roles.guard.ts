// check quyen user khi goi api
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log("Test from RolesGuard")
    // lay role tu @SetMetaData()
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles',[
      context.getHandler(),
      context.getClass()
    ])
    // voi api khong y/c role -> return `true`
    if(!requiredRoles){
      return true;
    }
    console.log(">>> Required role: ",requiredRoles)
    const {user} = context.switchToHttp().getRequest()
    console.log(">> User from Auth.Guard: ",user)
    return requiredRoles.some(role => user.roles.split(',').includes(role))
    // return false;
  }
}