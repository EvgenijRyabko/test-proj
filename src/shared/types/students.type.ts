export type StudentType = {
	readonly id: number
	fullname: string
	birthday: string
	bookNumber: string
}

export type GroupType = {
	readonly id: number
	nickname: string
	formTitle: string
	levelTitle: string
	departmentTitle: string
	course: number
}

export type GroupInfoType = {
	groupInfo: GroupType
	students: StudentType[]
}