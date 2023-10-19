import Page from "@jumbo/shared/Page";
import AcademicGuide from "app/pages/BimbinganAkademik/Kaprodi/AcademicGuide";
import AddActivity from "app/pages/BimbinganAkademik/Kaprodi/AddActivity";
import Curriculum from "app/pages/BimbinganAkademik/Kaprodi/Curriculum";
import Dashboard from "app/pages/BimbinganAkademik/Kaprodi/Dashboard/Dashboard.";
import History from "app/pages/BimbinganAkademik/Kaprodi/History";
import StudentCertificate from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentCertificate";
import CertificateDetail from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentCertificate/CertificateDetail";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentGradeDashboard";
import StudentGrade from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentProfile from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentProfile";
import StudentInformationFaculty from "app/pages/BimbinganAkademik/Kaprodi/StudentInformationFaculty";
import StudentInformationMentored from "app/pages/BimbinganAkademik/Kaprodi/StudentInformationMentored";
import VisionMisionGoals from "app/pages/BimbinganAkademik/Kaprodi/VisionMisionGoals";
import DaftarAlumni from "app/pages/KlabatBridge/DaftarAlumni";

const kepalaProgramStudiRoutes = [
  {
    path: "/bimbingan-akademik/kaprodi/dashboard",
    element: <Page component={Dashboard} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/academic-guide",
    element: <Page component={AcademicGuide} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/vision-mission-goals",
    element: <Page component={VisionMisionGoals} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/curriculum",
    element: <Page component={Curriculum} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/mentored-student",
    element: <Page component={StudentInformationMentored} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/faculty-student",
    element: <Page component={StudentInformationFaculty} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/mentored-student/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/mentored-student/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/mentored-student/:id/grade/semester/:number",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/mentored-student/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/activity-history",
    element: <Page component={History} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/add-activity",
    element: <Page component={AddActivity} />,
  },
];

export default kepalaProgramStudiRoutes;
