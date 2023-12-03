import Dashboard from "../pages/BimbinganAkademik/DosenPembimbing/Dashboard";
import AcademicGuide from "app/layouts/shared/bimbingan-akademik/AcademicGuide/AcademicGuide";
import VisionMisionGoals from "app/layouts/shared/bimbingan-akademik/VisionMisionGoals/VisionMissionGoals";
import Curriculum from "app/layouts/shared/bimbingan-akademik/Curriculum/Curriculum";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentGradeDashboard";
import StudentInformation from "../pages/BimbinganAkademik/DosenPembimbing/StudentInformation";
import StudentProfile from "../pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentCertificate";
import ReviewPreRegistration from "app/pages/BimbinganAkademik/DosenPembimbing/ReviewActivities/ReviewPreRegistration";
import ReviewPreRegistrationStudent from "app/pages/BimbinganAkademik/DosenPembimbing/ReviewActivities/ReviewPreRegistration/ReviewPreRegistrationStudent";
import ReviewCertificate from "app/pages/BimbinganAkademik/DosenPembimbing/ReviewActivities/ReviewCertificate/ReviewCertificate";
import ReviewCertificateStudent from "app/pages/BimbinganAkademik/DosenPembimbing/ReviewActivities/ReviewCertificate/ReviewCertificateStudent";
import History from "app/pages/BimbinganAkademik/DosenPembimbing/History";
import HistoryActivity from "app/pages/BimbinganAkademik/DosenPembimbing/History/HIstoryActivity/HistoryActivity";
import HistoryActivity1 from "app/pages/BimbinganAkademik/DosenPembimbing/History/HIstoryActivity/HistoryActivity1";
import HistoryActivity2 from "app/pages/BimbinganAkademik/DosenPembimbing/History/HIstoryActivity/HistoryActivity2";
import HistoryActivity3 from "app/pages/BimbinganAkademik/DosenPembimbing/History/HIstoryActivity/HistoryActivity3";
import HistoryPreRegistrationApproved from "app/pages/BimbinganAkademik/DosenPembimbing/History/HistoryPreRegis/PreRegistrationApproved";
import HistoryPreRegistrationRejected from "app/pages/BimbinganAkademik/DosenPembimbing/History/HistoryPreRegis/PreRegistrationRejected";
import HistoryCertificateApproved from "app/pages/BimbinganAkademik/DosenPembimbing/History/HistoryCertificate/CertificateApproved";
import HistoryCertificateRejected from "app/pages/BimbinganAkademik/DosenPembimbing/History/HistoryCertificate/CertificateRejected";
import HistoryConsultationComplete from "app/pages/BimbinganAkademik/DosenPembimbing/History/HistoryConsultation/ConsultationComplete";
import CertificateDetail from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentCertificate/CertificateDetail";
import StudentConsultation from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/StudentConsultation";
import ReplyConsultation from "app/pages/BimbinganAkademik/Dekan/ReviewActivities/StudentConsultation/ReplyConsultation/Consultation";
import CurrentActivities from "app/pages/BimbinganAkademik/DosenPembimbing/CurrentActivities";
import ViewActivity from "app/pages/BimbinganAkademik/DosenPembimbing/CurrentActivities/ViewActivity/ViewActivity";
import ViewConsultation from "app/pages/BimbinganAkademik/DosenPembimbing/CurrentActivities/ViewConsultation/ViewConsultation";
import AddActivity from "app/pages/BimbinganAkademik/DosenPembimbing/AddActivity";
import Profile from "app/layouts/shared/bimbingan-akademik/Profile/Profile";

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
    path: "/bimbingan-akademik/dosen-pembimbing/student-information",
    element: <Page component={StudentInformation} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/:id",
    element: <Page component={StudentProfile} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/:id/grade",
    element: <Page component={StudentGradeDashboard} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/:id/grade/semester/:number",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/:id/certificate",
    element: <Page component={StudentCertificate} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/student-information/:id/certificate/:id",
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
    path: "/bimbingan-akademik/dosen-pembimbing/history/activity1",
    element: <Page component={HistoryActivity1} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/history/activity2",
    element: <Page component={HistoryActivity2} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/history/activity3",
    element: <Page component={HistoryActivity3} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/history/pre-registration-approved",
    element: <Page component={HistoryPreRegistrationApproved} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/history/pre-registration-rejected",
    element: <Page component={HistoryPreRegistrationRejected} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/history/certificate-approved",
    element: <Page component={HistoryCertificateApproved} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/history/certificate-rejected",
    element: <Page component={HistoryCertificateRejected} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/history/consultation",
    element: <Page component={HistoryConsultationComplete} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/current-activities/view-activity",
    element: <Page component={ViewActivity} />,
  },
  {
    path: "/bimbingan-akademik/dosen-pembimbing/current-activities/view-consultation",
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
