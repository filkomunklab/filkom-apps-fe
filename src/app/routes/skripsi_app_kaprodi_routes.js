import Page from "@jumbo/shared/Page";
import DaftarPengajuanSkripsiKaprodi from "app/pages/ThesisApps/Dosen/DaftarPengajuanSkripsiKaprodi";
import RiwayatSkripsiKaprodi from "app/pages/ThesisApps/Dosen/RiwayatSkripsiKaprodi";
import DaftarPengajuanJudulKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarPengajuanJudulKaprodi";
import DaftarPengajuanProposalKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarPengajuanProposalKaprodi";

const kaprodiRoutes = [
  /*================================================================================================================*/
  // KAPRODI

  // DAFTAR
  {
    // Daftar Pengajuan Judul Kaprodi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi",
    element: <Page component={DaftarPengajuanJudulKaprodi} />,
  },
  {
    // Daftar Pengajuan Proposal Karpodi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi",
    element: <Page component={DaftarPengajuanProposalKaprodi} />,
  },
  {
    // Daftar Pengajuan Skripsi Kaprodi
    path: "/sistem-informasi-skripsi/pengajuan-skripsi-kaprodi",
    element: <Page component={DaftarPengajuanSkripsiKaprodi} />,
  },

  // RIWAYAT
  {
    // Daftar Pengajuan Riwayat Kaprodi
    path: "/sistem-informasi-skripsi/riwayat-kaprodi",
    element: <Page component={RiwayatSkripsiKaprodi} />,
  },

  // PROPOSAL

  // SKRIPSI
];

export default kaprodiRoutes;
