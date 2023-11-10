import Page from "@jumbo/shared/Page";
import DaftarPengajuanSkripsiKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarPengajuanSkripsiKaprodi";
import DaftarRiwayatSkripsiKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarRiwayatSkripsiKaprodi";
import DaftarPengajuanJudulKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarPengajuanJudulKaprodi";
import DaftarPengajuanProposalKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarPengajuanProposalKaprodi";
import BerandaGlobal from "app/pages/ThesisApps/Mahasiswa/BerandaGlobal";
import RiwayatSkripsiKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarRiwayatSkripsiKaprodi";

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
    // daftar pengajuan Skripsi kaprodi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-kaprodi",
    element: <Page component={DaftarPengajuanSkripsiKaprodi} />,
  },

  // RIWAYAT
  {
    // Daftar Pengajuan Riwayat Kaprodi
    path: "/sistem-informasi-skripsi/riwayat-kaprodi",
    element: <Page component={RiwayatSkripsiKaprodi} />,
  },

  // PENGAJUAN JUDUL
  {
    // Beranda
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi/beranda/:id/:role",
    element: <Page component={BerandaGlobal} />,
  },

  // PROPOSAL
  {
    // Beranda
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi/beranda/:id/:role",
    element: <Page component={BerandaGlobal} />,
  },
  // SKRIPSI
];

export default kaprodiRoutes;
