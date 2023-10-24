import Page from "@jumbo/shared/Page";

// import DaftarDosen from "app/pages/ThesisApps/Dosen/DaftarDosen";
import DaftarPengajuanJudulDosen from "app/pages/ThesisApps/Dosen/DaftarPengajuanJudulDosen";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";

const dosenRoutes = [
  // Thesis Apps Dosen
  {
    // !!! belum ada isi
    // path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen",
    // element: <Page component={DaftarDosen} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen",
    element: <Page component={DaftarPengajuanJudulDosen} />,
  },
  // {
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen/pengajuan-judul",
  //   element: <Page component={PengajuanJudulDosen} />,
  // },
  // DosenSkripsi
  {
    // Daftar Komite Judul
    path: "/sistem-informasi-skripsi/komite-judul-dosen",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis} />,
  },
];

export default dosenRoutes;
