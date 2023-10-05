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
import ConsultationWaiting from "app/pages/BimbinganAkademik/Mahasiswa/Consultation/ConsultationWaiting";
import consultationOnProcess from "app/pages/BimbinganAkademik/Mahasiswa/Consultation/ConsultationOnProcess";
import ConsultationComplete from "app/pages/BimbinganAkademik/Mahasiswa/Consultation/ConsultationComplete";
import Curriculum from "app/pages/BimbinganAkademik/Mahasiswa/Curriculum";
import Grades from "app/pages/BimbinganAkademik/Mahasiswa/Grades";
import GradeSubmission from "app/pages/BimbinganAkademik/Mahasiswa/GradeSubmission";
import History from "app/pages/BimbinganAkademik/Mahasiswa/History";
import PreRegistration from "app/pages/BimbinganAkademik/Mahasiswa/PreRegistration";
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
    path: "/bimbingan-akademik/certificates/student-certificate-waiting",
    element: <Page component={CertificateWaiting} />,
  },
  {
    path: "/bimbingan-akademik/certificates/student-certificate-approved",
    element: <Page component={CertificateApproved} />,
  },
  {
    path: "/bimbingan-akademik/certificates/student-certificate-rejected",
    element: <Page component={CertificateRejected} />,
  },
  {
    path: "/bimbingan-akademik/consultation",
    element: <Page component={Consultation} />,
  },
  {
    path: "/bimbingan-akademik/consultation/consultationWaiting",
    element: <Page component={ConsultationWaiting} />,
  },
  {
    path: "/bimbingan-akademik/consultation/consultationOnProcess",
    element: <Page component={consultationOnProcess} />,
  },
  {
    path: "/bimbingan-akademik/consultation/consultationComplete",
    element: <Page component={ConsultationComplete} />,
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
    path: "/bimbingan-akademik/history",
    element: <Page component={History} />,
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
