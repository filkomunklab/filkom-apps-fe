import Page from "@jumbo/shared/Page";
import ManajemenKelasDosenSkripsi from "app/pages/ThesisApps/Dosen/ManajemenKelasDosenSkripsi";
import DaftarPengajuanProposalSekretaris from "app/pages/ThesisApps/Sekertaris/DaftarPengajuanProposalSekertaris";
import JadwalSidangProposal from "app/pages/ThesisApps/Sekertaris/JadwalSidangProposal";
import JadwalSidangSkripsi from "app/pages/ThesisApps/Sekertaris/JadwalSidangSkripsi";

const sekretarisRoutes = [
  {
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal-sekretaris",
    element: <Page component={DaftarPengajuanProposalSekretaris} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-jadwal-sidang-proposal",
    element: <Page component={JadwalSidangProposal} />,
  },
  {
    path: "/sistem-informasi-skripsi/daftar-jadwal-sidang-skripsi",
    element: <Page component={JadwalSidangSkripsi} />,
  },
  {
    path: "/sistem-informasi-skripsi/manajemen-kelas-dosen-skripsi",
    element: <Page component={ManajemenKelasDosenSkripsi} />,
  },
];

export default sekretarisRoutes;
