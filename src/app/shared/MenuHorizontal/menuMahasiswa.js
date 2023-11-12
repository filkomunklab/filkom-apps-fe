import Div from "@jumbo/shared/Div";
import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const MenuMahasiswa = ({ dataGroupId: groupId, dataProgress: progress }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = useState(null);
  const open2 = Boolean(anchorE2);

  const [isKonsultasiDisabled, setIsKonsultasiDisabled] = useState(
    progress !== "Proposal" && progress !== "Skripsi" && progress !== "Finished"
  );
  const [isProposalDisabled, setIsProposalDisabled] = useState(
    progress !== "Proposal" && progress !== "Skripsi" && progress !== "Finished"
  );
  const [isSkripsiDisabled, setIsSkripsiDisabled] = useState(
    progress !== "Skripsi" && progress !== "Finished"
  );
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
                color: "#192434",
                textTransform: "none",
                "&:hover": {
                  color: "#006AF5",
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
                color: "#192434",
                textTransform: "none",
                "&:hover": {
                  color: "#006AF5",
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
                to="/sistem-informasi-skripsi/daftar-pengajuan/unggah-proposal"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem
                  onClick={() => setAnchorEl(null)}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Unggah Proposal
                </MenuItem>
              </Link>
              <Link
                to="/sistem-informasi-skripsi/daftar-pengajuan/unggah-revisi-proposal"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
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
                color: "#192434",
                textTransform: "none",
                "&:hover": {
                  color: "#006AF5",
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
                to="/sistem-informasi-skripsi/daftar-pengajuan/unggah-skripsi"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={() => setAnchorE2(null)}>
                  Unggah Skripsi
                </MenuItem>
              </Link>
              <Link
                to="/sistem-informasi-skripsi/daftar-pengajuan/unggah-revisi-skripsi"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={() => setAnchorE2(null)}>
                  Unggah Revisi Skripsi
                </MenuItem>
              </Link>
              <Link
                to="/sistem-informasi-skripsi/daftar-pengajuan/arsip-document"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={() => setAnchorE2(null)}>
                  Arsip Document
                </MenuItem>
              </Link>
              <Link
                to="/sistem-informasi-skripsi/daftar-pengajuan/metadata-repository"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem onClick={() => setAnchorE2(null)}>
                  Metadata Repository
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
