import { Knex } from "knex";
import { StudentType, GroupType } from "../../shared/types/students.type";

export interface IStudentsRepo {
	getAllStudentsByGroup(idGroup: number): Promise<StudentType[]>
	getGroupInfo(idGroup: number): Promise<GroupType | undefined>
}

export class StudentsRepo implements IStudentsRepo {
	constructor(
		private readonly knexConnection: Knex,
	){}

	public async getAllStudentsByGroup(idGroup: number){
		const students : StudentType[]
			= await this.knexConnection('education.students as student')
         .select("student.id as id")
			.select(this.knexConnection.raw(`CONCAT(student.lastname, ' ', student.firstname, ' ', student.middlename) as fullname`))
			.select("student.birthday as birthday")
			.select("students_groups.record_book as record_book")
			.innerJoin("education.students_groups as students_groups", "student.id", "students_groups.id_student")
			.where("students_groups.id_group", idGroup)
			.orderBy("fullname");

		return students;	
	}

	public async getGroupInfo(idGroup: number){
		const groupInfo : GroupType | undefined
			= await this.knexConnection('education.students_groups as students_groups')
			.select("study_groups.id as id")
			.select("study_groups.nickname as nickname")
			.select("study_groups.course as course")
			.select("Departments.name_department as departmentTitle")
			.select("level_education.name as levelTitle")
			.select("form_education.name as formTitle")
			.innerJoin("education.study_groups as study_groups", "students_groups.id_group", "study_groups.id" )
			.innerJoin("education.level_education as level_education", "level_education.id", "study_groups.id_level")
			.innerJoin("education.form_education as form_education", "form_education.id", "study_groups.id_form")
			.innerJoin("pers.Departments as Departments", "Departments.id", "study_groups.id_faculty")
			.where("students_groups.id_group", idGroup)
			.first();

		return groupInfo;
	}
}