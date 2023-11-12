import Page from "@jumbo/shared/Page";
import Beranda from "app/pages/ThesisApps/Mahasiswa/BerandaGlobal";
import DaftarPengajuan from "app/pages/ThesisApps/Mahasiswa/DaftarPengajuan";
import Konsultasi from "app/pages/ThesisApps/Mahasiswa/Konsultasi";
import PengajuanJudul from "app/pages/ThesisApps/Mahasiswa/PengajuanJudul";

const mahasiswaRoutes = [
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan",
    element: <Page component={DaftarPengajuan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/beranda/:groupId/:role",
    element: <Page component={Beranda} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudul} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
];

export default mahasiswaRoutes;
