import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global:true,
      secret:'abc123',
      signOptions:{expiresIn:'1h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
