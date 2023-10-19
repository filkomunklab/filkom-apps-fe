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
