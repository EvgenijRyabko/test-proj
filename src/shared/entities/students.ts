import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { StudentGroup } from "./student_groups";

@Entity({
  name: "education.students",
})
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstname!: string;

  @Column()
  middlename!: string;

  @Column()
  lastname!: string;

  @Column()
  birthday!: Date;

  @OneToMany(() => StudentGroup, (studentGroup) => studentGroup.student)
  studentGroups!: StudentGroup[];

  fullname() {
    return `${this.lastname} ${this.firstname} ${this.middlename}`;
  }
}
