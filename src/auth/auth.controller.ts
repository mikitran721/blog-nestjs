import { Body, Controller, Post, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from './decorator/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    // @SetMetadata('isPublic',true) //bo qua Auth.Guard
    @Public()
    @Post('register')
    register(@Body() registerUserDto:RegisterUserDto):Promise<User>{
        return this.authService.register(registerUserDto)
    }

    @Public() //bo qua Auth.Guard
    @Post('login')
    @ApiResponse({
        status:201,description:'Login successfully'
    })
    @ApiResponse({status:401,description:'Login fail'})
    @UsePipes(ValidationPipe)
    login(@Body() loginUserDto:LoginUserDto):Promise<any>{

        return this.authService.login(loginUserDto)
    }

    @Public() //bo qua Auth.Guard
    @Post('refresh-token')
    refreshToken(@Body() {refresh_token}):Promise<any>{
        console.log('Refresh token api')
        return this.authService.refreshToken(refresh_token)
    }
}
