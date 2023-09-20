import { type } from "os";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;
    
    @Column()
    summary:string;
    
    @Column()
    description:string;

    @Column()
    thumbnail:string;

    @Column({type:'int',default:1})
    status:number;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    // dinh nghia relationship
    @ManyToOne(()=> User, (user) => user.posts)
    user:User

    @ManyToOne(()=> Category, (category) => category.posts)
    category:Category
}