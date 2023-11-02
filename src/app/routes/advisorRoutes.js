import Page from "@jumbo/shared/Page";
import BerandaProposalPenguji from "app/pages/ThesisApps/Dosen/BerandaProposalPenguji";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import DaftarBimbinganProposalAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalAdvisor";
import DaftarBimbinganSkripsiAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiAdvisor";
import DocumentPersetujuanDosenPembimbing from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing";
import DocumentRevisiProposalAdvisor from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalAdvisor";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";
import RiwayatBimbinganAdvisor from "app/pages/ThesisApps/Dosen/RiwayatBimbinganAdvisor";

const advisorRoutes = [
  {
    // Daftar Bimbingan Proposal Advisor
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor",
    element: <Page component={DaftarBimbinganProposalAdvisor} />,
  },

  {
    // Daftar Bimbingan Skripsi Advisor
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor",
    element: <Page component={DaftarBimbinganSkripsiAdvisor} />,
  },

  {
    // Daftar Riwayat Bimbingan Advisor
    path: "/sistem-informasi-skripsi/riwayat-bimbingan-advisor",
    element: <Page component={RiwayatBimbinganAdvisor} />,
  },
  {
    // View Beranda Mahasiswa proposal
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/beranda",
    element: <Page component={BerandaProposalPenguji} />,
  },
  {
    // Catat Konsultasi Mahasiswa
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor} />,
  },
  {
    // Dokumen Proposal
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbing} />,
  },
  {
    // Berita Acara proposal
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis} />,
  },
  {
    // Dokumen revisi proposal
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/document-revisi-proposal",
    element: <Page component={DocumentRevisiProposalAdvisor} />,
  },
  // {
  //   // Dokumen skripsi
  //   path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/dokumen-skripsi",
  //   element: <Page component={} />,
  // },
  // {
  //   // Berita Acara skripsi
  //   path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/berita-acara-skripsi",
  //   element: <Page component={} />,
  // },
  // {
  //   // Dokumen revisi skripsi
  //   path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/document-revisi-skripsi",
  //   element: <Page component={} />,
  // },
];

export default advisorRoutes;
