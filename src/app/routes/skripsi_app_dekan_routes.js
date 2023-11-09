import Page from "@jumbo/shared/Page";
import DaftarPengajuanJudulDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanJudulDekan";
import DaftarPengajuanProposalDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanProposalDekan";
import DaftarPengajuanSkripsiDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanSkripsiDekan";

const dekanRoutes = [
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan",
    element: <Page component={DaftarPengajuanJudulDekan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan",
    element: <Page component={DaftarPengajuanProposalDekan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan",
    element: <Page component={DaftarPengajuanSkripsiDekan} />,
  },
];

export default dekanRoutes;
