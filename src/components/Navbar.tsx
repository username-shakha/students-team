import { Container, Stack } from "@mui/material";
import { NavLink, NavLinkProps } from "react-router-dom";

export default function Navbar() {
  const isActive: NavLinkProps["className"] = ({ isActive }) =>
    isActive ? `navlink-active` : `isActive:${isActive}`;
  return (
    <header
      style={{
        margin: "10px 0px",
        height: "40px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Stack direction={"row"} gap={1} justifyContent={"end"} alignItems={"center"}>
          <NavLink className={isActive} to="/students-list">
            Student List
          </NavLink>
          <NavLink className={isActive} to="/student-teams-list">
            Team List
          </NavLink>
        </Stack>
      </Container>
    </header>
  );
}
