import { Knex } from "knex";
import { DataSource } from "typeorm";
import { GroupType } from "../../shared/types/students.type";
import { Student } from "../../shared/entities/students";

export interface IStudentsRepo {
  getAllStudentsByGroup(idGroup: number): Promise<Student[]>;
  getGroupInfo(idGroup: number): Promise<GroupType | undefined>;
}

export class StudentsRepo implements IStudentsRepo {
  constructor(
    private readonly knexConnection: Knex,
    private readonly ormConnection: DataSource
  ) {}

  public async getAllStudentsByGroup(idGroup: number) {
    const students = await this.ormConnection
      .createQueryBuilder(Student, "student")
      .innerJoinAndSelect("student.studentGroups", "studentGroup")
      .where("studentGroup.idGroup = :idGroup", { idGroup })
      .getMany();

    return students;
  }

  public async getGroupInfo(idGroup: number) {
    const groupInfo: GroupType | undefined = await this.knexConnection(
      "education.students_groups as students_groups"
    )
      .select("study_groups.id as id")
      .select("study_groups.nickname as nickname")
      .select("study_groups.course as course")
      .select("Departments.name_department as departmentTitle")
      .select("level_education.name as levelTitle")
      .select("form_education.name as formTitle")
      .innerJoin(
        "education.study_groups as study_groups",
        "students_groups.id_group",
        "study_groups.id"
      )
      .innerJoin(
        "education.level_education as level_education",
        "level_education.id",
        "study_groups.id_level"
      )
      .innerJoin(
        "education.form_education as form_education",
        "form_education.id",
        "study_groups.id_form"
      )
      .innerJoin(
        "pers.Departments as Departments",
        "Departments.id",
        "study_groups.id_faculty"
      )
      .where("students_groups.id_group", idGroup)
      .first();

    return groupInfo;
  }
}
