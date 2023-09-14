import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('register')
    register(@Body() registerUserDto:RegisterUserDto):Promise<User>{
        // console.log('resgister Api');
        // console.log(registerUserDto);
        return this.authService.register(registerUserDto)
    }

    @Post('login')
    @UsePipes(ValidationPipe)
    login(@Body() loginUserDto:LoginUserDto):Promise<any>{
        console.log('Login Api');
        console.log(loginUserDto)

        return this.authService.login(loginUserDto)
    }

    @Post('refresh-token')
    refreshToken(@Body() {refresh_token}):Promise<any>{
        console.log('Refresh token api')
        return this.authService.refreshToken(refresh_token)
    }
}
