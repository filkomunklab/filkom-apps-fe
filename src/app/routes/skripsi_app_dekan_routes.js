import Page from "@jumbo/shared/Page";
import DaftarPengajuanJudulDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanJudulDekan";
import DaftarPengajuanProposalDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanProposalDekan";

const dekanRoutes = [
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan",
    element: <Page component={DaftarPengajuanJudulDekan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan",
    element: <Page component={DaftarPengajuanProposalDekan} />,
  },
];

export default dekanRoutes;
