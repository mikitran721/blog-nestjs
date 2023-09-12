import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 33061,
      username: 'root',
      password: 'abc123',
      database: 'blog-nestjs',
      entities: [User],
      synchronize: true, //khi lap trinh theo nhom se ko de tu dong dong bo
    })
    ,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
