import React from "react";
import DaftarBimbinganProposalSekertaris from "app/pages/ThesisApps/Sekertaris/DaftarBimbinganProposalSekertaris";
import Page from "@jumbo/shared/Page";
import JadwalSidang from "app/pages/ThesisApps/Sekertaris/JadwalSidang";

const sekertarisRoutes = [
  {
    // Thesis Apps Mahasiswa
    path: "/sistem-informasi-skripsi/daftar-pengajuan-proposal",
    element: <Page component={JadwalSidang} />,
  },
];

export default sekertarisRoutes;
