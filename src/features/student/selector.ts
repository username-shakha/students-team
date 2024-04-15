import { RootState } from "../../store";
import { Student } from "../../types";

export const selectStudent: (store: RootState) => Student[] = (store) =>
  store.student;
