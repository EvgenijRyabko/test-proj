import { createStubInstance } from "sinon";
import { StudentService } from "./service";
import { StudentPreparator } from "./preparator";
import { StudentsRepo } from "./students.repo";
import { GroupType } from "../../shared/types/students.type";
import { Student } from "../../shared/entities/students";
import { GroupInfoType } from "../../shared/types/students.type";
import { StudentGroup } from "../../shared/entities/student_groups";

describe("[SERVICE] Students service", () => {
  describe("groupInfoReport", () => {
    it("Not found students error", async () => {
      const testData: GroupType = {
        id: 1,
        nickname: "ЕГ-123s",
        departmentTitle: "Тестовый институт",
        course: "1",
        levelTitle: "бакалавриат",
        formTitle: "Очная",
      };

      const mockRepository = createStubInstance(StudentsRepo);
      mockRepository.getAllStudentsByGroup.resolves([]);
      const mockStudentPrep = createStubInstance(StudentPreparator);
      mockRepository.getGroupInfo.resolves(testData);

      const studentService = new StudentService(
        mockRepository,
        mockStudentPrep
      );

      try {
        await studentService.getGroupInfo(1);
      } catch (error: any) {
        expect(error.message).toStrictEqual("Студенты не найдены!");
        expect(mockRepository.getGroupInfo.callCount).toEqual(1);
        expect(mockRepository.getAllStudentsByGroup.callCount).toEqual(1);
      }
    });

    it("Not found group error", async () => {
      const mockRepository = createStubInstance(StudentsRepo);
      const mockStudentPrep = createStubInstance(StudentPreparator);
      mockRepository.getGroupInfo.resolves(undefined);

      const studentService = new StudentService(
        mockRepository,
        mockStudentPrep
      );

      try {
        await studentService.getGroupInfo(1);
      } catch (error: any) {
        expect(error.message).toStrictEqual("Группа не найдена!");
        expect(mockRepository.getGroupInfo.callCount).toEqual(1);
        expect(mockRepository.getAllStudentsByGroup.callCount).toEqual(0);
      }
    });
  });

  it("Return data", async () => {
    const mockRepository = createStubInstance(StudentsRepo);
    const mockStudentPrep = createStubInstance(StudentPreparator);

    mockRepository.getAllStudentsByGroup.resolves([
      new Student(),
      new Student(),
    ]);

    mockRepository.getGroupInfo.resolves({
      id: 1,
      nickname: "ЕГ-123",
      course: "1",
      departmentTitle: "Тестовый институт",
      levelTitle: "бакалавриат",
      formTitle: "Очная",
    });

    const testReportData: GroupInfoType = {
      groupInfo: {
        id: 1,
        nickname: "ЕГ-123",
        course: "1",
        departmentTitle: "Тестовый институт",
        levelTitle: "бакалавриат",
        formTitle: "Очная",
      },
      students: [
        {
          id: 1,
          fullname: "Тестенко Тест Тестович",
          birthday: new Date("2021-05-31T21:00:00.000Z"),
          bookNumber: "1",
        },
        {
          id: 2,
          fullname: "Кекенко Кек Кекович",
          birthday: new Date("2021-05-31T21:00:00.000Z"),
          bookNumber: "2",
        },
      ],
    };

    mockStudentPrep.prepareGroupInfoReport.resolves(testReportData);

    const reportService = new StudentService(mockRepository, mockStudentPrep);
    const result = await reportService.getGroupInfo(0);
    expect(result).toStrictEqual(testReportData);
    expect(mockRepository.getGroupInfo.callCount).toEqual(1);
    expect(mockRepository.getAllStudentsByGroup.callCount).toEqual(1);
    expect(mockStudentPrep.prepareGroupInfoReport.callCount).toEqual(1);
  });
});
