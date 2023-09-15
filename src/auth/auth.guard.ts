import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

// cho module khac co the import vao su dung
@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private jwtService:JwtService,
        private configService:ConfigService
        ){}

    async canActivate(context:ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        //token di kem tu phia frontend gui len tu header

        if(!token){
            throw new UnauthorizedException()
        }

        try {
            // verify
            const payload = await this.jwtService.verifyAsync(token,{
                secret:this.configService.get<string>('SECRET_ACCESS_TOKEN'),
            })

            request['user_data'] = payload;
            console.log(payload)
        } catch (error) {
            throw new HttpException({
                status:419,
                message:"Token expired"
            },419);
        }

        return true;
    }

    private extractTokenFromHeader(request:Request):string|undefined{
        const[type,token] = request.headers.authorization ? request.headers.authorization.split(' ') : [];

        return type === 'Bearer' ? token : undefined;
    }
}