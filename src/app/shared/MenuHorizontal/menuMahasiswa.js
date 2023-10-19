import Div from "@jumbo/shared/Div";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MenuMahasiswa = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = React.useState(null);
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
          <Div
            sx={{
              width: "1px",
              transform: "90px",
              alignSelf: "stretch",
              background: "rgba(26, 56, 96, 0.10)",
            }}
          ></Div>
          <Div sx={{ margin: "auto" }}>
            <Link to="#">
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
                Pengajuan judul
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
            <Link to="#">
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
              anchorEl={anchorE2}
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
              <MenuItem onClick={() => setAnchorEl(null)}>
                Upload Proposal
              </MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>
                Upload Revisi Proposal
              </MenuItem>
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
                Upload Skripsi
              </MenuItem>
              <MenuItem onClick={() => setAnchorE2(null)}>
                Upload Revisi Skripsi
              </MenuItem>
            </Menu>
          </Div>
        </Div>
      </Div>
      {/* Menu horizontal End */}
    </Div>
  );
};

export default MenuMahasiswa;
