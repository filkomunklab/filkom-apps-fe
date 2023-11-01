import Page from "@jumbo/shared/Page";
import DaftarPengujianProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalKetuaPenelis";
import DaftarPengujianSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianSkripsiKetuaPenelis";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";
import MengisiBeritaAcaraSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraSkripsiKetuaPenelis";
import RiwayatPengujianKetuaPenelis from "app/pages/ThesisApps/Dosen/RiwayatPengujianKetuaPenelis";

const ketuaPenelisRoutes = [
  {
    // Daftar pengajuan Proposal Ketua Penelis
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal",
    element: <Page component={DaftarPengujianProposalKetuaPenelis} />,
  },
  {
    // Daftar Pengujian skripsi Ketua Penelis
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi",
    element: <Page component={DaftarPengujianSkripsiKetuaPenelis} />,
  },
  {
    // Berita Acara Proposal Ketua Penelis
    path: "/sistem-informasi-skripsi/daftar-pengujian-proposal/berita-acara-proposal",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis} />,
  },
  {
    // Berita Acara Proposal Ketua Penelis
    path: "/sistem-informasi-skripsi/daftar-pengujian-skripsi/berita-acara-skripsi",
    element: <Page component={MengisiBeritaAcaraSkripsiKetuaPenelis} />,
  },
  {
    // Daftar Riwayat Ketua Penelis
    path: "/sistem-informasi-skripsi/riwayat-uji-ketua",
    element: <Page component={RiwayatPengujianKetuaPenelis} />,
  },
  {
    path: "/sistem",
  },
];

export default ketuaPenelisRoutes;
