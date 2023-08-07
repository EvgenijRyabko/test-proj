import { IStudentsRepo } from "./students.repo";
import { IStudentPreparator } from "./preparator";
import { GroupInfoType } from "../../shared/types/students.type";

export interface IStudentService {
  getGroupInfo(idGroup: number): Promise<GroupInfoType>;
}

export class StudentService implements IStudentService {
  constructor(
    private readonly repository: IStudentsRepo,
    private readonly preparator: IStudentPreparator
  ) {}

  public async getGroupInfo(idGroup: number) {
    const groupPrep = await this.repository.getGroupInfo(idGroup);
    if (!groupPrep) throw new Error("Группа не найдена!");
    const studentsPrep = await this.repository.getAllStudentsByGroup(idGroup);
    if (studentsPrep.length === 0) throw new Error("Студенты не найдены!");
    const preparedData = this.preparator.prepareGroupInfoReport(
      groupPrep,
      studentsPrep
    );
    return preparedData;
  }
}
