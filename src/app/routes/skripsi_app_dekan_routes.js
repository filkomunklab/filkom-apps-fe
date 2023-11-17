import Page from "@jumbo/shared/Page";
import DaftarPengajuanJudulDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanJudulDekan";
import DaftarPengajuanProposalDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanProposalDekan";
import DaftarPengajuanSkripsiDekan from "app/pages/ThesisApps/Dekan/DaftarPengajuanSkripsiDekan";
import DaftarRiwayatSkripsiDekan from "app/pages/ThesisApps/Dekan/DaftarRiwayatSkripsiDekan";
import BeritaAcaraProposal from "app/pages/ThesisApps/Dosen/BeritaAcaraProposal";
import BeritaAcaraSkripsi from "app/pages/ThesisApps/Dosen/BeritaAcaraSkripsi";
import DokumenProposal from "app/pages/ThesisApps/Dosen/DokumenProposal";
import DokumenRevisiProposal from "app/pages/ThesisApps/Dosen/DokumenRevisiProposal";
import DokumenRevisiSkripsi from "app/pages/ThesisApps/Dosen/DokumenRevisiSkripsi";
import DokumenSkripsi from "app/pages/ThesisApps/Dosen/DokumenSkripsi";
import PengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/PengajuanJudulDosenSkripsi";
import BerandaGlobal from "app/pages/ThesisApps/Mahasiswa/BerandaGlobal";
import Konsultasi from "app/pages/ThesisApps/Mahasiswa/Konsultasi";

const dekanRoutes = [
  // pengajuan judul
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan",
    element: <Page component={DaftarPengajuanJudulDekan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-judul-dekan/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  // proposal
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan",
    element: <Page component={DaftarPengajuanProposalDekan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  // Skripsi
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan",
    element: <Page component={DaftarPengajuanSkripsiDekan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dekan/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
  // Riwayat
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan",
    element: <Page component={DaftarRiwayatSkripsiDekan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan/dokumen-revisi-proposal/:groupId/:role",
    element: <Page component={DokumenRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan/berita-acara-proposal/:groupId/:role",
    element: <Page component={BeritaAcaraProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan/berita-acara-skripsi/:groupId/:role",
    element: <Page component={BeritaAcaraSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-skripsi-dekan/dokumen-revisi-skripsi/:groupId/:role",
    element: <Page component={DokumenRevisiSkripsi} />,
  },
];

export default dekanRoutes;
