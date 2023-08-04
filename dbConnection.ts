import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const DatabaseConnection = new DataSource(<DataSourceOptions>{
	type: 'postgres',
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [],
	synchronize: false,
	logging: false
});

export const InitConnection = async () => {
	return DatabaseConnection.initialize()
	.then(() => console.log(' >>> Подкючение к базе установлено <<< '))
	.catch((e) => {throw new Error(e)})
}