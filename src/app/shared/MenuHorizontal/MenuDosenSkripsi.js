import Div from "@jumbo/shared/Div";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MenuDosenSkripsiProposal = ({
  dataGroupId: groupId,
  dataProgress: progress,
  page: setPage,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open2 = Boolean(anchorE2);
  return (
    <Div>
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
              {/* BERANDA */}
              <Button
                component={Link}
                to={`/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/beranda/${groupId}/DOSEN_MK`}
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
                component={Link}
                to={`/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/pengajuan-judul/${groupId}/DOSEN_MK`}
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
              {/* KONSULTASI */}
              <Button
                component={Link}
                to={`/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/konsultasi/${groupId}/DOSEN_MK`}
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
              {/* PENGAJUAN PROPOSAL */}
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
                {/* DOKUMEN PROPOSAL */}
                <Link
                  to={`/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/dokumen-proposal/${groupId}/DOSEN_MK`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem
                    onClick={() => setAnchorEl(null)}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Dokumen Proposal
                  </MenuItem>
                </Link>
                {/* DOKUMEN REVISI PROPOSAL */}
                <Link
                  to={`/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/dokumen-revisi-proposal/${groupId}/DOSEN_MK`}
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
              {/* PENGAJUAN SKRIPSI */}
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
                {/* DOKUMEN SKRIPSI */}
                <Link
                  to={`/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/dokumen-skripsi/${groupId}/DOSEN_MK`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Skripsi
                  </MenuItem>
                </Link>
                {/* DOKUMEN REVISI SKRIPSI */}
                <Link
                  to={`/sistem-informasi-skripsi/daftar-pengajuan-judul-dosen-skripsi/dokumen-revisi-skripsi/${groupId}/DOSEN_MK`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Revisi Skripsi
                  </MenuItem>
                </Link>
              </Menu>
            </Div>
          </Div>
        </Div>
        {/* Menu horizontal End */}
      </Div>
    </Div>
  );
};

export default MenuDosenSkripsiProposal;
