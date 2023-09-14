import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth() //dinh nghia Bearer-auth cho swagger
@ApiTags("Users")
@Controller('users')
export class UserController {
    constructor (private userService:UserService){}

    @UseGuards(AuthGuard)
    // dinh nghia tham so cho swagger
    @ApiQuery({name:'page'})
    @ApiQuery({name:'items_per_page'})
    @ApiQuery({name:'search'})
    @Get()
    findAll(@Query() query:FilterUserDto):Promise<User[]>{
        // nhan tham so page & item-per-page de pagination
        console.log(">>> check query for pagination ",query)
        return this.userService.findAll(query)
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
        return this.userService.update(Number(id),updateUserDto)
    }

    // delete
    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id:string){
        return this.userService.delete(Number(id))
    }
}
