import { Link } from "react-router-dom";

export default function HeaderNavbar() {
  return (
    <header>
      <Link to="student">Student List</Link>
      <Link to="student-team">Team List</Link>
    </header>
  );
}
