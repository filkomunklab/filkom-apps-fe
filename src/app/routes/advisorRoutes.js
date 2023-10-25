import Page from "@jumbo/shared/Page";
import BerandaProposalPenguji from "app/pages/ThesisApps/Dosen/BerandaProposalPenguji";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import DaftarBimbinganProposalAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalAdvisor";
import DaftarBimbinganSkripsiAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiAdvisor";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";
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
    element: <Page component={BerandaProposalPenguji} />,
  },
  {
    // Catat Konsultasi Mahasiswa
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor} />,
  },
  {
    // Dokumen Proposal
    // path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor/dokumen-proposal",
    // element: <Page component={} />,
  },
  {
    // Dokumen Proposal
    // path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor/dokumen-proposal",
    // element: <Page component={} />,
  },
  {
    // Berita Acara
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis} />,
  },
];

export default advisorRoutes;
