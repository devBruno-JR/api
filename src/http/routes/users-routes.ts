import { Router } from "express";
import { UsersControllers } from "../controllers/users-controllers";
import { authMiddleware } from "../middlewares/auth-middleware";


const userRoutes = Router()
const usersControllers = new UsersControllers

userRoutes.post('/register', (req, res) => usersControllers.register(req, res))
userRoutes.get('/me',authMiddleware ,(req, res) => usersControllers.getLoggedUser(req, res))

export { userRoutes };

