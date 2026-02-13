import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './db/schema'

const DB_URL = process.env.DATABASE_URL;

if(!DB_URL){
    throw new Error("DATABASE IS REQUIRE")
}

export const db = drizzle(DB_URL,{
    schema,
});