import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

    constructor(@InjectRepository(Category) private categoryRepository:Repository<Category>){}
    
    // find all category
    async findAll():Promise<Category[]>{
        return this.categoryRepository.find();
    }
}
