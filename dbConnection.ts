import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Student } from './src/shared/entities/students';
import { StudentGroup } from './src/shared/entities/student_groups';

export const DatabaseConnection = new DataSource(<DataSourceOptions>{
	type: 'postgres',
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [
		Student, StudentGroup
	],
	synchronize: false,
	logging: false
});

export const InitConnection = async () => {
	return DatabaseConnection.initialize()
	.then(() => console.log(' >>> Подкючение к базе установлено <<< '))
	.catch((e) => {throw new Error(e)})
}