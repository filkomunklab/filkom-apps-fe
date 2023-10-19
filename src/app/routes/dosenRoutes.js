import Page from "@jumbo/shared/Page";

import DaftarPengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanJudulDosenSkripsi";

import DaftarBimbinganProposalAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalAdvisor";
import DaftarBimbinganProposalCoAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalCoAdvisor";
import CatatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/CatatKonsultasiAdvisor";
import CatatKonsultasiCoAdvisor from "app/pages/ThesisApps/Dosen/CatatKonsultasiCoAdvisor";

// import DaftarDosen from "app/pages/ThesisApps/Dosen/DaftarDosen";

import DaftarPengajuanJudulDosen from "app/pages/ThesisApps/Dosen/DaftarPengajuanJudulDosen";
import PengajuanJudulDosen from "app/pages/ThesisApps/Dosen/PengajuanJudulDosen";

import DaftarPengujianProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalKetuaPenelis";
import DaftarPengujianProposal from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalKetuaPenelis";
import DokumenProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DokumenProposalKetuaPenelis";

import BeritaAcaraProposal from "app/pages/ThesisApps/Dosen/BukaBeritaAcaraProposalKetuaPenelis";
import BukaBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/BukaBeritaAcaraProposalKetuaPenelis";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";
import DaftarBimbinganSkripsiAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiAdvisor";
import DaftarPengajuan from "app/pages/ThesisApps/Mahasiswa/DaftarPengajuan";
import MengisiBeritaAcaraProposalAnggotaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalAnggotaPenelis";
import ErrorBeritaAcaraProposal from "app/pages/ThesisApps/Dosen/ErrorBeritaAcaraProposal";
import DocumentRevisiProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DokumentRevisiProposalKetuaPenelis";
import DocumentRevisiProposalAnggotaPenelis from "app/pages/ThesisApps/Dosen/DokumentRevisiProposalAnggotaPenelis";
import DocumentRevisiProposalAdvisor from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalAdvisor";
import DocumentRevisiSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiKetuaPenelis";
import DocumentRevisiSkripsiAnggotaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiAnggotaPenelis";
import DocumentRevisiSkripsiAdvisor from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiAdvisor";
import PerubahanProposalCoAvisor from "app/pages/ThesisApps/Dosen/PerubahanProposalCoAdvisor";
import PerubahanSkripsiCoAvisor from "app/pages/ThesisApps/Dosen/PerubahanSkripsiCoAdvisor";
import DaftarBimbinganSkripsiCoAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiCoAdvisor";
import RiwayatBimbinganAdvisor from "app/pages/ThesisApps/Dosen/RiwayatBimbinganAdvisor";
import RiwayatBimbinganCoAdvisor from "app/pages/ThesisApps/Dosen/RiwayatbimbinganCoAdvisor";
import DaftarPengajuanProposalDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanProposalDosenSkripsi";
import DaftarPengajuanSkripsiDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanSkripsiDosenSkripsi";
import DaftarPengujianProposalAnggotaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalAnggotaPenelis";
import DaftarPengujianSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiKetuaPenelis";
import DaftarPengujianSkripsiAnggotaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiAnggotaPenelis";
import RiwayatPengujianKetuaPenelis from "app/pages/ThesisApps/Dosen/RiwayatPengujianKetuaPenelis";
import RiwayatPengujianAnggotaPenelis from "app/pages/ThesisApps/Dosen/RiwayatPengujianAnggotaPenelis";

const dosenRoutes = [
  // Thesis Apps Dosen
  {
    // !!! belum ada isi
    // path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen",
    // element: <Page component={DaftarDosen} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen",
    element: <Page component={DaftarPengajuanJudulDosen} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen/pengajuan-judul",
    element: <Page component={PengajuanJudulDosen} />,
  },
  // DosenSkripsi
  {
    // Daftar Komite Judul
    // path: "/sistem-informasi-skripsi/komite-judul-dosen",
    // element: <Page component={} />,
  },
  {
    // Daftar Pengajuan Judul Dosen Skripsi
    path: "/sistem-informasi-skripsi/pengajuan-judul-dosen-skripsi",
    element: <Page component={DaftarPengajuanJudulDosenSkripsi} />,
  },
  {
    // Daftar Pengajuan Proposal Dosen Skripsi
    path: "/sistem-informasi-skripsi/pengajuan-proposal-dosen-skripsi",
    element: <Page component={DaftarPengajuanProposalDosenSkripsi} />,
  },
  {
    // Daftar Pengajuan Skripsi Dosen Skripsi
    path: "/sistem-informasi-skripsi/pengajuan-skripsi-dosen-skripsi",
    element: <Page component={DaftarPengajuanSkripsiDosenSkripsi} />,
  },
  {
    // Daftar Pengajuan Manajemen Kelas
    // path: "/sistem-informasi-skripsi/manajemen-kelas-dosen-skripsi",
    // element: <Page component={} />,
  },
  {
    // Daftar Bimbingan Proposal Advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor",
    element: <Page component={DaftarBimbinganProposalAdvisor} />,
  },
  {
    // Daftar Bimbingan Proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor",
    element: <Page component={DaftarBimbinganProposalCoAdvisor} />,
  },
  {
    // Daftar Bimbingan Skripsi Advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor",
    element: <Page component={DaftarBimbinganSkripsiAdvisor} />,
  },
  {
    // Daftar Bimbingan Skripsi Co-Advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor",
    element: <Page component={DaftarBimbinganSkripsiCoAdvisor} />,
  },
  {
    // Daftar Riwayat Bimbingan Advisor
    path: "/sistem-informasi-skripsi/riwayat-bimbingan-advisor",
    element: <Page component={RiwayatBimbinganAdvisor} />,
  },
  {
    // Daftar Riwayat Bimbingan Co-Advisor
    path: "/sistem-informasi-skripsi/riwayat-bimbingan-co-advisor",
    element: <Page component={RiwayatBimbinganCoAdvisor} />,
  },
  {
    // Daftar Pengujian Proposal Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-ketua",
    element: <Page component={DaftarPengujianProposalKetuaPenelis} />,
  },
  {
    // Daftar Pengujian Proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-anggota",
    element: <Page component={DaftarPengujianProposalAnggotaPenelis} />,
  },
  {
    // Daftar Pengujian Skripsi Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua",
    element: <Page component={DaftarPengujianSkripsiKetuaPenelis} />,
  },
  {
    // Daftar Pengujian Skripsi Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-anggota",
    element: <Page component={DaftarPengujianSkripsiAnggotaPenelis} />,
  },
  {
    // Daftar Riwayat Ketua Penelis
    path: "/sistem-informasi-skripsi/riwayat-uji-ketua",
    element: <Page component={RiwayatPengujianKetuaPenelis} />,
  },
  {
    // Daftar Riwayat Anggota Penelis
    path: "/sistem-informasi-skripsi/riwayat-uji-anggota",
    element: <Page component={RiwayatPengujianAnggotaPenelis} />,
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi",
    element: <Page component={DaftarPengajuanJudulDosenSkripsi} />,
  },
  // Advisor
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor",
    element: <Page component={DaftarBimbinganProposalAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/catat-konsultasi-advisor",
    element: <Page component={CatatKonsultasiAdvisor} />,
  },
  // Co-Advisor
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor",
    element: <Page component={DaftarBimbinganProposalCoAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor/catat-konsultasi-co-advisor",
    element: <Page component={CatatKonsultasiCoAdvisor} />,
  },
];

export default dosenRoutes;
