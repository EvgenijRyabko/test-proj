import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { StudentGroup } from "./student_groups";
import { LevelEducation } from "./level_education";
import { FormEducation } from "./form_education";
import { Department } from "./department";

@Entity({ name: 'education.study_groups' })
export class StudyGroup {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nickname!: string

    @Column()
    course!: string

    @Column({
        name: 'id_form'
    })
    idForm!: number

    @Column({
        name: 'id_level'
    })
    idLevel!: number

    @Column({
        name: 'id_faculty'
    })
    idDepartment!: number

    @Column({
        name: 'id_profile'
    })
    idProfile!: number

    @Column({
        name: 'date_start'
    })
    dateStart!: string

    @Column({
        name: 'date_end'
    })
    dateEnd!: string

    @OneToMany(() => StudentGroup, (studentGroup) => studentGroup.group)
    studentGroups!: StudentGroup[]

    @ManyToOne(() => Department, (department) => department.groups)
    @JoinColumn({ name: 'id_faculty' })
    department!: Department

    @ManyToOne(() => FormEducation, (form) => form.groups)
    @JoinColumn({ name: 'id_form' })
    formEducation!: FormEducation

    @ManyToOne(() => LevelEducation, (level) => level.groups)
    @JoinColumn({ name: 'id_level' })
    levelEducation!: LevelEducation
}