import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import StudentPage from "../pages/StudentPage";
import StudentTeamPage from "../pages/StudentTeamPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/student",
    element: <StudentPage />,
  },
  {
    path: "/student-team",
    element: <StudentTeamPage />,
  },
]);

export default router;
