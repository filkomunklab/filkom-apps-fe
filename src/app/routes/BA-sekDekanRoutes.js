import AcademicGuide from "app/pages/BimbinganAkademik/SekDekan/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/SekDekan/VisionMisionGoals";
import Curriculum from "app/pages/BimbinganAkademik/SekDekan/Curriculum/Curriculum";
import StudentInformation from "app/pages/BimbinganAkademik/SekDekan/StudentInformation";
import StudentInformationFacultyInformatics from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentInformationFaculty/Informatics";
import StudentInformationFacultyInformationSystem from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentInformationFaculty/InformationSystem";
import StudentInformationFacultyInformationTechnology from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentInformationFaculty/InformationTechnology";
import StudentProfile from "../pages/BimbinganAkademik/SekDekan/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentCertificate";
import CertificateDetail from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentCertificate/CertificateDetail";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentGradeDashboard";
import SupervisorInformation from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation";
import SupervisorInformatics from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/Informatics";
import SupervisorInformationSystem from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/InformationSystem";
import SupervisorInformationTechnology from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/InformationTechnology";
import AddSupervisor from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AddSupervisor";
import SupervisorHistory from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History";
import InformaticsLS from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AddSupervisor/Informatics";
import InformationSytemLS from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AddSupervisor/InformationSystem";
import InformationTechnologyLS from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AddSupervisor/InformationTechnology";
import AdvisorProfile from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorProfile";
import Profile from "app/pages/BimbinganAkademik/SekDekan/Profile";

const { default: Page } = require("@jumbo/shared/Page");

const sekDekanRoutes = [
  {
    path: "/bimbingan-akademik/sek-dekan/academic-guide",
    element: <Page component={AcademicGuide} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/vision-mission-goals",
    element: <Page component={VisionMisionGoals} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/curriculum",
    element: <Page component={Curriculum} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information",
    element: <Page component={StudentInformation} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/informatics",
    element: <Page component={StudentInformationFacultyInformatics} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/information-system",
    element: <Page component={StudentInformationFacultyInformationSystem} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/information-technology",
    element: (
      <Page component={StudentInformationFacultyInformationTechnology} />
    ),
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information",
    element: <Page component={StudentInformation} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/:id/grade/semester/:number",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information",
    element: <Page component={SupervisorInformation} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/informatics",
    element: <Page component={SupervisorInformatics} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/information-system",
    element: <Page component={SupervisorInformationSystem} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/information-technology",
    element: <Page component={SupervisorInformationTechnology} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/add-supervisor",
    element: <Page component={AddSupervisor} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/:id",
    element: <Page component={AdvisorProfile} />,
  },
  {
    path: "/add-supervisor/informatics",
    element: <Page component={InformaticsLS} />,
  },
  {
    path: "/add-supervisor/information-system",
    element: <Page component={InformationSytemLS} />,
  },
  {
    path: "/add-supervisor/information-technology",
    element: <Page component={InformationTechnologyLS} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/profile",
    element: <Page component={Profile} />,
  },
];

export default sekDekanRoutes;
