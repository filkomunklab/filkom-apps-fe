import Page from "@jumbo/shared/Page";
import AcademicGuide from "app/pages/BimbinganAkademik/shared/AcademicGuide/AcademicGuide";
import VisionMisionGoals from "app/pages/BimbinganAkademik/shared/VisionMisionGoals/VisionMissionGoals";
import Certificate from "app/pages/BimbinganAkademik/roles/Mahasiswa/Certificate";
import Consultation from "app/pages/BimbinganAkademik/roles/Mahasiswa/Consultation";
import ConsultationComplete from "app/pages/BimbinganAkademik/roles/Mahasiswa/History/HistoryConsultation/ConsultationComplete";
import CurrentActivities from "app/pages/BimbinganAkademik/roles/Mahasiswa/CurrentActivities";
import CurrentActivitiesActivity from "app/pages/BimbinganAkademik/roles/Mahasiswa/CurrentActivities/Activity";
import CurrentActivitiesConsultation from "app/pages/BimbinganAkademik/roles/Mahasiswa/CurrentActivities/ViewConsultation/ViewConsultation";
import CurrentActivitiesPreRegis from "app/pages/BimbinganAkademik/roles/Mahasiswa/CurrentActivities/Pre-registration";
import CurrentActivitiesCertificate from "app/pages/BimbinganAkademik/roles/Mahasiswa/CurrentActivities/Certificate/ViewCertificate";
import CurrentActivitiesGrade from "app/pages/BimbinganAkademik/roles/Mahasiswa/CurrentActivities/Grade";
import Curriculum from "app/pages/BimbinganAkademik/roles/Mahasiswa/Curriculum";
import Grades from "app/pages/BimbinganAkademik/roles/Mahasiswa/Grades";
import GradeSubmission from "app/pages/BimbinganAkademik/roles/Mahasiswa/GradeSubmission";
import GradeSubmissionClosed from "app/pages/BimbinganAkademik/roles/Mahasiswa/GradeSubmission/GradeSubmissionClosed";
import History from "app/pages/BimbinganAkademik/roles/Mahasiswa/History";
import HistoryActivity from "app/pages/BimbinganAkademik/roles/Mahasiswa/History/HIstoryActivity/HistoryActivity";
import HistoryGradeApproved from "app/pages/BimbinganAkademik/roles/Mahasiswa/History/HistoryGrade/ApprovedHistoryGrade";
import HistoryGradeRejected from "app/pages/BimbinganAkademik/roles/Mahasiswa/History/HistoryGrade/RejectedHistoryGrade";
import HistoryPreRegistrationRejected from "app/pages/BimbinganAkademik/roles/Mahasiswa/History/HistoryPreRegis/PreRegistrationRejected";
import HistoryPreRegistrationApproved from "app/pages/BimbinganAkademik/roles/Mahasiswa/History/HistoryPreRegis/PreRegistrationApproved";
import HistoryCertificate from "app/pages/BimbinganAkademik/roles/Mahasiswa/History/HistoryCertificate/Certificate";
import PreRegistration from "app/pages/BimbinganAkademik/roles/Mahasiswa/PreRegistration";
import PreRegistrationClosedCase from "app/pages/BimbinganAkademik/roles/Mahasiswa/PreRegistration/PreRegistrationClosedCase";
import PreRegistrationSubmitted from "app/pages/BimbinganAkademik/roles/Mahasiswa/PreRegistration/PreRegistrationSubmitted";
import Profile from "app/pages/BimbinganAkademik/roles/Mahasiswa/Profile";
import StudentGrade from "app/pages/BimbinganAkademik/roles/Mahasiswa/Grades/StudentGrade";

const mahasiswaRoutes = [
  // {
  //   path: "/klabat-bridge/daftar-alumni",
  //   element: <Page component={DaftarAlumni} />,
  // },
  {
    path: "/bimbingan-akademik/academic-guide",
    element: <Page component={AcademicGuide} />,
  },
  {
    path: "/bimbingan-akademik/vision-mission-goals",
    element: <Page component={VisionMisionGoals} />,
  },
  {
    path: "/bimbingan-akademik/certificates",
    element: <Page component={Certificate} />,
  },
  {
    path: "/bimbingan-akademik/consultation",
    element: <Page component={Consultation} />,
  },
  {
    path: "/bimbingan-akademik/curriculum",
    element: <Page component={Curriculum} />,
  },
  {
    path: "/bimbingan-akademik/student-grade",
    element: <Page component={Grades} />,
  },
  {
    path: "/bimbingan-akademik/student-grade/:id/grade/semester/:number",
    element: <Page component={StudentGrade} />,
  },
  {
    path: "/bimbingan-akademik/grade-submission",
    element: <Page component={GradeSubmission} />,
  },

  {
    path: "/bimbingan-akademik/grade-submission-closed",
    element: <Page component={GradeSubmissionClosed} />,
  },
  {
    path: "/bimbingan-akademik/current-activities",
    element: <Page component={CurrentActivities} />,
  },
  {
    path: "/bimbingan-akademik/current-activities/activity",
    element: <Page component={CurrentActivitiesActivity} />,
  },
  {
    path: "/bimbingan-akademik/current-activities/pre-registration",
    element: <Page component={CurrentActivitiesPreRegis} />,
  },
  {
    path: "/bimbingan-akademik/current-activities/certificate/:id",
    element: <Page component={CurrentActivitiesCertificate} />,
  },
  {
    path: "/bimbingan-akademik/current-activities/grade",
    element: <Page component={CurrentActivitiesGrade} />,
  },
  {
    path: "/bimbingan-akademik/current-activities/consultation/:id",
    element: <Page component={CurrentActivitiesConsultation} />,
  },
  {
    path: "/bimbingan-akademik/history",
    element: <Page component={History} />,
  },
  {
    path: "/bimbingan-akademik/pre-registration/pre-registrationClosedCase",
    element: <Page component={PreRegistrationClosedCase} />,
  },
  {
    path: "/bimbingan-akademik/pre-registration/pre-registrationSubmitted",
    element: <Page component={PreRegistrationSubmitted} />,
  },
  {
    path: "/bimbingan-akademik/history/pre-registrationRejected",
    element: <Page component={HistoryPreRegistrationRejected} />,
  },
  {
    path: "/bimbingan-akademik/history/pre-registrationApproved",
    element: <Page component={HistoryPreRegistrationApproved} />,
  },
  {
    path: "/bimbingan-akademik/history/activity",
    element: <Page component={HistoryActivity} />,
  },
  {
    path: "/bimbingan-akademik/history/certificate/:id",
    element: <Page component={HistoryCertificate} />,
  },
  {
    path: "/bimbingan-akademik/history/consultation/:id",
    element: <Page component={ConsultationComplete} />,
  },
  {
    path: "/bimbingan-akademik/history/grade-approved",
    element: <Page component={HistoryGradeApproved} />,
  },
  {
    path: "/bimbingan-akademik/history/grade-rejected",
    element: <Page component={HistoryGradeRejected} />,
  },
  {
    path: "/bimbingan-akademik/pre-registration",
    element: <Page component={PreRegistration} />,
  },
  {
    path: "/bimbingan-akademik/profile",
    element: <Page component={Profile} />,
  },
];

export default mahasiswaRoutes;
