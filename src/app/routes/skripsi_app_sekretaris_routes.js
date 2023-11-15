import Page from "@jumbo/shared/Page";
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
    path: "/sistem-informasi-skripsi/daftar-jadwal-sidang-proposal",
    element: <Page component={JadwalSidangProposal} />,
  },
  {
    // JADWAL SKRIPSI
    path: "/sistem-informasi-skripsi/daftar-jadwal-sidang-skripsi",
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
];

export default sekretarisRoutes;
