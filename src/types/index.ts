export interface Heads {
  key: string;
  label: string;
  hidden?: boolean;
}

export type Student = {
  id: string;
  name: string;
  surname: string;
  email: string;
  // role: string;
  // gender: string;
  role: "master" | "bachelor";
  gender: "male" | "female";
};
