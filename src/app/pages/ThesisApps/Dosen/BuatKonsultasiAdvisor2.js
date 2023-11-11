import Div from "@jumbo/shared/Div";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuPenguji from "app/shared/MenuHorizontal/MenuPenguji";
import axios from "axios";
import MenuPengajuanSkripsiDosen from "app/shared/MenuHorizontal/MenuPengajuanSkripsiDosen";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import MenuSekertaris from "app/shared/MenuHorizontal/MenuSekertaris";
import MenuDekanProposal from "app/shared/MenuHorizontal/MenuDekanProposal";
import MenuAnggotaPanalisProposal from "app/shared/MenuHorizontal/MenuAnggotaPanalisProposal";
import MenuKetuaPanalisProposal from "app/shared/MenuHorizontal/MenuKetuaPanalisProposal";
import MenuCoAdvisorProposal from "app/shared/MenuHorizontal/MenuCoAdvisorProposal";
import MenuAdvisorProposal from "app/shared/MenuHorizontal/MenuAdvisorProposal";
import MenuDosenSkripsiProposal from "app/shared/MenuHorizontal/MenuDosenSkripsiProposal";

const BuatKonsultasiAdvisor2 = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [description, setDescription] = useState("");
  const [consultations, setConsultations] = useState([]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCatatKonsultasi = () => {
    if (!selectedDate || !description) {
      // Validasi gagal jika tanggal atau deskripsi kosong
      alert("Harap isi tanggal dan deskripsi sebelum mencatat konsultasi.");
    } else {
      // Validasi berhasil, catat konsultasi dan atur ulang input
      const newConsultation = {
        date: selectedDate,
        description: description,
      };
      setConsultations([...consultations, newConsultation]);
      setSelectedDate(""); // Mengatur ulang nilai tanggal menjadi kosong
      setDescription(""); // Mengatur ulang nilai deskripsi menjadi kosong
      handleDialogClose(); // Menutup dialog setelah mencatat konsultasi
    }
  };

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  console.log(role);

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
          Konsultasi
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
          {/* DOSEN SKRIPSI */}
          <Div
            hidden={role.includes("DOSEN") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuDosenSkripsiProposal />
          </Div>
          {/* ADVISOR */}
          <Div
            hidden={role.includes("ADVISOR") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuAdvisorProposal />
          </Div>
          {/* CO_ADVISOR */}
          <Div
            hidden={role.includes("CO_ADVISOR") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuCoAdvisorProposal />
          </Div>
          {/* KETUA PANALIS */}
          <Div
            hidden={role.includes("KETUA_PANALIS") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKetuaPanalisProposal />
          </Div>
          {/* ANGGOTA PANALIS */}
          <Div
            hidden={role.includes("ANGGOTA_PANALIS") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuAnggotaPanalisProposal />
          </Div>
          {/* KAPRODI */}
          {/* <Div
            hidden={role.includes("KAPRODI") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKaprodiProposal />
          </Div> */}
          {/* DEKAN */}
          <Div
            hidden={role.includes("DEKAN") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuDekanProposal />
          </Div>
          {/* SEKERTARIS */}
          <Div
            hidden={role.includes("SEKERTARIS") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuSekertaris />
          </Div>
          {/* MAHASISWA */}
          <Div
            hidden={role.includes("MAHASISWA") ? false : true}
            sx={{ width: "100%" }}
          >
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
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "50px",
              }}
            >
              {/* Table Konsultasi Start*/}
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  gap: "10px",
                  alignSelf: "stretch",
                  marginBottom: "25px",
                }}
              >
                {/* roll yang bisa akses dosen pembimbing */}
                <Div
                  hidden={role.includes("ADVISOR", "CO_ADVISOR") ? false : true}
                >
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "none" }}
                    onClick={handleDialogOpen}
                  >
                    <CreateIcon sx={{ margin: "3px", fontSize: "small" }} />
                    Catat Konsultasi
                  </Button>
                </Div>
                <Dialog
                  open={isDialogOpen}
                  onClose={handleDialogClose}
                  maxWidth="lg" // Mengatur lebar maksimum menjadi "lg" (1000px)
                  fullWidth // Mengisi lebar penuh
                >
                  <Div
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      alignSelf: "stretch",
                      background: "rgba(26, 56, 96, 0.10)",
                      justifyContent: "center",
                    }}
                  >
                    <DialogTitle
                      sx={{
                        display: "flex",
                        padding: "24px",
                        alignItems: "center",
                        gap: "10px",
                        alignSelf: "stretch",
                      }}
                    >
                      Mencatat Konsultasi
                    </DialogTitle>
                  </Div>

                  <DialogContent>
                    <TextField
                      id="date"
                      label="Tanggal"
                      type="date"
                      fullWidth
                      value={selectedDate}
                      onChange={handleDateChange}
                      sx={{ marginTop: "25px" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <Div sx={{ margin: "25px" }} />
                    <DialogContentText sx={{ width: "100%", margin: "auto" }}>
                      Deskripsi
                    </DialogContentText>
                    <TextareaAutosize
                      id="description"
                      aria-label="Deskripsi"
                      minRows={3}
                      label="Deskripsi"
                      placeholder="Deskripsi"
                      fullWidth
                      value={description}
                      onChange={handleDescriptionChange}
                      style={{
                        width: "100%",
                        height: 108,
                        marginBottom: "25px",
                        display: "block",
                        resize: "vertical",
                        "&:focus": {
                          borderColor: "blue", // Ubah warna border saat aktif (fokus)
                        },
                      }}
                    />
                  </DialogContent>
                  <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <Button
                      onClick={handleDialogClose}
                      color="primary"
                      sx={{
                        background: "white",
                        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                        textTransform: "none",
                        color: "black",
                      }}
                    >
                      Kembali
                    </Button>
                    <Button
                      onClick={handleCatatKonsultasi}
                      color="primary"
                      variant="contained"
                      sx={{ textTransform: "none" }}
                    >
                      Catat
                    </Button>
                  </DialogActions>
                </Dialog>
              </Container>
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "25%" }}>Deskripsi</TableCell>
                      <TableCell sx={{ width: "25%" }}>Tanggal</TableCell>
                      <TableCell sx={{ width: "25%" }}>Tertera</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {consultations.map((consultation, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{consultation.description}</TableCell>
                        <TableCell>{consultation.date}</TableCell>
                        <TableCell>Tertera</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Kelompok mahasiswa End */}
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>
    </Div>
  );
};

export default BuatKonsultasiAdvisor2;
