import AcademicGuide from "app/pages/BimbinganAkademik/shared/AcademicGuide/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/shared/VisionMisionGoals/VisionMissionGoals";
import Curriculum from "app/pages/BimbinganAkademik/shared/Curriculum/Curriculum";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentGradeDashboard";
import StudentInformation from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentInformationMentored";
import StudentProfile from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentCertificate";
import ReviewPreRegistration from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewPreRegistration/ReviewPreRegistration";
import ReviewPreRegistrationStudent from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewPreRegistration/ReviewPreRegistrationStudent/ReviewPreRegistrationStudent";
import CertificateDetail from "app/pages/BimbinganAkademik/shared/StudentInformation/StudentCertificate/CertificateDetail";
import ReviewCertificate from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewCertificate/ReviewCertificate";
import ReviewCertificateStudent from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewCertificate/DetailCertificate/ViewCertificate";
import History from "app/pages/BimbinganAkademik/shared/History";
import HistoryActivity from "app/pages/BimbinganAkademik/shared/History/HIstoryActivity/HistoryActivity";
import HistoryPreRegistration from "app/pages/BimbinganAkademik/shared/History/HistoryPreRegis/ReviewPreRegistrationStudent";
import HistoryCertificate from "app/pages/BimbinganAkademik/shared/History/HistoryCertificate/Certificate";
import HistoryConsultationComplete from "app/pages/BimbinganAkademik/shared/History/HistoryConsultation/ConsultationComplete";
import StudentConsultation from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewStudentConsultation/StudentConsultation";
import ReplyConsultation from "app/pages/BimbinganAkademik/shared/ReviewActivites/ReviewStudentConsultation/ReplyConsultation/Consultation";
import CurrentActivities from "app/pages/BimbinganAkademik/shared/CurrentActivities";
import ViewActivity from "app/pages/BimbinganAkademik/shared/CurrentActivities/ViewActivity/ViewActivity";
import ViewConsultation from "app/pages/BimbinganAkademik/shared/CurrentActivities/ViewConsultation/ViewConsultation";
import AddActivity from "app/pages/BimbinganAkademik/shared/AddActivity";
import Profile from "app/pages/BimbinganAkademik/shared/Profile/Profile";
import Dashboard from "app/pages/BimbinganAkademik/shared/Dashboard/DashboardDospem";

const { default: Page } = require("@jumbo/shared/Page");

const dosenPembimbingRoutes = [
  {
    path: "/bimbingan-akademik/dosen-pembimbing/dashboard",
    element: <Page component={Dashboard} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/academic-guide",
    element: <Page component={AcademicGuide} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/vision-mission-goals",
    element: <Page component={VisionMisionGoals} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/curriculum",
    element: <Page component={Curriculum} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/mentored-student",
    element: <Page component={StudentInformation} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/mentored-student/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/mentored-student/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/mentored-student/:id/grade/:id",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/mentored-student/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/mentored-student/:id/certificate/:id",
    element: <Page component={CertificateDetail} />,
  },

  {
    path: "/bimbingan-akademik/dosen-pembimbing/review-activities/pre-registration",
    element: <Page component={ReviewPreRegistration} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/review-activities/pre-registration/:id",
    element: <Page component={ReviewPreRegistrationStudent} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/review-activities/certificate",
    element: <Page component={ReviewCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/review-activities/certificate/:id",
    element: <Page component={ReviewCertificateStudent} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/review-activities/consultation",
    element: <Page component={StudentConsultation} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/review-activities/consultation/:id",
    element: <Page component={ReplyConsultation} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/current-activities",
    element: <Page component={CurrentActivities} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/history",
    element: <Page component={History} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/history/activity",
    element: <Page component={HistoryActivity} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/history/pre-registration/:id",
    element: <Page component={HistoryPreRegistration} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/history/certificate/:id",
    element: <Page component={HistoryCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/history/consultation/:id",
    element: <Page component={HistoryConsultationComplete} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/current-activities/view-activity",
    element: <Page component={ViewActivity} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/current-activities/view-consultation/:id",
    element: <Page component={ViewConsultation} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/add-activity",
    element: <Page component={AddActivity} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/profile",
    element: <Page component={Profile} />,
  },
];

export default dosenPembimbingRoutes;
