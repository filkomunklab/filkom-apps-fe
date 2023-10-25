import Page from "@jumbo/shared/Page";
// import DaftarAlumni from "app/pages/Mahasiswa/KlabatBridge/DaftarAlumni";
// import DaftarAlumni from "app/pages/KlabatBridge/DaftarAlumni";
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
import DaftarAlumni from "app/pages/Mahasiswa/KlabatBridge/DaftarAlumni";
import ArsipDocument from "app/pages/ThesisApps/Mahasiswa/ArsipDocument";
import BerandaPengajuanJudul from "app/pages/ThesisApps/Mahasiswa/BerandaPengajuanJudul";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";
import BerandaSkripsiMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaSkripsiMahasiswa";
import DaftarPengajuan from "app/pages/ThesisApps/Mahasiswa/DaftarPengajuan";
import Konsultasi from "app/pages/ThesisApps/Mahasiswa/Konsultasi";
import MetaDataRepository from "app/pages/ThesisApps/Mahasiswa/MetaDataRepository";
import PengajuanJudul from "app/pages/ThesisApps/Mahasiswa/PengajuanJudul";
import PengajuanJudulDiterima from "app/pages/ThesisApps/Mahasiswa/PengajuanJudulDiterima";
import BerandaPengajuanSkripsi from "app/pages/ThesisApps/Mahasiswa/BerandaPengajuanSkripsi";
import UploadProposal from "app/pages/ThesisApps/Mahasiswa/UploadProposal";
import UploadRevisiSkripsi from "app/pages/ThesisApps/Mahasiswa/UploadRevisiSkripsi";
import UploadSkipsi from "app/pages/ThesisApps/Mahasiswa/UploadSkripsi";
import UploadRevisiProposal from "app/pages/ThesisApps/Mahasiswa/UploadRevisiProposal";

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
    path: "/bimbingan-akademik/history/pre-registrationWaiting",
    element: <Page component={PreRegistrationWaiting} />,
  },
  {
    path: "/bimbingan-akademik/history/pre-registrationRejected",
    element: <Page component={PreRegistrationRejected} />,
  },
  {
    path: "/bimbingan-akademik/history/pre-registrationApproved",
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

  // MAHASISWA ROUTES FOR SKRIPSI APP ===============================================
  {
    // Thesis Apps Mahasiswa
    path: "/sistem-informasi-skripsi/daftar-pengajuan",
    element: <Page component={DaftarPengajuan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/beranda-pengajuan-skripsi",
    element: <Page component={BerandaPengajuanSkripsi} />,
  },
  // beranda pengajuan proposal dan skripsi = sama (hanya ganti isisan)
  {
    // router untuk konsultasi
    path: "/sistem-informasi-skripsi/daftar-pengajuan/konsultasi",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/pengajuan-judul",
    element: <Page component={PengajuanJudul} />,
  },
  // {
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan/pengajuan-judul-diterima",
  //   element: <Page component={PengajuanJudulDiterima} />,
  // },
  {
    // router untuk beranda pengajuan judul
    path: "/sistem-informasi-skripsi/daftar-pengajuan/beranda",
    element: <Page component={BerandaPengajuanJudul} />,
  },
  {
    // router untuk Upload Proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan/unggah-proposal",
    element: <Page component={UploadProposal} />,
  },
  {
    // router untuk Upload Revisi Proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan/unggah-revisi-proposal",
    element: <Page component={UploadRevisiProposal} />,
  },
  {
    // router untuk Upload Skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan/unggah-skripsi",
    element: <Page component={UploadSkipsi} />,
  },
  {
    // router untuk Upload revisi skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan/unggah-revisi-skripsi",
    element: <Page component={UploadRevisiSkripsi} />,
  },
  {
    // router untuk Upload Arsip Document
    path: "/sistem-informasi-skripsi/daftar-pengajuan/arsip-document",
    element: <Page component={ArsipDocument} />,
  },
  {
    // router untuk Upload MetaData Repository
    path: "/sistem-informasi-skripsi/daftar-pengajuan/metadata-repository",
    element: <Page component={MetaDataRepository} />,
  },
];

export default mahasiswaRoutes;
