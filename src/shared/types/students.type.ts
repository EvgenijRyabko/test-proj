export type StudentType = {
  readonly id: number;
  fullname: string;
  birthday: Date;
  bookNumber: string;
};

export type GroupType = {
  readonly id: number;
  nickname: string;
  formTitle: string;
  levelTitle: string;
  departmentTitle: string;
  course: string;
};

export type GroupInfoType = {
  groupInfo: GroupType;
  students: StudentType[];
};
