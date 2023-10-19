import Div from "@jumbo/shared/Div";
import React, { useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ViewBeritaAcaraProposal = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open1 = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = useState(null);
  const open2 = Boolean(anchorE2);

  //   View Perubahan
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewedChanges, setViewedChanges] = useState("");

  const handleOpenViewDialog = (changes) => {
    setViewedChanges(changes);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  return (
    <Div>
      <Div
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "24px",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          Berita Acara Proposal
        </Typography>
      </Div>

      <Div
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        {/* Element 1 Start */}
        <Div
          sx={{
            display: "flex",
            width: "350px",
            padding: "5px",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            borderRadius: "8px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
          }}
        >
          {/* Riwayat Log Start */}
          <Div
            sx={{
              width: "320px",
              height: "500px",
              borderRadius: "6px",
              border: "1px solid rgba(26, 56, 96, 0.10)",
              background: "#FFF",
            }}
          >
            Riwayat Log
          </Div>
          {/* Riwayat Log End */}

          {/* Dosen Pembimbing Start */}
          <Div
            sx={{
              display: "flex",
              width: "320px",
              flexDirection: "column",
              alignItems: "flex-start",
              borderRadius: "6px",
              border: "1px solid rgba(26, 56, 96, 0.10)",
              background: "#FFF",
            }}
          >
            {/* Advisor */}
            <Div
              sx={{
                display: "flex",
                width: "480px",
                alignItems: "flex-start",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  width: "150px",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: 2,
                  flexShrink: "0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Advisor
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "flex-start",
                  gap: 2,
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                -
              </Div>
            </Div>
            {/* Co-Advisor 1*/}
            <Div
              sx={{
                display: "flex",
                width: "480px",
                alignItems: "flex-start",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  width: "150px",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: 2,
                  flexShrink: "0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Co-Advisor 1
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "flex-start",
                  gap: 2,
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                -
              </Div>
            </Div>
            {/* Co-Advisor 2*/}
            <Div
              sx={{
                display: "flex",
                width: "480px",
                alignItems: "flex-start",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  width: "150px",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: 2,
                  flexShrink: "0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Co-Advisor 2
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "flex-start",
                  gap: 2,
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                -
              </Div>
            </Div>
          </Div>
          {/* Dosen Pembimbing End */}
        </Div>
        {/* Element 1 End */}

        {/* Element 2 Start */}
        <Div
          sx={{
            display: "flex",
            width: "1050px",
            paddingBottom: "0px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            borderRadius: "8px",
          }}
        >
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
                    Jadwal Sidang
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
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Upload Proposal
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Berita Acara Proposal
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

          <Div
            sx={{
              display: "flex",
              padding: "29px 42px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #E0E0E0",
              background: "#FFF",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
            }}
          >
            <Typography
              sx={{
                width: "100%",
                display: "flex",
                padding: "24px",
                alignItems: "center",
                gap: "10px",
                color: "#192434",
                background: "rgba(26, 56, 96, 0.10)",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              PENGEMBANGAN SISTEM INFORMASI SKRIPSI DI FAKULTAS ILMU KOMPUTER
              UNIVERSITAS KLABAT
            </Typography>
            {/* Table Penilaian Start */}

            <TableContainer sx={{ marginBottom: "50px" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              >
                Penilaian
              </Typography>
              <Table>
                <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
                    <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                    <TableCell sx={{ width: "25%" }}>Mahasiswa</TableCell>
                    <TableCell sx={{ width: "25%" }}>Ketua Penelis</TableCell>
                    <TableCell sx={{ width: "25%" }}>Anggota Penelis</TableCell>
                    <TableCell sx={{ width: "25%" }}>Advisor</TableCell>
                    <TableCell sx={{ width: "25%" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Frances Rully Yong</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell sx={{ color: "gray" }}>Score</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {/* Table Penilaian End */}

            {/* Table Perubahan Start */}
            <TableContainer sx={{ marginBottom: "50px" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              >
                Perubahan
              </Typography>
              <Table>
                <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
                    <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                    <TableCell sx={{ width: "25%" }}>Ketua Penelis</TableCell>
                    <TableCell sx={{ width: "25%" }}>Anggota Penelis</TableCell>
                    <TableCell sx={{ width: "25%" }}>Advisor</TableCell>
                    <TableCell sx={{ width: "25%" }}>Co-Advisor</TableCell>
                    <TableCell sx={{ width: "25%" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell sx={{ display: "flex" }}>
                      <span
                        style={{
                          textDecoration: "none",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={() => handleOpenViewDialog(viewedChanges)}
                      >
                        View
                      </span>
                      <Div sx={{ margin: "2px", color: "#E0E0E0" }}>|</Div>
                      <Typography sx={{ color: "gray" }}>Revision</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {/* Table Perubahan End */}

            {/* Table Berita Acara Start */}
            <TableContainer sx={{ marginBottom: "50px" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              >
                Berita Acara
              </Typography>
              <Table>
                <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
                    <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                    <TableCell sx={{ width: "12%" }}>Dekan Fakultas</TableCell>
                    <TableCell sx={{ width: "12%" }}>Ketua Penelis</TableCell>
                    <TableCell sx={{ width: "12%" }}>Anggota Penelis</TableCell>
                    <TableCell sx={{ width: "12%" }}>Advisor</TableCell>
                    <TableCell sx={{ width: "12%" }}>Co-Advisor</TableCell>
                    <TableCell sx={{ width: "5%" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label="Belum" size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label="Sudah"
                        size="small"
                        sx={{
                          background: "rgba(21, 131, 67, 0.10)",
                          color: "#0A7637",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: "gray" }}>Sign</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {/* Table Berita Acara End */}
            {/* Penilaian Akhir Start */}
            <Div
              sx={{
                display: "flex",
                padding: "0px 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <Typography variant="subtitle2">
                Kesimpulan Ujian Proposal
              </Typography>
              <Typography>Diterima</Typography>
            </Div>
            <Div
              sx={{
                display: "flex",
                padding: "0px 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <Typography variant="subtitle2">Perubahan</Typography>
              <Typography>Minor</Typography>
            </Div>
            <Div
              sx={{
                display: "flex",
                padding: "0px 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <Typography variant="subtitle2">
                Nilai Kesimpulan Ujian Proposal
              </Typography>
              <Typography>A-</Typography>
            </Div>
            <Div
              sx={{
                display: "flex",
                padding: "0px 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <Typography variant="subtitle2">Deskripsi</Typography>
              <Typography>Lulus</Typography>
            </Div>
            {/*Penilaian Akhir End */}
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>

      {/* Melihat Perubahan Start */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            padding: "10px 12px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
            textAlign: "center",
          }}
        >
          PERUBAHAN
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "15px",
            alignSelf: "stretch",
          }}
        >
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "100px" }}>Judul Skripsi</Typography>
            <Typography>:</Typography>
            <Typography>
              Pengembangan Sistem Informasi Skripsi di Fakultas Ilmu Komputer
              Universitas Klabat
            </Typography>
          </Div>

          <Div
            sx={{
              display: "flex",
              padding: "0px 50px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "25px",
              alignSelf: "stretch",
            }}
          >
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Ketua Penelis
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  border: "2px solid #F5F5F5",
                }}
              >
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {viewedChanges}
                </Typography>
              </Div>
            </Div>
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Anggota Penelis
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                <Typography sx={{ whiteSpace: "pre-line" }}>-</Typography>
              </Div>
            </Div>
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Advisor
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                <Typography sx={{ whiteSpace: "pre-line" }}>-</Typography>
              </Div>
            </Div>
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Co-Advisor
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                <Typography sx={{ whiteSpace: "pre-line" }}>-</Typography>
              </Div>
            </Div>
          </Div>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseViewDialog}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
            }}
          >
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
      {/* Melihat Perubahan End */}
    </Div>
  );
};

export default ViewBeritaAcaraProposal;
