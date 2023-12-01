import Page from "@jumbo/shared/Page";
import DaftarPengajuanSkripsiKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarPengajuanSkripsiKaprodi";
import DaftarRiwayatSkripsiKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarRiwayatSkripsiKaprodi";
import DaftarPengajuanJudulKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarPengajuanJudulKaprodi";
import DaftarPengajuanProposalKaprodi from "app/pages/ThesisApps/Kaprodi/DaftarPengajuanProposalKaprodi";
import BerandaGlobal from "app/pages/ThesisApps/Mahasiswa/BerandaGlobal";
import PengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/PengajuanJudulDosenSkripsi";
import Konsultasi from "app/pages/ThesisApps/Mahasiswa/Konsultasi";
import DokumenProposal from "app/pages/ThesisApps/Dosen/DokumenProposal";
import BeritaAcaraProposal from "app/pages/ThesisApps/Dosen/BeritaAcaraProposal";
import BeritaAcaraSkripsi from "app/pages/ThesisApps/Dosen/BeritaAcaraSkripsi";
import DokumenRevisiProposal from "app/pages/ThesisApps/Dosen/DokumenRevisiProposal";
import DokumenSkripsi from "app/pages/ThesisApps/Dosen/DokumenSkripsi";
import DokumenRevisiSkripsi from "app/pages/ThesisApps/Dosen/DokumenRevisiSkripsi";
import DaftarSkripsiFILKOM from "app/pages/ThesisApps/Global/DaftarSkripsiFILKOM";

const kaprodiRoutes = [
  {
    path: "/sistem-informasi-skripsi/daftar-judul-skrisi-fakultas-ilmu-komputer",
    element: <Page component={DaftarSkripsiFILKOM} />,
  },
  // JUDUL
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi",
    element: <Page component={DaftarPengajuanJudulKaprodi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-kaprodi/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  // PROPOSAL
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi",
    element: <Page component={DaftarPengajuanProposalKaprodi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-kaprodi/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  // SKRIPSI
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-kaprodi",
    element: <Page component={DaftarPengajuanSkripsiKaprodi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-kaprodi/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-kaprodi/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-kaprodi/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-kaprodi/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-kaprodi/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-kaprodi/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-kaprodi/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-kaprodi/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-kaprodi/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  // RIWAYAT
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-kaprodi",
    element: <Page component={DaftarRiwayatSkripsiKaprodi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-kaprodi/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-kaprodi/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-kaprodi/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-kaprodi/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-kaprodi/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-kaprodi/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-kaprodi/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-kaprodi/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-kaprodi/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
];

export default kaprodiRoutes;
