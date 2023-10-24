import Page from "@jumbo/shared/Page";
import DaftarPengujianProposalAnggotaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalAnggotaPenelis";
import DaftarPengujianSkripsiAnggotaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiAnggotaPenelis";
import RiwayatPengujianAnggotaPenelis from "app/pages/ThesisApps/Dosen/RiwayatPengujianAnggotaPenelis";

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
];

export default anggotaPenelisRoutes;
