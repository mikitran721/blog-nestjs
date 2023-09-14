import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)private userRepository:Repository<User>){}
    
    async findAll(query:FilterUserDto):Promise<any>{
        const items_per_page = Number(query.items_per_page) || 10;
        const page = Number(query.page) || 1;
        const skip = (page -1)*items_per_page; //bo qua bao nhieu items
        const keyword = query.search || ''

        const [res,total] = await this.userRepository.findAndCount({
            where:[
                {firstName:Like("%" + keyword + "%")},
                {lastName:Like("%" + keyword + "%")},
                {email:Like("%" + keyword + "%")}
            ],
            order:{created_at:"DESC"},
            take:items_per_page,
            skip,
            select:['id','firstName','lastName','email','status','created_at','updated_at']
        })

        const lastPage = Math.ceil(total/items_per_page)
        const nextPage = (page + 1) > lastPage ? null : page +1
        const prePage = (page -1) < 1 ? null : page -1;
        
        return{
            data:res,
            total,
            currentPage:page,
            nextPage,
            prePage,
            lastPage
        }
    }

    async findOne(id:number):Promise<User>{
        return await this.userRepository.findOneBy({id})
    }

    async create(createUserDto:CreateUserDto):Promise<User>{
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)
        const hashPassword = await bcrypt.hash(createUserDto.password,salt);
        // console.log(hashPassword)
        return await this.userRepository.save({...createUserDto, password:hashPassword})
    }

    async update(id:number, updateUserDto:UpdateUserDto):Promise<UpdateResult>{
        return await this.userRepository.update(id,updateUserDto)
    }

    async delete(id:number):Promise<DeleteResult>{
        return await this.userRepository.delete(id)
    }

    // luu avatar-user
    async updateAvatar(id:number, avatar:string):Promise<UpdateResult>{
        return await this.userRepository.update(id,{avatar})
    }
}
