import Page from "@jumbo/shared/Page";
import AcademicGuide from "app/pages/BimbinganAkademik/shared/AcademicGuide/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/shared/VisionMisionGoals/VisionMissionGoals";
import Curriculum from "app/pages/BimbinganAkademik/shared/Curriculum/Curriculum";
import AddActivity from "app/pages/BimbinganAkademik/roles/Kaprodi/AddActivity";
import Dashboard from "app/pages/BimbinganAkademik/roles/Kaprodi/Dashboard/Dashboard.";
import History from "app/pages/BimbinganAkademik/roles/DosenPembimbing/History";

import StudentCertificate from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationMentored/StudentCertificate/StudentCertificate";
import CertificateDetail from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationMentored/StudentCertificate/CertificateDetail/CertificateDetail";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationMentored/StudentGradeDashboard";
import StudentGrade from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationMentored/StudentGradeDashboard/StudentGrade";
import StudentProfile from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationMentored/StudentProfile/StudentProfile";
import StudentCertificate1 from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationFaculty/StudentCertificate/StudentCertificate";
import CertificateDetail1 from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationFaculty/StudentCertificate/CertificateDetail/CertificateDetail";
import StudentGradeDashboard1 from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationFaculty/StudentGradeDashboard/StudentGradeDashboard";
import StudentGrade1 from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationFaculty/StudentGradeDashboard/StudentGrade";
import StudentProfile1 from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationFaculty/StudentProfile/StudentProfile";
import StudentInformationFaculty from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationFaculty/StudentInformation";
import StudentInformationMentored from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationMentored/StudentInformation";
import StudentInformationFacultyInformatics from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationFaculty/Informatics";
import StudentInformationFacultyInformationSystem from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationFaculty/InformationSystem";
import StudentInformationFacultyInformationTechnology from "app/pages/BimbinganAkademik/roles/Kaprodi/StudentInformation/StudentInformationFaculty/InformationTechnology";
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
import InformaticsLS from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AddSupervisor/Informatics";
import InformationSytemLS from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AddSupervisor/InformationSystem";
import InformationTechnologyLS from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AddSupervisor/InformationTechnology";
import AdvisorHistory from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory";
import HistoryActivityAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HIstoryActivity";
import HistoryGradeAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HistoryGrade";
import HistoryPreRegistrationAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HistoryPreRegis";
import HistoryCertificateAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HistoryCertificate";
import HistoryConsultationAdvisor from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/AdvisorHistory/HistoryConsultation";

import CurrentActivities from "app/pages/BimbinganAkademik/shared/CurrentActivities";
import ViewActivity from "app/pages/BimbinganAkademik/shared/CurrentActivities/ViewActivity/ViewActivity";
import ViewConsultation from "app/pages/BimbinganAkademik/shared/CurrentActivities/ViewConsultation/ViewConsultation";
import HistoryActivity from "app/pages/BimbinganAkademik/roles/Kaprodi/History/HIstoryActivity/HistoryActivity";
import HistoryPreRegistrationApproved from "app/pages/BimbinganAkademik/roles/Kaprodi/History/HistoryPreRegis/PreRegistrationApproved";
import HistoryPreRegistrationRejected from "app/pages/BimbinganAkademik/roles/Kaprodi/History/HistoryPreRegis/PreRegistrationRejected";
import HistoryCertificateApproved from "app/pages/BimbinganAkademik/roles/Kaprodi/History/HistoryCertificate/CertificateApproved";
import HistoryCertificateRejected from "app/pages/BimbinganAkademik/roles/Kaprodi/History/HistoryCertificate/CertificateRejected";
import HistoryGradeApproved from "app/pages/BimbinganAkademik/roles/Kaprodi/History/HistoryGrade/ApprovedHistoryGrade";
import HistoryGradeRejected from "app/pages/BimbinganAkademik/roles/Kaprodi/History/HistoryGrade/RejectedHistoryGrade";
import HistoryConsultationComplete from "app/pages/BimbinganAkademik/roles/DosenPembimbing/History/HistoryConsultation/ConsultationComplete";
import ReviewPreRegistration from "app/pages/BimbinganAkademik/roles/Kaprodi/ReviewActivities/ReviewPreRegistration";
import ReviewPreRegistrationStudent from "app/pages/BimbinganAkademik/roles/Kaprodi/ReviewActivities/ReviewPreRegistration/ReviewPreRegistrationStudent";
import ReviewCertificate from "app/pages/BimbinganAkademik/roles/Kaprodi/ReviewActivities/ReviewCertificate/ReviewCertificate";
import ReviewCertificateStudent from "app/pages/BimbinganAkademik/roles/Kaprodi/ReviewActivities/ReviewCertificate/ReviewCertificateStudent";
import ReviewGrade from "app/pages/BimbinganAkademik/roles/Kaprodi/ReviewActivities/ReviewGrade";
import ReviewGradeStudent from "app/pages/BimbinganAkademik/roles/Kaprodi/ReviewActivities/ReviewGrade/ReviewGradeStudent";
import StudentConsultation from "app/pages/BimbinganAkademik/shared/ReviewActivites/StudentConsultation";
import ReplyConsultation from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReplyConsultation/Consultation";
import SupervisorStudentProfile from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/StudentProfile/StudentProfile";
import SupervisorStudentGradeDashboard from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/StudentProfile/StudentGradeDashboard";
import SupervisorStudentGrade from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/StudentProfile/StudentGradeDashboard/StudentGrade";
import SupervisorStudentCertificate from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/StudentProfile/StudentCertificate";
import SupervisorCertificateDetail from "app/pages/BimbinganAkademik/roles/Kaprodi/SupervisorInformation/StudentProfile/StudentCertificate/CertificateDetail";
import Profile from "app/pages/BimbinganAkademik/shared/Profile/Profile";

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
    path: "/bimbingan-akademik/kaprodi/student-information/mentored-student/:id/certificate/detail",
    element: <Page component={CertificateDetail} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/faculty-student/:id",
    element: <Page component={StudentProfile1} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/faculty-student/:id/grade",
    element: <Page component={StudentGradeDashboard1} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/faculty-student/:id/grade/semester/:number",
    element: <Page component={StudentGrade1} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/faculty-student/:id/certificate",
    element: <Page component={StudentCertificate1} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/student-information/faculty-student/:id/certificate/detail",
    element: <Page component={CertificateDetail1} />,
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
    path: "/bimbingan-akademik/kaprodi/history/pre-registration-approved",
    element: <Page component={HistoryPreRegistrationApproved} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history/pre-registration-rejected",
    element: <Page component={HistoryPreRegistrationRejected} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history/certificate-approved",
    element: <Page component={HistoryCertificateApproved} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history/certificate-rejected",
    element: <Page component={HistoryCertificateRejected} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history/grade-approved",
    element: <Page component={HistoryGradeApproved} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history/grade-rejected",
    element: <Page component={HistoryGradeRejected} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history/consultation/:id",
    element: <Page component={HistoryConsultationComplete} />,
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
    path: "/bimbingan-akademik/kaprodi/supervisor-information/informatics",
    element: <Page component={SupervisorInformatics} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/information-system",
    element: <Page component={SupervisorInformationSystem} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/information-technology",
    element: <Page component={SupervisorInformationTechnology} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/add-supervisor",
    element: <Page component={AddSupervisor} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/:id",
    element: <Page component={AdvisorProfile} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/:id/edit-student",
    element: <Page component={EditStudent} />,
  },
  // {
  //   path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/",
  //   element: <Page component={AdvisorProfileFaculty} />,
  // },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/:id/student-profile",
    element: <Page component={AdvisorStudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/:id/student-grade",
    element: <Page component={AdvisorStudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/:id/grade/semester/:id",
    element: <Page component={AdvisorStudentGrade2} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/:id/student-certificate",
    element: <Page component={AdvisorStudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/:id/student-certificate/:id",
    element: <Page component={AdvisorStudentCertificate2} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-history/:id",
    element: <Page component={AdvisorHistory} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-history/:id/history-activity",
    element: <Page component={HistoryActivityAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-history/:id/history-grade",
    element: <Page component={HistoryGradeAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-history/:id/history-preregistration",
    element: <Page component={HistoryPreRegistrationAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-history/:id/history-certificate",
    element: <Page component={HistoryCertificateAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-history/:id/history-consultation",
    element: <Page component={HistoryConsultationAdvisor} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/add-supervisor/informatics",
    element: <Page component={InformaticsLS} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/add-supervisor/information-system",
    element: <Page component={InformationSytemLS} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/add-supervisor/information-technology",
    element: <Page component={InformationTechnologyLS} />,
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
    path: "/bimbingan-akademik/kaprodi/current-activities/view-consultation/:id",
    element: <Page component={ViewConsultation} />,
  },

  {
    path: "/bimbingan-akademik/kaprodi/review-activities/pre-registration",
    element: <Page component={ReviewPreRegistration} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/review-activities/pre-registration/:id",
    element: <Page component={ReviewPreRegistrationStudent} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/review-activities/certificate",
    element: <Page component={ReviewCertificate} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/review-activities/certificate/:id",
    element: <Page component={ReviewCertificateStudent} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/review-activities/grade",
    element: <Page component={ReviewGrade} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/review-activities/grade/:id",
    element: <Page component={ReviewGradeStudent} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/review-activities/consultation",
    element: <Page component={StudentConsultation} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/review-activities/consultation/:id",
    element: <Page component={ReplyConsultation} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/profile",
    element: <Page component={Profile} />,
  },
];

export default kepalaProgramStudiRoutes;
