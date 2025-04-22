import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
dotenv.config()

export const appDataSource = new DataSource({
    type: 'postgres',
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORTA),
    username: process.env.DB_USERNAME,
    password: process.env.DB_SENHA,
    database: process.env.DB_NAME,
    migrations:['src/db/migrations/*.ts'],
    entities:['src/db/models/*.ts'],
})