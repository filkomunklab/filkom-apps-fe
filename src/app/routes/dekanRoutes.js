import Dashboard from "app/pages/BimbinganAkademik/shared/Dashboard/Dashboard.";
import AcademicGuide from "app/pages/BimbinganAkademik/shared/AcademicGuide/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/shared/VisionMisionGoals/VisionMissionGoals";
import Curriculum from "app/pages/BimbinganAkademik/shared/Curriculum/Curriculum";
// import StudentInformation from "../pages/BimbinganAkademik/roles/Dekan/StudentInformation";
import StudentInformationMentored from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationMentored";
import StudentInformationFaculty from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty";
import StudentInformationFacultyPerMajor from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationFaculty/StudentPerMajor";
import StudentProfile from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentProfile";
import StudentCertificate from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentCertificate";
import CertificateDetail from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentCertificate/CertificateDetail";
import StudentGrade from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentGradeDashboard";
// import SupervisorInformation from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation";
// import AddSupervisor from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AddSupervisor";
// import InformaticsLS from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AddSupervisor/Informatics";
// import InformationSytemLS from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AddSupervisor/InformationSystem";
// import InformationTechnologyLS from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AddSupervisor/InformationTechnology";
// import AdvisorProfile from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorProfile";
// import EditStudent from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorProfile/EditStudent";
// import AdvisorHistory from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorHistory";
// import HistoryActivityAdvisor from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorHistory/HIstoryActivity";
// import HistoryGradeAdvisor from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorHistory/HistoryGrade";
// import HistoryPreRegistrationAdvisor from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorHistory/HistoryPreRegis";
// import HistoryCertificateAdvisor from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorHistory/HistoryCertificate";
// import HistoryConsultationAdvisor from "app/pages/BimbinganAkademik/roles/Dekan/SupervisorInformation/AdvisorHistory/HistoryConsultation";
import ReviewPreRegistration from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewPreRegistration/ReviewPreRegistration";
import ReviewPreRegistrationStudent from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewPreRegistration/ReviewPreRegistrationStudent/ReviewPreRegistrationStudent";
import ReviewCertificate from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewCertificate/ReviewCertificate";
import ReviewCertificateStudent from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewCertificate/DetailCertificate/ViewCertificate";
import StudentConsultation from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewStudentConsultation/StudentConsultation";
import ReplyConsultation from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewStudentConsultation/ReplyConsultation/Consultation";
import History from "app/pages/BimbinganAkademik/shared/History";
import HistoryActivity from "app/pages/BimbinganAkademik/shared/History/HIstoryActivity/HistoryActivity";
// import ListCourses from "app/pages/BimbinganAkademik/roles/Dekan/History/HistoryActivity/ListCourses";
// import ListStudent from "app/pages/BimbinganAkademik/roles/Dekan/History/HistoryActivity/ListCourses/ListStudent";
// import StudentPreRegis from "app/pages/BimbinganAkademik/roles/Dekan/History/HistoryActivity/ListCourses/ListStudent/StudentPreRegis";
// import ListStudentNotPreRegis from "app/pages/BimbinganAkademik/roles/Dekan/History/HistoryActivity/ListStudentNotPreRegis";
import HistoryPreRegistration from "app/pages/BimbinganAkademik/shared/History/HistoryPreRegis/ReviewPreRegistrationStudent";
import HistoryCertificate from "app/pages/BimbinganAkademik/shared/History/HistoryCertificate/Certificate";
// import HistoryGrade from "app/pages/BimbinganAkademik/roles/Dekan/History/HistoryGrade/HistoryGrade";
import HistoryConsultationComplete from "app/pages/BimbinganAkademik/shared/History/HistoryConsultation/ConsultationComplete";
import CurrentActivities from "app/pages/BimbinganAkademik/shared/CurrentActivities";
import ViewActivity from "app/pages/BimbinganAkademik/shared/CurrentActivities/ViewActivity/ViewActivity";
import ViewConsultation from "app/pages/BimbinganAkademik/shared/CurrentActivities/ViewConsultation/ViewConsultation";
import AddActivity from "app/pages/BimbinganAkademik/shared/AddActivity";
import Manage from "app/pages/BimbinganAkademik/shared/Manage/ManageDekan";

import SupervisorInformation from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation";
import AdvisorProfile from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/AdvisorProfile";
// import AdvisorProfileFaculty from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/AdvisorProfilFaculty";
import AdvisorStudentProfile from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/StudentProfile";
import AdvisorStudentGrade from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/StudentGradeDashboard";
import AdvisorStudentGrade2 from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/StudentGradeDashboard/StudentGrade";
import AdvisorStudentCertificate from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/StudentCertificate";
import AdvisorStudentCertificate2 from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/StudentCertificate/CertificateDetail";
import EditStudent from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorProfile/EditStudent";
import SupervisorInformatics from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/Informatics";
import SupervisorInformationSystem from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/InformationSystem";
import SupervisorInformationTechnology from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/InformationTechnology";
import AddSupervisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AddSupervisor";
import StudentList from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AddSupervisor/AddStudent";
import InformationSytemLS from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AddSupervisor/InformationSystem";
import InformationTechnologyLS from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AddSupervisor/AddStudent";
import AdvisorHistory from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory";
import HistoryActivityAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HIstoryActivity";
import HistoryGradeAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HistoryGrade";
import HistoryPreRegistrationAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HistoryPreRegis";
import HistoryCertificateAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HistoryCertificate";
import HistoryConsultationAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HistoryConsultation";
import CurriculumList from "app/pages/Obe/CurriculumList";
import Profile from "app/pages/BimbinganAkademik/shared/Profile/Profile";

const { default: Page } = require("@jumbo/shared/Page");

const dekanRoutes = [
  // ========================== BIMBINGAN AKADEMIK ROUTES ==========================
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
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/informatics/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/informatics/:id/grade/:id",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/informatics/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/informatics/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },

  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-system",
    element: <Page component={StudentInformationFacultyPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-system/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-system/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-system/:id/grade/:id",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-system/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-system/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },

  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-technology",
    element: <Page component={StudentInformationFacultyPerMajor} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-technology/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-technology/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-technology/:id/grade/:id",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-technology/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dekan/student-information/faculty-student/information-technology/:id/certificate/:id",
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
    path: "/bimbingan-akademik/dekan/review-activities/consultation",
    element: <Page component={StudentConsultation} />,
  },
  {
    path: "/bimbingan-akademik/dekan/review-activities/consultation/:id",
    element: <Page component={ReplyConsultation} />,
  },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information",
  //   element: <Page component={SupervisorInformation} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor",
  //   element: <Page component={AddSupervisor} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/:id",
  //   element: <Page component={AdvisorProfile} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/:id/edit-student",
  //   element: <Page component={EditStudent} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id",
  //   element: <Page component={AdvisorHistory} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/history-activity",
  //   element: <Page component={HistoryActivityAdvisor} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/history-grade",
  //   element: <Page component={HistoryGradeAdvisor} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/history-preregistration",
  //   element: <Page component={HistoryPreRegistrationAdvisor} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/history-certificate",
  //   element: <Page component={HistoryCertificateAdvisor} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/advisor-history/:id/history-consultation",
  //   element: <Page component={HistoryConsultationAdvisor} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor/informatics",
  //   element: <Page component={InformaticsLS} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor/information-system",
  //   element: <Page component={InformationSytemLS} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor/information-technology",
  //   element: <Page component={InformationTechnologyLS} />,
  // },
  {
    path: "/bimbingan-akademik/dekan/history",
    element: <Page component={History} />,
  },
  {
    path: "/bimbingan-akademik/dekan/history/activity",
    element: <Page component={HistoryActivity} />,
  },
  // {
  //   path: "/bimbingan-akademik/dekan/history/activity/list-courses/",
  //   element: <Page component={ListCourses} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/history/activity/list-courses/list-student/:id",
  //   element: <Page component={ListStudent} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/history/activity/list-courses/list-student/:id/student-preregistration",
  //   element: <Page component={StudentPreRegis} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/history/activity/list-student-not-preregistration",
  //   element: <Page component={ListStudentNotPreRegis} />,
  // },
  {
    path: "/bimbingan-akademik/dekan/history/pre-registration/:id",
    element: <Page component={HistoryPreRegistration} />,
  },
  {
    path: "/bimbingan-akademik/dekan/history/certificate/:id",
    element: <Page component={HistoryCertificate} />,
  },
  // {
  //   path: "/bimbingan-akademik/dekan/history/grade",
  //   element: <Page component={HistoryGrade} />,
  // },
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
    path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/:id/edit-student",
    element: <Page component={EditStudent} />,
  },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/advisor-profile/",
  //   element: <Page component={AdvisorProfileFaculty} />,
  // },
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
    path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor/student-list",
    element: <Page component={StudentList} />,
  },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor/information-system",
  //   element: <Page component={InformationSytemLS} />,
  // },
  // {
  //   path: "/bimbingan-akademik/dekan/supervisor-information/add-supervisor/information-technology",
  //   element: <Page component={InformationTechnologyLS} />,
  // },

  // ========================== OBE ROUTES ==========================
  {
    path: "/obe/curriculum/list/:major",
    element: <Page component={CurriculumList} />,
  },
  {
    path: "/obe/curriculum/:id/subject-list",
    // element: <Page component={StudentList} />,
  },
  {
    path: "/obe/subject/:id/cpl-mapping",
    // element: <Page component={StudentList} />,
  },
];

export default dekanRoutes;
