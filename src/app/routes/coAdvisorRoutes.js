import Page from "@jumbo/shared/Page";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import DaftarBimbinganProposalCoAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalCoAdvisor";
import DaftarBimbinganSkripsiCoAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiCoAdvisor";
import DocumentPersetujuanDosenPembimbing from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing";
import DocumentRevisiSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiKetuaPenelis";
import DocumentRevisiProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DokumentRevisiProposalKetuaPenelis";
import PerubahanProposalCoAvisor from "app/pages/ThesisApps/Dosen/PerubahanProposalCoAdvisor";
import PerubahanSkripsiCoAvisor from "app/pages/ThesisApps/Dosen/PerubahanSkripsiCoAdvisor";
import RiwayatBimbinganCoAdvisor from "app/pages/ThesisApps/Dosen/RiwayatbimbinganCoAdvisor";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";

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
  {
    // beranda proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor/beranda",
    element: <Page component={BerandaProposalMahasiswa} />,
  },
  {
    // konsultasi proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor} />,
  },
  {
    // document proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbing} />,
  },
  {
    // document perubahan proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor/perubahan-proposal",
    element: <Page component={PerubahanProposalCoAvisor} />,
  },
  {
    // document revisi proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis} />,
  },
  {
    // document skripsi Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbing} />,
  },
  {
    // document perubahan skripsi Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/perubahan-skripsi",
    element: <Page component={PerubahanSkripsiCoAvisor} />,
  },
  {
    // document revisi skripsi Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/dokumen-revisi-skripsi",
    element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  },
];

export default coAdvisorRoutes;
