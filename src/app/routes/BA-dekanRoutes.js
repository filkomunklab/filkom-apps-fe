import Dashboard from "../pages/BimbinganAkademik/Dekan/Dashboard";
import AcademicGuide from "app/layouts/shared/bimbingan-akademik/AcademicGuide/AcademicGuide";
import VisionMisionGoals from "app/layouts/shared/bimbingan-akademik/VisionMisionGoals/VisionMissionGoals";
import Curriculum from "app/layouts/shared/bimbingan-akademik/Curriculum/Curriculum";
import StudentInformation from "../pages/BimbinganAkademik/Dekan/StudentInformation";
import StudentInformationMentored from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentInformationMentored";
import StudentInformationFaculty from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentInformationFaculty";
import StudentInformationFacultyInformatics from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentInformationFaculty/Informatics";
import StudentInformationFacultyInformationSystem from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentInformationFaculty/InformationSystem";
import StudentInformationFacultyInformationTechnology from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentInformationFaculty/InformationTechnology";
import StudentProfile from "../pages/BimbinganAkademik/Dekan/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentCertificate";
import CertificateDetail from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentCertificate/CertificateDetail";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/Dekan/StudentInformation/StudentGradeDashboard";
import SupervisorInformation from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation";
import AddSupervisor from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AddSupervisor";
import InformaticsLS from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AddSupervisor/Informatics";
import InformationSytemLS from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AddSupervisor/InformationSystem";
import InformationTechnologyLS from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AddSupervisor/InformationTechnology";
import AdvisorProfile from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AdvisorProfile";
import EditStudent from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AdvisorProfile/EditStudent";
import AdvisorHistory from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AdvisorHistory";
import HistoryActivityAdvisor from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AdvisorHistory/HIstoryActivity";
import HistoryGradeAdvisor from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AdvisorHistory/HistoryGrade";
import HistoryPreRegistrationAdvisor from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AdvisorHistory/HistoryPreRegis";
import HistoryCertificateAdvisor from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AdvisorHistory/HistoryCertificate";
import HistoryConsultationAdvisor from "app/pages/BimbinganAkademik/Dekan/SupervisorInformation/AdvisorHistory/HistoryConsultation";
import ReviewPreRegistration from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewPreRegistration";
import ReviewPreRegistrationStudent from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewPreRegistration/ReviewPreRegistrationStudent";
import ReviewCertificate from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewCertificate/ReviewCertificate";
import ReviewCertificateStudent from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewCertificate/ReviewCertificateStudent";
import ReviewGrade from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewGrade";
import ReviewGradeStudent from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/ReviewGrade/ReviewGradeStudent";
import StudentConsultation from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/StudentConsultation";
import ReplyConsultation from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/StudentConsultation/ReplyConsultation/Consultation";
import History from "app/pages/BimbinganAkademik/Dekan/History";
import HistoryActivity from "app/pages/BimbinganAkademik/Dekan/History/HistoryActivity/HistoryActivity";
import HistoryPreRegistration from "app/pages/BimbinganAkademik/Dekan/History/HistoryPreRegis/PreRegistration";
import HistoryCertificate from "app/pages/BimbinganAkademik/Dekan/History/HistoryCertificate/Certificate";
import HistoryGrade from "app/pages/BimbinganAkademik/Dekan/History/HistoryGrade/HistoryGrade";
import HistoryConsultationComplete from "app/pages/BimbinganAkademik/Dekan/History/HistoryConsultation/ConsultationComplete";
import CurrentActivities from "app/pages/BimbinganAkademik/Dekan/CurrentActivities";
import ViewActivity from "app/pages/BimbinganAkademik/Dekan/CurrentActivities/ViewActivity/ViewActivity";
import ViewConsultation from "app/pages/BimbinganAkademik/Dekan/CurrentActivities/ViewConsultation/ViewConsultation";
import AddActivity from "app/pages/BimbinganAkademik/Dekan/AddActivity";
import Profile from "app/layouts/shared/bimbingan-akademik/Profile/Profile";

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
    path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor",
    element: <Page component={AddSupervisor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/:id",
    element: <Page component={AdvisorProfile} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/:id/edit-student",
    element: <Page component={EditStudent} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id",
    element: <Page component={AdvisorHistory} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/history-activity",
    element: <Page component={HistoryActivityAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/history-grade",
    element: <Page component={HistoryGradeAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/history-preregistration",
    element: <Page component={HistoryPreRegistrationAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/history-certificate",
    element: <Page component={HistoryCertificateAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/history-consultation",
    element: <Page component={HistoryConsultationAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor/informatics",
    element: <Page component={InformaticsLS} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor/information-system",
    element: <Page component={InformationSytemLS} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor/information-technology",
    element: <Page component={InformationTechnologyLS} />,
  },
  {
    path: "/bimbingan-akademik/dekan/history",
    element: <Page component={History} />,
  },
  {
    path: "/bimbingan-akademik/dekan/history/activity",
    element: <Page component={HistoryActivity} />,
  },
  {
    path: "/bimbingan-akademik/dekan/history/pre-registration",
    element: <Page component={HistoryPreRegistration} />,
  },
  {
    path: "/bimbingan-akademik/dekan/history/certificate",
    element: <Page component={HistoryCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dekan/history/grade",
    element: <Page component={HistoryGrade} />,
  },
  {
    path: "/bimbingan-akademik/dekan/history/consultation",
    element: <Page component={HistoryConsultationComplete} />,
  },
  {
    path: "/bimbingan-akademik/dekan/current-activities",
    element: <Page component={CurrentActivities} />,
  },
  {
    path: "/bimbingan-akademik/dekan/current-activities/view-activity",
    element: <Page component={ViewActivity} />,
  },
  {
    path: "/bimbingan-akademik/dekan/current-activities/view-consultation",
    element: <Page component={ViewConsultation} />,
  },
  {
    path: "/bimbingan-akademik/dekan/add-activity",
    element: <Page component={AddActivity} />,
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
