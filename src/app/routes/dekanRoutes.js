import Dashboard from "../pages/BimbinganAkademik/Dekan/Dashboard";
import StudentInformationMentored from "app/pages/BimbinganAkademik/Dekan/StudentInformationMentored";
import StudentInformationFaculty from "app/pages/BimbinganAkademik/Dekan/StudentInformationFaculty";
import StudentInformation from "../pages/BimbinganAkademik/Dekan/StudentInformation";
import StudentProfile from "../pages/BimbinganAkademik/Dekan/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentCertificate";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentGradeDashboard";
import CertificateDetail from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentCertificate/CertificateDetail";
import SupervisorInformation from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation";

const { default: Page } = require("@jumbo/shared/Page");

const dekanRoutes = [
  {
    path: "/bimbingan-akademik/dekan/dashboard",
    element: <Page component={Dashboard} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information-mentored",
    element: <Page component={StudentInformationMentored} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information-faculty",
    element: <Page component={StudentInformationFaculty} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information",
    element: <Page component={StudentInformation} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/:id/grade/semester/:number",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information",
    element: <Page component={SupervisorInformation} />,
  },
];

export default dekanRoutes;
