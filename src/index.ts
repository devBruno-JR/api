
import dotenv from 'dotenv';
import express from "express";
import 'reflect-metadata';
import { appDataSource } from "./db/configs/data-source";
import { userRoutes } from './http/routes/users-routes';
import { authRouter } from './http/routes/auth-routes';
dotenv.config()

const app = express()
app.use(express.json())

app.use(userRoutes)
app.use(authRouter)

app.get('/', (req , res) =>{
   res.json({
    status: 'roda'
   })
})

const PORT = process.env.PORT
appDataSource.initialize()
    .then(()=>{
        console.log('conectando no DB');
        
        app.listen(PORT, ()=>{
            console.log('servido Iniciado');
        }) 
    })
    .catch((error)=>{
        console.error(`erro a conectar no banco de dados: ${error}`);
        
    })

