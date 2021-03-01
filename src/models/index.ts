import { Sequelize } from "sequelize";
require('dotenv').config();

const dbName:string = process.env.dbName;
const dbUser:string = process.env.dbUser;
const dbPassword:string = process.env.dbPassword;
const dbPort: number = Number(process.env.dbPort);

export const database = new Sequelize(dbName,dbUser,dbPassword, {
    host: process.env.dbHost,
    dialect: 'postgres',
    port: dbPort,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        options: {
            encrypt: true
        },
        requestTimeout: 30000
    }
  });
