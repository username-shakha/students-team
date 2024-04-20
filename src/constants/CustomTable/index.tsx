import { Box, Typography } from "@mui/material";
import { CUSTOM_TABLE_HEADS } from "@/types";
export const STUDENT_LIST_HEADS: CUSTOM_TABLE_HEADS[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "surname",
    label: "Surname",
    hidden: true,
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "gender",
    label: "Gender",
  },
  {
    key: "action",
    label: "Action",
  },
];

export const STUDENT_TEAMS_LIST_HEADS: CUSTOM_TABLE_HEADS[] = [
  {
    key: "name",
    label: "Team Name",
  },
  {
    key: "students",
    label: "Students",
    render: (value) => {
      const [masters, bachelors] = value.split("<>");
      // console.log(value.split("<>"));
      return (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {masters.split("&").map((fullname, i) => (
            <Typography color="primary" key={i}>
              Master: {fullname}
            </Typography>
          ))}
          {bachelors.split("&").map((fullname, i) => (
            <Typography color="warning" key={i}>
              {fullname}
            </Typography>
          ))}
        </Box>
      );
    },
  },
  { key: "action", label: "Actions" },
];
