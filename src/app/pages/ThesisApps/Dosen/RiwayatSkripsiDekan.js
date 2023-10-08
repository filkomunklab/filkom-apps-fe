import Div from "@jumbo/shared/Div";
import RiwayatMahasiswaSkripsi from "app/shared/Content/RiwayatMahasiswaSkripsi";
import React from "react";

const RiwayatSkripsiDekan = () => {
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
      <RiwayatMahasiswaSkripsi />
    </Div>
  );
};

export default RiwayatSkripsiDekan;
