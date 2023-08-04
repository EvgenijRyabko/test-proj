import { StudentsRouter } from "../Modules/students/Students.router";

export const MainRouter = (app: any, url: string) => {
	StudentsRouter(app, `${url}/students`);
}