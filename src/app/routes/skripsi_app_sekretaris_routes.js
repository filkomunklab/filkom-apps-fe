import Page from "@jumbo/shared/Page";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import BuatKonsultasiAdvisor2 from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor2";
import DocumentPersetujuanDosenPembimbing from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbing";
import DocumentPersetujuanDosenPembimbingProposal2 from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbingProposal2";
import DocumentPersetujuanDosenPembimbingSkripsi from "app/pages/ThesisApps/Dosen/DocumentPersetujuanDosenPembimbingSkripsi";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";
import BerandaSkripsiMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaSkripsiMahasiswa";
import DaftarPengajuanProposalSekretaris from "app/pages/ThesisApps/Sekertaris/DaftarPengajuanProposalSekertaris";
import DaftarPengajuanSkripsiSekertaris from "app/pages/ThesisApps/Sekertaris/DaftarPengajuanSkripsiSekertaris";
import JadwalSidangProposal from "app/pages/ThesisApps/Sekertaris/JadwalSidangProposal";
import JadwalSidangSkripsi from "app/pages/ThesisApps/Sekertaris/JadwalSidangSkripsi";
import ManajemenDosenSkripsi from "app/pages/ThesisApps/Sekertaris/ManajemenDosenSkripsi";
import PerbaruiJadwalSidang from "app/pages/ThesisApps/Sekertaris/PerbaruiJadwalSidangProposal";
import PerbaruiJadwalSidangSkripsi from "app/pages/ThesisApps/Sekertaris/PerbaruiJadwalSidangSkripsi";

const sekretarisRoutes = [
  /*================================================================================================================*/
  // SEKRETARIS

  // DAFTAR
  {
    // DAFTAR PENGAJUAN PROPOSAL
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal",
    element: <Page component={DaftarPengajuanProposalSekretaris} />,
  },
  {
    // DAFTAR PENGAJUAN SKRIPSI
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi",
    element: <Page component={DaftarPengajuanSkripsiSekertaris} />,
  },

  // MANAJEMEN JADWAL
  {
    // JADWAL PROPOSAL
    path: "/sistem-informasi-skripsi/jadwal-proposal",
    element: <Page component={JadwalSidangProposal} />,
  },
  {
    // JADWAL SKRIPSI
    path: "/sistem-informasi-skripsi/jadwal-skripsi",
    element: <Page component={JadwalSidangSkripsi} />,
  },

  // MANAJEMEN DOSEN
  {
    path: "/sistem-informasi-skripsi/manajamen-dosen-skripsi",
    element: <Page component={ManajemenDosenSkripsi} />,
  },

  // PENGAJUAN JUDUL

  // PROPOSAL
  {
    // Beranda Proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal/beranda",
    element: <Page component={BerandaProposalMahasiswa} />,
  },
  {
    // Jadwal Sidang
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal/jadwal-sidang",
    element: <Page component={PerbaruiJadwalSidang} />,
  },
  {
    // Konsultasi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor} />,
  },
  {
    // Beranda Proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbing} />,
  },

  // SKRIPSI
  {
    // Beranda Skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/beranda",
    element: <Page component={BerandaSkripsiMahasiswa} />,
  },
  {
    // Jadwal Sidang
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/jadwal-sidang",
    element: <Page component={PerbaruiJadwalSidangSkripsi} />,
  },
  {
    // Konsultasi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/konsultasi",
    element: <Page component={BuatKonsultasiAdvisor2} />,
  },
  {
    // Dokumen Proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/dokumen-proposal",
    element: <Page component={DocumentPersetujuanDosenPembimbingProposal2} />,
  },
  {
    // Dokumen Skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/dokumen-skripsi",
    element: <Page component={DocumentPersetujuanDosenPembimbingSkripsi} />,
  },
];

export default sekretarisRoutes;
