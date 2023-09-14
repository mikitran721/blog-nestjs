import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor (private userService:UserService){}

    @UseGuards(AuthGuard)
    @Get()
    findAll():Promise<User[]>{
        return this.userService.findAll()
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findOne(@Param('id') id:string):Promise<User>{
        // truyen o param se la string
        return this.userService.findOne(Number(id))
    }

    @UseGuards(AuthGuard)
    @Post()
    create(@Body() createUserDto:CreateUserDto):Promise<User>{
        return this.userService.create(createUserDto)
    }

    // update user
    @UseGuards(AuthGuard)
    @Put(':id')
    update(@Param('id') id:string, @Body() updateUserDto:UpdateUserDto){
        console.log(">>check update: ",updateUserDto)
        return this.userService.update(Number(id),updateUserDto)
    }

    // delete
    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id:string){
        return this.userService.delete(Number(id))
    }
}
