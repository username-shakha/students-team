import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { students } from "../../data";
import { Student } from "../../types";

type update = PayloadAction<{ student: Student; id: Student["id"] }>;
type remove = PayloadAction<Student["id"]>;
type create = PayloadAction<Student>;

const initialState: Student[] = students;

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    update: (state, { payload: { student, id } }: update) => {
      state.splice(findIndexById(state, id), 1, student);
    },
    remove: (state, { payload: id }: remove) => {
      state.splice(findIndexById(state, id), 1);
    },
    create: (state, { payload: student }: create) => {
      state.push(student);
    },
  },
});

function findIndexById(state: Student[], id: Student["id"]) {
  return state.findIndex((element) => element.id === id);
}

export const { update, remove, create } = studentSlice.actions;
export default studentSlice.reducer;
