import Page from "@jumbo/shared/Page";
// import DaftarAlumni from "app/pages/Mahasiswa/KlabatBridge/DaftarAlumni";
import DaftarAlumni from "app/pages/KlabatBridge/DaftarAlumni";
import AcademicGuide from "app/pages/BimbinganAkademik/Mahasiswa/AcademicGuide";
import Certificate from "app/pages/BimbinganAkademik/Mahasiswa/Certificate";
import AddNewCertificate from "app/pages/BimbinganAkademik/Mahasiswa/Certificate/";
import CertificateWaiting from "app/pages/BimbinganAkademik/Mahasiswa/Certificate/CertificateWaiting";
import CertificateApproved from "app/pages/BimbinganAkademik/Mahasiswa/Certificate/CertificateApproved";
import CertificateRejected from "app/pages/BimbinganAkademik/Mahasiswa/Certificate/CertificateRejected";
import Consultation from "app/pages/BimbinganAkademik/Mahasiswa/Consultation";
import Curriculum from "app/pages/BimbinganAkademik/Mahasiswa/Curriculum";
import Grades from "app/pages/BimbinganAkademik/Mahasiswa/Grades";
import GradeSubmission from "app/pages/BimbinganAkademik/Mahasiswa/GradeSubmission";
import GradeSubmissionClosed from "app/pages/BimbinganAkademik/Mahasiswa/GradeSubmission/GradeSubmissionClosed";
import History from "app/pages/BimbinganAkademik/Mahasiswa/History";
import Activity from "app/pages/BimbinganAkademik/Mahasiswa/History/HIstoryActivity/HistoryActivity";
import ConsultationWaiting from "app/pages/BimbinganAkademik/Mahasiswa/History/HistoryConsultation/ConsultationWaiting";
import consultationOnProcess from "app/pages/BimbinganAkademik/Mahasiswa/History/HistoryConsultation/ConsultationOnProcess";
import ConsultationComplete from "app/pages/BimbinganAkademik/Mahasiswa/History/HistoryConsultation/ConsultationComplete";
import ApprovedHistoryGrade from "app/pages/BimbinganAkademik/Mahasiswa/History/HistoryGrade/ApprovedHistoryGrade";
import RejectedHistoryGrade from "app/pages/BimbinganAkademik/Mahasiswa/History/HistoryGrade/RejectedHistoryGrade";
import WaitingHistoryGrade from "app/pages/BimbinganAkademik/Mahasiswa/History/HistoryGrade/WaitingHistoryGrade";
import PreRegistration from "app/pages/BimbinganAkademik/Mahasiswa/PreRegistration";
import PreRegistrationClosedCase from "app/pages/BimbinganAkademik/Mahasiswa/PreRegistration/PreRegistrationClosedCase";
import PreRegistrationSubmitted from "app/pages/BimbinganAkademik/Mahasiswa/PreRegistration/PreRegistrationSubmitted";
import PreRegistrationWaiting from "app/pages/BimbinganAkademik/Mahasiswa/PreRegistration/PreRegistrationWaiting";
import PreRegistrationRejected from "app/pages/BimbinganAkademik/Mahasiswa/PreRegistration/PreRegistrationRejected";
import PreRegistrationApproved from "app/pages/BimbinganAkademik/Mahasiswa/PreRegistration/PreRegistrationApproved";
import Profile from "app/pages/BimbinganAkademik/Mahasiswa/Profile";
import VisionMisionGoals from "app/pages/BimbinganAkademik/Mahasiswa/VisionMisionGoals";
import StudentGrade from "app/pages/BimbinganAkademik/Mahasiswa/Grades/StudentGrade";

const mahasiswaRoutes = [
  {
    path: "/klabat-bridge/daftar-alumni",
    element: <Page component={DaftarAlumni} />,
  },
  {
    path: "/bimbingan-akademik/academic-guide",
    element: <Page component={AcademicGuide} />,
  },
  {
    path: "/bimbingan-akademik/certificates",
    element: <Page component={Certificate} />,
  },
  {
    path: "/bimbingan-akademik/certificates/add-new",
    element: <Page component={AddNewCertificate} />,
  },
  {
    path: "/bimbingan-akademik/history/student-certificate-waiting",
    element: <Page component={CertificateWaiting} />,
  },
  {
    path: "/bimbingan-akademik/history/student-certificate-approved",
    element: <Page component={CertificateApproved} />,
  },
  {
    path: "/bimbingan-akademik/history/student-certificate-rejected",
    element: <Page component={CertificateRejected} />,
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
    path: "/bimbingan-akademik/grades",
    element: <Page component={Grades} />,
  },
  {
    path: "/bimbingan-akademik/grades/studentgrade",
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
    path: "/bimbingan-akademik/pre-registration/pre-registrationWaiting",
    element: <Page component={PreRegistrationWaiting} />,
  },
  {
    path: "/bimbingan-akademik/pre-registration/pre-registrationRejected",
    element: <Page component={PreRegistrationRejected} />,
  },
  {
    path: "/bimbingan-akademik/pre-registration/pre-registrationApproved",
    element: <Page component={PreRegistrationApproved} />,
  },
  {
    path: "/bimbingan-akademik/history/activity",
    element: <Page component={Activity} />,
  },
  {
    path: "/bimbingan-akademik/history/consultationWaiting",
    element: <Page component={ConsultationWaiting} />,
  },
  {
    path: "/bimbingan-akademik/history/consultationOnProcess",
    element: <Page component={consultationOnProcess} />,
  },
  {
    path: "/bimbingan-akademik/history/consultationComplete",
    element: <Page component={ConsultationComplete} />,
  },
  {
    path: "/bimbingan-akademik/history/grade-approved",
    element: <Page component={ApprovedHistoryGrade} />,
  },
  {
    path: "/bimbingan-akademik/history/grade-rejected",
    element: <Page component={RejectedHistoryGrade} />,
  },
  {
    path: "/bimbingan-akademik/history/grade-waiting",
    element: <Page component={WaitingHistoryGrade} />,
  },
  {
    path: "/bimbingan-akademik/pre-registration",
    element: <Page component={PreRegistration} />,
  },
  {
    path: "/bimbingan-akademik/profile",
    element: <Page component={Profile} />,
  },
  {
    path: "/bimbingan-akademik/vision-mission-goals",
    element: <Page component={VisionMisionGoals} />,
  },
];

export default mahasiswaRoutes;
