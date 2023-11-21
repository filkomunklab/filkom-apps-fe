import Page from "@jumbo/shared/Page";
import AccountManagement from "app/pages/Global/AccountManagement";

const adminRoutes = [
  {
    path: "/account-management",
    element: <Page component={AccountManagement} />,
  },
];

export default adminRoutes;
