import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

// cho module khac co the import vao su dung
@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private jwtService:JwtService,
        private configService:ConfigService,
        @InjectRepository(User) private userRepository:Repository<User>,
        private reflector:Reflector
        ){}

    async canActivate(context:ExecutionContext):Promise<boolean>{
        console.log(">> vao AuthGuard >>>>> set user vao request")

        const isPublic = this.reflector.getAllAndOverride<string[]>(`isPublic`,[
            context.getHandler(),
            context.getClass()
        ])

        if(isPublic) return true;

        // console.log(">> is public module: ",isPublic)

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
            
            const user = await this.userRepository.findOneBy({id:payload.id})
            request['user'] = user
            request['user_data'] = payload;
            console.log("Payload: ",payload)
            // console.log(">> User from auth.guard: ",request)
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