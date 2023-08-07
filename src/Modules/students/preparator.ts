import { StudyGroup } from "../../shared/entities/study_groups";
import { Student } from "../../shared/entities/students";
import {
  GroupInfoType,
  StudentType,
  GroupType,
} from "../../shared/types/students.type";

export interface IStudentPreparator {
  prepareGroupInfoReport(
    groupPrep: GroupType,
    studentsPrep: Student[]
  ): Promise<GroupInfoType>;
}
export class StudentPreparator implements IStudentPreparator {
  constructor() {}

  public async prepareGroupInfoReport(
    groupPrep: GroupType,
    studentsPrep: Student[]
  ) {
    const students: Array<StudentType> = [];

    for (const student of studentsPrep) {
      students.push({
        id: student.id,
        fullname: student.fullname(),
        birthday: student.birthday,
        bookNumber: student.studentGroups[0].recordBook,
      });
    }
    return { groupInfo: groupPrep, students };
  }
}
