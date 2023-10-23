import Dashboard from "../pages/BimbinganAkademik/Dekan/Dashboard";
import AcademicGuide from "app/pages/BimbinganAkademik/Dekan/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/Dekan/VisionMisionGoals";
import Curriculum from "app/pages/BimbinganAkademik/Dekan/Curriculum/Curriculum";
import StudentInformation from "../pages/BimbinganAkademik/Dekan/StudentInformation";
import StudentInformationMentored from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentInformationMentored";
import StudentInformationFaculty from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentInformationFaculty";
import StudentInformationFacultyInformatics from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentInformationFaculty/Informatics";
import StudentInformationFacultyInformationSystem from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentInformationFaculty/InformationSystem";
import StudentInformationFacultyInformationTechnology from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentInformationFaculty/InformationTechnology";
import StudentProfile from "../pages/BimbinganAkademik/Dekan/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentCertificate";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentGradeDashboard";
import CertificateDetail from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentCertificate/CertificateDetail";
import ReviewPreRegistration from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewPreRegistration";
import ReviewPreRegistrationStudent from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewPreRegistration/ReviewPreRegistrationStudent";
import ReviewCertificate from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewCertificate/ReviewCertificate";
import ReviewCertificateStudent from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewCertificate/ReviewCertificateStudent";
import ReviewGrade from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewGrade";
import ReviewGradeStudent from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewGrade/ReviewGradeStudent";
import StudentConsultation from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/StudentConsultation";
import ReplyConsultation from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/StudentConsultation/ReplyConsultation/Consultation";
import SupervisorInformation from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation";
import SupervisorInformatics from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/Informatics";
import SupervisorInformationSystem from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/InformationSystem";
import SupervisorInformationTechnology from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/InformationTechnology";
import AddSupervisor from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AddSupervisor";
import InformaticsLS from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AddSupervisor/Informatics";
import InformationSytemLS from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AddSupervisor/InformationSystem";
import InformationTechnologyLS from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AddSupervisor/InformationTechnology";
import AdvisorProfile from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AdvisorProfile";
import Profile from "app/pages/BimbinganAkademik/Dekan/Profile";

const { default: Page } = require("@jumbo/shared/Page");

const dekanRoutes = [
  {
    path: "/bimbingan-akademik/dekan/dashboard",
    element: <Page component={Dashboard} />,
  },
  {
    path: "/bimbingan-akademik/dekan/academic-guide",
    element: <Page component={AcademicGuide} />,
  },
  {
    path: "/bimbingan-akademik/dekan/vision-mission-goals",
    element: <Page component={VisionMisionGoals} />,
  },
  {
    path: "/bimbingan-akademik/dekan/curriculum",
    element: <Page component={Curriculum} />,
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
  {
    path: "/bimbingan-akademik/dekan/review-activities/certificate",
    element: <Page component={ReviewCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dekan/review-activities/certificate/:id",
    element: <Page component={ReviewCertificateStudent} />,
  },
  {
    path: "/bimbingan-akademik/dekan/review-activities/grade",
    element: <Page component={ReviewGrade} />,
  },
  {
    path: "/bimbingan-akademik/dekan/review-activities/grade/:id",
    element: <Page component={ReviewGradeStudent} />,
  },
  {
    path: "/bimbingan-akademik/dekan/review-activities/consultation",
    element: <Page component={StudentConsultation} />,
  },
  {
    path: "/bimbingan-akademik/dekan/review-activities/consultation/:id",
    element: <Page component={ReplyConsultation} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information",
    element: <Page component={SupervisorInformation} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/informatics",
    element: <Page component={SupervisorInformatics} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/information-system",
    element: <Page component={SupervisorInformationSystem} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/information-technology",
    element: <Page component={SupervisorInformationTechnology} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor",
    element: <Page component={AddSupervisor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/:id",
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
    path: "/bimbingan-akademik/dekan/profile",
    element: <Page component={Profile} />,
  },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor/list-student/information-system",
  //   element: <Page component={AddSupervisor} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor/list-student/information-technology",
  //   element: <Page component={AddSupervisor} />,
  // },
];

export default dekanRoutes;
