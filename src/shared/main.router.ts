import { StudentsRouter } from "../Modules/students/Students.router";
import { Application } from 'express'

export const MainRouter = (app: Application, url: string) => {
	StudentsRouter(app, `${url}/students`);
}