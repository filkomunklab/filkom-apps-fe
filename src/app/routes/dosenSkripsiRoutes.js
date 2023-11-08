import Page from "@jumbo/shared/Page";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import BuatKonsultasiAdvisor2 from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor2";
import DaftarBimbinganProposalAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalAdvisor";
import DaftarBimbinganSkripsiAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiAdvisor";
import DaftarPengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanJudulDosenSkripsi";
import DaftarPengajuanProposalDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanProposalDosenSkripsi";
import DaftarPengajuanSkripsiDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanSkripsiDosenSkripsi";
import DocumentPersetujuanDosenPembimbing from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing";
import DocumentPersetujuanDosenPembimbingProposal2 from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbingProposal2";
import DocumentPersetujuanDosenPembimbingSkripsi from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbingSkripsi";
import DocumentRevisiSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiKetuaPenelis";
import DocumentRevisiProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalKetuaPenelis";
import ManajemenKelasDosenSkripsi from "app/pages/ThesisApps/Dosen/ManajemenKelasDosenSkripsi";
import PengajuanJudulDiterimaDosenSkripsi from "app/pages/ThesisApps/Dosen/PengajuanJudulDiterimaDosenSkripsi";
import PengajuanJudulDiterimaDosenSkripsi2 from "app/pages/ThesisApps/Dosen/PengajuanJudulDiterimaDosenSkripsi2";
import PengajuanJudul from "app/pages/ThesisApps/Dosen/PengajuanJudulDosen";
import PengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/PengajuanJudulDosenSkripsi";
import BerandaPengajuanJudul from "app/pages/ThesisApps/Mahasiswa/BerandaPengajuanJudul";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";
import BerandaSkripsiMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaSkripsiMahasiswa";
import DocumentRevisiProposalKetuaPenelis2 from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalKetuaPenelis2";
import DaftarPengujianProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalKetuaPenelis";
import DaftarPengujianSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiKetuaPenelis";

const dosenSkripsiRoutes = [
  // {
  //   // +++++
  //   path: "/sistem-informasi-skripsi/pengajuan-judul-kaprodi",
  //   element: <Page component={DaftarBimbinganProposalAdvisor} />,
  // },
  // {
  //   // +++++
  //   path: "/sistem-informasi-skripsi/uji-proposal-ketua",
  //   element: <Page component={BerandaProposalPenguji} />,
  // },
  {
    // +++++
    path: "/sistem-informasi-skripsi/uji-proposal-ketua",
    element: <Page component={DaftarPengujianProposalKetuaPenelis} />,
  },
  {
    // +++++
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua",
    element: <Page component={DaftarPengujianSkripsiKetuaPenelis} />,
  },
  {
    // +++++
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor",
    element: <Page component={DaftarBimbinganProposalAdvisor} />,
  },
  {
    // +++++
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor",
    element: <Page component={DaftarBimbinganSkripsiAdvisor} />,
  },
  // {
  //   // Daftar Pengajuan Judul Dosen Skripsi
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi",
  //   element: <Page component={DaftarPengajuanJudulDosenSkripsi} />,
  // },
  // {
  //   // Daftar Pengajuan Proposal Dosen Skripsi
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi",
  //   element: <Page component={DaftarPengajuanProposalDosenSkripsi} />,
  // },
  // {
  //   // Daftar Pengajuan Skripsi Dosen Skripsi
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi",
  //   element: <Page component={DaftarPengajuanSkripsiDosenSkripsi} />,
  // },
  // {
  //   // Daftar Pengajuan Manajemen Kelas
  //   path: "/sistem-informasi-skripsi/manajemen-kelas-dosen-skripsi",
  //   element: <Page component={ManajemenKelasDosenSkripsi} />,
  // },

  //PENGAJUAN JUDUL
  {
    // beranda mahasiswa pengajuan judul
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/beranda",
    element: <Page component={BerandaPengajuanJudul} />,
  },
  {
    // pengajuan judul mahasiswa
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/pengajuan-judul",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },

  // PROPOSAL
  {
    // Beranda Mahasiswa proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/beranda/:id",
    element: <Page component={BerandaProposalMahasiswa} />,
  },
  {
    // Pengajuan Judul Mahasiswa
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/pengajuan-judul",
    element: <Page component={PengajuanJudulDiterimaDosenSkripsi} />,
  },
  {
    // konsultasi mahasiswa proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor} />,
  },
  {
    // dokumen proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbing} />,
  },
  {
    // dokuemn revisi proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis} />,
  },

  // // SKRIPSI
  // {
  //   // Beranda Mahasiswa skripsi
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/beranda",
  //   element: <Page component={BerandaSkripsiMahasiswa} />,
  // },
  // {
  //   // pengajuan judul Mahasiswa skripsi
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/pengajuan-judul",
  //   element: <Page component={PengajuanJudulDiterimaDosenSkripsi2} />,
  // },
  // {
  //   // konsultasi Mahasiswa skripsi
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/konsultasi",
  //   element: <Page component={BuatKonsultasiAdvisor2} />,
  // },
  // {
  //   // document proposal
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/document-proposal",
  //   element: <Page component={DocumentPersetujuanDosenPembimbingProposal2} />,
  // },
  // {
  //   // dokuemn revisi proposal
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-revisi-proposal",
  //   element: <Page component={DocumentRevisiProposalKetuaPenelis2} />,
  // },
  // {
  //   // dokumen skripsi
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-skripsi",
  //   element: <Page component={DocumentPersetujuanDosenPembimbingSkripsi} />,
  // },
  // {
  //   // dokuemn revisi skripsi
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-revisi-skripsi",
  //   element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  // },
];

export default dosenSkripsiRoutes;
