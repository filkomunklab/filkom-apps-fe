import Page from "@jumbo/shared/Page";
// import CatatKonsultasi from "app/pages/ThesisApps/Dosen/CatatKonsultasi";
import DaftarBimbinganProposalAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalAdvisor";
import DaftarBimbinganSkripsiAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiAdvisor";
import RiwayatBimbinganAdvisor from "app/pages/ThesisApps/Dosen/RiwayatBimbinganAdvisor";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";

const advisorRoutes = [
  {
    // Daftar Bimbingan Proposal Advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor",
    element: <Page component={DaftarBimbinganProposalAdvisor} />,
  },

  {
    // Daftar Bimbingan Skripsi Advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor",
    element: <Page component={DaftarBimbinganSkripsiAdvisor} />,
  },

  {
    // Daftar Riwayat Bimbingan Advisor
    path: "/sistem-informasi-skripsi/riwayat-bimbingan-advisor",
    element: <Page component={RiwayatBimbinganAdvisor} />,
  },
  {
    // View Beranda Mahasiswa proposal
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor/beranda",
    element: <Page component={BerandaProposalMahasiswa} />,
  },
  // {
  //   // Catat Konsultasi Mahasiswa
  //   path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor/konsultasi",
  //   element: <Page component={CatatKonsultasi} />,
  // },
];

export default advisorRoutes;
