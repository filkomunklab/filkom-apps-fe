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

const dosenRoutes = [
  // KOMITE
  // ----------Dosen
  {
    path: "/sistem-informasi-skripsi/daftar-komite-judul-dosen",
    element: <Page component={DaftarKomiteJudulDosen} />,
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
  // PENGUJIAN
  // ----------Ketua
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal-ketua",
    element: <Page component={DaftarPengujianProposalKetuaPenelis} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengujian--skripsi-ketua",
    element: <Page component={DaftarPengujianSkripsiKetuaPenelis} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-riwayat-pengujian-ketua",
    element: <Page component={DaftarRiwayatPengujianKetuaPenelis} />,
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
];

export default dosenRoutes;
