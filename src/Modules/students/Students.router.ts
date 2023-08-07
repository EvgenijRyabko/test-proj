import { Application } from "express";
import { StudentController } from "./controller";
import { KnexConnection } from "../../../knexConnection";
import { DatabaseConnection } from "../../../dbConnection";
import { StudentService } from "./service";
import { StudentsRepo } from "./students.repo";
import { StudentPreparator } from "./preparator";

const studentController = new StudentController(
  new StudentService(
    new StudentsRepo(KnexConnection, DatabaseConnection),
    new StudentPreparator()
  )
);

export const StudentsRouter = (app: Application, url: string) => {
  app.get(
    `${url}/groupInfo`,
    studentController.getAllGroupInfo.bind(studentController)
  );
};
