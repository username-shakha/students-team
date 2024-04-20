import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStudentTeam } from "@/types";
import { studentTeamsList } from "@/database";
type TUpdateStudentTeam = PayloadAction<{ team: TStudentTeam; id: TStudentTeam["id"] }>;
type TRemoveStudentTeam = PayloadAction<TStudentTeam["id"]>;
type TCreateStudentTeam = PayloadAction<TStudentTeam>;
const initialState: TStudentTeam[] = studentTeamsList;

const studentTeamsSlice = createSlice({
  name: "studentTeams",
  initialState,
  reducers: {
    updateStudentTeam: (state, { payload: { team, id } }: TUpdateStudentTeam) => {
      state.splice(findIndexById(state, id), 1, team);
    },
    removeStudentTeam: (state, { payload: id }: TRemoveStudentTeam) => {
      state.splice(findIndexById(state, id), 1);
    },
    createStudentTeam: (state, { payload: team }: TCreateStudentTeam) => {
      state.push(team);
    },
  },
});

function findIndexById(state: TStudentTeam[], id: TStudentTeam["id"]) {
  return state.findIndex((element) => element.id === id);
}
export const { updateStudentTeam, removeStudentTeam, createStudentTeam } =
  studentTeamsSlice.actions;
export default studentTeamsSlice.reducer;
