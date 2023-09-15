import { BadRequestException, Body, Controller, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors, Get, Param, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { storageConfig } from 'helpers/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { extname } from 'path';
import { PostService } from './post.service';
import { FilterPostDto } from './dto/filter-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { ValidationTypes } from 'class-validator';

@Controller('posts')
export class PostController {
    constructor(private postService:PostService){}

    @UseGuards(AuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('thumbnail',{
        storage:storageConfig('post'),
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
    }))
    @UsePipes(ValidationPipe)   
    create(@Req() req:any,@Body() createPostDto:CreatePostDto, @UploadedFile() file:Express.Multer.File){
        // can dinh nghia dto.ts cho phan create

        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError)
        }
        if(!file){
            throw new BadRequestException('File is required')
        }

        return this.postService.create(req['user_data'].id,{...createPostDto,thumbnail:file.destination + "/" + file.filename})
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Query() query:FilterPostDto):Promise<any>{
        return this.postService.findAll(query)
    }

    //get detail user
    @UseGuards(AuthGuard)
    @Get(':id')
    findDetail(@Param('id') id:string):Promise<PostEntity>{
        return this.postService.findDetail(Number(id))
    }

    // update post
    @UseGuards(AuthGuard)
    
    @Put(':id')
    @UseInterceptors(FileInterceptor('thumbnail',{
        storage:storageConfig('post'),
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
    }))
    @UsePipes(ValidationPipe)
    update(@Param('id') id:string,@Req() req:any,@Body() updatePostDto:UpdatePostDto,
    @UploadedFile() file:Express.Multer.File
    ){
        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError)
        }
        //service update - khong nhat thiet phai update thumbnail
        if(file){
            updatePostDto.thumbnail = file.destination+"/"+file.filename;
        }

        return this.postService.update(Number(id),updatePostDto)
    }

    // delete post
    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id:string){
        // goi service delete
        return this.postService.delete(Number(id))
    }
}
