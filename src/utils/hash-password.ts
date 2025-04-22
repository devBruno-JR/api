import bcrypt from 'bcrypt'
import { boolean } from 'zod'

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
}
export async function vericarPassword(password:string, hash:string):Promise<boolean> {
    return bcrypt.compare(password, hash)
}