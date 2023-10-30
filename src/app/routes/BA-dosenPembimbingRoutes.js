import Dashboard from "../pages/BimbinganAkademik/DosenPembimbing/Dashboard";
import AcademicGuide from "app/pages/BimbinganAkademik/DosenPembimbing/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/DosenPembimbing/VisionMisionGoals";
import Curriculum from "app/pages/BimbinganAkademik/DosenPembimbing/Curriculum/Curriculum";
import StudentGradeDashboard from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentGradeDashboard";
import StudentInformation from "../pages/BimbinganAkademik/DosenPembimbing/StudentInformation";
import StudentProfile from "../pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentProfile";
import StudentGrade from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentGradeDashboard/StudentGrade";
import StudentCertificate from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentCertificate";
import ReviewPreRegistration from "app/pages/BimbinganAkademik/DosenPembimbing/ReviewActivities/ReviewPreRegistration";
import ReviewPreRegistrationStudent from "app/pages/BimbinganAkademik/DosenPembimbing/ReviewActivities/ReviewPreRegistration/ReviewPreRegistrationStudent";
import ReviewCertificate from "app/pages/BimbinganAkademik/DosenPembimbing/ReviewActivities/ReviewCertificate/ReviewCertificate";
import ReviewCertificateStudent from "app/pages/BimbinganAkademik/DosenPembimbing/ReviewActivities/ReviewCertificate/ReviewCertificateStudent";
import History from "../pages/BimbinganAkademik/DosenPembimbing/History";
import CertificateDetail from "app/pages/BimbinganAkademik/DosenPembimbing/StudentInformation/StudentCertificate/CertificateDetail";
import StudentConsultation from "app/pages/BimbinganAkademik/DosenPembimbing/ReviewActivities/StudentConsultation";
import ReplyConsultation from "app/pages/BimbinganAkademik/DosenPembimbing/ReviewActivities/StudentConsultation/ReplyConsultation/Consultation";
import CurrentActivities from "app/pages/BimbinganAkademik/DosenPembimbing/CurrentActivities";
import ViewActivity from "app/pages/BimbinganAkademik/DosenPembimbing/CurrentActivities/ViewActivity/ViewActivity";
import ViewConsultation from "app/pages/BimbinganAkademik/DosenPembimbing/CurrentActivities/ViewConsultation/ViewConsultation";
import AddActivity from "app/pages/BimbinganAkademik/DosenPembimbing/AddActivity";
import Profile from "app/pages/BimbinganAkademik/DosenPembimbing/Profile";

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
