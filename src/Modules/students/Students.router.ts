import { Application } from 'express' 
import { StudentController } from "./controller";
import { KnexConnection } from "../../../knexConnection";
import { StudentService } from "./service";
import { StudentsRepo } from "./students.repo";

const studentController = new StudentController(
	new StudentService(
		new StudentsRepo(KnexConnection)
	)
);

export const StudentsRouter = (app: Application, url: string) => {
	app.get(`${url}/groupInfo`, studentController.getAllGroupInfo.bind(studentController));
}