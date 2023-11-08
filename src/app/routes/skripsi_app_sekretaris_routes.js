import Page from "@jumbo/shared/Page";
import DaftarPengajuanProposalSekretaris from "app/pages/ThesisApps/Sekertaris/DaftarPengajuanProposalSekertaris";
import DaftarPengajuanSkripsiSekertaris from "app/pages/ThesisApps/Sekertaris/DaftarPengajuanSkripsiSekertaris";
import JadwalSidangProposal from "app/pages/ThesisApps/Sekertaris/JadwalSidangProposal";
import JadwalSidangSkripsi from "app/pages/ThesisApps/Sekertaris/JadwalSidangSkripsi";
import ManajemenDosenSkripsi from "app/pages/ThesisApps/Sekertaris/ManajemenDosenSkripsi";

const sekretarisRoutes = [
  // PENGAJUAN
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

  // {
  //   // beranda proposal
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal/beranda",
  //   element: <Page component={BerandaProposal} />,
  // },
  // {
  //   // beranda skripsi
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/beranda",
  //   element: <Page component={BerandaSkripsi} />,
  // },
  // {
  //   // jadwal Sidang
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/jadwal-sidang",
  //   element: <Page component={PerbaruiJadwalSidang} />,
  // },
  // {
  //   // konsultasi
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/konsultasi",
  //   element: <Page component={KonsultasiSekertaris} />,
  // },
  // {
  //   // Dokumen Proposal
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/dokumen-proposal",
  //   element: <Page component={DokumenProposal} />,
  // },
  // {
  //   // Dokumen Skripsi
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/dokumen-skripsi",
  //   element: <Page component={DokumenSkripsi} />,
  // },
];

export default sekretarisRoutes;
