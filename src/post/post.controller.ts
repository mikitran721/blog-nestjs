import { BadRequestException, Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { storageConfig } from 'helpers/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { extname } from 'path';
import { PostService } from './post.service';

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
    create(@Req() req:any,@Body() createPostDto:CreatePostDto, @UploadedFile() file:Express.Multer.File){
        // can dinh nghia dto.ts cho phan create
        console.log(req['user_data'])
        console.log(">> CreatePostDTO ",createPostDto)
        console.log(file)

        if(req.fileValidationError){
            throw new BadRequestException(req.fileValidationError)
        }
        if(!file){
            throw new BadRequestException('File is required')
        }

        return this.postService.create(req['user_data'].id,{...createPostDto,thumbnail:file.destination + "/" + file.filename})
    }
}
