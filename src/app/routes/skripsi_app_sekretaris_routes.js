import Page from "@jumbo/shared/Page";
import DaftarPengajuanProposalSekretaris from "app/pages/ThesisApps/Sekertaris/DaftarPengajuanProposalSekertaris";
import JadwalSidangProposal from "app/pages/ThesisApps/Sekertaris/JadwalSidangProposal";
import JadwalSidangSkripsi from "app/pages/ThesisApps/Sekertaris/JadwalSidangSkripsi";

const sekretarisRoutes = [
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-sekretaris",
    element: <Page component={DaftarPengajuanProposalSekretaris} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-jadwal-sidang-proposal",
    element: <Page component={JadwalSidangProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-jadwal-sidang-skripsi",
    element: <Page component={JadwalSidangSkripsi} />,
  },
];

export default sekretarisRoutes;
