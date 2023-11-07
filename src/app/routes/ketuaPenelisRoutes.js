import Page from "@jumbo/shared/Page";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import DaftarPengujianProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalKetuaPenelis";
import DaftarPengujianSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiKetuaPenelis";
import DocumentPersetujuanDosenPembimbing from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing";
import DocumentPersetujuanDosenPembimbingSkripsi from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbingSkripsi";
import DocumentRevisiSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiKetuaPenelis";
import DocumentRevisiProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DokumentRevisiProposalKetuaPenelis";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";
import MengisiBeritaAcaraSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraSkripsiKetuaPenelis";
import RiwayatPengujianKetuaPenelis from "app/pages/ThesisApps/Dosen/RiwayatPengujianKetuaPenelis";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";
import BerandaSkripsiMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaSkripsiMahasiswa";

const ketuaPenelisRoutes = [
  {
    // Daftar pengajuan Proposal Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-ketua",
    element: <Page component={DaftarPengujianProposalKetuaPenelis} />,
  },
  {
    // Daftar Pengujian skripsi Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua",
    element: <Page component={DaftarPengujianSkripsiKetuaPenelis} />,
  },
  {
    // Beranda proposal Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-ketua/beranda",
    element: <Page component={BerandaProposalMahasiswa} />,
  },
  {
    // Konsultasi proposal Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-ketua/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor} />,
  },
  {
    // dokumen proposal Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-ketua/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbing} />,
  },
  {
    // Berita Acara Proposal Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-ketual/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis} />,
  },
  {
    // dokumen revisi proposal Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-ketua/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis} />,
  },
  // {
  //   // Beranda skripsi Ketua Penelis
  //   path: "/sistem-informasi-skripsi/uji-skripsi-ketua/beranda",
  //   element: <Page component={BerandaSkripsiMahasiswa} />,
  // },
  // {
  //   // Konsultasi skripsi Ketua Penelis
  //   path: "/sistem-informasi-skripsi/uji-skripsi-ketua/konsultasi",
  //   element: <Page component={} />,
  // },
  {
    // dokumen skripsi Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbingSkripsi} />,
  },
  {
    // Berita Acara skripsi Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua/berita-acara-skripsi",
    element: <Page component={MengisiBeritaAcaraSkripsiKetuaPenelis} />,
  },
  {
    // dokumen revisi skripsi Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua/dokumen-revisi-skripsi",
    element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  },
  {
    // Daftar Riwayat Ketua Penelis
    path: "/sistem-informasi-skripsi/riwayat-uji-ketua",
    element: <Page component={RiwayatPengujianKetuaPenelis} />,
  },
];

export default ketuaPenelisRoutes;
