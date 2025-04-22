import { Repository } from "typeorm";
import { appDataSource } from "../configs/data-source";
import { User } from "../models/user";

interface CreateUsersDto{
    email:string
    password:string
    name:string
}

export class UsersRepository {
    private repositorty: Repository<User>

    constructor(){
        this.repositorty = appDataSource.getRepository(User)
    }
    async create(data: CreateUsersDto): Promise<User>{
        return await this.repositorty.save(data)
    }
    async loadyByEmail(email:string):Promise<User| null>{
        return await this.repositorty.findOne({
            where:{
                email,
            }
        })
    }
    async loadById(id:number):Promise<User| null>{
        return await this,this.repositorty.findOne({
            where:{
                id,
            }
        })
    }
}