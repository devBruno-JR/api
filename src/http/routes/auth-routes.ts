import { Router } from "express";
import { AuthControllers } from "../controllers/auth-controllers";

const authRouter = Router()
const authControllers = new AuthControllers()

authRouter.post('/login' , (req,res) => authControllers.authenticate(req,res))

export {authRouter}