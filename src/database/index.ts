import { TStudent, TTeam } from "@/types";

export const studentsList: TStudent[] = [
  {
    id: "1",
    name: "Alex",
    surname: "Alex-surname",
    email: "alex@gmail.com",
    role: "MASTER",
    gender: "MALE",
  },
  {
    id: "2",
    name: "Anna",
    surname: "Klare",
    email: "anna@mail.ru",
    role: "BACHELOR",
    gender: "FEMALE",
  },
  {
    id: "3",
    name: "John",
    surname: "Smit",
    email: "john@outlook.com",
    role: "BACHELOR",
    gender: "MALE",
  },
  {
    id: "4",
    name: "Mike",
    surname: "Tayson",
    email: "mike_chemp@gmail.com",
    role: "MASTER",
    gender: "MALE",
  },
  {
    id: "5",
    name: "Conor",
    surname: "mcGregor",
    email: "mcGregor@mail.ru",
    role: "BACHELOR",
    gender: "MALE",
  },
  {
    id: "6",
    name: "Annisa",
    surname: "Cross",
    email: "cross@yandex.com",
    role: "BACHELOR",
    gender: "FEMALE",
  },
  {
    id: "7",
    name: "Jayson",
    surname: "Mak",
    email: "jordanchemp@gmail.com",
    role: "MASTER",
    gender: "MALE",
  },
  {
    id: "8",
    name: "AniLora",
    surname: "lora",
    email: "lorasimple@mail.ru",
    role: "BACHELOR",
    gender: "FEMALE",
  },
  {
    id: "9",
    name: "Jakh",
    surname: "Khalib",
    email: "Khalib@example.com",
    role: "BACHELOR",
    gender: "MALE",
  },
];

export const studentTeamsList: TTeam[] = [
  {
    id: "1",
    name: "Smart Team",
    students: [
      {
        id: "1",
        firstname: "Alex",
        lastname: "Malikov",
        role: "MASTER",
      },

      {
        id: "2",
        firstname: "Anna",
        lastname: "Klare",
        role: "BACHELOR",
      },
      {
        id: "3",
        firstname: "John",
        lastname: "Smit",
        role: "BACHELOR",
      },
    ],
  },
];
