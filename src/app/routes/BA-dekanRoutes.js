import Dashboard from "../pages/BimbinganAkademik/Dekan/Dashboard";
import StudentInformationMentored from "app/pages/BimbinganAkademik/Dekan/StudentInformationMentored";
import StudentInformationFaculty from "app/pages/BimbinganAkademik/Dekan/StudentInformationFaculty";
import StudentInformationFacultyInformatics from "app/pages/BimbinganAkademik/Dekan/StudentInformationFaculty/Informatics";
import StudentInformationFacultyInformationSystem from "app/pages/BimbinganAkademik/Dekan/StudentInformationFaculty/InformationSystem";
import StudentInformationFacultyInformationTechnology from "app/pages/BimbinganAkademik/Dekan/StudentInformationFaculty/InformationTechnology";
import StudentInformation from "../pages/BimbinganAkademik/Dekan/StudentInformation";
import StudentProfile from "../pages/BimbinganAkademik/Dekan/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentCertificate";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentGradeDashboard";
import CertificateDetail from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentCertificate/CertificateDetail";
import ReviewPreRegistration from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewPreRegistration";
import ReviewPreRegistrationStudent from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewPreRegistration/ReviewPreRegistrationStudent";
//import SupervisorInformation from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation";
import AcademicGuide from "app/pages/BimbinganAkademik/Dekan/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/Dekan/VisionMisionGoals";
// import SupervisorInformation from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation";

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
    path: "/bimbingan-akademik/dekan/student-information-faculty/informatics",
    element: <Page component={StudentInformationFacultyInformatics} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information-faculty/information-system",
    element: <Page component={StudentInformationFacultyInformationSystem} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information-faculty/information-technology",
    element: (
      <Page component={StudentInformationFacultyInformationTechnology} />
    ),
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
    path: "/bimbingan-akademik/dekan/review-activities/pre-registration",
    element: <Page component={ReviewPreRegistration} />,
  },
  {
    path: "/bimbingan-akademik/dekan/review-activities/pre-registration/:id",
    element: <Page component={ReviewPreRegistrationStudent} />,
  },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information",
  //   element: <Page component={SupervisorInformation} />,
  // },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information",
    element: <Page component={SupervisorInformation} />,
  },
  {
    path: "/bimbingan-akademik/dekan/academic-guide",
    element: <Page component={AcademicGuide} />,
  },
  {
    path: "/bimbingan-akademik/dekan/vision-mission-goals",
    element: <Page component={VisionMisionGoals} />,
  },
];

export default dekanRoutes;
