import React from "react";
import DaftarBimbinganProposalSekertaris from "app/pages/ThesisApps/Sekertaris/DaftarBimbinganProposalSekertaris";
import Page from "@jumbo/shared/Page";
import JadwalSidang from "app/pages/ThesisApps/Sekertaris/JadwalSidang";
import JadwalSidangProposal from "app/pages/ThesisApps/Sekertaris/JadwalSidangProposal";
import ManajemenDosenSkripsi from "app/pages/ThesisApps/Sekertaris/ManajemenDosenSkripsi";
import PerbaruiJadwalSidang from "app/pages/ThesisApps/Sekertaris/PerbaruiJadwalSidang";
import PengajuanJudulDiterima from "app/pages/ThesisApps/Mahasiswa/PengajuanJudulDiterima";
import RiwayatBimbinganAdvisor from "app/pages/ThesisApps/Dosen/RiwayatBimbinganAdvisor";
import RiwayatPengujianKetuaPenelis from "app/pages/ThesisApps/Dosen/RiwayatPengujianKetuaPenelis";

const sekertarisRoutes = [
  {
    // Thesis Apps Mahasiswa
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal",
    element: <Page component={RiwayatPengujianKetuaPenelis} />,
  },
];

export default sekertarisRoutes;
