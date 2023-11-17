import Page from "@jumbo/shared/Page";
import DokumenProposal from "app/pages/ThesisApps/Dosen/DokumenProposal";
import DokumenSkripsi from "app/pages/ThesisApps/Dosen/DokumenSkripsi";
import BerandaGlobal from "app/pages/ThesisApps/Mahasiswa/BerandaGlobal";
import Konsultasi from "app/pages/ThesisApps/Mahasiswa/Konsultasi";
import DaftarPengajuanProposalSekretaris from "app/pages/ThesisApps/Sekertaris/DaftarPengajuanProposalSekertaris";
import DaftarPengajuanSkripsiSekertaris from "app/pages/ThesisApps/Sekertaris/DaftarPengajuanSkripsiSekertaris";
import JadwalSidangProposal from "app/pages/ThesisApps/Sekertaris/JadwalSidangProposal";
import JadwalSidangSkripsi from "app/pages/ThesisApps/Sekertaris/JadwalSidangSkripsi";
import ManajemenDosenSkripsi from "app/pages/ThesisApps/Sekertaris/ManajemenDosenSkripsi";
import PerbaruiJadwalSidang from "app/pages/ThesisApps/Sekertaris/PerbaruiJadwalSidangProposal";
import PerbaruiJadwalSidangSkripsi from "app/pages/ThesisApps/Sekertaris/PerbaruiJadwalSidangSkripsi";
import JadwalSidang from "app/pages/ThesisApps/Sekertaris/JadwalSidang";

const sekretarisRoutes = [
  // PROPOSAL
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal",
    element: <Page component={DaftarPengajuanProposalSekretaris} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal/jadwal-sidang/:groupId/:role",
    element: <Page component={JadwalSidang} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  // SKRIPSI
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi",
    element: <Page component={DaftarPengajuanSkripsiSekertaris} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/jadwal-sidang/:groupId/:role",
    element: <Page component={JadwalSidang} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/dokumen-proposal/:groupId/:role",
    element: <Page component={DokumenProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi/dokumen-skripsi/:groupId/:role",
    element: <Page component={DokumenSkripsi} />,
  },
  // MANAJEMEN JADWAL
  {
    path: "/sistem-informasi-skripsi/daftar-jadwal-sidang-proposal",
    element: <Page component={JadwalSidangProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-jadwal-sidang-proposal/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-jadwal-sidang-skripsi",
    element: <Page component={JadwalSidangSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-jadwal-sidang-skripsi/beranda/:groupId/:role",
    element: <Page component={BerandaGlobal} />,
  },
  // MANAJEMEN DOSEN SKRIPSI
  {
    path: "/sistem-informasi-skripsi/manajamen-dosen-skripsi",
    element: <Page component={ManajemenDosenSkripsi} />,
  },
];

export default sekretarisRoutes;
