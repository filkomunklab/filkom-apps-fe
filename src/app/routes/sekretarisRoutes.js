import AcademicGuide from "app/pages/BimbinganAkademik/shared/AcademicGuide/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/shared/VisionMisionGoals/VisionMissionGoals";
import Curriculum from "app/pages/BimbinganAkademik/shared/Curriculum/Curriculum";
import StudentInformationFaculty from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty";
import StudentProfile from "../pages/BimbinganAkademik/shared/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentCertificate";
import CertificateDetail from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentCertificate/CertificateDetail";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentGradeDashboard";

import StudentInformationFacultyPerMajor from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor/StudentPerMajor";
import StudentProfilePerMajor from "../pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor/StudentProfile/StudentProfile";
import StudentGradePerMajor from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor/StudentGradeDashboard/StudentGrade/StudentGrade";
import StudentCertificatePerMajor from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor/StudentCertificate/StudentCertificate";
import CertificateDetailPerMajor from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor/StudentCertificate/CertificateDetail/CertificateDetail";
import StudentGradeDashboardPerMajor from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor/StudentGradeDashboard/StudentGradeDashboard";
import Profile from "app/pages/BimbinganAkademik/shared/Profile/Profile";
import SupervisorInformation from "app/pages/BimbinganAkademik/roles/Sekretaris/SupervisorInformation/SekretarisSupervisorInformation";
import AdvisorProfile from "app/pages/BimbinganAkademik/roles/Sekretaris/SupervisorInformation/AdvisorProfile/AdvisorProfile";
import AdvisorStudentProfile from "app/pages/BimbinganAkademik/roles/Sekretaris/SupervisorInformation/AdvisorProfile/StudentProfile";
import AdvisorStudentGrade from "app/pages/BimbinganAkademik/roles/Sekretaris/SupervisorInformation/AdvisorProfile/StudentGradeDashboard";
import AdvisorStudentGrade2 from "app/pages/BimbinganAkademik/roles/Sekretaris/SupervisorInformation/AdvisorProfile/StudentGradeDashboard/StudentGrade";
import AdvisorStudentCertificate from "app/pages/BimbinganAkademik/roles/Sekretaris/SupervisorInformation/AdvisorProfile/StudentCertificate";
import AdvisorStudentCertificate2 from "app/pages/BimbinganAkademik/roles/Sekretaris/SupervisorInformation/AdvisorProfile/StudentCertificate/CertificateDetail";

const { default: Page } = require("@jumbo/shared/Page");

const sekFakultasRoutes = [
  {
    path: "/bimbingan-akademik/sekretaris/academic-guide",
    element: <Page component={AcademicGuide} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/vision-mission-goals",
    element: <Page component={VisionMisionGoals} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/curriculum",
    element: <Page component={Curriculum} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student",
    element: <Page component={StudentInformationFaculty} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/:id/grade/:id",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },

  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/informatics",
    element: <Page component={StudentInformationFacultyPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/informatics/:id",
    element: <Page component={StudentProfilePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/informatics/:id/grade",
    element: <Page component={StudentGradeDashboardPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/informatics/:id/grade/:id",
    element: <Page component={StudentGradePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/informatics/:id/certificate",
    element: <Page component={StudentCertificatePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/informatics/:id/certificate/:id",
    element: <Page component={CertificateDetailPerMajor} />,
  },

  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/information-system",
    element: <Page component={StudentInformationFacultyPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/information-system/:id",
    element: <Page component={StudentProfilePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/information-system/:id/grade",
    element: <Page component={StudentGradeDashboardPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/information-system/:id/grade/:id",
    element: <Page component={StudentGradePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/information-system/:id/certificate",
    element: <Page component={StudentCertificatePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/information-system/:id/certificate/:id",
    element: <Page component={CertificateDetailPerMajor} />,
  },

  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/information-technology",
    element: <Page component={StudentInformationFacultyPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/information-technology/:id",
    element: <Page component={StudentProfilePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/information-technology/:id/grade",
    element: <Page component={StudentGradeDashboardPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/information-technology/:id/grade/:id",
    element: <Page component={StudentGradePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/information-technology/:id/certificate",
    element: <Page component={StudentCertificatePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/student-information/faculty-student/information-technology/:id/certificate/:id",
    element: <Page component={CertificateDetailPerMajor} />,
  },

  {
    path: "/bimbingan-akademik/sekretaris/profile",
    element: <Page component={Profile} />,
  },

  {
    path: "/bimbingan-akademik/sekretaris/supervisor-information",
    element: <Page component={SupervisorInformation} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/supervisor-information/advisor-profile/:id",
    element: <Page component={AdvisorProfile} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/supervisor-information/advisor-profile/:id/student-profile",
    element: <Page component={AdvisorStudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/supervisor-information/advisor-profile/:id/student-grade",
    element: <Page component={AdvisorStudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/supervisor-information/advisor-profile/:id/grade/semester/:id",
    element: <Page component={AdvisorStudentGrade2} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/supervisor-information/advisor-profile/:id/student-certificate",
    element: <Page component={AdvisorStudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/sekretaris/supervisor-information/advisor-profile/:id/student-certificate/:id",
    element: <Page component={AdvisorStudentCertificate2} />,
  },
];

export default sekFakultasRoutes;
