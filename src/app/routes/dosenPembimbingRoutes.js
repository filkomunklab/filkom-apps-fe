
import StudentInformation from "../pages/BimbinganAkademik/DosenPembimbing/StudentInformation";
import StudentProfile from "../pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentProfile";
import History from "app/pages/BimbinganAkademik/DesenPembimbing/History";

const { default: Page } = require("@jumbo/shared/Page");

const dosenPembimbingRoutes = [
  {
    path: "/bimbingan-akademik/student-information",
    element: <Page component={StudentInformation} />,
  },
  {
    path: "/bimbingan-akademik/student-information/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/dospem/history",
    element: <Page component={History} />,
  },
];

export default dosenPembimbingRoutes;
