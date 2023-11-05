import Div from "@jumbo/shared/Div";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MenuPenguji = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open2 = Boolean(anchorE2);

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  console.log(role);

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
            {/* DOSEN SKRIPSI */}
            <Div hidden={role.includes("DOSEN") ? false : true}>
              <Link to="/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/beranda">
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
            {/* DOSEN PEMBIMBING */}
            <Div hidden={role.includes("ADVISOR") ? false : true}>
              <Link to="#">
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
            {/* Dosen ketua panalis */}
            <Div hidden={role.includes("KETUA_PANALIS") ? false : true}>
              <Link to="#">
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
          </Div>
          <Div sx={{ margin: "auto" }}>
            {/* Dosen skripsi */}
            <Div hidden={role.includes("DOSEN") ? false : true}>
              <Link to="/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/pengajuan-judul">
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
                  Pengajuan Judul
                </Button>
              </Link>
            </Div>
          </Div>
          <Div sx={{ margin: "auto" }}>
            {/* dosen skripsi */}
            <Div hidden={role.includes("DOSEN") ? false : true}>
              <Link to="/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/konsultasi">
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
            {/* dosen Advisor */}
            <Div hidden={role.includes("ADVISOR") ? false : true}>
              <Link to="/sistem-informasi-skripsi/bimbingan-proposal-advisor/konsultasi">
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
            {/* dosen co-advisor */}
            {/* dosen ketua panalis */}
            {/* dosen anggota panalis */}
            {/* dosen kaprodi */}
            {/* dosen dekan */}
          </Div>
          <Div sx={{ margin: "auto" }}>
            <Button
              onClick={(event) => setAnchorEl(event.currentTarget)}
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#192434",
                textTransform: "none",
                "&:hover": {
                  color: "#006AF5",
                },
              }}
            >
              Pengajuan Proposal
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open1}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {/* dosen skripsi */}
              {/* DOSEN GANTI DOSEN_SKRIPSI */}
              <Div
                hidden={
                  role.includes(
                    "DOSEN",
                    "ADVISOR",
                    "CO_ADVISOR",
                    "KETUA_PANALIS",
                    "ANGGOTA_PANALIS",
                    "KAPRODI",
                    "DEKAN"
                  )
                    ? false
                    : true
                }
              >
                <Link
                  to="/sistem-informasi-skripsi/daftar-pengajuan-proposal-dosen-skripsi/dokumen-proposal"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dokumen Proposal
                  </MenuItem>
                </Link>
              </Div>
              <Link
                to="/sistem-informasi-skripsi/bimbingan-proposal-advisor/berita-acara-proposal"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  Berita Acara Proposal
                </MenuItem>
              </Link>
              <Link
                to="/sistem-informasi-skripsi/bimbingan-proposal-advisor/document-revisi-proposal"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  Dokumen Revisi Proposal
                </MenuItem>
              </Link>
            </Menu>
          </Div>
          <Div
            sx={{
              width: "1px",
              transform: "90px",
              alignSelf: "stretch",
              background: "rgba(26, 56, 96, 0.10)",
            }}
          ></Div>
          {/* Menu Pengajuan Skripsi */}
          <Div>
            <Button
              onClick={(event) => setAnchorE2(event.currentTarget)}
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#192434",
                textTransform: "none",
                "&:hover": {
                  color: "#006AF5",
                },
              }}
            >
              Pengajuan Skripsi
            </Button>
            <Menu
              anchorEl={anchorE2}
              open={open2}
              onClose={() => setAnchorE2(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={() => setAnchorE2(null)}>
                Dokumen Skripsi
              </MenuItem>
              <MenuItem onClick={() => setAnchorE2(null)}>
                Berita Acara Skripsi
              </MenuItem>
              <MenuItem onClick={() => setAnchorE2(null)}>
                Dokumen Revisi Skripsi
              </MenuItem>
            </Menu>
          </Div>
        </Div>
      </Div>
      {/* Menu horizontal End */}
    </Div>
  );
};

export default MenuPenguji;
