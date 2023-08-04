import { IStudentService } from "./service";


export interface IStudentsController {
	getAllGroupInfo(req: any, res: any): Promise<void>
}

export class StudentController implements IStudentsController {
	constructor(
		private readonly studentService: IStudentService
	){}

	public async getAllGroupInfo(req: any, res: any){
		const idGroup = <string>req.query.idGroup;

		if (!idGroup) {
			res.status(400).send("Не указан идентификатор департамента");
		}

		const pIdGroup = parseInt(idGroup);

   	try {
   		const response = await this.studentService.getGroupInfo(pIdGroup);
			res.status(200).send(response);
      } catch (error: any) {
      	res.status(500).send({error: new Error(error).message});
      }
	}
}