import Dashboard from "../pages/BimbinganAkademik/DosenPembimbing/Dashboard";
import AcademicGuide from "app/pages/BimbinganAkademik/DosenPembimbing/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/DosenPembimbing/VisionMisionGoals";
import Curriculum from "app/pages/BimbinganAkademik/DosenPembimbing/Curriculum/Curriculum";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentGradeDashboard";
import StudentInformation from "../pages/BimbinganAkademik/DosenPembimbing/StudentInformation";
import StudentProfile from "../pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentCertificate";
import ReviewPreReg from "app/pages/BimbinganAkademik/DosenPembimbing/ReviewPreReg";
import History from "../pages/BimbinganAkademik/DosenPembimbing/History";
import CertificateDetail from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentCertificate/CertificateDetail";
import Profile from "app/pages/BimbinganAkademik/DosenPembimbing/Profile";

const { default: Page } = require("@jumbo/shared/Page");

const dosenPembimbingRoutes = [
  {
    path: "/bimbingan-akademik/dosen-pembimbing/dashboard",
    element: <Page component={Dashboard} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/academic-guide",
    element: <Page component={AcademicGuide} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/vision-mission-goals",
    element: <Page component={VisionMisionGoals} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/curriculum",
    element: <Page component={Curriculum} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information",
    element: <Page component={StudentInformation} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/:id/grade/semester/:number",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },
  {
    path: "/bimbingan-akademik/review-pre-registration",
    element: <Page component={ReviewPreReg} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/profile",
    element: <Page component={Profile} />,
  },
];

export default dosenPembimbingRoutes;
