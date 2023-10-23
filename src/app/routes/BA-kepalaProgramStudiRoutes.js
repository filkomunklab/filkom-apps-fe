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
import StudentInformationFaculty from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/StudentInformation";
import StudentInformationMentored from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationMentored/StudentInformation";
import StudentInformationFacultyInformatics from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/Informatics";
import StudentInformationFacultyInformationSystem from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/InformationSystem";
import StudentInformationFacultyInformationTechnology from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/InformationTechnology";
import VisionMisionGoals from "app/pages/BimbinganAkademik/Kaprodi/VisionMisionGoals";
import SupervisorInformation from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation";
import AdvisorProfile from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/AdvisorProfile";
import CurrentActivities from "app/pages/BimbinganAkademik/Kaprodi/RecentActivities";
import ViewActivity from "app/pages/BimbinganAkademik/Kaprodi/RecentActivities/ViewActivity/ViewActivity";
import ViewConsultation from "app/pages/BimbinganAkademik/Kaprodi/RecentActivities/ViewConsultation/ViewConsultation";
import HistoryActivity from "app/pages/BimbinganAkademik/Kaprodi/History/HIstoryActivity/HistoryActivity";

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
    path: "/bimbingan-akademik/kaprodi/student-information/faculty-student/informatics",
    element: <Page component={StudentInformationFacultyInformatics} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/faculty-student/information-system",
    element: <Page component={StudentInformationFacultyInformationSystem} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/faculty-student/information-technology",
    element: (
      <Page component={StudentInformationFacultyInformationTechnology} />
    ),
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
    path: "/bimbingan-akademik/kaprodi/student-information/mentored-student/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history",
    element: <Page component={History} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history/activity",
    element: <Page component={HistoryActivity} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history",
    element: <Page component={History} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history",
    element: <Page component={History} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history",
    element: <Page component={History} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history",
    element: <Page component={History} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/add-activity",
    element: <Page component={AddActivity} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information",
    element: <Page component={SupervisorInformation} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/:id",
    element: <Page component={AdvisorProfile} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/current-activities",
    element: <Page component={CurrentActivities} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/current-activities/view-activity",
    element: <Page component={ViewActivity} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/current-activities/view-consultation",
    element: <Page component={ViewConsultation} />,
  },
];

export default kepalaProgramStudiRoutes;
