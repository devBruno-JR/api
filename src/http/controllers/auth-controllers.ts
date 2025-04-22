import { UsersRepository } from "../../db/repositories/users-repository"
import { Request,Response } from "express"
import { authenticateValidator } from "../validators/authenticate-validator"
import { ZodError } from "zod"
import { Repository } from "typeorm"
import { vericarPassword } from "../../utils/hash-password"
import { generateTokem } from "../../utils/jwt"
export class AuthControllers {
   private userRepository: UsersRepository
  
      constructor(){
          this.userRepository = new UsersRepository()
      }

      async authenticate(req:Request , res:Response){
        try{
            const {email, password} = authenticateValidator.parse(req.body)
            const user = await this.userRepository.loadyByEmail(email)
            if(!user){
                res.status(401).json({
                    messagem:'Unauthorized'
                })
                return
            }

            const isPassword =  await vericarPassword(password, user.password)
            if(!isPassword){
                res.status(401).json({
                    messagem:'Unauthorized'
                })
                return
            }

            const token = generateTokem(user.id)
            res.status(200).json({
                token,
            })
            
        }catch(error){
            if(error instanceof ZodError){
                res.status(400).json({
                    error:error.errors
                })
            }else{
                res.status(500).json({
                    error,
                })
            }
        }
      }
}