import Dashboard from "app/pages/BimbinganAkademik/shared/Dashboard/DashboardDekan";
import AcademicGuide from "app/pages/BimbinganAkademik/shared/AcademicGuide/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/shared/VisionMisionGoals/VisionMissionGoals";
import Curriculum from "app/pages/BimbinganAkademik/shared/Curriculum/Curriculum";
import StudentInformationMentored from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationMentored";
import StudentInformationFaculty from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty";
import StudentProfile from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentProfile";
import StudentCertificate from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentCertificate";
import CertificateDetail from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentCertificate/CertificateDetail";
import StudentGrade from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentGradeDashboard";
import StudentInformationFacultyPerMajor from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor";
import StudentProfilePerMajor from "../pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor/StudentProfile/StudentProfile";
import StudentGradePerMajor from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor/StudentGradeDashboard/StudentGrade/StudentGrade";
import StudentCertificatePerMajor from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor/StudentCertificate/StudentCertificate";
import CertificateDetailPerMajor from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor/StudentCertificate/CertificateDetail/CertificateDetail";
import StudentGradeDashboardPerMajor from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor/StudentGradeDashboard/StudentGradeDashboard";
import ReviewPreRegistration from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewPreRegistration/ReviewPreRegistration";
import ReviewPreRegistrationStudent from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewPreRegistration/ReviewPreRegistrationStudent/ReviewPreRegistrationStudent";
import ReviewCertificate from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewCertificate/ReviewCertificate";
import ReviewCertificateStudent from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewCertificate/DetailCertificate/ViewCertificate";
import StudentConsultation from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewStudentConsultation/StudentConsultation";
import ReplyConsultation from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewStudentConsultation/ReplyConsultation/Consultation";
import History from "app/pages/BimbinganAkademik/shared/History";
import HistoryActivity from "app/pages/BimbinganAkademik/shared/History/HIstoryActivity/HistoryActivity";
import HistoryPreRegistration from "app/pages/BimbinganAkademik/shared/History/HistoryPreRegis/ReviewPreRegistrationStudent";
import HistoryCertificate from "app/pages/BimbinganAkademik/shared/History/HistoryCertificate/Certificate";
import HistoryConsultationComplete from "app/pages/BimbinganAkademik/shared/History/HistoryConsultation/ConsultationComplete";
import CurrentActivities from "app/pages/BimbinganAkademik/shared/CurrentActivities";
import ViewActivity from "app/pages/BimbinganAkademik/shared/CurrentActivities/ViewActivity/ViewActivity";
import ViewConsultation from "app/pages/BimbinganAkademik/shared/CurrentActivities/ViewConsultation/ViewConsultation";
import AddActivity from "app/pages/BimbinganAkademik/shared/AddActivity";
import Manage from "app/pages/BimbinganAkademik/shared/Manage/ManageDekan";
import SupervisorInformation from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/SupervisorInformation";
import AdvisorProfile from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorProfile/AdvisorProfile";
import AdvisorStudentProfile from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorProfile/StudentProfile";
import AdvisorStudentGrade from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorProfile/StudentGradeDashboard";
import AdvisorStudentGrade2 from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorProfile/StudentGradeDashboard/StudentGrade";
import AdvisorStudentCertificate from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorProfile/StudentCertificate";
import AdvisorStudentCertificate2 from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorProfile/StudentCertificate/CertificateDetail";
import AdvisorHistory from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorHistory";
import HistoryActivityAdvisor from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorHistory/HIstoryActivity/HistoryActivity";
import HistoryPreRegistrationAdvisor from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorHistory/HistoryPreRegis/ReviewPreRegistrationStudent";
import HistoryCertificateAdvisor from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorHistory/HistoryCertificate/Certificate";
import HistoryConsultationAdvisor from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorHistory/HistoryConsultation/ConsultationComplete";
import Profile from "app/pages/BimbinganAkademik/shared/Profile/Profile";
import PreregisStudentList from "app/pages/BimbinganAkademik/shared/Manage/Preregis/PreregisStudentList";
import PreregisCoursesList from "app/pages/BimbinganAkademik/shared/Manage/Preregis/PreregisCoursesList";

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
    path: "/bimbingan-akademik/dekan/student-information/mentored-student",
    element: <Page component={StudentInformationMentored} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/mentored-student/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/mentored-student/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/mentored-student/:id/grade/:id",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/mentored-student/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/mentored-student/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },

  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student",
    element: <Page component={StudentInformationFaculty} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/:id/grade/:id",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },

  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/informatics",
    element: <Page component={StudentInformationFacultyPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/informatics/:id",
    element: <Page component={StudentProfilePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/informatics/:id/grade",
    element: <Page component={StudentGradeDashboardPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/informatics/:id/grade/:id",
    element: <Page component={StudentGradePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/informatics/:id/certificate",
    element: <Page component={StudentCertificatePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/informatics/:id/certificate/:id",
    element: <Page component={CertificateDetailPerMajor} />,
  },

  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-system",
    element: <Page component={StudentInformationFacultyPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-system/:id",
    element: <Page component={StudentProfilePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-system/:id/grade",
    element: <Page component={StudentGradeDashboardPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-system/:id/grade/:id",
    element: <Page component={StudentGradePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-system/:id/certificate",
    element: <Page component={StudentCertificatePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-system/:id/certificate/:id",
    element: <Page component={CertificateDetailPerMajor} />,
  },

  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-technology",
    element: <Page component={StudentInformationFacultyPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-technology/:id",
    element: <Page component={StudentProfilePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-technology/:id/grade",
    element: <Page component={StudentGradeDashboardPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-technology/:id/grade/:id",
    element: <Page component={StudentGradePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-technology/:id/certificate",
    element: <Page component={StudentCertificatePerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-technology/:id/certificate/:id",
    element: <Page component={CertificateDetailPerMajor} />,
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
    path: "/bimbingan-akademik/dekan/review-activities/consultation",
    element: <Page component={StudentConsultation} />,
  },
  {
    path: "/bimbingan-akademik/dekan/review-activities/consultation/:id",
    element: <Page component={ReplyConsultation} />,
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
    path: "/bimbingan-akademik/dekan/history/pre-registration/:id",
    element: <Page component={HistoryPreRegistration} />,
  },
  {
    path: "/bimbingan-akademik/dekan/history/certificate/:id",
    element: <Page component={HistoryCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dekan/history/consultation/:id",
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
    path: "/bimbingan-akademik/dekan/current-activities/view-consultation/:id",
    element: <Page component={ViewConsultation} />,
  },
  {
    path: "/bimbingan-akademik/dekan/add-activity",
    element: <Page component={AddActivity} />,
  },
  {
    path: "/bimbingan-akademik/dekan/manage",
    element: <Page component={Manage} />,
  },
  {
    path: "/bimbingan-akademik/dekan/manage/list-courses/:id",
    element: <Page component={PreregisCoursesList} />,
  },
  {
    path: "/bimbingan-akademik/dekan/manage/list-student/:id",
    element: <Page component={PreregisStudentList} />,
  },
  {
    path: "/bimbingan-akademik/dekan/profile",
    element: <Page component={Profile} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information",
    element: <Page component={SupervisorInformation} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/:id",
    element: <Page component={AdvisorProfile} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/:id/student-profile",
    element: <Page component={AdvisorStudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/:id/student-grade",
    element: <Page component={AdvisorStudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/:id/grade/semester/:id",
    element: <Page component={AdvisorStudentGrade2} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/:id/student-certificate",
    element: <Page component={AdvisorStudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/:id/student-certificate/:id",
    element: <Page component={AdvisorStudentCertificate2} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id",
    element: <Page component={AdvisorHistory} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/:id/history-activity",
    element: <Page component={HistoryActivityAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/:id/history-preregistration",
    element: <Page component={HistoryPreRegistrationAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/:id/history-certificate",
    element: <Page component={HistoryCertificateAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/:id/history-consultation",
    element: <Page component={HistoryConsultationAdvisor} />,
  },
];

export default dekanRoutes;
