import Page from "@jumbo/shared/Page";
import EmployeeManagement from "app/pages/Global/EmployeeManagement";
import StudentManagement from "app/pages/Global/StudentManagement";

const adminRoutes = [
  {
    path: "/employee-management",
    element: <Page component={EmployeeManagement} />,
  },
  {
    path: "/student-management",
    element: <Page component={StudentManagement} />,
  },
];

export default adminRoutes;
