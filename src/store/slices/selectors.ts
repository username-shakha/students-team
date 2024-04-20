import { RootState } from "@/store";
import { TStudent, TStudentTeam } from "@/types";
const selectStudents: (store: RootState) => TStudent[] = (store) => store.students;
const selectStudentTeams: (store: RootState) => TStudentTeam[] = (store) =>
  store.studentTeams;
export { selectStudents, selectStudentTeams };
