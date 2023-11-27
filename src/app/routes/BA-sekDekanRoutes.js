import AcademicGuide from "app/pages/BimbinganAkademik/SekDekan/AcademicGuide/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/SekDekan/VisionMisionGoals";
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
import Profile from "app/pages/BimbinganAkademik/SekDekan/Profile";
import SupervisorInformation from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation";
import AdvisorProfile from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorProfile/AdvisorProfilFaculty";
import SupervisorInformatics from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/Informatics";
import SupervisorInformationSystem from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/InformationSystem";
import SupervisorInformationTechnology from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/InformationTechnology";
import AddSupervisor from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AddSupervisor";
import InformaticsLS from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AddSupervisor/Informatics";
import InformationSytemLS from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AddSupervisor/InformationSystem";
import InformationTechnologyLS from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AddSupervisor/InformationTechnology";
import HistorySupervisor from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History";
import HistoryActivity from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History/HIstoryActivity/HistoryActivity";
import HistoryActivity1 from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History/HIstoryActivity/HistoryActivity1";
import HistoryActivity2 from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History/HIstoryActivity/HistoryActivity2";
import HistoryActivity3 from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History/HIstoryActivity/HistoryActivity3";
import HistoryPreRegistrationApproved from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History/HistoryPreRegis/PreRegistrationApproved";
import HistoryPreRegistrationRejected from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History/HistoryPreRegis/PreRegistrationRejected";
import HistoryCertificateApproved from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History/HistoryCertificate/CertificateApproved";
import HistoryCertificateRejected from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History/HistoryCertificate/CertificateRejected";
// import HistoryGradeApproved from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History/HistoryGrade/ApprovedHistoryGrade";
// import HistoryGradeRejected from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History/HistoryGrade/RejectedHistoryGrade";
// import HistoryConsultationComplete from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/History/HistoryConsultation/ConsultationComplete";
import AdvisorProfileFaculty from "app/pages/BimbinganAkademik/SekDekan/SupervisorInformation/AdvisorProfile/AdvisorProfilFaculty";

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
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/",
    element: <Page component={AdvisorProfileFaculty} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/history",
    element: <Page component={HistorySupervisor} />,
  },

  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/history/activity",
    element: <Page component={HistoryActivity} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/history/activity1",
    element: <Page component={HistoryActivity1} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/history/activity2",
    element: <Page component={HistoryActivity2} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/history/activity3",
    element: <Page component={HistoryActivity3} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/history/pre-registration-approved",
    element: <Page component={HistoryPreRegistrationApproved} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/history/pre-registration-rejected",
    element: <Page component={HistoryPreRegistrationRejected} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/history/certificate-approved",
    element: <Page component={HistoryCertificateApproved} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/history/certificate-rejected",
    element: <Page component={HistoryCertificateRejected} />,
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
