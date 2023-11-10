import Page from "@jumbo/shared/Page";
import DaftarPengajuanJudulDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanJudulDekan";
import DaftarPengajuanProposalDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanProposalDekan";
<<<<<<< HEAD
import DaftarPengajuanSkripsiDekan from "app/pages/ThesisApps/Dosen/DaftarPengajuanSkripsiDekan";
import RiwayatSkripsiDekan from "app/pages/ThesisApps/Dosen/RiwayatSkripsiDekan";
=======
import DaftarPengajuanSkripsiDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanSkripsiDekan";
import DaftarRiwayatSkripsiDekan from "app/pages/ThesisApps/Dekan/DaftarRiwayatSkripsiDekan";
>>>>>>> 81f2205cec0482e82e52c71638cff83632d4e9e5

const dekanRoutes = [
  /*================================================================================================================*/
  //  DEKAN

  // DAFTAR
  {
    // Daftar Pengajuan Judul Dekan
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan",
    element: <Page component={DaftarPengajuanJudulDekan} />,
  },
  {
    // Daftar Pengajuan Proposal Dekan
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan",
    element: <Page component={DaftarPengajuanProposalDekan} />,
  },
  {
<<<<<<< HEAD
    // Daftar Pengajuan Skripsi Dekan
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan",
    element: <Page component={DaftarPengajuanSkripsiDekan} />,
  },

  // RIWAYAT
  {
    // daftar pengajuan riwayat dekan
    path: "/sistem-informasi-skripsi/riwayat-dekan",
    element: <Page component={RiwayatSkripsiDekan} />,
  },

  // PROPOSAL

  // SKRISPI
=======
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan",
    element: <Page component={DaftarPengajuanSkripsiDekan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan",
    element: <Page component={DaftarRiwayatSkripsiDekan} />,
  },
>>>>>>> 81f2205cec0482e82e52c71638cff83632d4e9e5
];

export default dekanRoutes;
