import Page from "@jumbo/shared/Page";
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
import DaftarPengujianSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiKetuaPenelis";
import DaftarPengujianSkripsiAnggotaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiAnggotaPenelis";
import DaftarRiwayatBimbinganAdvisor from "app/pages/ThesisApps/Dosen/DaftarRiwayatBimbinganAdvisor";
import DaftarRiwayatBimbinganCoAdvisor from "app/pages/ThesisApps/Dosen/DaftarRiwayatbimbinganCoAdvisor";
import DaftarRiwayatPengujianKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarRiwayatPengujianKetuaPenelis";
import DaftarRiwayatPengujianAnggota from "app/pages/ThesisApps/Dosen/DaftarRiwayatPengujianAnggotaPenelis";
import BerandaGlobal from "app/pages/ThesisApps/Mahasiswa/BerandaGlobal";
import Konsultasi from "app/pages/ThesisApps/Mahasiswa/Konsultasi";
import PengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/PengajuanJudulDosenSkripsi";
import DokumenProposal from "app/pages/ThesisApps/Dosen/DokumenProposal";
import DokumenRevisiProposal from "app/pages/ThesisApps/Dosen/DokumenRevisiProposal";
import DokumenSkripsi from "app/pages/ThesisApps/Dosen/DokumenSkripsi";
import DokumenRevisiSkripsi from "app/pages/ThesisApps/Dosen/DokumenRevisiSkripsi";
import KonsultasiAdvisorDanCoAdvisor from "app/pages/ThesisApps/Dosen/KonsultasiAdvisorDanCoAdvisor";
import BeritaAcaraProposal from "app/pages/ThesisApps/Dosen/BeritaAcaraProposal";
import BeritaAcaraSkripsi from "app/pages/ThesisApps/Dosen/BeritaAcaraSkripsi";
import PerubahanProposalCoAdvisor from "app/pages/ThesisApps/Dosen/PerubahanProposalCoAdvisor";
import PerubahanSkripsiCoAvisor from "app/pages/ThesisApps/Dosen/PerubahanSkripsiCoAdvisor";
import ManajemenKelasDosenSkripsi from "app/pages/ThesisApps/Dosen/ManajemenKelasDosenSkripsi";
import DaftarRiwayatNilaiDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarRiwayatNilaiDosenSkripsi";
import PengajuanJudulDosen from "app/pages/ThesisApps/Dosen/PengajuanJudulDosen";
import TestBeritaAcaraProposal from "app/pages/ThesisApps/Dosen/TestBeritaAcaraProposal";

const dosenRoutes = [
  // KOMITE
  // ----------Dosen
  {
    path: "/sistem-informasi-skripsi/daftar-komite-judul-dosen",
    element: <Page component={DaftarKomiteJudulDosen} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-komite-judul-dosen/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudulDosen} />,
  },
  // PENGJAJUAN
  // ----------Dosen Skripsi
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi",
    element: <Page component={DaftarPengajuanJudulDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi",
    element: <Page component={DaftarPengajuanProposalDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi",
    element: <Page component={DaftarPengajuanSkripsiDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/manajemen-kelas-dosen-skripsi",
    element: <Page component={ManajemenKelasDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-nilai",
    element: <Page component={DaftarRiwayatNilaiDosenSkripsi} />,
  },

  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  //-----------------------judul
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  //-----------------------proposal
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  //-----------------------skripsi
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  // BIMBINGAN
  // ----------Advisor
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor",
    element: <Page component={DaftarBimbinganProposalAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor",
    element: <Page component={DaftarBimbinganSkripsiAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-advisor",
    element: <Page component={DaftarRiwayatBimbinganAdvisor} />,
  },

  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-advisor/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  //-----------------------proposal
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/konsultasi/:groupId/:role",
    element: <Page component={KonsultasiAdvisorDanCoAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-advisor/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  //-----------------------skripsi
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/konsultasi/:groupId/:role",
    element: <Page component={KonsultasiAdvisorDanCoAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-advisor/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  //-----------------------finish
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-advisor/konsultasi/:groupId/:role",
    element: <Page component={KonsultasiAdvisorDanCoAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-advisor/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-advisor/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-advisor/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-advisor/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-advisor/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-advisor/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  // ----------Co-Advisor
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor",
    element: <Page component={DaftarBimbinganProposalCoAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-co-advisor",
    element: <Page component={DaftarBimbinganSkripsiCoAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-co-advisor",
    element: <Page component={DaftarRiwayatBimbinganCoAdvisor} />,
  },

  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-co-advisor/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-co-advisor/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  //-----------------------proposal
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor/konsultasi/:groupId/:role",
    element: <Page component={KonsultasiAdvisorDanCoAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor/perubahan-proposal/:groupId/:role",
    element: <Page component={PerubahanProposalCoAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor/perubahan-skripsi/:groupId/:role",
    element: <Page component={PerubahanSkripsiCoAvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-proposal-co-advisor/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  //-----------------------skripsi
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-co-advisor/konsultasi/:groupId/:role",
    element: <Page component={KonsultasiAdvisorDanCoAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-co-advisor/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-co-advisor/perubahan-proposal/:groupId/:role",
    element: <Page component={PerubahanProposalCoAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-co-advisor/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-co-advisor/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-co-advisor/perubahan-skripsi/:groupId/:role",
    element: <Page component={PerubahanSkripsiCoAvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-bimbingan-skripsi-co-advisor/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  //-----------------------riwayat
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-co-advisor/konsultasi/:groupId/:role",
    element: <Page component={KonsultasiAdvisorDanCoAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-co-advisor/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-co-advisor/perubahan-proposal/:groupId/:role",
    element: <Page component={PerubahanProposalCoAdvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-co-advisor/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-co-advisor/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-co-advisor/perubahan-skripsi/:groupId/:role",
    element: <Page component={PerubahanSkripsiCoAvisor} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-bimbingan-co-advisor/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  // PENGUJIAN
  // ----------Ketua
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-ketua",
    element: <Page component={DaftarPengujianProposalKetuaPenelis} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-ketua",
    element: <Page component={DaftarPengujianSkripsiKetuaPenelis} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-ketua",
    element: <Page component={DaftarRiwayatPengujianKetuaPenelis} />,
  },

  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-ketua/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-ketua/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-ketua/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  //-----------------------proposal
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-ketua/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-ketua/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-ketua/berita-acara-proposal/:groupId/:role",
    element: <Page component={TestBeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-ketua/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-ketua/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-ketua/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-ketua/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  //-----------------------skripsi
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-ketua/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-ketua/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-ketua/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-ketua/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-ketua/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-ketua/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-ketua/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  //-----------------------riwayat
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-ketua/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-ketua/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-ketua/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-ketua/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-ketua/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-ketua/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-ketua/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  // ----------Anggota
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-anggota",
    element: <Page component={DaftarPengujianProposalAnggotaPenelis} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-anggota",
    element: <Page component={DaftarPengujianSkripsiAnggotaPenelis} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-anggota",
    element: <Page component={DaftarRiwayatPengujianAnggota} />,
  },

  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-anggota/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-anggota/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-anggota/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  //-----------------------proposal
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-anggota/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-anggota/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-anggota/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-anggota/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-anggota/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-anggota/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-anggota/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  //-----------------------skripsi
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-anggota/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-anggota/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-anggota/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-anggota/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-anggota/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-anggota/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi-anggota/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  //-----------------------riwayat
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-anggota/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-anggota/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-anggota/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-anggota/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-anggota/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-anggota/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-anggota/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
];

export default dosenRoutes;
