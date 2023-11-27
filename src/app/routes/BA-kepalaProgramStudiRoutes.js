import Page from "@jumbo/shared/Page";
import AcademicGuide from "app/pages/BimbinganAkademik/Kaprodi/AcademicGuide";
import AddActivity from "app/pages/BimbinganAkademik/Kaprodi/AddActivity";
import Curriculum from "app/layouts/shared/bimbingan-akademik/Curriculum/Curriculum";
import Dashboard from "app/pages/BimbinganAkademik/Kaprodi/Dashboard/Dashboard.";
import History from "app/pages/BimbinganAkademik/Kaprodi/History";

import StudentCertificate from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationMentored/StudentCertificate/StudentCertificate";
import CertificateDetail from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationMentored/StudentCertificate/CertificateDetail/CertificateDetail";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationMentored/StudentGradeDashboard";
import StudentGrade from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationMentored/StudentGradeDashboard/StudentGrade";
import StudentProfile from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationMentored/StudentProfile/StudentProfile";

import StudentCertificate1 from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/StudentCertificate/StudentCertificate";
import CertificateDetail1 from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/StudentCertificate/CertificateDetail/CertificateDetail";
import StudentGradeDashboard1 from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/StudentGradeDashboard/StudentGradeDashboard";
import StudentGrade1 from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/StudentGradeDashboard/StudentGrade";
import StudentProfile1 from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/StudentProfile/StudentProfile";

import StudentInformationFaculty from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/StudentInformation";
import StudentInformationMentored from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationMentored/StudentInformation";
import StudentInformationFacultyInformatics from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/Informatics";
import StudentInformationFacultyInformationSystem from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/InformationSystem";
import StudentInformationFacultyInformationTechnology from "app/pages/BimbinganAkademik/Kaprodi/StudentInformation/StudentInformationFaculty/InformationTechnology";
import VisionMisionGoals from "app/pages/BimbinganAkademik/Kaprodi/VisionMisionGoals";

import SupervisorInformation from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation";
import AdvisorProfile from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/AdvisorProfile";
import SupervisorInformatics from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/Informatics";
import SupervisorInformationSystem from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/InformationSystem";
import SupervisorInformationTechnology from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/InformationTechnology";
import AddSupervisor from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/AddSupervisor";
import InformaticsLS from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/AddSupervisor/Informatics";
import InformationSytemLS from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/AddSupervisor/InformationSystem";
import InformationTechnologyLS from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/AddSupervisor/InformationTechnology";
import HistorySupervisor from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/History";

import CurrentActivities from "app/pages/BimbinganAkademik/Kaprodi/RecentActivities";
import ViewActivity from "app/pages/BimbinganAkademik/Kaprodi/RecentActivities/ViewActivity/ViewActivity";
import ViewConsultation from "app/pages/BimbinganAkademik/Kaprodi/RecentActivities/ViewConsultation/ViewConsultation";
import HistoryActivity from "app/pages/BimbinganAkademik/Kaprodi/History/HIstoryActivity/HistoryActivity";
import HistoryActivity1 from "app/pages/BimbinganAkademik/Kaprodi/History/HIstoryActivity/HistoryActivity1";
import HistoryActivity2 from "app/pages/BimbinganAkademik/Kaprodi/History/HIstoryActivity/HistoryActivity2";
import HistoryActivity3 from "app/pages/BimbinganAkademik/Kaprodi/History/HIstoryActivity/HistoryActivity3";
import HistoryPreRegistrationApproved from "app/pages/BimbinganAkademik/Kaprodi/History/HistoryPreRegis/PreRegistrationApproved";
import HistoryPreRegistrationRejected from "app/pages/BimbinganAkademik/Kaprodi/History/HistoryPreRegis/PreRegistrationRejected";
import HistoryCertificateApproved from "app/pages/BimbinganAkademik/Kaprodi/History/HistoryCertificate/CertificateApproved";
import HistoryCertificateRejected from "app/pages/BimbinganAkademik/Kaprodi/History/HistoryCertificate/CertificateRejected";
import HistoryGradeApproved from "app/pages/BimbinganAkademik/Kaprodi/History/HistoryGrade/ApprovedHistoryGrade";
import HistoryGradeRejected from "app/pages/BimbinganAkademik/Kaprodi/History/HistoryGrade/RejectedHistoryGrade";
import HistoryConsultationComplete from "app/pages/BimbinganAkademik/Kaprodi/History/HistoryConsultation/ConsultationComplete";
import AdvisorProfileFaculty from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/AdvisorProfile/AdvisorProfilFaculty";
import ReviewPreRegistration from "app/pages/BimbinganAkademik/Kaprodi/ReviewActivities/ReviewPreRegistration";
import ReviewPreRegistrationStudent from "app/pages/BimbinganAkademik/Kaprodi/ReviewActivities/ReviewPreRegistration/ReviewPreRegistrationStudent";
import ReviewCertificate from "app/pages/BimbinganAkademik/Kaprodi/ReviewActivities/ReviewCertificate/ReviewCertificate";
import ReviewCertificateStudent from "app/pages/BimbinganAkademik/Kaprodi/ReviewActivities/ReviewCertificate/ReviewCertificateStudent";
import ReviewGrade from "app/pages/BimbinganAkademik/Kaprodi/ReviewActivities/ReviewGrade";
import ReviewGradeStudent from "app/pages/BimbinganAkademik/Kaprodi/ReviewActivities/ReviewGrade/ReviewGradeStudent";
import StudentConsultation from "app/pages/BimbinganAkademik/Kaprodi/ReviewActivities/StudentConsultation";
import ReplyConsultation from "app/pages/BimbinganAkademik/Kaprodi/ReviewActivities/StudentConsultation/ReplyConsultation/Consultation";
import SupervisorStudentProfile from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/StudentProfile/StudentProfile";
import SupervisorStudentGradeDashboard from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/StudentProfile/StudentGradeDashboard";
import SupervisorStudentGrade from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/StudentProfile/StudentGradeDashboard/StudentGrade";
import SupervisorStudentCertificate from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/StudentProfile/StudentCertificate";
import SupervisorCertificateDetail from "app/pages/BimbinganAkademik/Kaprodi/SupervisorInformation/StudentProfile/StudentCertificate/CertificateDetail";
import Profile from "app/pages/BimbinganAkademik/Kaprodi/Profile";

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
    path: "/bimbingan-akademik/kaprodi/history/activity1",
    element: <Page component={HistoryActivity1} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history/activity2",
    element: <Page component={HistoryActivity2} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/history/activity3",
    element: <Page component={HistoryActivity3} />,
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
    path: "/bimbingan-akademik/kaprodi/history/consultation",
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
    path: "/bimbingan-akademik/kaprodi/supervisor-information/student-information/:id",
    element: <Page component={SupervisorStudentProfile} />,
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
    path: "/bimbingan-akademik/kaprodi/supervisor-information/advisor-profile/",
    element: <Page component={AdvisorProfileFaculty} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/:id/grade",
    element: <Page component={SupervisorStudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/:id/grade/semester/:number",
    element: <Page component={SupervisorStudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/:id/certificate",
    element: <Page component={SupervisorStudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/:id/certificate/detail",
    element: <Page component={SupervisorCertificateDetail} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/history/",
    element: <Page component={HistorySupervisor} />,
  },

  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/history/activity",
    element: <Page component={HistoryActivity} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/history/activity1",
    element: <Page component={HistoryActivity1} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/history/activity2",
    element: <Page component={HistoryActivity2} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/history/activity3",
    element: <Page component={HistoryActivity3} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/history/pre-registration-approved",
    element: <Page component={HistoryPreRegistrationApproved} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/history/pre-registration-rejected",
    element: <Page component={HistoryPreRegistrationRejected} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/history/certificate-approved",
    element: <Page component={HistoryCertificateApproved} />,
  },
  {
    path: "/bimbingan-akademik/kaprodi/supervisor-information/history/certificate-rejected",
    element: <Page component={HistoryCertificateRejected} />,
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
    path: "/bimbingan-akademik/kaprodi/current-activities/view-consultation",
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
