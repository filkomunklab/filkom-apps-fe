import Div from "@jumbo/shared/Div";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MenuDekan = ({
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
                to={`/sistem-informasi-skripsi/daftar-pengajuan-${
                  (progress === "Submissioni" && "judul-") ||
                  (progress === "Proposal" && "proposal-") ||
                  (progress === "Skripsi" && "skripsi-") ||
                  (progress === "Finished" && "skripsi-")
                }dekan/beranda/${groupId}/DEKAN`}
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
                to={`/sistem-informasi-skripsi/daftar-pengajuan-${
                  (progress === "Submissioni" && "judul-") ||
                  (progress === "Proposal" && "proposal-") ||
                  (progress === "Skripsi" && "skripsi-") ||
                  (progress === "Finished" && "skripsi-")
                }dekan/pengajuan-judul/${groupId}/DEKAN`}
                sx={{
                  fontSize: "13px",
                  padding: "6px 16px",
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
                to={`/sistem-informasi-skripsi/daftar-pengajuan-${
                  (progress === "Submissioni" && "judul-") ||
                  (progress === "Proposal" && "proposal-") ||
                  (progress === "Skripsi" && "skripsi-") ||
                  (progress === "Finished" && "skripsi-")
                }dekan/konsultasi/${groupId}/DEKAN`}
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
                  color:
                    setPage === "Dokumen Proposal" ||
                    setPage === "Dokumen Revisi Proposal"
                      ? "#006AF5"
                      : "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color:
                      setPage === "Dokumen Proposal" ||
                      setPage === "Dokumen Revisi Proposal"
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
                {/* DOKUMEN PROPOSAL */}
                <Link
                  to={`/sistem-informasi-skripsi/daftar-pengajuan-${
                    (progress === "Submissioni" && "judul-") ||
                    (progress === "Proposal" && "proposal-") ||
                    (progress === "Skripsi" && "skripsi-") ||
                    (progress === "Finished" && "skripsi-")
                  }dekan/dokumen-proposal/${groupId}/DEKAN`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem
                    onClick={() => setAnchorEl(null)}
                    style={{
                      color:
                        setPage === "Dokumen Proposal" ? "#006AF5" : "#192434",
                      textTransform: "none",
                      "&:hover": {
                        color:
                          setPage === "Dokumen Proposal"
                            ? "#006AF5"
                            : "#006AF5",
                      },
                    }}
                  >
                    Dokumen Proposal
                  </MenuItem>
                </Link>
                {/* BERITA ACARA PROPOSAL */}
                <Link
                  to={`/sistem-informasi-skripsi/daftar-${
                    progress === "Finished" ? "riwayat-" : ""
                  }pengujian-${
                    (progress === "Proposal" && "proposal-") ||
                    (progress === "Skripsi" && "skripsi-") ||
                    (progress === "Finished" && "")
                  }dekan/berita-acara-proposal/${groupId}/DEKAN`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem
                    onClick={() => setAnchorEl(null)}
                    style={{
                      color:
                        setPage === "Berita Acara Proposal"
                          ? "#006AF5"
                          : "#192434",
                      textTransform: "none",
                      "&:hover": {
                        color:
                          setPage === "Berita Acara Proposal"
                            ? "#006AF5"
                            : "#006AF5",
                      },
                    }}
                  >
                    Berita Acara Proposal
                  </MenuItem>
                </Link>
                {/* DOKUMEN REVISI PROPOSAL */}
                <Link
                  to={`/sistem-informasi-skripsi/daftar-pengajuan-${
                    (progress === "Submissioni" && "judul-") ||
                    (progress === "Proposal" && "proposal-") ||
                    (progress === "Skripsi" && "skripsi-") ||
                    (progress === "Finished" && "skripsi-")
                  }dekan/dokumen-revisi-proposal/${groupId}/DEKAN`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem
                    onClick={() => setAnchorEl(null)}
                    style={{
                      color:
                        setPage === "Dokumen Revisi Proposal"
                          ? "#006AF5"
                          : "#192434",
                      textTransform: "none",
                      "&:hover": {
                        color:
                          setPage === "Dokumen Revisi Proposal"
                            ? "#006AF5"
                            : "#006AF5",
                      },
                    }}
                  >
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
                  color:
                    setPage === "Dokumen Skripsi" ||
                    setPage === "Dokumen Revisi Skripsi"
                      ? "#006AF5"
                      : "#192434",
                  textTransform: "none",
                  "&:hover": {
                    color:
                      setPage === "Dokumen Skripsi" ||
                      setPage === "Dokumen Revisi Skripsi"
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
                {/* DOKUMEN SKRIPSI */}
                <Link
                  to={`/sistem-informasi-skripsi/daftar-pengajuan-${
                    (progress === "Submissioni" && "judul-") ||
                    (progress === "Proposal" && "proposal-") ||
                    (progress === "Skripsi" && "skripsi-") ||
                    (progress === "Finished" && "skripsi-")
                  }dekan/dokumen-skripsi/${groupId}/DEKAN`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem
                    onClick={() => setAnchorE2(null)}
                    style={{
                      color:
                        setPage === "Dokumen Skripsi" ? "#006AF5" : "#192434",
                      textTransform: "none",
                      "&:hover": {
                        color:
                          setPage === "Dokumen Skripsi" ? "#006AF5" : "#006AF5",
                      },
                    }}
                  >
                    Dokumen Skripsi
                  </MenuItem>
                </Link>
                {/* BERITA ACARA SKRIPSI */}
                <Link
                  to={`/sistem-informasi-skripsi/daftar-${
                    progress === "Finished" ? "riwayat-" : ""
                  }pengujian-${
                    (progress === "Proposal" && "proposal-") ||
                    (progress === "Skripsi" && "skripsi-") ||
                    (progress === "Finished" && "")
                  }dekan/berita-acara-skripsi/${groupId}/DEKAN`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem
                    onClick={() => setAnchorE2(null)}
                    style={{
                      color:
                        setPage === "Berita Acara Skripsi"
                          ? "#006AF5"
                          : "#192434",
                      textTransform: "none",
                      "&:hover": {
                        color:
                          setPage === "Berita Acara Skripsi"
                            ? "#006AF5"
                            : "#006AF5",
                      },
                    }}
                  >
                    Berita Acara Skripsi
                  </MenuItem>
                </Link>
                {/* DOKUMEN REVISI SKRIPSI */}
                <Link
                  to={`/sistem-informasi-skripsi/daftar-pengajuan-${
                    (progress === "Submissioni" && "judul-") ||
                    (progress === "Proposal" && "proposal-") ||
                    (progress === "Skripsi" && "skripsi-") ||
                    (progress === "Finished" && "skripsi-")
                  }dekan/dokumen-revisi-skripsi/${groupId}/DEKAN`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem
                    onClick={() => setAnchorE2(null)}
                    style={{
                      color:
                        setPage === "Dokumen Revisi Skripsi"
                          ? "#006AF5"
                          : "#192434",
                      textTransform: "none",
                      "&:hover": {
                        color:
                          setPage === "Dokumen Revisi Skripsi"
                            ? "#006AF5"
                            : "#006AF5",
                      },
                    }}
                  >
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

export default MenuDekan;
