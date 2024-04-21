import { RootState } from "@/store";
import { TStudent, TTeam } from "@/types";
const selectStudents: (store: RootState) => TStudent[] = (store) => store.students;
const selectTeams: (store: RootState) => TTeam[] = (store) => store.studentTeams;
export { selectStudents, selectTeams };
