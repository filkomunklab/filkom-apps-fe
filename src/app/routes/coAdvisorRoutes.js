import Page from "@jumbo/shared/Page";
import DaftarBimbinganProposalCoAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalCoAdvisor";
import DaftarBimbinganSkripsiCoAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiCoAdvisor";
import RiwayatBimbinganCoAdvisor from "app/pages/ThesisApps/Dosen/RiwayatbimbinganCoAdvisor";

const coAdvisorRoutes = [
  {
    // Daftar Bimbingan Proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor",
    element: <Page component={DaftarBimbinganProposalCoAdvisor} />,
  },
  {
    // Daftar Bimbingan Skripsi Co-Advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor",
    element: <Page component={DaftarBimbinganSkripsiCoAdvisor} />,
  },
  {
    // Daftar Riwayat Bimbingan Co-Advisor
    path: "/sistem-informasi-skripsi/riwayat-bimbingan-co-advisor",
    element: <Page component={RiwayatBimbinganCoAdvisor} />,
  },
];

export default coAdvisorRoutes;
