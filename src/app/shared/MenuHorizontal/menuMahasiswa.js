import Div from "@jumbo/shared/Div";
import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const MenuMahasiswa = ({
  dataGroupId: groupId,
  dataProgress: progress,
  page: setPage,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = useState(null);
  const open2 = Boolean(anchorE2);

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
            <Link
              to={`/sistem-informasi-skripsi/daftar-pengajuan/beranda/${groupId}/MAHASISWA`}
            >
              <Button
                sx={{
                  fontSize: "13px",
                  padding: "6px 16px",
                  fontWeight: 500,
                  color: setPage === "Beranda" ? "#006AF5" : "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color: setPage === "Beranda" ? "#006AF5" : "#006AF5",
                  },
                }}
              >
                Beranda
              </Button>
            </Link>
          </Div>
          <Div
            sx={{
              width: "1px",
              transform: "90px",
              alignSelf: "stretch",
              background: "rgba(26, 56, 96, 0.10)",
            }}
          ></Div>
          <Div sx={{ margin: "auto" }}>
            <Link
              to={`/sistem-informasi-skripsi/daftar-pengajuan/pengajuan-judul/${groupId}/MAHASISWA`}
            >
              <Button
                sx={{
                  // width: "150px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: setPage === "Pengajuan Judul" ? "#006AF5" : "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color:
                      setPage === "Pengajuan Judul" ? "#006AF5" : "#006AF5",
                  },
                }}
              >
                Pengajuan Judul
              </Button>
            </Link>
          </Div>
          <Div
            sx={{
              width: "1px",
              transform: "90px",
              alignSelf: "stretch",
              background: "rgba(26, 56, 96, 0.10)",
            }}
          ></Div>
          <Div sx={{ margin: "auto" }}>
            {/* <Link
              to={`/sistem-informasi-skripsi/daftar-pengajuan/konsultasi/${groupId}/MAHASISWA`}
            > */}
            <Button
              component={Link}
              to={`/sistem-informasi-skripsi/daftar-pengajuan/konsultasi/${groupId}/MAHASISWA`}
              sx={{
                // width: "130px",
                fontSize: "13px",
                fontWeight: 500,
                color: setPage === "Konsultasi" ? "#006AF5" : "#192434",
                textTransform: "none",
                "&:hover": {
                  color: setPage === "Konsultasi" ? "#006AF5" : "#006AF5",
                },
              }}
              disabled={
                progress !== "Proposal" &&
                progress !== "Skripsi" &&
                progress !== "Finished"
              }
            >
              Konsultasi
            </Button>
            {/* </Link> */}
          </Div>
          <Div
            sx={{
              width: "1px",
              transform: "90px",
              alignSelf: "stretch",
              background: "rgba(26, 56, 96, 0.10)",
            }}
          ></Div>
          <Div sx={{ margin: "auto" }}>
            <Button
              onClick={(event) => setAnchorEl(event.currentTarget)}
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                color:
                  setPage === "Unggah Proposal" ||
                  setPage === "Unggah Revisi Proposal"
                    ? "#006AF5"
                    : "#192434",
                textTransform: "none",
                "&:hover": {
                  color:
                    setPage === "Unggah Proposal" ||
                    setPage === "Unggah Revisi Proposal"
                      ? "#006AF5"
                      : "#006AF5",
                },
              }}
              disabled={
                progress !== "Proposal" &&
                progress !== "Skripsi" &&
                progress !== "Finished"
              }
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
              <Link
                to={`/sistem-informasi-skripsi/daftar-pengajuan/unggah-proposal/${groupId}/MAHASISWA`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem
                  onClick={() => setAnchorEl(null)}
                  style={{
                    color:
                      setPage === "Unggah Proposal" ? "#006AF5" : "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color:
                        setPage === "Unggah Proposal" ? "#006AF5" : "#006AF5",
                    },
                  }}
                >
                  Unggah Proposal
                </MenuItem>
              </Link>
              <Link
                to={`/sistem-informasi-skripsi/daftar-pengajuan/unggah-revisi-proposal/${groupId}/MAHASISWA`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem
                  onClick={() => setAnchorEl(null)}
                  style={{
                    color:
                      setPage === "Unggah Revisi Proposal"
                        ? "#006AF5"
                        : "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color:
                        setPage === "Unggah Revisi Proposal"
                          ? "#006AF5"
                          : "#006AF5",
                    },
                  }}
                >
                  Unggah Revisi Proposal
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
                color:
                  setPage === "Unggah Skripsi" ||
                  setPage === "Unggah Revisi Skripsi" ||
                  setPage === "Arsip Dokumen" ||
                  setPage === "Metadata Repositori"
                    ? "#006AF5"
                    : "#192434",
                textTransform: "none",
                "&:hover": {
                  color:
                    setPage === "Unggah Skripsi" ||
                    setPage === "Unggah Revisi Skripsi" ||
                    setPage === "Arsip Dokumen" ||
                    setPage === "Metadata Repositori"
                      ? "#006AF5"
                      : "#006AF5",
                },
              }}
              disabled={progress !== "Skripsi" && progress !== "Finished"}
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
              <Link
                to={`/sistem-informasi-skripsi/daftar-pengajuan/unggah-skripsi/${groupId}/MAHASISWA`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem
                  onClick={() => setAnchorE2(null)}
                  style={{
                    color: setPage === "Unggah Skripsi" ? "#006AF5" : "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color:
                        setPage === "Unggah Skripsi" ? "#006AF5" : "#006AF5",
                    },
                  }}
                >
                  Unggah Skripsi
                </MenuItem>
              </Link>
              <Link
                to={`/sistem-informasi-skripsi/daftar-pengajuan/unggah-revisi-skripsi/${groupId}/MAHASISWA`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem
                  onClick={() => setAnchorE2(null)}
                  style={{
                    color:
                      setPage === "Unggah Revisi Skripsi"
                        ? "#006AF5"
                        : "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color:
                        setPage === "Unggah Revisi Skripsi"
                          ? "#006AF5"
                          : "#006AF5",
                    },
                  }}
                >
                  Unggah Revisi Skripsi
                </MenuItem>
              </Link>
              <Link
                to={`/sistem-informasi-skripsi/daftar-pengajuan/arsip-document/${groupId}/MAHASISWA`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem
                  onClick={() => setAnchorE2(null)}
                  style={{
                    color: setPage === "Arsip Dokumen" ? "#006AF5" : "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color:
                        setPage === "Arsip Dokumen" ? "#006AF5" : "#006AF5",
                    },
                  }}
                >
                  Arsip Dokumen
                </MenuItem>
              </Link>
              <Link
                to={`/sistem-informasi-skripsi/daftar-pengajuan/metadata-repository/${groupId}/MAHASISWA`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem
                  onClick={() => setAnchorE2(null)}
                  style={{
                    color:
                      setPage === "Metadata Repositori" ? "#006AF5" : "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color:
                        setPage === "Metadata Repositori"
                          ? "#006AF5"
                          : "#006AF5",
                    },
                  }}
                >
                  Metadata Repositori
                </MenuItem>
              </Link>
            </Menu>
          </Div>
        </Div>
      </Div>
      {/* Menu horizontal End */}
    </Div>
  );
};

export default MenuMahasiswa;
