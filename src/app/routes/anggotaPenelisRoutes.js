import Page from "@jumbo/shared/Page";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import DaftarPengujianProposalAnggotaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalAnggotaPenelis";
import DaftarPengujianSkripsiAnggotaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiAnggotaPenelis";
import DocumentPersetujuanDosenPembimbing from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing";
import DocumentPersetujuanDosenPembimbing2 from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing2";
import DocumentRevisiSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiKetuaPenelis";
import DocumentRevisiProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DokumentRevisiProposalKetuaPenelis";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";
import MengisiBeritaAcaraSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraSkripsiKetuaPenelis";
import RiwayatPengujianAnggotaPenelis from "app/pages/ThesisApps/Dosen/RiwayatPengujianAnggotaPenelis";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";

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
  {
    // dokumen skripsi Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-anggota/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbing2} />,
  },
  {
    // berita acara skripsi Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-anggota/berita-acara-skripsi",
    element: <Page component={MengisiBeritaAcaraSkripsiKetuaPenelis} />,
  },
  {
    // dokumen revisi skripsi Anggota Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-anggota/dokumen-revisi-skripsi",
    element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  },
];

export default anggotaPenelisRoutes;
