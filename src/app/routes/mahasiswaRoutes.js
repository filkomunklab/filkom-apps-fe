import Page from "@jumbo/shared/Page";
import DaftarAlumni from "app/pages/Mahasiswa/KlabatBridge/DaftarAlumni";
import ArsipDocument from "app/pages/ThesisApps/Mahasiswa/ArsipDocument";
import BerandaPengajuanJudul from "app/pages/ThesisApps/Mahasiswa/BerandaPengajuanJudul";
import BerandaProposalMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaProposalMahasiswa";
import BerandaSkripsiMahasiswa from "app/pages/ThesisApps/Mahasiswa/BerandaSkripsiMahasiswa";
import DaftarPengajuan from "app/pages/ThesisApps/Mahasiswa/DaftarPengajuan";
import Konsultasi from "app/pages/ThesisApps/Mahasiswa/Konsultasi";
import MetaDataRepository from "app/pages/ThesisApps/Mahasiswa/MetaDataRepository";
import PengajuanJudul from "app/pages/ThesisApps/Mahasiswa/PengajuanJudul";
import PengajuanJudulDiterima from "app/pages/ThesisApps/Mahasiswa/PengajuanJudulDiterima";
import BerandaPengajuanSkripsi from "app/pages/ThesisApps/Mahasiswa/BerandaPengajuanSkripsi";
import UploadProposal from "app/pages/ThesisApps/Mahasiswa/UploadProposal";
import UploadRevisiSkripsi from "app/pages/ThesisApps/Mahasiswa/UploadRevisiSkripsi";
import UploadSkipsi from "app/pages/ThesisApps/Mahasiswa/UploadSkripsi";
import UploadRevisiProposal from "app/pages/ThesisApps/Mahasiswa/UploadRevisiProposal";

const mahasiswaRoutes = [
  {
    // Thesis Apps Mahasiswa
    path: "/sistem-informasi-skripsi/daftar-pengajuan",
    element: <Page component={DaftarPengajuan} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/beranda-pengajuan-skripsi",
    element: <Page component={BerandaPengajuanSkripsi} />,
  },
  // beranda pengajuan proposal dan skripsi = sama (hanya ganti isisan)
  {
    // router untuk konsultasi
    path: "/sistem-informasi-skripsi/daftar-pengajuan/konsultasi",
    element: <Page component={Konsultasi} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan/pengajuan-judul",
    element: <Page component={PengajuanJudul} />,
  },
  // {
  //   path: "/sistem-informasi-skripsi/daftar-pengajuan/pengajuan-judul-diterima",
  //   element: <Page component={PengajuanJudulDiterima} />,
  // },
  {
    // router untuk beranda pengajuan judul
    path: "/sistem-informasi-skripsi/daftar-pengajuan/beranda",
    element: <Page component={BerandaPengajuanJudul} />,
  },
  {
    // router untuk Upload Proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan/unggah-proposal",
    element: <Page component={UploadProposal} />,
  },
  {
    // router untuk Upload Revisi Proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan/unggah-revisi-proposal",
    element: <Page component={UploadRevisiProposal} />,
  },
  {
    // router untuk Upload Skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan/unggah-skripsi",
    element: <Page component={UploadSkipsi} />,
  },
  {
    // router untuk Upload revisi skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan/unggah-revisi-skripsi",
    element: <Page component={UploadRevisiSkripsi} />,
  },
  {
    // router untuk Upload Arsip Document
    path: "/sistem-informasi-skripsi/daftar-pengajuan/arsip-document",
    element: <Page component={ArsipDocument} />,
  },
  {
    // router untuk Upload MetaData Repository
    path: "/sistem-informasi-skripsi/daftar-pengajuan/metadata-repository",
    element: <Page component={MetaDataRepository} />,
  },
];

export default mahasiswaRoutes;
