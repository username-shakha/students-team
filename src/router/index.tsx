import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import StudentsListPage from "@/pages/StudentsListPage";
import StudentTeamsListPage from "@/pages/StudentTeamsListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/students-list",
        element: <StudentsListPage />,
        index: true,
      },
      {
        path: "/student-teams-list",
        element: <StudentTeamsListPage />,
      },
    ],
  },
]);

export default router;
