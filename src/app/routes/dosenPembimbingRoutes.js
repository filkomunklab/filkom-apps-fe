import StudentGradeDashboard from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentGradeDashboard";
import StudentInformation from "../pages/BimbinganAkademik/DosenPembimbing/StudentInformation";
import StudentProfile from "../pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentCertificate";
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
    path: "/bimbingan-akademik/student-information/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/student-information/:id/grade/semester/:number",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/student-information/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dospem/history",
    element: <Page component={History} />,
  },
];

export default dosenPembimbingRoutes;
