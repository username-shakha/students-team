import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStudent } from "@/types";
import { studentsList } from "@/database";
type TUpdateStudent = PayloadAction<{ student: TStudent; id: TStudent["id"] }>;
type TRemoveStudent = PayloadAction<TStudent["id"]>;
type TCreateStudent = PayloadAction<TStudent>;
const initialState: TStudent[] = studentsList;

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    updateStudent: (state, { payload: { student, id } }: TUpdateStudent) => {
      state.splice(findIndexById(state, id), 1, student);
    },
    removeStudent: (state, { payload: id }: TRemoveStudent) => {
      state.splice(findIndexById(state, id), 1);
    },
    createStudent: (state, { payload: student }: TCreateStudent) => {
      state.push(student);
    },
  },
});

function findIndexById(state: TStudent[], id: TStudent["id"]) {
  return state.findIndex((element) => element.id === id);
}
export const { updateStudent, removeStudent, createStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
