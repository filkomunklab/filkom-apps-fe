import Page from "@jumbo/shared/Page";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import DaftarBimbinganProposalAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalAdvisor";
import DaftarPengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanJudulDosenSkripsi";
import DaftarPengajuanProposalDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanProposalDosenSkripsi";
import DaftarPengajuanSkripsiDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanSkripsiDosenSkripsi";
import DocumentPersetujuanDosenPembimbing from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing";
import DocumentPersetujuanDosenPembimbing2 from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing2";
import DocumentRevisiProposalAdvisor from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalAdvisor";
import DocumentRevisiSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiKetuaPenelis";
import DocumentRevisiProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DokumentRevisiProposalKetuaPenelis";
import ManajemenKelasDosenSkripsi from "app/pages/ThesisApps/Dosen/ManajemenKelasDosenSkripsi";
import MengisiBeritaAcaraProposalDekan from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalDekan";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";
import MengisiBeritaAcaraSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraSkripsiKetuaPenelis";
import PengajuanJudul from "app/pages/ThesisApps/Dosen/PengajuanJudulDosen";
import PengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/PengajuanJudulDosenSkripsi";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";

const dosenSkripsiRoutes = [
  {
    // +++++
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor",
    element: <Page component={DaftarBimbinganProposalAdvisor} />,
  },
  {
    // Daftar Pengajuan Judul Dosen Skripsi
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
    // Daftar Pengajuan Manajemen Kelas
    path: "/sistem-informasi-skripsi/manajemen-kelas-dosen-skripsi",
    element: <Page component={ManajemenKelasDosenSkripsi} />,
  },
  {
    // Beranda Mahasiswa proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/beranda",
    element: <Page component={BerandaProposalMahasiswa} />,
  },
  {
    // Pengajuan Judul Mahasiswa
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/pengajuan-judul",
    element: <Page component={PengajuanJudulDosenSkripsi} />,
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
    // berita acara proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis} />,
  },
  {
    // dokuemn revisi proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/dokumen-revisi-proposal",
    element: <Page component={DocumentRevisiProposalKetuaPenelis} />,
  },
  {
    // dokumen skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbing2} />,
  },
  {
    // berita acara skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/berita-acara-skripsi",
    element: <Page component={MengisiBeritaAcaraSkripsiKetuaPenelis} />,
  },
  {
    // dokuemn revisi skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi-dosen-skripsi/dokumen-revisi-skripsi",
    element: <Page component={DocumentRevisiSkripsiKetuaPenelis} />,
  },
];

export default dosenSkripsiRoutes;
