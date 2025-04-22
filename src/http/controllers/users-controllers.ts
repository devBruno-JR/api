import { Request, Response } from "express";
import { nativeEnum, ZodError } from "zod";
import { UsersRepository } from "../../db/repositories/users-repository";
import { hashPassword } from "../../utils/hash-password";
import { registerValidator } from "../validators/register-validator";





export class UsersControllers {
    private userRepository: UsersRepository

    constructor(){
        this.userRepository = new UsersRepository()
    }
    async register(req:Request , res:Response){
        try{
            const {email , password, name} = registerValidator.parse(req.body)

            const emailJaUtilizado = await this.userRepository.loadyByEmail(email)
            if(emailJaUtilizado){
                res.status(409).json({
                    mensagem:'Email ja em uso'
                })
                return
            }

            const  senhaSegura = await hashPassword(password)
            const createUsers = await this.userRepository.create({
                email,
                name,
                password:senhaSegura
            })
            
            
        

        res.status(201).json({
            mensagem: 'Usuario criado com suscesso',
            createUsers
        })

        }catch(error){
            if( error instanceof ZodError){
                res.status(400).json({
                errors: error.errors
                })
            }
            else{
                res.status(500).json({
                    error
                })
            }
        }
    }

    async getLoggedUser(req:Request, res:Response) {
        const {user} =req
        if(!user){
             res.status(401).json({
                mensagem:'nao autorizado'
            })
            return
        }

        const savedUser = await this.userRepository.loadById(user.id)
        if(!savedUser){
             res.status(401).json({
                mensagem:'nao autorizado'
            })
            return
        }

        res.status(200).json({
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            createAd: savedUser.createAd,
            profilePicture: savedUser.profilePicture,
        })
    }
}