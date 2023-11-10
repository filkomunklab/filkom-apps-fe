import Page from "@jumbo/shared/Page";
import Beranda from "app/pages/ThesisApps/Mahasiswa/BerandaGlobal";
import DaftarPengajuan from "app/pages/ThesisApps/Mahasiswa/DaftarPengajuan";

const mahasiswaRoutes = [
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan",
    element: <Page component={DaftarPengajuan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/beranda/:groupId/:role",
    element: <Page component={Beranda} />,
  },
];

export default mahasiswaRoutes;
