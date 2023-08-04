import knex from "knex";
import 'dotenv/config';

export const KnexConnection = knex({
    client: 'pg',
    version: '7.2',
    connection: {
      host : process.env.DB_HOST,
      port : 5432,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    }
});