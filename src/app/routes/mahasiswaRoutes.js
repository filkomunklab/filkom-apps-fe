import Page from "@jumbo/shared/Page";
import DaftarAlumni from "app/pages/Mahasiswa/KlabatBridge/DaftarAlumni";
import BerandaMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaMahasiswa";
import BerandaPengajuanJudul from "app/pages/ThesisApps/Mahasiswa/BerandaPengajuanJudul";
import DaftarPengajuan from "app/pages/ThesisApps/Mahasiswa/DaftarPengajuan";
import Konsultasi from "app/pages/ThesisApps/Mahasiswa/Konsultasi";
import PengajuanJudul from "app/pages/ThesisApps/Mahasiswa/PengajuanJudul";
import PengajuanJudulDiterima from "app/pages/ThesisApps/Mahasiswa/PengajuanJudulDiterima";
import UploadProposal from "app/pages/ThesisApps/Mahasiswa/UploadProposal";

const mahasiswaRoutes = [
  {
    // Thesis Apps Mahasiswa
    path: "/sistem-informasi-skripsi/daftar-pengajuan",
    element: <Page component={UploadProposal} />,
  },
];

export default mahasiswaRoutes;
