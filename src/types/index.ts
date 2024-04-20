import { ReactNode } from "react";

export interface CUSTOM_TABLE_HEADS {
  key: string;
  label: string;
  render?: (value: string, row?: Record<string, ReactNode>) => ReactNode;
  hidden?: boolean;
}

export type TStudent = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: "MASTER" | "BACHELOR";
  gender: "MALE" | "FEMALE";
};

export interface TStudentTeam {
  id: string;
  name: string;
  students: {
    id: string;
    firstname: string;
    lastname: string;
    role: "MASTER" | "BACHELOR";
  }[];
}
