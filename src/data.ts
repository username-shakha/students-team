import { Student } from "./types";

export const students: Student[] = [
  {
    id: "1",
    name: "Alex",
    surname: "Alex-surname",
    email: "alex@gmail.com",
    role: "master",
    gender: "male",
  },
  {
    id: "2",
    name: "Anna",
    surname: "Anna-surname",
    email: "anna@mail.ru",
    role: "bachelor",
    gender: "female",
  },
  {
    id: "3",
    name: "Farid",
    surname: "Farid-surname",
    email: "farid@outlook.com",
    role: "bachelor",
    gender: "male",
  },
];

// function createData(
//   name: string,
//   email: string,
//   role: string,
//   gender: string,
// ) {
//   return { name, email, role, gender };
// }

// const rows = [
//   createData("Alex", "alex@gmail.com", "master", "male"),
//   createData("Anna", "anna@mail.ru", "bachelor", "female"),
//   createData("Farid", "farid@outlook.com", "bachelor", "male"),
// ];
