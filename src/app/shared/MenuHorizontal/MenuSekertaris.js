import Div from "@jumbo/shared/Div";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MenuSekertaris = () => {
  return (
    <Div>
      {/* Menu Horizontal Start */}
      <Div
        sx={{
          display: "flex",
          // padding: "5px 16px",
          width: "100%",
          alignSelf: "stretch",
          borderRadius: "8px",
          border: "1px solid #E0E0E0",
          background: "#FFF",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
          flexDirection: "column",
        }}
      >
        <Div sx={{ width: "100%", display: "flex" }}>
          <Div sx={{ margin: "auto" }}>
            <Link to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi/beranda">
              <Button
                sx={{
                  fontSize: "13px",
                  padding: "6px 16px",
                  fontWeight: 500,
                  color: "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color: "#006AF5",
                  },
                }}
              >
                Beranda
              </Button>
            </Link>
          </Div>
          <Div sx={{ margin: "auto" }}>
            <Link to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi/jadwal-sidang">
              <Button
                sx={{
                  // width: "150px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color: "#006AF5",
                  },
                }}
              >
                Jadwal Sidang
              </Button>
            </Link>
          </Div>
          <Div sx={{ margin: "auto" }}>
            <Link to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi/konsultasi">
              <Button
                sx={{
                  // width: "130px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color: "#006AF5",
                  },
                }}
              >
                Konsultasi
              </Button>
            </Link>
          </Div>
          <Div sx={{ margin: "auto" }}>
            <Link to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi/dokumen-proposal">
              <Button
                sx={{
                  // width: "130px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color: "#006AF5",
                  },
                }}
              >
                Dokumen Proposal
              </Button>
            </Link>
          </Div>
          <Div sx={{ margin: "auto" }}>
            <Link to="/sistem-informasi-skripsi/daftar-pengajuan-skripsi/dokumen-skripsi">
              <Button
                sx={{
                  // width: "130px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color: "#006AF5",
                  },
                }}
              >
                Dokumen Skripsi
              </Button>
            </Link>
          </Div>
        </Div>
      </Div>
      {/* Menu horizontal End */}
    </Div>
  );
};

export default MenuSekertaris;
