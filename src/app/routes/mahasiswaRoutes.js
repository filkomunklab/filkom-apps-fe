import Page from "@jumbo/shared/Page";
import DaftarPengajuan from "app/pages/ThesisApps/Mahasiswa/DaftarPengajuan";
import BerandaPengajuanJudul from "app/pages/ThesisApps/Mahasiswa/BerandaPengajuanJudul";
import PengajuanJudul from "app/pages/ThesisApps/Mahasiswa/PengajuanJudul";
import PengajuanJudulDiterima from "app/pages/ThesisApps/Mahasiswa/PengajuanJudulDiterima";
import BerandaPengajuanSkripsi from "app/pages/ThesisApps/Mahasiswa/BerandaPengajuanSkripsi";
import Konsultasi from "app/pages/ThesisApps/Mahasiswa/Konsultasi";
import UploadProposal from "app/pages/ThesisApps/Mahasiswa/UploadProposal";
// ++ UploadRevisi

const mahasiswaRoutes = [
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan",
    element: <Page component={DaftarPengajuan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/beranda-pengajuan-judul",
    element: <Page component={BerandaPengajuanJudul} />,
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
