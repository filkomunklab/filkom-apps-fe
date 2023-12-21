import Page from "@jumbo/shared/Page";
import AccountManagement from "app/pages/Global/AccountManagement";
import EmployeeManagement from "app/pages/Global/EmployeeManagement";

const adminRoutes = [
  {
    path: "/employee-management",
    element: <Page component={EmployeeManagement} />,
  },
  {
    path: "/account-management",
    element: <Page component={AccountManagement} />,
  },
];

export default adminRoutes;
