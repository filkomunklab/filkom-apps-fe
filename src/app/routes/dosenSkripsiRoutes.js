import Page from "@jumbo/shared/Page";
import DaftarPengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanJudulDosenSkripsi";
import DaftarPengajuanProposalDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanProposalDosenSkripsi";
import DaftarPengajuanSkripsiDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanSkripsiDosenSkripsi";
import ManajemenKelasDosenSkripsi from "app/pages/ThesisApps/Dosen/ManajemenKelasDosenSkripsi";

const dosenSkripsiRoutes = [
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
];

export default dosenSkripsiRoutes;
