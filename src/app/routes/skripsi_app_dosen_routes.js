import Page from "@jumbo/shared/Page";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import BuatKonsultasiAdvisor2 from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor2";
import DaftarBimbinganProposalAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalAdvisor";
import DaftarBimbinganProposalCoAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalCoAdvisor";
import DaftarBimbinganSkripsiAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiAdvisor";
import DaftarKomiteJudulDosen from "app/pages/ThesisApps/Dosen/DaftarKomiteJudulDosen";
import DaftarPengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanJudulDosenSkripsi";
import DaftarPengajuanProposalDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanProposalDosenSkripsi";
import DaftarPengajuanSkripsiDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanSkripsiDosenSkripsi";
import DaftarPengujianProposalAnggotaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalAnggotaPenelis";
import DaftarPengujianProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalKetuaPenelis";
import DaftarPengujianSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiKetuaPenelis";
import DocumentPersetujuanDosenPembimbing from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing";
import DocumentPersetujuanDosenPembimbingProposal2 from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbingProposal2";
import DocumentPersetujuanDosenPembimbingSkripsi from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbingSkripsi";
import DocumentRevisiProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalKetuaPenelis";
import DocumentRevisiProposalKetuaPenelis2 from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalKetuaPenelis2";
import DocumentRevisiSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiKetuaPenelis";
import ManajemenKelasDosenSkripsi from "app/pages/ThesisApps/Dosen/ManajemenKelasDosenSkripsi";
import MengisiBeritaAcaraProposalKetuaPenelis2 from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposaKetuaPenelis2";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";
import MengisiBeritaAcaraSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraSkripsiKetuaPenelis";
import PengajuanJudulDiterimaDosenSkripsi from "app/pages/ThesisApps/Dosen/PengajuanJudulDiterimaDosenSkripsi";
import PengajuanJudulDiterimaDosenSkripsi2 from "app/pages/ThesisApps/Dosen/PengajuanJudulDiterimaDosenSkripsi2";
import PengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/PengajuanJudulDosenSkripsi";
import RiwayatBimbinganAdvisor from "app/pages/ThesisApps/Dosen/RiwayatBimbinganAdvisor";
import RiwayatPengujianKetuaPenelis from "app/pages/ThesisApps/Dosen/RiwayatPengujianKetuaPenelis";
import BerandaPengajuanJudul from "app/pages/ThesisApps/Mahasiswa/BerandaPengajuanJudul";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";
import BerandaSkripsiMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaSkripsiMahasiswa";

const dosenRoutes = [
  // DOSEN UMUM
  {
    // daftar komite judul Dosen
    path: "/sistem-informasi-skripsi/daftar-komite-judul-dosen",
    element: <Page component={DaftarKomiteJudulDosen} />,
  },
  /*================================================================================================================*/
  // DOSEN SKRIPSI

  //DAFTAR
  {
    // Daftar Pengajuan judul Dosen Skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi",
    element: <Page component={DaftarPengajuanJudulDosenSkripsi} />,
  },
  {
    // Daftar Pengajuan Proposal Dosen Skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi",
    element: <Page component={DaftarPengajuanProposalDosenSkripsi} />,
  },
  {
    // Daftar Pengajuan Skripsi Dosen Skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi",
    element: <Page component={DaftarPengajuanSkripsiDosenSkripsi} />,
  },
  {
    // Manajemen Kelas Dosen Skripsi
    path: "/sistem-informasi-skripsi/manajemen-kelas-dosen-skripsi",
    element: <Page component={ManajemenKelasDosenSkripsi} />,
  },

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

  // SKRIPSI
  {
    // Beranda Mahasiswa skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/beranda",
    element: <Page component={BerandaSkripsiMahasiswa} />,
  },
  {
    // pengajuan judul Mahasiswa skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/pengajuan-judul",
    element: <Page component={PengajuanJudulDiterimaDosenSkripsi2} />,
  },
  {
    // konsultasi Mahasiswa skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor2} />,
  },
  {
    // document proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/document-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbingProposal2} />,
  },
  {
    // dokuemn revisi proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis2} />,
  },
  {
    // dokumen skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbingSkripsi} />,
  },
  {
    // dokuemn revisi skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-revisi-skripsi",
    element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  },
  /*================================================================================================================*/
  // DOSEN ADVISOR

  // DAFTAR
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor",
    element: <Page component={DaftarBimbinganProposalAdvisor} />,
  },
  {
    // Daftar Bimbingan Skripsi Advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-advisor",
    element: <Page component={DaftarBimbinganSkripsiAdvisor} />,
  },

  // RIWAYAT
  {
    // Daftar Riwayat Bimbingan Advisor
    path: "/sistem-informasi-skripsi/riwayat-bimbingan-advisor",
    element: <Page component={RiwayatBimbinganAdvisor} />,
  },

  // PROPOSAL

  /*================================================================================================================*/
  // DOSEN CO_ADVISOR
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor",
    element: <Page component={DaftarBimbinganProposalCoAdvisor} />,
  },
  /*================================================================================================================*/
  // DOSEN KETUA PANALIS

  // PROPOSAL
  {
    // Daftar Pengujian proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-ketua",
    element: <Page component={DaftarPengujianProposalKetuaPenelis} />,
  },
  {
    // Daftar Pengujian skripsi Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-ketua",
    element: <Page component={DaftarPengujianSkripsiKetuaPenelis} />,
  },
  {
    // Beranda proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-proposal-ketua/beranda",
    element: <Page component={BerandaProposalMahasiswa} />,
  },
  {
    // Konsultasi proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-proposal-ketua/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor} />,
  },
  {
    // dokumen proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-proposal-ketua/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbing} />,
  },
  {
    // Berita Acara Proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-proposal-ketual/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis} />,
  },
  {
    // dokumen revisi proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-proposal-ketua/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis} />,
  },
  // SKRIPSI
  {
    // Beranda skripsi Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua/beranda",
    element: <Page component={BerandaSkripsiMahasiswa} />,
  },
  {
    // Konsultasi Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor2} />,
  },
  {
    //  document proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbingProposal2} />,
  },
  {
    //  berita acara proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis2} />,
  },
  {
    // document revisi proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis2} />,
  },
  {
    // dokumen skripsi Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbingSkripsi} />,
  },
  {
    // Berita Acara skripsi Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua/berita-acara-skripsi",
    element: <Page component={MengisiBeritaAcaraSkripsiKetuaPenelis} />,
  },
  {
    // dokumen revisi skripsi Ketua Panalis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua/dokumen-revisi-skripsi",
    element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  },
  {
    // Daftar Riwayat Ketua Panalis
    path: "/sistem-informasi-skripsi/riwayat-uji-ketua",
    element: <Page component={RiwayatPengujianKetuaPenelis} />,
  },
  /*================================================================================================================*/
  // DOSEN ANGGOTA PANALIS
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-anggota",
    element: <Page component={DaftarPengujianProposalAnggotaPenelis} />,
  },
];

export default dosenRoutes;
