import { createStubInstance } from "sinon";
import { StudentService } from "./service";
import { StudentPreparator } from "./preparator";
import { StudentsRepo } from "./students.repo";
import { GroupType } from "../../shared/types/students.type";
import { Student } from "../../shared/entities/students";
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

  it("Return data", () => {
    const mockRepository = createStubInstance(StudentsRepo);
    const mockStudentPrep = createStubInstance(StudentPreparator);
  });
});
