import AcademicGuide from "app/layouts/shared/bimbingan-akademik/AcademicGuide/AcademicGuide";
import VisionMisionGoals from "app/layouts/shared/bimbingan-akademik/VisionMisionGoals/VisionMissionGoals";
import Curriculum from "app/layouts/shared/bimbingan-akademik/Curriculum/Curriculum";
import StudentInformation from "app/pages/BimbinganAkademik/SekDekan/StudentInformation";
import StudentInformationFacultyInformatics from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentInformationFaculty/Informatics";
import StudentInformationFacultyInformationSystem from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentInformationFaculty/InformationSystem";
import StudentInformationFacultyInformationTechnology from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentInformationFaculty/InformationTechnology";
import StudentProfile from "../pages/BimbinganAkademik/SekDekan/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentCertificate";
import CertificateDetail from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentCertificate/CertificateDetail";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/SekDekan/StudentInformation/StudentGradeDashboard";
import Profile from "app/layouts/shared/bimbingan-akademik/Profile/Profile";
import SupervisorInformation from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation";
import AdvisorProfile from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorProfile/AdvisorProfilFaculty";
import EditStudent from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorProfile/EditStudent";
import SupervisorInformatics from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/Informatics";
import SupervisorInformationSystem from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/InformationSystem";
import SupervisorInformationTechnology from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/InformationTechnology";
import AddSupervisor from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AddSupervisor";
import InformaticsLS from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AddSupervisor/Informatics";
import InformationSytemLS from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AddSupervisor/InformationSystem";
import InformationTechnologyLS from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AddSupervisor/InformationTechnology";
import AdvisorHistory from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorHistory";
import HistoryActivityAdvisor from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorHistory/HIstoryActivity";
import HistoryGradeAdvisor from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorHistory/HistoryGrade";
import HistoryPreRegistrationAdvisor from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorHistory/HistoryPreRegis";
import HistoryCertificateAdvisor from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorHistory/HistoryCertificate";
import HistoryConsultationAdvisor from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorHistory/HistoryConsultation";
import AdvisorProfileFaculty from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorProfile/AdvisorProfilFaculty";
import AdvisorStudentProfile from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorProfile/StudentProfile";
import AdvisorStudentGrade from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorProfile/StudentGradeDashboard";
import AdvisorStudentGrade2 from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorProfile/StudentGradeDashboard/StudentGrade";
// import AdvisorStudentCertificate from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorProfile/StudentCertificate";

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
    path: "/bimbingan-akademik/sek-dekan/profile",
    element: <Page component={Profile} />,
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
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/:id/edit-student",
    element: <Page component={EditStudent} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/",
    element: <Page component={AdvisorProfileFaculty} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/:id/student-profile",
    element: <Page component={AdvisorStudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/:id/student-grade",
    element: <Page component={AdvisorStudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/:id/grade/semester/:id",
    element: <Page component={AdvisorStudentGrade2} />,
  },
  // {
  //   path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/student-certificate",
  //   element: <Page component={AdvisorStudentCertificate} />,
  // },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/:id",
    element: <Page component={AdvisorHistory} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/:id/history-activity",
    element: <Page component={HistoryActivityAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/:id/history-grade",
    element: <Page component={HistoryGradeAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/:id/history-preregistration",
    element: <Page component={HistoryPreRegistrationAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/:id/history-certificate",
    element: <Page component={HistoryCertificateAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-history/:id/history-consultation",
    element: <Page component={HistoryConsultationAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/add-supervisor/informatics",
    element: <Page component={InformaticsLS} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/add-supervisor/information-system",
    element: <Page component={InformationSytemLS} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/add-supervisor/information-technology",
    element: <Page component={InformationTechnologyLS} />,
  },
];

export default sekDekanRoutes;
