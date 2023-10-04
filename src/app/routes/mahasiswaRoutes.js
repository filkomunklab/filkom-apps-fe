import Page from "@jumbo/shared/Page";
import DaftarAlumni from "app/pages/Mahasiswa/KlabatBridge/DaftarAlumni";
import BerandaMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaMahasiswa";
import BerandaPengajuanJudul from "app/pages/ThesisApps/Mahasiswa/BerandaPengajuanJudul";
import DaftarMahasiswa from "app/pages/ThesisApps/Mahasiswa/DaftarMahasiswa";
import Konsultasi from "app/pages/ThesisApps/Mahasiswa/Konsultasi";
import PengajuanJudul from "app/pages/ThesisApps/Mahasiswa/PengajuanJudul";
import PengajuanJudulDiterima from "app/pages/ThesisApps/Mahasiswa/PengajuanJudulDiterima";
import UploadProposal from "app/pages/ThesisApps/Mahasiswa/UploadProposal";

const mahasiswaRoutes = [
  {
    path: "/klabat-bridge/daftar-alumni",
    element: <Page component={DaftarAlumni} />,
    // Thesis Apps Mahasiswa
    path: "/sistem-informasi-skripsi/daftar-pengajuan",
    element: <Page component={DaftarMahasiswa} />,
  },
];

export default mahasiswaRoutes;
