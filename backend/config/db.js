import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const {PGHOST_HOST, PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE} = process.env;
//create a connection to the database using neon
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`

)

// this sql funciton can be used to query the database. It returns a promise that resolves to the result of the query.