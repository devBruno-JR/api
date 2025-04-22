import { NextFunction, Request, Response } from "express";
import { verificarToken } from "../../utils/jwt"; // corrigido nome
import { UsersRepository } from "../../db/repositories/users-repository";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
         res.status(401).json({ mensagem: 'Permissão negada' });
         return
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verificarToken(token); // certifique-se de que essa função retorna os dados do token
        
        const usersRepository = new UsersRepository();

        const user = await usersRepository.loadById(decoded.userId)
        
        if (!user) {
           res.status(401).json({
                mensagem: 'Token inválido ou expirado'
            })
            return 
        }

        req.user={
            id:user.id,
            email:user.email
        }

        next()
    } catch (error) {
         res.status(401).json({ mensagem: 'Token inválido ou expirado' });
         return
    }
};
