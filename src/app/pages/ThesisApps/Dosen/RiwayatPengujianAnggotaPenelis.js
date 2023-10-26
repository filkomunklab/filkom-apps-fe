import Div from "@jumbo/shared/Div";
import RiwayatMahasiswaSkripsi from "app/shared/Content/RiwayatMahasiswaSkripsi";
import RiwayatPengujian from "app/shared/Header/RiwayatPengujian";
import React from "react";

const RiwayatPengujianAnggotaPenelis = () => {
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
      <RiwayatPengujian />
      <RiwayatMahasiswaSkripsi />
    </Div>
  );
};

export default RiwayatPengujianAnggotaPenelis;
