import Page from "@jumbo/shared/Page";
import DaftarAlumni from "app/pages/Mahasiswa/KlabatBridge/DaftarAlumni";
import BerandaPengajuanJudul from "app/pages/ThesisApps/Mahasiswa/BerandaPengajuanJudul";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";
import BerandaSkripsiMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaSkripsiMahasiswa";
import DaftarPengajuan from "app/pages/ThesisApps/Mahasiswa/DaftarPengajuan";
import Konsultasi from "app/pages/ThesisApps/Mahasiswa/Konsultasi";
import PengajuanJudul from "app/pages/ThesisApps/Mahasiswa/PengajuanJudul";
import PengajuanJudulDiterima from "app/pages/ThesisApps/Mahasiswa/PengajuanJudulDiterima";
import BerandaPengajuanSkripsi from "app/pages/ThesisApps/Mahasiswa/BerandaPengajuanSkripsi";
import UploadProposal from "app/pages/ThesisApps/Mahasiswa/UploadProposal";
import UploadRevisiSkripsi from "app/pages/ThesisApps/Mahasiswa/UploadRevisiSkripsi";

const mahasiswaRoutes = [
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
    path: "/sistem-informasi-skripsi/daftar-pengajuan/konsultasi-mahasiswa",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/pengajuan-judul",
    element: <Page component={PengajuanJudul} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/pengajuan-judul-diterima",
    element: <Page component={PengajuanJudulDiterima} />,
  },
];

export default mahasiswaRoutes;
