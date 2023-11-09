import Page from "@jumbo/shared/Page";
import DaftarPengajuanSkripsiKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarPengajuanSkripsiKaprodi";
import RiwayatSkripsiKaprodi from "app/pages/ThesisApps/Dosen/RiwayatSkripsiKaprodi";
import DaftarPengajuanJudulKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarPengajuanJudulKaprodi";
import DaftarPengajuanProposalKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarPengajuanProposalKaprodi";

const kaprodiRoutes = [
  {
    // daftar pengajuan judul kaprodi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi",
    element: <Page component={DaftarPengajuanJudulKaprodi} />,
  },
  {
    // daftar pengajuan proposal karpodi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi",
    element: <Page component={DaftarPengajuanProposalKaprodi} />,
  },
  {
    // daftar pengajuan Skripsi kaprodi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-kaprodi",
    element: <Page component={DaftarPengajuanSkripsiKaprodi} />,
  },
  {
    // daftar pengajuan riwayat kaprodi
    path: "/sistem-informasi-skripsi/riwayat-kaprodi",
    element: <Page component={RiwayatSkripsiKaprodi} />,
  },
];

export default kaprodiRoutes;
