import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTeam } from "@/types";
import { studentTeamsList } from "@/database";
type TUpdateStudentTeam = PayloadAction<{ team: TTeam; id: TTeam["id"] }>;
type TRemoveStudentTeam = PayloadAction<TTeam["id"]>;
type TCreateStudentTeam = PayloadAction<TTeam>;
const initialState: TTeam[] = studentTeamsList;

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

function findIndexById(state: TTeam[], id: TTeam["id"]) {
  return state.findIndex((element) => element.id === id);
}
export const { updateStudentTeam, removeStudentTeam, createStudentTeam } =
  studentTeamsSlice.actions;
export default studentTeamsSlice.reducer;
