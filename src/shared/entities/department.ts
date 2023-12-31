import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { StudyGroup } from './study_groups'

@Entity({ name: 'pers.Departments' })
export class Department {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        name: 'name_department'
    })
    name!: string

    @Column({
        name: 'name_genitive'
    })
    nameGenitive!: string

    @Column({
        name: 'name_short'
    })
    shortName!: string

    @Column({
        name: 'abit_id',
        nullable: true
    })
    abitId!: number

    @OneToMany(() => StudyGroup, (group) => group.department)
    groups!: StudyGroup[]
}