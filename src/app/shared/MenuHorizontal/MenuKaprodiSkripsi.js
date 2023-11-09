import Div from "@jumbo/shared/Div";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MenuKaprodiSkripsi = () => {
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
              <Link to="">
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
              <Link to="">
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
              <Link to="">
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
                <Link to="" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem
                    onClick={() => setAnchorEl(null)}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Dokumen Proposal
                  </MenuItem>
                </Link>
                {/* BERITA ACARA PROPOSAL */}
                <Link to="" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Berita Acara Proposal
                  </MenuItem>
                </Link>
                {/* DOKUMEN REVISI PROPOSAL */}
                <Link to="" style={{ textDecoration: "none", color: "black" }}>
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
                <Link to="" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Dokumen Skripsi
                  </MenuItem>
                </Link>
                {/* BERITA ACARA SKRIPSI */}
                <Link to="" style={{ textDecoration: "none", color: "black" }}>
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Berita Acara Skripsi
                  </MenuItem>
                </Link>
                {/* DOKUMEN REVISI SKRIPSI */}
                <Link to="" style={{ textDecoration: "none", color: "black" }}>
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

export default MenuKaprodiSkripsi;
