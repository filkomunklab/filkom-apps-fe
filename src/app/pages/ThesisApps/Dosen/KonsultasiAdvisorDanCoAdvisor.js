import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
import CreateIcon from "@mui/icons-material/Create";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuAdvisor from "app/shared/MenuHorizontal/MenuAdvisor";
import MenuCoAdvisor from "app/shared/MenuHorizontal/MenuCoAdvisor";

const BuatKonsultasi = () => {
  // state - simpan request konsultasi
  const [konsultasi, setKonsultasi] = useState();

  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);

  const userRole = useParams().role;
  console.log("role user akses page: ", userRole);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  console.log("role user yang sign in: ", role);

  useEffect(() => {
    const fetchKonsultasiData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/consultation/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setKonsultasi(response.data.data);
        console.log("Request Get konsultasi: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar dosen:", error);
      }
    };
    fetchKonsultasiData();
  }, [token, groupId]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [description, setDescription] = useState("");

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedDate(""); // Mengatur ulang nilai tanggal menjadi kosong
    setDescription(""); // Mengatur ulang nilai deskripsi menjadi kosong
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
      //   // Validasi berhasil, catat konsultasi dan atur ulang input
      //   const newConsultation = {
      //     date: selectedDate,
      //     description: description,
      //   };
      //   setConsultations([...consultations, newConsultation]);

      const data = {
        group_id: groupId,
        description: description,
        date: selectedDate,
      };
      console.log(data);
      axios
        .post(`http://localhost:2000/api/v1/consultation`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Berhasil mencatat konsultasi: ", response);
          setSelectedDate(""); // Mengatur ulang nilai tanggal menjadi kosong
          setDescription(""); // Mengatur ulang nilai deskripsi menjadi kosong
          handleDialogClose(); // Menutup dialog setelah mencatat konsultasi

          const fetchKonsultasiData = async () => {
            try {
              const response = await axios.get(
                `http://localhost:2000/api/v1/consultation/${groupId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              setKonsultasi(response.data.data);
              console.log("Request Get konsultasi: ", response.data.data);
            } catch (error) {
              console.error(
                "Terjadi kesalahan saat mengambil daftar dosen:",
                error
              );
            }
          };
          fetchKonsultasiData();
        })
        .catch((error) => {
          console.error("Terjadi kesalahan saat mengisi konsultasi:", error);
        });
    }
  };

  const getProposalConsultationMessage = () => {
    const targetConsultations = 4; // Ganti ini dengan total jumlah konsultasi yang dibutuhkan
    const consultations = konsultasi?.consultation;

    if (!consultations) {
      return "Tidak ada konsultasi yang tersedia.";
    }

    // Menghitung jumlah konsultasi dengan status "Proposal"
    const proposalConsultations = consultations?.filter(
      (consultation) => consultation.consultation_status === "Proposal"
    ).length;

    if (proposalConsultations >= targetConsultations) {
      return `Konsultasi Proposal telah terpenuhi ${proposalConsultations}/${targetConsultations}`;
    } else {
      return `Konsultasi Proposal ${proposalConsultations}/${targetConsultations}`;
    }
  };

  const getSkripsiConsultationMessage = () => {
    const targetConsultations = 4; // Ganti ini dengan total jumlah konsultasi yang dibutuhkan
    const consultations = konsultasi?.consultation;

    // Menghitung jumlah konsultasi dengan status "Skripsi"
    const skripsiConsultations = consultations?.filter(
      (consultation) => consultation.consultation_status === "Skripsi"
    ).length;

    if (skripsiConsultations >= targetConsultations) {
      return `Konsultasi Skripsi telah terpenuhi ${skripsiConsultations}/${targetConsultations}`;
    } else {
      return `Konsultasi Skripsi ${skripsiConsultations}/${targetConsultations}`;
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
          <Riwayatlog
            value={groupId}
            riwayatData={(data) => data && setProgress(data.progress)}
          />
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
          {/* ADVISOR */}
          <Div
            hidden={userRole === "ADVISOR" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuAdvisor
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Konsultasi"}
            />
          </Div>

          <Div
            hidden={
              userRole === "CO_ADVISOR1" || userRole === "CO_ADVISOR2"
                ? false
                : true
            }
            sx={{ width: "100%" }}
          >
            <MenuCoAdvisor
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Konsultasi"}
            />
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
              {progress === "Proposal" && (
                <>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#rgba(25, 36, 52, 0.94)",
                    }}
                  >
                    {getProposalConsultationMessage()}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#rgba(25, 36, 52, 0.94)",
                      marginBottom: "25px",
                    }}
                  >
                    Catatan: Mahasiswa wajib melakukan konsultasi proposal
                    bersama advisor dan co-advisor (jika ada) minimal sebanyak
                    4x
                  </Typography>
                </>
              )}
              {progress === "Skripsi" && (
                <>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#rgba(25, 36, 52, 0.94)",
                    }}
                  >
                    {getProposalConsultationMessage()}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#rgba(25, 36, 52, 0.94)",
                    }}
                  >
                    {getSkripsiConsultationMessage()}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#rgba(25, 36, 52, 0.94)",
                      marginBottom: "25px",
                    }}
                  >
                    Catatan: Mahasiswa wajib melakukan konsultasi skripsi
                    bersama advisor dan co-advisor (jika ada) minimal sebanyak
                    4x
                  </Typography>
                </>
              )}
              {progress === "Finished" && (
                <>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#rgba(25, 36, 52, 0.94)",
                    }}
                  >
                    {getProposalConsultationMessage()}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#rgba(25, 36, 52, 0.94)",
                    }}
                  >
                    {getSkripsiConsultationMessage()}
                  </Typography>
                </>
              )}

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
                  hidden={
                    userRole.includes("ADVISOR", "CO_ADVISOR") ? false : true
                  }
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
                      placeholder="dd/mm/yyyy"
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
              {konsultasi?.consultation?.length > 0 ? (
                <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                  <Table>
                    <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                      <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                        <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                        <TableCell sx={{ width: "65%" }}>Deskripsi</TableCell>
                        <TableCell sx={{ width: "10%" }}>Tanggal</TableCell>
                        <TableCell sx={{ width: "20%" }}>Tertera</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {konsultasi?.consultation?.map((consultation, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{consultation.description}</TableCell>
                          <TableCell>{consultation.date}</TableCell>
                          <TableCell>{consultation.dosen}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography
                  sx={{
                    width: "100%",
                    display: "flex",
                    padding: "24px",
                    alignItems: "center",
                    gap: "10px",
                    color: "#CA150C",
                    background: "rgba(226, 29, 18, 0.50)",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  Anda belum melakukan mencatat konsultasi.
                </Typography>
              )}
              {/* Table Kelompok mahasiswa End */}
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>
    </Div>
  );
};

export default BuatKonsultasi;
