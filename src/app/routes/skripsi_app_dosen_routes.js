import Page from "@jumbo/shared/Page";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import BuatKonsultasiAdvisor2 from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor2";
import DaftarBimbinganProposalAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalAdvisor";
import DaftarBimbinganProposalCoAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalCoAdvisor";
import DaftarBimbinganSkripsiAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiAdvisor";
import DaftarBimbinganSkripsiCoAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiCoAdvisor";
import DaftarKomiteJudulDosen from "app/pages/ThesisApps/Dosen/DaftarKomiteJudulDosen";
import DaftarPengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanJudulDosenSkripsi";
import DaftarPengajuanProposalDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanProposalDosenSkripsi";
import DaftarPengajuanSkripsiDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanSkripsiDosenSkripsi";
import DaftarPengujianProposalAnggotaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalAnggotaPenelis";
import DaftarPengujianProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalKetuaPenelis";
import DaftarPengujianSkripsiAnggotaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiAnggotaPenelis";
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
import PerubahanProposalCoAvisor from "app/pages/ThesisApps/Dosen/PerubahanProposalCoAdvisor";
import PerubahanProposalCoAdvisor2 from "app/pages/ThesisApps/Dosen/PerubahanProposalCoAdvisor2";
import PerubahanSkripsiCoAvisor from "app/pages/ThesisApps/Dosen/PerubahanSkripsiCoAdvisor";
import RiwayatBimbinganAdvisor from "app/pages/ThesisApps/Dosen/RiwayatBimbinganAdvisor";
import RiwayatPengujianAnggotaPenelis from "app/pages/ThesisApps/Dosen/RiwayatPengujianAnggotaPenelis";
import RiwayatPengujianKetuaPenelis from "app/pages/ThesisApps/Dosen/RiwayatPengujianKetuaPenelis";
import RiwayatBimbinganCoAdvisor from "app/pages/ThesisApps/Dosen/RiwayatbimbinganCoAdvisor";
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
    // Beranda Mahasiswa Pengajuan Judul
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/beranda",
    element: <Page component={BerandaPengajuanJudul} />,
  },
  {
    // Pengajuan Judul Mahasiswa
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/pengajuan-judul",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },

  // PROPOSAL
  {
    // Beranda Mahasiswa proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/beranda/:id/:role",
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
    // Daftar Bimbingan Proposal Advisor
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor",
    element: <Page component={DaftarBimbinganProposalAdvisor} />,
  },
  {
    // Daftar Bimbingan Skripsi Advisor
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor",
    element: <Page component={DaftarBimbinganSkripsiAdvisor} />,
  },

  // RIWAYAT
  {
    // Daftar Riwayat Bimbingan Advisor
    path: "/sistem-informasi-skripsi/riwayat-bimbingan-advisor",
    element: <Page component={RiwayatBimbinganAdvisor} />,
  },

  // PROPOSAL
  {
    // View Beranda Mahasiswa proposal
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/beranda",
    element: <Page component={BerandaProposalMahasiswa} />,
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
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis} />,
  },

  // SKRIPSI
  {
    // Dokumen beranda
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/beranda",
    element: <Page component={BerandaSkripsiMahasiswa} />,
  },
  {
    // Dokumen konsultasi
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor2} />,
  },
  {
    // Dokumen proposal
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbingProposal2} />,
  },
  {
    // berita acara proposal
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis2} />,
  },
  {
    // Dokumen revisi proposal
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis2} />,
  },
  {
    // Dokumen skripsi
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbingSkripsi} />,
  },
  {
    // Berita Acara skripsi
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/berita-acara-skripsi",
    element: <Page component={MengisiBeritaAcaraSkripsiKetuaPenelis} />,
  },
  {
    // Dokumen revisi skripsi
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/dokumen-revisi-skripsi",
    element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  },

  /*================================================================================================================*/
  // DOSEN CO_ADVISOR

  // DAFTAR
  {
    // Daftar Bimbingan Proposal Co-Advisor
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor",
    element: <Page component={DaftarBimbinganProposalCoAdvisor} />,
  },
  {
    // Daftar Bimbingan Skripsi Co-Advisor
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-co-advisor",
    element: <Page component={DaftarBimbinganSkripsiCoAdvisor} />,
  },

  // RIWAYAT
  {
    // Daftar Riwayat Bimbingan Co-Advisor
    path: "/sistem-informasi-skripsi/riwayat-bimbingan-co-advisor",
    element: <Page component={RiwayatBimbinganCoAdvisor} />,
  },

  // PROPOSAL
  {
    // Beranda Proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor/beranda",
    element: <Page component={BerandaProposalMahasiswa} />,
  },
  {
    // Konsultasi Proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor} />,
  },
  {
    // Document Proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbing} />,
  },
  {
    // Perubahan Proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor/perubahan-proposal",
    element: <Page component={PerubahanProposalCoAvisor} />,
  },
  {
    // Document Revisi Proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis} />,
  },

  // SKRIPSI
  {
    // Beranda mahasiswa Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/beranda",
    element: <Page component={BerandaSkripsiMahasiswa} />,
  },
  {
    // Konsultasi Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor2} />,
  },
  {
    // Dokumen Proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbingProposal2} />,
  },
  {
    // Perubahan Proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/perubahan-proposal",
    element: <Page component={PerubahanProposalCoAdvisor2} />,
  },
  {
    // Dokumen Revisi Proposal Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis2} />,
  },
  {
    // Document Skripsi Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbingSkripsi} />,
  },
  {
    // Document Perubahan Skripsi Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/perubahan-skripsi",
    element: <Page component={PerubahanSkripsiCoAvisor} />,
  },
  {
    // Document Devisi Skripsi Co-advisor
    path: "/sistem-informasi-skripsi/bimbingan-skripsi-co-advisor/dokumen-revisi-skripsi",
    element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  },

  /*================================================================================================================*/
  // DOSEN KETUA PANALIS

  // DAFTAR
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

  // RIWAYAT
  {
    // Daftar Riwayat Bimbingan Co-Advisor
    path: "/sistem-informasi-skripsi/riwayat-bimbingan-co-advisor",
    element: <Page component={RiwayatBimbinganCoAdvisor} />,
  },

  // PROPOSAL
  {
    // Beranda proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-proposal-ketua/beranda",
    element: <Page component={BerandaProposalMahasiswa} />,
  },
  {
    // Konsultasi Proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-proposal-ketua/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor} />,
  },
  {
    // Dokumen Proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-proposal-ketua/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbing} />,
  },
  {
    // Berita Acara Proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-proposal-ketual/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis} />,
  },
  {
    // Dokumen Revisi Proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-proposal-ketua/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis} />,
  },

  // SKRIPSI
  {
    // Beranda skripsi Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-ketua/beranda",
    element: <Page component={BerandaSkripsiMahasiswa} />,
  },
  {
    // Konsultasi Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-ketua/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor2} />,
  },
  {
    //  Document Proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-ketua/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbingProposal2} />,
  },
  {
    //  Berita Acara Proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-ketua/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis2} />,
  },
  {
    // Document Revisi Proposal Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-ketua/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis2} />,
  },
  {
    // Dokumen Skripsi Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-ketua/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbingSkripsi} />,
  },
  {
    // Berita Acara skripsi Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-ketua/berita-acara-skripsi",
    element: <Page component={MengisiBeritaAcaraSkripsiKetuaPenelis} />,
  },
  {
    // Dokumen Revisi Skripsi Ketua Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-ketua/dokumen-revisi-skripsi",
    element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  },
  {
    // Daftar Riwayat Ketua Panalis
    path: "/sistem-informasi-skripsi/riwayat-uji-ketua",
    element: <Page component={RiwayatPengujianKetuaPenelis} />,
  },

  /*================================================================================================================*/
  // DOSEN ANGGOTA PANALIS

  // DAFTAR
  {
    // Daftar Pengujian Proposal Anggota Panalis
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-anggota",
    element: <Page component={DaftarPengujianProposalAnggotaPenelis} />,
  },
  {
    // Daftar Pengujian Skripsi Anggota Panalis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-anggota",
    element: <Page component={DaftarPengujianSkripsiAnggotaPenelis} />,
  },

  // RIWAYAT
  {
    // Daftar Riwayat Anggota Penelis
    path: "/sistem-informasi-skripsi/riwayat-uji-anggota",
    element: <Page component={RiwayatPengujianAnggotaPenelis} />,
  },

  // PROPOSAL
  {
    // Beranda Proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-proposal-anggota/beranda",
    element: <Page component={BerandaProposalMahasiswa} />,
  },
  {
    // Beranda Proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-proposal-anggota/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor} />,
  },
  {
    // Dokumen Proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-proposal-anggota/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbing} />,
  },
  {
    // Berita Acara Proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-proposal-anggota/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis} />,
  },
  {
    // Dokumen Revisi Proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-proposal-anggota/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis} />,
  },

  // SKRIPSI
  {
    // Beranda Skripsi Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-anggota/beranda",
    element: <Page component={BerandaSkripsiMahasiswa} />,
  },
  {
    // Konsultasi Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-anggota/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor2} />,
  },
  {
    //  Document Proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-anggota/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbingProposal2} />,
  },
  {
    //  Berita Acara Proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-anggota/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis2} />,
  },
  {
    // Document Revisi Proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-anggota/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis2} />,
  },
  {
    // Dokumen Skripsi Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-anggota/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbingSkripsi} />,
  },
  {
    // Berita Acara Skripsi Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-anggota/berita-acara-skripsi",
    element: <Page component={MengisiBeritaAcaraSkripsiKetuaPenelis} />,
  },
  {
    // Dokumen Revisi Skripsi Anggota Penelis
    path: "/sistem-informasi-skripsi/daftar-uji-skripsi-anggota/dokumen-revisi-skripsi",
    element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  },
];

export default dosenRoutes;
