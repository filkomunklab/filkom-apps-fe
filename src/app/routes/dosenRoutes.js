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
import DaftarBimbinganSkripsiAdvisor from "app/pages/ThesisApps/Dosen/DaftarBimbinganSkripsiAdvisor";
import DaftarPengajuan from "app/pages/ThesisApps/Mahasiswa/DaftarPengajuan";
import MengisiBeritaAcaraProposalAnggotaPenelis from "app/pages/ThesisApps/Dosen/MengisiBeritaAcaraProposalAnggotaPenelis";
import ErrorBeritaAcaraProposal from "app/pages/ThesisApps/Dosen/ErrorBeritaAcaraProposal";
import DocumentRevisiProposalKetuaPenelis from "app/pages/ThesisApps/Dosen/DokumentRevisiProposalKetuaPenelis";
import DocumentRevisiProposalAnggotaPenelis from "app/pages/ThesisApps/Dosen/DokumentRevisiProposalAnggotaPenelis";
import DocumentRevisiProposalAdvisor from "app/pages/ThesisApps/Dosen/DocumentRevisiProposalAdvisor";
import DocumentRevisiSkripsiKetuaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiKetuaPenelis";
import DocumentRevisiSkripsiAnggotaPenelis from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiAnggotaPenelis";
import DocumentRevisiSkripsiAdvisor from "app/pages/ThesisApps/Dosen/DocumentRevisiSkripsiAdvisor";

const dosenRoutes = [
  {
    // Thesis Apps Dosen
    path: "/sistem-informasi-skripsi/bimbingan-proposal-co-advisor",
    element: <Page component={DocumentRevisiSkripsiAdvisor} />,
  },
];

export default dosenRoutes;
