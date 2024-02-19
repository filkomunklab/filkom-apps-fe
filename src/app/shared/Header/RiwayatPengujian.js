import Div from "@jumbo/shared/Div";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import SearchGlobal from "app/shared/SearchGlobal";
import React, { useState } from "react";

const RiwayatPengujian = () => {
  const [selectedValue, setSelectedValue] = useState("Kelas"); // Tentukan teks default di sini

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Div
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: "1 0 0",
          alignSelf: "stretch",
          width: "100%",
          fontSize: "20px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "32px",
        }}
      >
        Daftar Riwayat Pengujian Anggota Panelis
      </Typography>
      <Div
        sx={{
          flexDirection: "row",
          display: "flex",
          padding: "12px 16px",
          alignItems: "center",
          gap: "16px",
          flexShrink: 0,
        }}
      >
        <FormControl>
          <Select
            size="small"
            labelId="dropdown-label"
            id="dropdown"
            value={selectedValue}
            onChange={handleChange}
            sx={{
              height: "30px",
              width: "250px",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
            }}
          >
            <MenuItem value="Kelas">Kelas</MenuItem>{" "}
            {/* Tambahkan nilai default di sini */}
            <MenuItem value="option1">Opsi 1</MenuItem>
            <MenuItem value="option2">Opsi 2</MenuItem>
            <MenuItem value="option3">Opsi 3</MenuItem>
          </Select>
        </FormControl>
      </Div>
      <Div
        sx={{
          flexDirection: "row",
          display: "flex",
          width: "441px",
          padding: "12px 16px",
          alignItems: "center",
          gap: "16px",
          flexShrink: 0,
        }}
      >
        <SearchGlobal />
      </Div>
    </Div>
  );
};

export default RiwayatPengujian;
