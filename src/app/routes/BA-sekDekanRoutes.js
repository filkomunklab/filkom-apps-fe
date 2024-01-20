import AcademicGuide from "app/pages/BimbinganAkademik/shared/AcademicGuide/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/shared/VisionMisionGoals/VisionMissionGoals";
import Curriculum from "app/pages/BimbinganAkademik/shared/Curriculum/Curriculum";
import StudentInformationFaculty from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty";
import StudentInformationFacultyPerMajor from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor";
// import StudentInformationFacultyInformationSystem from "app/pages/BimbinganAkademik/roles/SekDekan/StudentInformation/StudentInformationFaculty/InformationSystem";
// import StudentInformationFacultyInformationTechnology from "app/pages/BimbinganAkademik/roles/SekDekan/StudentInformation/StudentInformationFaculty/InformationTechnology";
import StudentProfile from "../pages/BimbinganAkademik/shared/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentCertificate";
import CertificateDetail from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentCertificate/CertificateDetail";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentGradeDashboard";
import Profile from "app/pages/BimbinganAkademik/shared/Profile/Profile";
import SupervisorInformation from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation";
import AdvisorProfile from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/AdvisorProfile";
import AdvisorStudentProfile from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/StudentProfile";
import AdvisorStudentGrade from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/StudentGradeDashboard";
import AdvisorStudentGrade2 from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/StudentGradeDashboard/StudentGrade";
import AdvisorStudentCertificate from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/StudentCertificate";
import AdvisorStudentCertificate2 from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/StudentCertificate/CertificateDetail";
import EditStudent from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/EditStudent";
import AddSupervisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AddSupervisor";
import StudentList from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AddSupervisor/AddStudent";
import AdvisorHistory from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory";
import HistoryActivityAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HIstoryActivity";
import HistoryGradeAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HistoryGrade";
import HistoryPreRegistrationAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HistoryPreRegis";
import HistoryCertificateAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HistoryCertificate";
import HistoryConsultationAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HistoryConsultation";

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
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student",
    element: <Page component={StudentInformationFaculty} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/:id/grade/:id",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },

  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/informatics",
    element: <Page component={StudentInformationFacultyPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/informatics/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/informatics/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/informatics/:id/grade/:id",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/informatics/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/informatics/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },

  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/information-system",
    element: <Page component={StudentInformationFacultyPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/information-system/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/information-system/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/information-system/:id/grade/:id",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/information-system/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/information-system/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },

  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/information-technology",
    element: <Page component={StudentInformationFacultyPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/information-technology/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/information-technology/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/information-technology/:id/grade/:id",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/information-technology/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/student-information/faculty-student/information-technology/:id/certificate/:id",
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
  // {
  //   path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/",
  //   element: <Page component={AdvisorProfileFaculty} />,
  // },
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
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/:id/student-certificate",
    element: <Page component={AdvisorStudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/advisor-profile/:id/student-certificate/:id",
    element: <Page component={AdvisorStudentCertificate2} />,
  },
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
    path: "/bimbingan-akademik/sek-dekan/supervisor-information/add-supervisor/student-list",
    element: <Page component={StudentList} />,
  },
];

export default sekDekanRoutes;
