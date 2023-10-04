import Page from "@jumbo/shared/Page";
import DaftarBimbinganProposalAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalAdvisor";
import DaftarDosen from "app/pages/ThesisApps/Dosen/DaftarDosen";
import DaftarPengujianProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalKetuaPenelis";
import DaftarPengujianProposal from "app/pages/ThesisApps/Dosen/DaftarPengujianProposalKetuaPenelis";
import DokumenProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DokumenProposalKetuaPenelis";
import DaftarPengajuanJudulDosenSkripsi from "app/pages/ThesisApps/Dosen/DaftarPengajuanJudulDosenSkripsi";
import DaftarBimbinganProposalCoAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganProposalCoAdvisor";
import BuatKonsultasiAdvisor from "app/pages/ThesisApps/Dosen/BuatKonsultasiAdvisor";
import BeritaAcaraProposal from "app/pages/ThesisApps/Dosen/BukaBeritaAcaraProposalKetuaPenelis";
import BukaBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/BukaBeritaAcaraProposalKetuaPenelis";
import MengisiBeritaAcaraProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalKetuaPenelis";

const dosenRoutes = [
  {
    // Thesis Apps Dosen
    // DosenSkripsi
    path: "/sistem-informasi-skripsi/pengajuan-judul-dosen-skripsi",
    element: <Page component={DaftarPengajuanJudulDosenSkripsi} />,

    // Advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-advisor",
    element: <Page component={DaftarBimbinganProposalAdvisor} />,

    // Co-Advisor
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor",
    element: <Page component={MengisiBeritaAcaraProposalKetuaPenelis} />,
  },
];

export default dosenRoutes;
