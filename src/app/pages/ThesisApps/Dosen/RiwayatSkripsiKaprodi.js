import Div from "@jumbo/shared/Div";
import RiwayatMahasiswaSkripsi from "app/shared/Content/RiwayatMahasiswaSkripsi";
import RiwayatSkripsi from "app/shared/Header/RiwayatSkripsi";
import React from "react";

const RiwayatSkripsiKaprodi = () => {
  return (
    <Div>
      <RiwayatSkripsi />
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
    </Div>
  );
};

export default RiwayatSkripsiKaprodi;
