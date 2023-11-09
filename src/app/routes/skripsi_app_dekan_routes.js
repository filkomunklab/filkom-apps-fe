import Page from "@jumbo/shared/Page";
import DaftarPengajuanJudulDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanJudulDekan";
import DaftarPengajuanProposalDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanProposalDekan";
import DaftarPengajuanSkripsiDekan from "app/pages/ThesisApps/Dosen/DaftarPengajuanSkripsiDekan";
import RiwayatSkripsiDekan from "app/pages/ThesisApps/Dosen/RiwayatSkripsiDekan";

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
];

export default dekanRoutes;
