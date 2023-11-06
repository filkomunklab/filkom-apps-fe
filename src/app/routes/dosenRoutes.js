import Page from "@jumbo/shared/Page";
import DaftarPengajuanJudulDekan from "app/pages/ThesisApps/Dosen/DaftarPengajuanJudulDekan";

// import DaftarDosen from "app/pages/ThesisApps/Dosen/DaftarDosen";
import DaftarPengajuanJudulDosen from "app/pages/ThesisApps/Dosen/DaftarPengajuanJudulDosen";
import DaftarPengajuanJudulKaprodi from "app/pages/ThesisApps/Dosen/DaftarPengajuanJudulKaprodi";
import DaftarPengajuanProposalDekan from "app/pages/ThesisApps/Dosen/DaftarPengajuanProposalDekan";
import DaftarPengajuanProposalKaprodi from "app/pages/ThesisApps/Dosen/DaftarPengajuanProposalKaprodi";
import DaftarPengajuanSkripsiDekan from "app/pages/ThesisApps/Dosen/DaftarPengajuanSkripsiDekan";
import DaftarPengajuanSkripsiKaprodi from "app/pages/ThesisApps/Dosen/DaftarPengajuanSkripsiKaprodi";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";
import RiwayatSkripsiDekan from "app/pages/ThesisApps/Dosen/RiwayatSkripsiDekan";
import RiwayatSkripsiKaprodi from "app/pages/ThesisApps/Dosen/RiwayatSkripsiKaprodi";
import RiwayatBimbingan from "app/shared/Header/RiwayatBimbingan";

const dosenRoutes = [
  // Thesis Apps Dosen
  {
    // !!! belum ada isi
    // path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen",
    // element: <Page component={DaftarDosen} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-komite-judul-dosen",
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
    element: <Page component={DaftarPengajuanJudulDosen} />,
  },

  // user dekan
  {
    // daftar pengajuan judul dekan
    path: "/sistem-informasi-skripsi/pengajuan-judul-dekan",
    element: <Page component={DaftarPengajuanJudulDekan} />,
  },
  {
    // daftar pengajuan proposal dekan
    path: "/sistem-informasi-skripsi/pengajuan-proposal-dekan",
    element: <Page component={DaftarPengajuanProposalDekan} />,
  },
  {
    // daftar pengajuan skripsi dekan
    path: "/sistem-informasi-skripsi/pengajuan-skripsi-dekan",
    element: <Page component={DaftarPengajuanSkripsiDekan} />,
  },
  {
    // daftar pengajuan riwayat dekan
    path: "/sistem-informasi-skripsi/riwayat-dekan",
    element: <Page component={RiwayatSkripsiDekan} />,
  },

  // user kaprodi
  {
    // daftar pengajuan judul kaprodi
    path: "/sistem-informasi-skripsi/pengajuan-judul-kaprodi",
    element: <Page component={DaftarPengajuanJudulKaprodi} />,
  },
  {
    // daftar pengajuan proposal kaprodi
    path: "/sistem-informasi-skripsi/pengajuan-proposal-kaprodi",
    element: <Page component={DaftarPengajuanProposalKaprodi} />,
  },
  {
    // daftar pengajuan Skripsi kaprodi
    path: "/sistem-informasi-skripsi/pengajuan-skripsi-kaprodi",
    element: <Page component={DaftarPengajuanSkripsiKaprodi} />,
  },
  {
    // daftar pengajuan riwayat kaprodi
    path: "/sistem-informasi-skripsi/riwayat-kaprodi",
    element: <Page component={RiwayatSkripsiKaprodi} />,
  },
];

export default dosenRoutes;
