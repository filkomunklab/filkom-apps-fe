import Page from "@jumbo/shared/Page";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import BuatKonsultasiAdvisor2 from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor2";
import DaftarBimbinganProposalAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalAdvisor";
import DaftarBimbinganSkripsiAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiAdvisor";
import DocumentPersetujuanDosenPembimbing from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing";
import DocumentPersetujuanDosenPembimbingProposal2 from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbingProposal2";
import DocumentPersetujuanDosenPembimbingSkripsi from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbingSkripsi";
import DocumentRevisiProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalKetuaPenelis";
import DocumentRevisiProposalKetuaPenelis2 from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalKetuaPenelis2";
import DocumentRevisiSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiKetuaPenelis";
import MengisiBeritaAcaraProposalKetuaPenelis2 from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposaKetuaPenelis2";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";
import MengisiBeritaAcaraSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraSkripsiKetuaPenelis";
import RiwayatBimbinganAdvisor from "app/pages/ThesisApps/Dosen/RiwayatBimbinganAdvisor";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";
import BerandaSkripsiMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaSkripsiMahasiswa";

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

  // BERANDA
  {
    // View Beranda Mahasiswa proposal
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor/beranda",
    element: <Page component={BerandaProposalMahasiswa} />,
  },
  {
    // Catat Konsultasi Mahasiswa
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor} />,
  },
  {
    // Dokumen Proposal
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbing} />,
  },
  {
    // Berita Acara proposal
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis} />,
  },
  {
    // Dokumen revisi proposal
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis} />,
  },

  // SKRIPSI
  {
    // Dokumen beranda
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor/beranda",
    element: <Page component={BerandaSkripsiMahasiswa} />,
  },
  {
    // Dokumen konsultasi
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor2} />,
  },
  {
    // Dokumen proposal
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbingProposal2} />,
  },
  {
    // berita acara proposal
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis2} />,
  },
  {
    // Dokumen revisi proposal
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis2} />,
  },
  {
    // Dokumen skripsi
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbingSkripsi} />,
  },
  {
    // Berita Acara skripsi
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor/berita-acara-skripsi",
    element: <Page component={MengisiBeritaAcaraSkripsiKetuaPenelis} />,
  },
  {
    // Dokumen revisi skripsi
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor/dokumen-revisi-skripsi",
    element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  },
];

export default advisorRoutes;
