import Page from "@jumbo/shared/Page";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import DaftarBimbinganProposalAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalAdvisor";
import DaftarBimbinganSkripsiAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiAdvisor";
import DocumentPersetujuanDosenPembimbing from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing";
import DocumentPersetujuanDosenPembimbing2 from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing2";
import DocumentRevisiProposalAdvisor from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalAdvisor";
import DocumentRevisiSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiKetuaPenelis";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";
import MengisiBeritaAcaraSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraSkripsiKetuaPenelis";
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
    element: <Page component={DocumentRevisiProposalAdvisor} />,
  },
  {
    // Dokumen skripsi
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbing2} />,
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
