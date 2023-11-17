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
  DialogTitle,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import MenuSekertaris from "app/shared/MenuHorizontal/MenuSekertaris";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import { Link } from "react-router-dom";

const TimAnggotaPenelis = ({
  anggotaPenelis,
  setAnggotaPenelis,
  isEditing,
}) => {
  const daftarPengguna = [
    { id: "-", nama: "-" },
    { id: 10, nama: "Andrew T. Liem, MT, PhD" },
    { id: 20, nama: "Green Mandias, SKom, MCs" },
    { id: 30, nama: "Stenly R. Pungus, MT, PhD" },
    { id: 40, nama: "Debby E. Sondakh, MT, PhD" },
    { id: 50, nama: "Ir. Edson Y. Putra, MKom" },
    { id: 60, nama: "Green A. Sandag, SKom, MS" },
    { id: 70, nama: "Jacquline M. S. Waworundeng, ST, MT" },
    { id: 80, nama: "Jimmy H. Moedjahedy, SKom, MKom, MM" },
    { id: 90, nama: "Joe Y. Mambu, BSIT, MCIS" },
    { id: 100, nama: "Lidya C. Laoh, SKom, MMSi" },
    { id: 110, nama: "Marshal Tombeng," },
    { id: 120, nama: "Oktoverano H. Lengkong, SKom, MDs, MM" },
    { id: 130, nama: "Reymon Rotikan, SKom, MS, MM" },
    { id: 140, nama: "Reynoldus A. Sahulata, SKom, MM" },
    { id: 150, nama: "Rolly Lontaan, MKom" },
    { id: 160, nama: "Semmy W. Taju, SKom" },
    { id: 170, nama: "Senly I. Adam, SKom, MSc" },
  ];
  return (
    <Container>
      <Typography variant="subtitle2">Anggota Penelis</Typography>
      {isEditing ? (
        <Select
          labelId="anggota-penelis-label"
          id="anggota-penelis-select"
          fullWidth
          value={anggotaPenelis}
          onChange={(e) => setAnggotaPenelis(e.target.value)}
          size="small"
          sx={{ maxWidth: "250px" }} // Menambahkan batas lebar maksimum
        >
          {daftarPengguna.map((pengguna) => (
            <MenuItem key={pengguna.id} value={pengguna.id}>
              {pengguna.nama}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Typography>
          {daftarPengguna.find((pengguna) => pengguna.id === anggotaPenelis)
            ?.nama || "-"}
        </Typography>
      )}
    </Container>
  );
};

const TimKetuaPenelis = ({ ketuaPenelis, setKetuaPenelis, isEditing }) => {
  const daftarPengguna = [
    { id: "-", nama: "-" },
    { id: 10, nama: "Andrew T. Liem, MT, PhD" },
    { id: 20, nama: "Green Mandias, SKom, MCs" },
    { id: 30, nama: "Stenly R. Pungus, MT, PhD" },
    { id: 40, nama: "Debby E. Sondakh, MT, PhD" },
    { id: 50, nama: "Ir. Edson Y. Putra, MKom" },
    { id: 60, nama: "Green A. Sandag, SKom, MS" },
    { id: 70, nama: "Jacquline M. S. Waworundeng, ST, MT" },
    { id: 80, nama: "Jimmy H. Moedjahedy, SKom, MKom, MM" },
    { id: 90, nama: "Joe Y. Mambu, BSIT, MCIS" },
    { id: 100, nama: "Lidya C. Laoh, SKom, MMSi" },
    { id: 110, nama: "Marshal Tombeng," },
    { id: 120, nama: "Oktoverano H. Lengkong, SKom, MDs, MM" },
    { id: 130, nama: "Reymon Rotikan, SKom, MS, MM" },
    { id: 140, nama: "Reynoldus A. Sahulata, SKom, MM" },
    { id: 150, nama: "Rolly Lontaan, MKom" },
    { id: 160, nama: "Semmy W. Taju, SKom" },
    { id: 170, nama: "Senly I. Adam, SKom, MSc" },
  ];
  return (
    <Container>
      <Typography variant="subtitle2">Ketua Penelis</Typography>
      {isEditing ? (
        <Select
          labelId="ketua-penelis-label"
          id="ketua-penelis-select"
          fullWidth
          value={ketuaPenelis}
          onChange={(e) => setKetuaPenelis(e.target.value)}
          size="small"
          sx={{ maxWidth: "250px" }} // Menambahkan batas lebar maksimum
        >
          {daftarPengguna.map((pengguna) => (
            <MenuItem key={pengguna.id} value={pengguna.id}>
              {pengguna.nama}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <Typography>
          {daftarPengguna.find((pengguna) => pengguna.id === ketuaPenelis)
            ?.nama || "-"}
        </Typography>
      )}
    </Container>
  );
};

const JadwalSidang = ({
  startTime,
  endTime,
  tanggal,
  ruangan,
  setStartTime,
  setEndTime,
  setTanggal,
  setRuangan,
  isEditing,
  handleConfirm,
  handleCancelConfirmation,
  isConfirmationOpen,
}) => {
  return (
    <Container>
      <Typography variant="subtitle2" sx={{ marginTop: "20px" }}>
        Jadwal Sidang
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Mulai</Typography>
          {isEditing ? (
            <TextField
              id="start-time"
              type="time"
              fullWidth
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              inputProps={{
                step: 300, // 5 minute intervals
              }}
            />
          ) : (
            <Typography>{startTime}</Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Selesai</Typography>
          {isEditing ? (
            <TextField
              id="end-time"
              type="time"
              fullWidth
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              inputProps={{
                step: 300, // 5 minute intervals
              }}
            />
          ) : (
            <Typography>{endTime}</Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Tanggal</Typography>
          {isEditing ? (
            <TextField
              id="start-date"
              type="date"
              fullWidth
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
            />
          ) : (
            <Typography>{tanggal}</Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Ruangan</Typography>
          {isEditing ? (
            <TextField
              id="room-name"
              fullWidth
              value={ruangan}
              onChange={(e) => setRuangan(e.target.value)}
              size="small"
            />
          ) : (
            <Typography>{ruangan}</Typography>
          )}
        </Grid>
      </Grid>
      <Dialog
        open={isConfirmationOpen}
        onClose={handleCancelConfirmation}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "24px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Perbarui Jadwal
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Apakah Anda yakin ingin perbarui jadwal?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCancelConfirmation}
            sx={{
              background: "white",
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              textTransform: "none",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            sx={{ textTransform: "none" }}
          >
            Perbarui
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

const PerbaruiJadwalSidangProposal = () => {
  // state - daftar jadwal
  const [jadwalProposal, setDaftarJadwalProposal] = useState([]);
  const [jadwalSkripsi, setJadwalSkripsi] = useState([]);
  // state - daftar dosen
  const [daftarDosen, setDaftarDosen] = useState([]);

  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);
  const [proposalId, setProposalId] = useState(null);
  const [skripsiId, setSkripsiId] = useState(null);

  const userRole = useParams().role;
  console.log("role user akses page: ", userRole);

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  console.log("role user yang sign in: ", role);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    if (progress && progress === "Proposal") {
      const fetchJadwalProposalData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:2000/api/v1/proposal/schedule/${proposalId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
              },
            }
          );
          setDaftarJadwalProposal(response.data.data);
          console.log("Request Get jadwal proposal?: ", response.data.data);

          setKetuaPenelis(response.data.data.panelistChairman || "");
          setAnggotaPenelis(response.data.data.panelist_member || "");
          setStartTime(response.data.data.start_defence || "");
          setEndTime(response.data.data.end_defence || "");
          setTanggal(response.data.data.defence_date || "");
          setRuangan(response.data.data.defence_room || "");
        } catch (error) {
          console.error(
            "Terjadi kesalahan saat mengambil jadwal proposal",
            error
          );
        }
      };
      fetchJadwalProposalData();
    }

    if (progress && (progress === "Skripsi" || progress === "Finished")) {
      const fetchJadwalSkripsiData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:2000/api/v1/skripsi/schedule/${skripsiId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
              },
            }
          );
          setJadwalSkripsi(response.data.data);
          console.log("Request Get jadwal skripsi?: ", response.data.data);

          setKetuaPenelis(response.data.data.panelistChairman || "");
          setAnggotaPenelis(response.data.data.panelist_member || "");
          setStartTime(response.data.data.start_defence || "");
          setEndTime(response.data.data.end_defence || "");
          setTanggal(response.data.data.defence_date || "");
          setRuangan(response.data.data.defence_room || "");
        } catch (error) {
          console.error(
            "Terjadi kesalahan saat mengambil jadwal skripsi",
            error
          );
        }
      };
      fetchJadwalSkripsiData();
    }

    const fetchDaftarDosen = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/dosen-list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarDosen' dengan data dari respons
        setDaftarDosen(response.data.data);
        console.log("Request Daftar Dosen", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar jadwal:", error);
      }
    };
    fetchDaftarDosen();
  }, [token, progress, proposalId, skripsiId]);

  const [ketuaPenelis, setKetuaPenelis] = useState("-");
  const [anggotaPenelis, setAnggotaPenelis] = useState("-");
  const [startTime, setStartTime] = useState("-");
  const [endTime, setEndTime] = useState("-");
  const [tanggal, setTanggal] = useState("-");
  const [ruangan, setRuangan] = useState("-");
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmClick = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirm = () => {
    setIsEditing(false);
    setIsConfirmationOpen(false);
  };

  const handleCancelConfirmation = () => {
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
          Jadwal Sidang
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
            riwayatData={(data) => {
              if (data) {
                setProgress(data.progress);
                setProposalId(data.proposal_id);
                setSkripsiId(data.skripsi_id);
              }
            }}
          />
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
          {/* SEKRETARIS */}
          <Div
            hidden={userRole === "OPERATOR_FILKOM" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuSekertaris
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Jadwal Sidang"}
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
            {progress !== null && progress === "Finished" && (
              <>
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
                    fontWeight: 600, // Membuat teks lebih tebal (nilai 600)
                  }}
                >
                  {jadwalSkripsi?.title}
                </Typography>

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
                    sx={{
                      padding: "14px 16px",
                      background: "rgba(26, 56, 96, 0.10)",
                      borderRadius: "6px 6px 0 0",
                      border: "1px",
                    }}
                  >
                    Kelompok Mahasiswa
                  </Typography>
                  <TableContainer sx={{ marginBottom: "50px" }}>
                    <Table>
                      <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                        <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                          <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                          <TableCell sx={{ width: "25%" }}>
                            Nama Lengkap
                          </TableCell>
                          <TableCell sx={{ width: "25%" }}>NIM</TableCell>
                          <TableCell sx={{ width: "25%" }}>
                            Program Studi
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {jadwalSkripsi?.students?.map((student, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{student.fullName}</TableCell>
                            <TableCell>{student.nim}</TableCell>
                            <TableCell>
                              {student.major === "IF"
                                ? "Informatika"
                                : student.major === "SI"
                                ? "Sistem Informasi"
                                : student.major}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* Table Kelompok mahasiswa End */}

                  {(jadwalSkripsi?.is_report_open === null ||
                    (progress !== null && progress !== "Finished") ||
                    (jadwalSkripsi?.is_report_open === false &&
                      jadwalSkripsi?.is_pass === "Repeat")) && (
                    <>
                      {/* Table Pengajuan Proposal Start */}
                      <Typography
                        sx={{
                          padding: "14px 16px",
                          background: "rgba(26, 56, 96, 0.10)",
                          borderRadius: "6px",
                          border: "1px",
                          marginBottom: "25px",
                        }}
                      >
                        Menentukan Tim Penelis
                      </Typography>
                      {/* input select Tim Penelis Start */}
                      <Container
                        sx={{
                          display: "flex",
                          padding: "0px 25px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          marginBottom: "25px",
                        }}
                      >
                        <Div
                          sx={{
                            display: "flex",
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
                              flex: "1 0 0",
                            }}
                          >
                            <Container>
                              <Typography variant="subtitle2">
                                Ketua Penelis
                              </Typography>
                              {isEditing ? (
                                <Select
                                  labelId="ketua-penelis-label"
                                  id="ketua-penelis-select"
                                  fullWidth
                                  value={ketuaPenelis}
                                  onChange={(e) =>
                                    setKetuaPenelis(e.target.value)
                                  }
                                  size="small"
                                  sx={{ maxWidth: "250px" }} // Menambahkan batas lebar maksimum
                                >
                                  {daftarDosen.map((dosen) => (
                                    <MenuItem key={dosen.id} value={dosen.id}>
                                      {dosen.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              ) : (
                                <Typography>
                                  {jadwalSkripsi?.panelist_chairman}
                                </Typography>
                              )}
                            </Container>
                          </Div>
                          <Div
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",

                              flex: "1 0 0",
                            }}
                          >
                            <Container>
                              <Typography variant="subtitle2">
                                Anggota Penelis
                              </Typography>
                              {isEditing ? (
                                <Select
                                  labelId="anggota-penelis-label"
                                  id="anggota-penelis-select"
                                  fullWidth
                                  value={anggotaPenelis}
                                  onChange={(e) =>
                                    setAnggotaPenelis(e.target.value)
                                  }
                                  size="small"
                                  sx={{ maxWidth: "250px" }} // Menambahkan batas lebar maksimum
                                >
                                  {daftarDosen.map((dosen) => (
                                    <MenuItem key={dosen.id} value={dosen.id}>
                                      {dosen.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              ) : (
                                <Typography>
                                  {jadwalSkripsi?.panelist_member}
                                </Typography>
                              )}
                            </Container>
                          </Div>
                        </Div>
                      </Container>
                      {/* input select Tim Penelis End */}

                      {/* Table Status Siap Maju Sidang Start*/}
                      <Typography
                        sx={{
                          padding: "14px 16px",
                          background: "rgba(26, 56, 96, 0.10)",
                          borderRadius: "6px",
                          border: "1px",
                          marginBottom: "25px",
                        }}
                      >
                        Menyusun Jadwal Sidang
                      </Typography>

                      <Container>
                        <Container>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2">Mulai</Typography>
                              {isEditing ? (
                                <TextField
                                  id="start-time"
                                  type="time"
                                  fullWidth
                                  value={startTime}
                                  onChange={(e) => setStartTime(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                  inputProps={{
                                    step: 300, // 5 minute intervals
                                  }}
                                />
                              ) : (
                                <Typography>{startTime}</Typography>
                              )}
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2">
                                Selesai
                              </Typography>
                              {isEditing ? (
                                <TextField
                                  id="end-time"
                                  type="time"
                                  fullWidth
                                  value={endTime}
                                  onChange={(e) => setEndTime(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                  inputProps={{
                                    step: 300, // 5 minute intervals
                                  }}
                                />
                              ) : (
                                <Typography>{endTime}</Typography>
                              )}
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2">
                                Tanggal
                              </Typography>
                              {isEditing ? (
                                <TextField
                                  id="start-date"
                                  type="date"
                                  fullWidth
                                  value={tanggal}
                                  onChange={(e) => setTanggal(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                />
                              ) : (
                                <Typography>{tanggal}</Typography>
                              )}
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2">
                                Ruangan
                              </Typography>
                              {isEditing ? (
                                <TextField
                                  id="room-name"
                                  fullWidth
                                  value={ruangan}
                                  onChange={(e) => setRuangan(e.target.value)}
                                  size="small"
                                />
                              ) : (
                                <Typography>{ruangan}</Typography>
                              )}
                            </Grid>
                          </Grid>

                          <Dialog
                            open={isConfirmationOpen}
                            onClose={handleCancelConfirmation}
                            fullWidth
                            maxWidth="sm"
                          >
                            <DialogTitle
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "24px",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: 500,
                                  lineHeight: "24px",
                                }}
                              >
                                Perbarui Jadwal
                              </Typography>
                            </DialogTitle>
                            <DialogContent>
                              <Typography gutterBottom>
                                Apakah Anda yakin ingin perbarui jadwal?
                              </Typography>
                            </DialogContent>
                            <DialogActions
                              sx={{ background: "rgba(26, 56, 96, 0.10)" }}
                            >
                              <Button
                                onClick={handleCancelConfirmation}
                                sx={{
                                  background: "white",
                                  boxShadow:
                                    "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                                  textTransform: "none",
                                  color: "black",
                                }}
                              >
                                Batal
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleConfirm}
                                sx={{ textTransform: "none" }}
                              >
                                Perbarui
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Container>
                      </Container>

                      <Div
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          padding: "5px",
                          background: "rgba(26, 56, 96, 0.10)",
                          borderRadius: "6px",
                          marginTop: "25px",
                        }}
                      >
                        {isEditing ? (
                          <Button
                            size="small"
                            onClick={handleConfirmClick}
                            color="primary"
                            variant="contained"
                            sx={{ textTransform: "none" }}
                          >
                            Simpan Perubahan
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            onClick={handleEditClick}
                            color="primary"
                            variant="contained"
                            sx={{ textTransform: "none" }}
                          >
                            Perbarui Jadwal
                          </Button>
                        )}
                      </Div>
                    </>
                  )}

                  {(jadwalProposal?.is_report_open === true ||
                    progress === "Finished" ||
                    (jadwalProposal?.is_report_open === false &&
                      jadwalProposal?.is_pass !== "Repeat")) && (
                    <>
                      {/* Table Pengajuan Proposal Start */}
                      <Typography
                        sx={{
                          padding: "14px 16px",
                          background: "rgba(26, 56, 96, 0.10)",
                          borderRadius: "6px",
                          border: "1px",
                          marginBottom: "25px",
                        }}
                      >
                        Menentukan Tim Penelis
                      </Typography>
                      {/* input select Tim Penelis Start */}
                      <Container
                        sx={{
                          display: "flex",
                          padding: "0px 25px",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          marginBottom: "25px",
                        }}
                      >
                        <Div
                          sx={{
                            display: "flex",
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
                              flex: "1 0 0",
                            }}
                          >
                            <Container>
                              <Typography variant="subtitle2">
                                Ketua Penelis
                              </Typography>
                              {isEditing ? (
                                <Select
                                  labelId="ketua-penelis-label"
                                  id="ketua-penelis-select"
                                  fullWidth
                                  value={ketuaPenelis}
                                  onChange={(e) =>
                                    setKetuaPenelis(e.target.value)
                                  }
                                  size="small"
                                  sx={{ maxWidth: "250px" }} // Menambahkan batas lebar maksimum
                                >
                                  {daftarDosen.map((dosen) => (
                                    <MenuItem key={dosen.id} value={dosen.id}>
                                      {dosen.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              ) : (
                                <Typography>
                                  {jadwalProposal?.panelist_chairman}
                                </Typography>
                              )}
                            </Container>
                          </Div>
                          <Div
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",

                              flex: "1 0 0",
                            }}
                          >
                            <Container>
                              <Typography variant="subtitle2">
                                Anggota Penelis
                              </Typography>
                              {isEditing ? (
                                <Select
                                  labelId="anggota-penelis-label"
                                  id="anggota-penelis-select"
                                  fullWidth
                                  value={anggotaPenelis}
                                  onChange={(e) =>
                                    setAnggotaPenelis(e.target.value)
                                  }
                                  size="small"
                                  sx={{ maxWidth: "250px" }} // Menambahkan batas lebar maksimum
                                >
                                  {daftarDosen.map((dosen) => (
                                    <MenuItem key={dosen.id} value={dosen.id}>
                                      {dosen.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              ) : (
                                <Typography>
                                  {jadwalProposal?.panelist_member}
                                </Typography>
                              )}
                            </Container>
                          </Div>
                        </Div>
                      </Container>
                      {/* input select Tim Penelis End */}

                      {/* Table Status Siap Maju Sidang Start*/}
                      <Typography
                        sx={{
                          padding: "14px 16px",
                          background: "rgba(26, 56, 96, 0.10)",
                          borderRadius: "6px",
                          border: "1px",
                          marginBottom: "25px",
                        }}
                      >
                        Menyusun Jadwal Sidang
                      </Typography>

                      <Container>
                        <Container>
                          <Typography
                            variant="subtitle2"
                            sx={{ marginTop: "20px" }}
                          >
                            Jadwal Sidang
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2">Mulai</Typography>
                              {isEditing ? (
                                <TextField
                                  id="start-time"
                                  type="time"
                                  fullWidth
                                  value={startTime}
                                  onChange={(e) => setStartTime(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                  inputProps={{
                                    step: 300, // 5 minute intervals
                                  }}
                                />
                              ) : (
                                <Typography>{startTime}</Typography>
                              )}
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2">
                                Selesai
                              </Typography>
                              {isEditing ? (
                                <TextField
                                  id="end-time"
                                  type="time"
                                  fullWidth
                                  value={endTime}
                                  onChange={(e) => setEndTime(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                  inputProps={{
                                    step: 300, // 5 minute intervals
                                  }}
                                />
                              ) : (
                                <Typography>{endTime}</Typography>
                              )}
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2">
                                Tanggal
                              </Typography>
                              {isEditing ? (
                                <TextField
                                  id="start-date"
                                  type="date"
                                  fullWidth
                                  value={tanggal}
                                  onChange={(e) => setTanggal(e.target.value)}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                />
                              ) : (
                                <Typography>{tanggal}</Typography>
                              )}
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle2">
                                Ruangan
                              </Typography>
                              {isEditing ? (
                                <TextField
                                  id="room-name"
                                  fullWidth
                                  value={ruangan}
                                  onChange={(e) => setRuangan(e.target.value)}
                                  size="small"
                                />
                              ) : (
                                <Typography>{ruangan}</Typography>
                              )}
                            </Grid>
                          </Grid>

                          <Dialog
                            open={isConfirmationOpen}
                            onClose={handleCancelConfirmation}
                            fullWidth
                            maxWidth="sm"
                          >
                            <DialogTitle
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                padding: "24px",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: 500,
                                  lineHeight: "24px",
                                }}
                              >
                                Perbarui Jadwal
                              </Typography>
                            </DialogTitle>
                            <DialogContent>
                              <Typography gutterBottom>
                                Apakah Anda yakin ingin perbarui jadwal?
                              </Typography>
                            </DialogContent>
                            <DialogActions
                              sx={{ background: "rgba(26, 56, 96, 0.10)" }}
                            >
                              <Button
                                onClick={handleCancelConfirmation}
                                sx={{
                                  background: "white",
                                  boxShadow:
                                    "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                                  textTransform: "none",
                                  color: "black",
                                }}
                              >
                                Batal
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={handleConfirm}
                                sx={{ textTransform: "none" }}
                              >
                                Perbarui
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Container>
                      </Container>

                      <Div
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          padding: "5px",
                          background: "rgba(26, 56, 96, 0.10)",
                          borderRadius: "6px",
                          marginTop: "25px",
                        }}
                      >
                        {isEditing ? (
                          <Button
                            size="small"
                            onClick={handleConfirmClick}
                            color="primary"
                            variant="contained"
                            sx={{ textTransform: "none" }}
                          >
                            Simpan Perubahan
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            onClick={handleEditClick}
                            color="primary"
                            variant="contained"
                            sx={{ textTransform: "none" }}
                          >
                            Perbarui Jadwal
                          </Button>
                        )}
                      </Div>
                    </>
                  )}
                </Div>
              </>
            )}
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>
    </Div>
  );
};

export default PerbaruiJadwalSidangProposal;
