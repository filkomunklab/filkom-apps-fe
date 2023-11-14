import Page from "@jumbo/shared/Page";
import DaftarPengajuanJudulDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanJudulDekan";
import DaftarPengajuanProposalDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanProposalDekan";
import DaftarPengajuanSkripsiDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanSkripsiDekan";
import DaftarRiwayatSkripsiDekan from "app/pages/ThesisApps/Dekan/DaftarRiwayatSkripsiDekan";

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
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan",
    element: <Page component={DaftarPengajuanSkripsiDekan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan",
    element: <Page component={DaftarRiwayatSkripsiDekan} />,
  },
];

export default dekanRoutes;
