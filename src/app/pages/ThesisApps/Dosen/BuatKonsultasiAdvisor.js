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

const BuatKonsultasiAdvisor = () => {
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
      alert("Harap isi tanggal dan deskripsi sebelum mencatat konsultasi.");
    } else {
      const newConsultation = {
        group_id: "8406cfb1-d1a2-4314-8563-62797bd6c381", // Ganti dengan group_id yang sesuai
        description: description,
        date: selectedDate,
      };

      // token
      const token = localStorage.getItem("token");
      console.log("token", token);

      // Kirim permintaan POST ke backend dengan header yang berisi token
      axios
        .post("http://localhost:2000/api/v1/consultation", newConsultation, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          setSelectedDate("");
          setDescription("");
          handleDialogClose();
        })
        .catch((error) => {
          alert("Terjadi kesalahan saat mencatat konsultasi.");
          console.error("Error:", error);
        });
    }
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
          <Div sx={{ width: "100%" }}>
            <MenuPenguji />
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

export default BuatKonsultasiAdvisor;
