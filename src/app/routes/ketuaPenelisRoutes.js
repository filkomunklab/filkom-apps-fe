import Page from "@jumbo/shared/Page";
import DaftarPengujianProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalKetuaPenelis";
import DaftarPengujianSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiKetuaPenelis";
import RiwayatPengujianKetuaPenelis from "app/pages/ThesisApps/Dosen/RiwayatPengujianKetuaPenelis";

const ketuaPenelisRoutes = [
  {
    // Daftar Pengujian Proposal Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-proposal-ketua",
    element: <Page component={DaftarPengujianProposalKetuaPenelis} />,
  },
  {
    // Daftar Pengujian Skripsi Ketua Penelis
    path: "/sistem-informasi-skripsi/uji-skripsi-ketua",
    element: <Page component={DaftarPengujianSkripsiKetuaPenelis} />,
  },
  {
    // Daftar Riwayat Ketua Penelis
    path: "/sistem-informasi-skripsi/riwayat-uji-ketua",
    element: <Page component={RiwayatPengujianKetuaPenelis} />,
  },
];

export default ketuaPenelisRoutes;
