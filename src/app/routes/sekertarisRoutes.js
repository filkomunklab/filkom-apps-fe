import React from "react";

import Page from "@jumbo/shared/Page";
import JadwalSidang from "app/pages/ThesisApps/Sekertaris/JadwalSidang";
import JadwalSidangProposal from "app/pages/ThesisApps/Sekertaris/JadwalSidangProposal";
import ManajemenDosenSkripsi from "app/pages/ThesisApps/Sekertaris/ManajemenDosenSkripsi";
import PerbaruiJadwalSidang from "app/pages/ThesisApps/Sekertaris/PerbaruiJadwalSidang";
import PengajuanJudulDiterima from "app/pages/ThesisApps/Mahasiswa/PengajuanJudulDiterima";
import DaftarPengajuanProposalSekertaris from "app/pages/ThesisApps/Sekertaris/DaftarPengajuanProposalSekertaris";
import DaftarPengajuanSkripsiSekertaris from "app/pages/ThesisApps/Sekertaris/DaftarPengajuanSkripsiSekertaris";
import JadwalSidangSkripsi from "app/pages/ThesisApps/Sekertaris/JadwalSidangSkripsi";

const sekertarisRoutes = [
  {
    // daftar pengajuan proposal
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal",
    element: <Page component={DaftarPengajuanProposalSekertaris} />,
  },
  {
    // daftar pengajuan skripsi
    path: "/sistem-informasi-skripsi/daftar-pengajuan-skripsi",
    element: <Page component={DaftarPengajuanSkripsiSekertaris} />,
  },
  {
    // jadwal proposal
    path: "/sistem-informasi-skripsi/jadwal-proposal",
    element: <Page component={JadwalSidangProposal} />,
  },
  {
    // jadwal skripsi
    path: "/sistem-informasi-skripsi/jadwal-skripsi",
    element: <Page component={JadwalSidangSkripsi} />,
  },
  {
    // manajemen dosen skripsi
    path: "/sistem-informasi-skripsi/manajamen-dosen-skripsi",
    element: <Page component={ManajemenDosenSkripsi} />,
  },
];

export default sekertarisRoutes;
