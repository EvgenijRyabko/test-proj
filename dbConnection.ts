import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Student } from './src/shared/entities/students';
import { StudentGroup } from './src/shared/entities/student_groups';
import { StudyGroup } from './src/shared/entities/study_groups';
import { Department } from './src/shared/entities/department';
import { LevelEducation } from './src/shared/entities/level_education';
import { FormEducation } from './src/shared/entities/form_education';

export const DatabaseConnection = new DataSource(<DataSourceOptions>{
	type: 'postgres',
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [
		// Education
		Student, StudentGroup, StudyGroup,
		LevelEducation, FormEducation,

		// Pers
		Department
	],
	synchronize: false,
	logging: false
});

export const InitConnection = async () => {
	return DatabaseConnection.initialize()
	.then(() => console.log(' >>> Подкючение к базе установлено <<< '))
	.catch((e) => {throw new Error(e)})
}