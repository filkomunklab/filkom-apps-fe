import Page from "@jumbo/shared/Page";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import DaftarPengujianProposalAnggotaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalAnggotaPenelis";
import DaftarPengujianSkripsiAnggotaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiAnggotaPenelis";
import DocumentPersetujuanDosenPembimbing from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing";
import DocumentPersetujuanDosenPembimbingSkripsi from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbingSkripsi";
import DocumentRevisiSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiKetuaPenelis";
import DocumentRevisiProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalKetuaPenelis";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";
import MengisiBeritaAcaraSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraSkripsiKetuaPenelis";
import RiwayatPengujianAnggotaPenelis from "app/pages/ThesisApps/Dosen/RiwayatPengujianAnggotaPenelis";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";
import BerandaSkripsiMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaSkripsiMahasiswa";
import BuatKonsultasiAdvisor2 from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor2";
import DocumentPersetujuanDosenPembimbingProposal2 from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbingProposal2";
import MengisiBeritaAcaraProposalKetuaPenelis2 from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposaKetuaPenelis2";
import DocumentRevisiProposalKetuaPenelis2 from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalKetuaPenelis2";

const anggotaPenelisRoutes = [
  {
    // Daftar Pengujian Proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-anggota",
    element: <Page component={DaftarPengujianProposalAnggotaPenelis} />,
  },
  {
    // Daftar Pengujian Skripsi Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-anggota",
    element: <Page component={DaftarPengujianSkripsiAnggotaPenelis} />,
  },
  {
    // Daftar Riwayat Anggota Penelis
    path: "/sistem-informasi-skripsi/riwayat-uji-anggota",
    element: <Page component={RiwayatPengujianAnggotaPenelis} />,
  },

  // PROPOSAL
  {
    // Beranda proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-anggota/beranda",
    element: <Page component={BerandaProposalMahasiswa} />,
  },
  {
    // Beranda proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-anggota/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor} />,
  },
  {
    // dokumen proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-anggota/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbing} />,
  },
  {
    // Berita acara proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-anggota/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis} />,
  },
  {
    // dokumen revisi proposal Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-anggota/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis} />,
  },
  // SKRIPSI
  {
    // Beranda skripsi anggota Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-anggota/beranda",
    element: <Page component={BerandaSkripsiMahasiswa} />,
  },
  {
    // Konsultasi anggota Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-anggota/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor2} />,
  },
  {
    //  document proposal anggota Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-anggota/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbingProposal2} />,
  },
  {
    //  berita acara proposal anggota Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-anggota/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis2} />,
  },
  {
    // document revisi proposal anggota Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-anggota/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis2} />,
  },
  {
    // dokumen skripsi Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-anggota/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbingSkripsi} />,
  },
  {
    // berita acara skripsi Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-anggota/berita-acara-skripsi",
    element: <Page component={MengisiBeritaAcaraSkripsiKetuaPenelis} />,
  },
  {
    // dokumen revisi skripsi Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-anggota/dokumen-revisi-skripsi",
    element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  },
];

export default anggotaPenelisRoutes;
