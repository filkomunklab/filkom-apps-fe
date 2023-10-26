import React from "react";

import Div from "@jumbo/shared/Div";

import RiwayatBimbingan from "app/shared/Header/RiwayatBimbingan";
import RiwayatMahasiswaSkripsi from "app/shared/Content/RiwayatMahasiswaSkripsi";

const RiwayatBimbinganAdvisor = () => {
  return (
    <Div
      sx={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        gap: "25px",
      }}
    >
      <RiwayatBimbingan />
      <RiwayatMahasiswaSkripsi />
    </Div>
  );
};

export default RiwayatBimbinganAdvisor;
