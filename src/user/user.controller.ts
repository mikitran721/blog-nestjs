import { BadRequestException, Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';

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

    // api get profile
    @UseGuards(AuthGuard)
    @Get('/profile')
    profile(@Req() req:any):Promise<User>{
        // console.log(">> get profile: ",req.user_data.id)
        return this.userService.findOne(Number(req.user_data.id))
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

    // delete multiple
    @Delete('multiple')
    multipleDelete(@Query('ids', new ParseArrayPipe({items:String,separator:","})) ids:string[]){
        console.log(">>delete multi: ",ids)
        return this.userService.multipleDelete(ids)
    }

    // delete one
    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id:string){
        return this.userService.delete(Number(id))
    }


    //upload avatar
    @Post('upload-avatar')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('avatar',
    {storage:storageConfig('avatar'),
    fileFilter:(req,file,cb) =>{
        const ext = extname(file.originalname);
        //dinh nghia cac duoi file
        const allowExtArr = ['.jpg','.png','.jpeg']
        if(!allowExtArr.includes(ext)){
            req.fileValidationError = `wrong extension type. Accepted file ext are: ${allowExtArr.toString()}`;
            cb(null,false);
        }else{
            const fileSize = parseInt(req.headers['content-length']);
            if(fileSize > (1024 * 1024 *5)){
                req.fileValidationError = 'File size is too large. Accepted file size is less then 5MB';
                cb(null,false)
            }else{
                cb(null,true); //vuot qua thu thach
            }
        }
    }
})) //dang ky dung Interceptors; ten field & cau hinh
    uploadAvatar(@Req() req:any, @UploadedFile() file:Express.Multer.File){
        // lay thong tin user tu token `req.user_data`
        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError)
        }
        if(!file){
            throw new BadRequestException('File is required')
        }
        this.userService.updateAvatar(req.user_data.id,'avatar/' + file.filename)
    }
}
