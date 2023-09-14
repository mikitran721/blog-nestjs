import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        private jwtService:JwtService,
        private configService:ConfigService
    ){}
    // thuc hien logic

    async register(registerUserDto:RegisterUserDto):Promise<User>{
        const hashPassword = await this.hashPassword(registerUserDto.password);
        return await this.userRepository.save({...registerUserDto, refresh_token:"refresh_token_string", password:hashPassword})
    }

        // function login vs mysql
    async login(loginUserDto:LoginUserDto):Promise<any>{
        const user = await this.userRepository.findOne({
            where:{email:loginUserDto.email}
        })
        if(!user){
            throw new HttpException("Email is not exist",HttpStatus.UNAUTHORIZED)
        }

        const checkPass = bcrypt.compareSync(loginUserDto.password,user.password)

        if(!checkPass){
            throw new HttpException("Password is not correct",HttpStatus.UNAUTHORIZED);
        }
        // new pass qua: se generate 1 access-token & 1 refresh-token
        const payload = {id:user.id,email:user.email}
        return this.generateToken(payload)

    }

    async refreshToken(refresh_token:string):Promise<any>{
        try{
            const verify = await this.jwtService.verifyAsync(refresh_token,{
                secret:this.configService.get<string>('SECRET_REFRESH_TOKEN')
            })
            // console.log(">> check veryfy: ",verify)
            // check trong DB
            const checkExistToken = await this.userRepository.findOneBy({email:verify.email,refresh_token})

            if(checkExistToken){
                return this.generateToken({id:verify.id, email:verify.email})
            }else{
                throw new HttpException("Refresh token is not valid",HttpStatus.BAD_REQUEST)
            }
        }catch(err){
            throw new HttpException("Refresh token is not valid",HttpStatus.BAD_REQUEST)
        }
    }

    // generate token
    private async generateToken(payload:{id:number, email:string}){
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload,{
            secret:this.configService.get<string>('SECRET_REFRESH_TOKEN'),
            expiresIn:this.configService.get<string>('EXP_REFRESH_TOKEN')
        })
        await this.userRepository.update(
            {email:payload.email},
            {refresh_token:refresh_token}
        )

        return {access_token,refresh_token}
    }

    // function hash password
    private async hashPassword(password:string):Promise<string>{
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)
        const hash = await bcrypt.hash(password,salt)

        return hash;
    }
}
