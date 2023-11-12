import Page from "@jumbo/shared/Page";
import Beranda from "app/pages/ThesisApps/Mahasiswa/BerandaGlobal";
import DaftarPengajuan from "app/pages/ThesisApps/Mahasiswa/DaftarPengajuan";
import Konsultasi from "app/pages/ThesisApps/Mahasiswa/Konsultasi";
import PengajuanJudul from "app/pages/ThesisApps/Mahasiswa/PengajuanJudul";
import UnggahProposal from "app/pages/ThesisApps/Mahasiswa/UnggahProposal";
import UnggahRevisiProposal from "app/pages/ThesisApps/Mahasiswa/UnggahRevisiProposal";
import UnggahSkripsi from "app/pages/ThesisApps/Mahasiswa/UnggahSkripsi";
import UnggahRevisiSkripsi from "app/pages/ThesisApps/Mahasiswa/UnggahRevisiSkripsi";
import ArsipDokumen from "app/pages/ThesisApps/Mahasiswa/ArsipDokumen";
import MetaDataRepository from "app/pages/ThesisApps/Mahasiswa/MetaDataRepository";

const mahasiswaRoutes = [
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan",
    element: <Page component={DaftarPengajuan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/beranda/:groupId/:role",
    element: <Page component={Beranda} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/pengajuan-judul/:groupId/:role",
    element: <Page component={PengajuanJudul} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/konsultasi/:groupId/:role",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/unggah-proposal/:groupId/:role",
    element: <Page component={UnggahProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/unggah-revisi-proposal/:groupId/:role",
    element: <Page component={UnggahRevisiProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/unggah-skripsi/:groupId/:role",
    element: <Page component={UnggahSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/unggah-revisi-skripsi/:groupId/:role",
    element: <Page component={UnggahRevisiSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/arsip-document/:groupId/:role",
    element: <Page component={ArsipDokumen} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/metadata-repository/:groupId/:role",
    element: <Page component={MetaDataRepository} />,
  },
];

export default mahasiswaRoutes;
