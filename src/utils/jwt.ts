import  jwt  from "jsonwebtoken";

export function generateTokem(userId:number):string{
    return jwt.sign({
        userId,
    },process.env.JWT_SECRET || 'secret', {expiresIn:'1h'})

}
export function verificarToken(token:string):any{
return jwt.verify(token,process.env.JWT_SECRET || 'secret' )
}