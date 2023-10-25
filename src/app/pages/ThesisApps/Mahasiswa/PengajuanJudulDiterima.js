import React, { useState } from "react";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextareaAutosize,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Paper,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import WarningIcon from "@mui/icons-material/Warning";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";

const PengajuanJudulDiterima = () => {
  // State untuk input select
  const [selectedOption, setSelectedOption] = useState("");

  // menyembunyikan status
  const [isStatusVisible, setStatusVisible] = useState(true);

  const [initialSelectedOption, setInitialSelectedOption] = useState("");

  // State untuk option yang dipilih pada dialog

  // State untuk mengelola berbagai data termasuk judul, latar belakang, dll.
  const [isEditing, setIsEditing] = useState(false);
  const [judul, setJudul] = useState(
    "Pengembangan Sistem Informasi Skripsi di Fakultas Ilmu Komputer Universitas Klabat"
  );

  // State untuk manajemen dialog konfirmasi perubahan judul
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [initialJudul, setInitialJudul] = useState(judul);

  const handleCancelAllEdits = () => {
    setJudul(initialJudul);

    setIsEditing(false);
    setSelectedOption(initialSelectedOption);
    setStatusVisible(true);
  };

  const data = [
    {
      nama: "Geovalga Fransiscus Lim",
      nim: "105021910051",
      programStudi: "Informatika",
    },
    {
      nama: "Frances Rully Yong",
      nim: "105021910051",
      programStudi: "Informatika",
    },
  ];

  // Fungsi yang dipanggil ketika tombol "Ubah" ditekan
  const handleEditClick = () => {
    setIsEditing(true);
    setInitialSelectedOption(selectedOption);
    setStatusVisible(false); // Menyembunyikan status dan chip
    setInitialJudul(judul); // Simpan nilai awal judul
  };

  // Fungsi yang dipanggil ketika tombol "Batal" ditekan dalam mode edit
  const handleCancelEdit = () => {
    setJudul(initialJudul);

    setIsEditing(false);
    setSelectedOption(initialSelectedOption);
    setStatusVisible(true); // Menampilkan kembali status dan chip
  };

  // Fungsi yang dipanggil ketika tombol "Simpan" ditekan
  const handleSaveClick = () => {
    openConfirmationDialog();
    setStatusVisible(true); // Menampilkan kembali status dan chip
  };

  // Fungsi yang dipanggil ketika isi judul berubah
  const handleJudulChange = (event) => {
    setJudul(event.target.value);
  };

  // Fungsi untuk membuka dialog konfirmasi
  const openConfirmationDialog = () => {
    setIsConfirmationOpen(true);
  };

  // Fungsi untuk menutup dialog konfirmasi
  const closeConfirmationDialog = () => {
    setIsConfirmationOpen(false);
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
          Beranda
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
          <Riwayatlog />
        </Div>
        {/* Element 1 End */}
        {/* Element 2 Start */}
        <Div
          sx={{
            direction: "row",
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
          <Div sx={{ width: "100%" }}>
            <MenuMahasiswa />
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
            <Div sx={{ marginBottom: "25px" }}>
              {isStatusVisible && (
                <>
                  <Typography variant="subtitle2">Status</Typography>
                  <Chip
                    label="Diterima"
                    sx={{
                      background: "rgba(21, 131, 67, 0.10);",
                      color: "#0A7637",
                      height: "25px",
                    }}
                  />
                </>
              )}
            </Div>
            {/* Table Start*/}
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "50px",
              }}
            >
              {/* Table Kelompok Mahasiswa Start*/}
              <Typography
                variant="subtitle2"
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Kelompok Mahasiswa
              </Typography>
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "3%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "47%" }}>Nama Lengkap</TableCell>
                      <TableCell sx={{ width: "25%" }}>NIM</TableCell>
                      <TableCell sx={{ width: "25%" }}>Program Studi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.nama}</TableCell>
                        <TableCell>{row.nim}</TableCell>
                        <TableCell>{row.programStudi}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Kelompok mahasiswa End */}
              {/* Judul Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography variant="subtitle2">Judul</Typography>
                {isEditing ? (
                  <TextareaAutosize
                    value={judul}
                    onChange={handleJudulChange}
                    rowsMin={3}
                    style={{
                      width: "100%",
                      resize: "vertical",
                      whiteSpace: "pre-line",
                    }}
                  />
                ) : (
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {judul}
                  </Typography>
                )}
                {/* Button Edit Start */}
                <Div
                  sx={{
                    padding: "12px 24px 12px 0px",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  {isEditing ? (
                    <Div>
                      <Button
                        onClick={handleSaveClick}
                        size="small"
                        sx={{
                          background: "#006AF5",
                          color: "#FFFF",
                          fontSize: "12px",
                          textTransform: "none",
                          "&:hover": {
                            color: "#005FDB",
                          },
                        }}
                      >
                        <BorderColorIcon
                          sx={{ fontSize: "15px", margin: "3px" }}
                        />
                        Perbarui Judul
                      </Button>
                    </Div>
                  ) : (
                    <Button
                      onClick={handleEditClick}
                      size="small"
                      sx={{
                        background: "#006AF5",
                        color: "#FFFF",
                        fontSize: "12px",
                        textTransform: "none",
                        "&:hover": {
                          color: "#005FDB",
                        },
                      }}
                    >
                      <BorderColorIcon
                        sx={{ fontSize: "15px", margin: "3px" }}
                      />
                      Ubah Judul
                    </Button>
                  )}
                </Div>
                {/* Button Edit End */}
              </Div>
              {/* Judul End */}

              {/* table upload start */}
              <TableContainer sx={{ marginBottom: "25px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "3%" }}
                      >
                        Nomor
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "45%" }}
                      >
                        Nama File
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "20%" }}
                      >
                        Tanggal
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "20%" }}
                      >
                        Ukuran
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          textAlign: "center",
                          width: "12%",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontSize: "12px" }}>1</TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        SISTEM INFORMASI PELAYANAN PUSKESMAS TALAWAAN BERBASIS
                        WEB-APPLICATION
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        08/09/2023
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>234242 kb</TableCell>
                      <TableCell>
                        <Div sx={{ display: "flex" }}>
                          <span
                            style={{
                              textDecoration: "none",
                              cursor: "pointer",
                              color: "blue",
                              fontSize: "12px",
                            }}
                          >
                            View
                          </span>
                        </Div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* table upload end */}

              {/* Select Dosen Pembimbing Start */}
              <Div
                sx={{
                  display: "flex",
                  height: "62px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "15px",
                  alignSelf: "stretch",
                  marginBottom: "20px",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "40px",
                  }}
                >
                  <Div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    <Typography variant="subtitle2">Calon Advisor</Typography>
                    <Typography>Andrew T. Liem, MT, PhD</Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    <Typography variant="subtitle2">
                      Calon Co-Advisor 1
                    </Typography>
                    <Typography>Senly I. Adam, SKom, MSc</Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    <Typography variant="subtitle2">
                      Calon Co-Advisor 2
                    </Typography>
                    <Typography>Stenly R. Pungus, MT, PhD</Typography>
                  </Div>
                </Div>
              </Div>
              {/* Select Dosen Pembimbing End */}

              {/* Radio Button Start */}
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography component="div">
                  Apakah Anda sudah melakukan konsultasi dengan Advisor sebelum
                  mengajukan judul?
                </Typography>
                <Typography>Ya</Typography>
              </Div>
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>

      {/* Konfirmasi Dialog */}
      <Dialog
        open={isConfirmationOpen}
        onClose={closeConfirmationDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <WarningIcon fontSize="large" sx={{ marginRight: "6px" }} />
          <Typography variant="h1" sx={{ margin: "10px 0" }}>
            Memperbarui Judul
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin memperbarui pengajuan judul?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: "#F5F5F5" }}>
          <Button
            onClick={() => {
              closeConfirmationDialog();
              handleCancelEdit();
              handleCancelAllEdits();
            }}
            sx={{
              textTransform: "none",
              borderRadius: "6px",
              border: "#E0E0E0",
              background: "#FFFF",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={() => {
              closeConfirmationDialog();
              setIsEditing(false);
              setInitialJudul(judul);
              // Simpan perubahan ke server jika diperlukan
            }}
            sx={{
              textTransform: "none",
              borderRadius: "6px",
              background: "#FC0",
              boxShadow: "rgba(0, 0, 0, 0.12)",
              color: "rgba(38, 52, 69, 1)",
              "&:hover": {
                color: "#FC0",
              },
            }}
          >
            Perbarui
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Konfirmasi Dialog */}
    </Div>
  );
};

export default PengajuanJudulDiterima;
