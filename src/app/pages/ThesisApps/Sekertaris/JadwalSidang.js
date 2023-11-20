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
  FormControl,
  FormHelperText,
} from "@mui/material";
import MenuSekertaris from "app/shared/MenuHorizontal/MenuSekertaris";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import { Link } from "react-router-dom";

const PerbaruiJadwalSidangProposal = () => {
  // state - daftar jadwal
  const [jadwalProposal, setJadwalProposal] = useState([]);
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
          setJadwalProposal(response.data.data);
          console.log("Request Get jadwal proposal?: ", response.data.data);

          setKetuaPenelis(
            response.data.data.panelist_chairman
              ? daftarDosen.find(
                  (dosen) => dosen.name === response.data.data.panelist_chairman
                )?.id || ""
              : ""
          );
          setAnggotaPenelis(
            response.data.data.panelist_member
              ? daftarDosen.find(
                  (dosen) => dosen.name === response.data.data.panelist_member
                )?.id || ""
              : ""
          );
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

          setKetuaPenelis(
            response.data.data.panelist_chairman
              ? daftarDosen.find(
                  (dosen) => dosen.name === response.data.data.panelist_chairman
                )?.id || ""
              : ""
          );
          setAnggotaPenelis(
            response.data.data.panelist_member
              ? daftarDosen.find(
                  (dosen) => dosen.name === response.data.data.panelist_member
                )?.id || ""
              : ""
          );
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

  const handleBatalEdit = () => {
    // bersihkan jika batal perbarui

    if (progress === "Proposal") {
      setKetuaPenelis(
        jadwalProposal.panelist_chairman
          ? daftarDosen.find(
              (dosen) => dosen.name === jadwalProposal.panelist_chairman
            )?.id || ""
          : ""
      );
      setAnggotaPenelis(
        jadwalProposal.panelist_member
          ? daftarDosen.find(
              (dosen) => dosen.name === jadwalProposal.panelist_member
            )?.id || ""
          : ""
      );
      setStartTime(jadwalProposal.start_defence);
      setEndTime(jadwalProposal.end_defence);
      setTanggal(jadwalProposal.defence_date);
      setRuangan(jadwalProposal.defence_room);
    }
    if (progress === "Skripsi") {
      setStartTime(jadwalSkripsi.start_defence);
      setEndTime(jadwalSkripsi.end_defence);
      setTanggal(jadwalSkripsi.defence_date);
      setRuangan(jadwalSkripsi.defence_room);
    }
    // tutup edit
    setIsEditing(false);
  };

  const [errorMessages, setErrorMessages] = useState({
    startTime: "",
    endTime: "",
    tanggal: "",
    ketuaPenelis: "",
    anggotaPenelis: "",
    ruangan: "",
  });

  const handleConfirmClick = () => {
    let hasError = false;
    const newErrorMessages = {};

    // Validasi input waktu
    if (!startTime) {
      newErrorMessages.startTime = "Mulai Waktu harus diisi";
      hasError = true;
    }

    if (!endTime) {
      newErrorMessages.endTime = "Selesai Waktu harus diisi";
      hasError = true;
    }

    // Validasi input tanggal
    if (!tanggal) {
      newErrorMessages.tanggal = "Mulai Tanggal harus diisi";
      hasError = true;
    }

    // Validasi ketua panelis
    if (!ketuaPenelis) {
      newErrorMessages.ketuaPenelis = "Ketua panelis harus dipilih";
      hasError = true;
    }

    // Validasi anggota panelis
    if (!anggotaPenelis) {
      newErrorMessages.anggotaPenelis = "Anggota panelis harus dipilih";
      hasError = true;
    }

    // Validasi input ruangan
    if (!ruangan) {
      newErrorMessages.ruangan = "Ruangan harus diisi";
      hasError = true;
    }

    if (ketuaPenelis && anggotaPenelis && ketuaPenelis === anggotaPenelis) {
      newErrorMessages.ketuaPenelis =
        "Ketua Panelis dan Anggota Panelis tidak boleh sama";
      newErrorMessages.anggotaPenelis =
        "Ketua Panelis dan Anggota Panelis tidak boleh sama";
      hasError = true;
    }

    if (hasError) {
      setErrorMessages(newErrorMessages);
      // Tampilkan pesan kesalahan
    } else {
      setIsConfirmationOpen(true);
    }
  };

  const handleConfirm = () => {
    if (progress === "Proposal") {
      // Buat objek jadwal baru
      const jadwalBaru = {
        panelist_chairman_id: ketuaPenelis || null,
        panelist_member_id: anggotaPenelis || null,
        start_defence: startTime || null,
        end_defence: endTime || null,
        defence_room: ruangan || null,
        defence_date: tanggal || null,
      };
      console.log("jadwal yang akan dikirim: ", jadwalBaru);
      axios
        .put(
          `http://localhost:2000/api/v1/proposal/schedule/${proposalId}`,
          jadwalBaru,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Berhasil memperbarui jadwal:", response.data);

          // tutup konfirmasi
          setIsEditing(false);
          setIsConfirmationOpen(false);
          // bersihkan
          setKetuaPenelis("");
          setAnggotaPenelis("");
          setStartTime("");
          setEndTime("");
          setTanggal("");
          setRuangan("");

          //  request data
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
              setJadwalProposal(response.data.data);
              console.log("Request Get jadwal proposal?: ", response.data.data);

              setKetuaPenelis(
                response.data.data.panelist_chairman
                  ? daftarDosen.find(
                      (dosen) =>
                        dosen.name === response.data.data.panelist_chairman
                    )?.id || ""
                  : ""
              );
              setAnggotaPenelis(
                response.data.data.panelist_member
                  ? daftarDosen.find(
                      (dosen) =>
                        dosen.name === response.data.data.panelist_member
                    )?.id || ""
                  : ""
              );
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
              console.error(
                "Terjadi kesalahan saat mengambil daftar jadwal:",
                error
              );
            }
          };
          fetchJadwalProposalData();
          fetchDaftarDosen();
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    }
    if (progress === "Skripsi") {
      // Buat objek jadwal baru
      const jadwalBaru = {
        panelist_chairman_id: ketuaPenelis || null,
        panelist_member_id: anggotaPenelis || null,
        start_defence: startTime || null,
        end_defence: endTime || null,
        defence_room: ruangan || null,
        defence_date: tanggal || null,
      };
      console.log("jadwal yang akan dikirim: ", jadwalBaru);
      axios
        .put(
          `http://localhost:2000/api/v1/skripsi/schedule/${skripsiId}`,
          jadwalBaru,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("Berhasil memperbarui jadwal:", response.data);

          // tutup konfirmasi
          setIsEditing(false);
          setIsConfirmationOpen(false);
          setStartTime("");
          setEndTime("");
          setTanggal("");
          setRuangan("");

          //  request data
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

              setKetuaPenelis(
                response.data.data.panelist_chairman
                  ? daftarDosen.find(
                      (dosen) =>
                        dosen.name === response.data.data.panelist_chairman
                    )?.id || ""
                  : ""
              );
              setAnggotaPenelis(
                response.data.data.panelist_member
                  ? daftarDosen.find(
                      (dosen) =>
                        dosen.name === response.data.data.panelist_member
                    )?.id || ""
                  : ""
              );
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
              console.error(
                "Terjadi kesalahan saat mengambil daftar jadwal:",
                error
              );
            }
          };
          fetchJadwalSkripsiData();
          fetchDaftarDosen();
        })
        .catch((error) => {
          console.error("Terjadi kesalahan:", error);
        });
    }
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
            {progress !== null && progress === "Proposal" && (
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
                  {jadwalProposal?.title}
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
                        {jadwalProposal?.students?.map((student, index) => (
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

                  {/* Menampilkan Penyusunan Jadwal Proposal jika porgress di Proposal */}
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
                              Ketua Panelis
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
                                MenuProps={{
                                  anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                  },
                                  transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left",
                                  },
                                  getContentAnchorEl: null,
                                  style: {
                                    maxHeight: "200px", // Sesuaikan dengan tinggi yang diinginkan
                                  },
                                }}
                                error={!!errorMessages.ketuaPenelis}
                              >
                                {daftarDosen.map((dosen) => (
                                  <MenuItem key={dosen.id} value={dosen.id}>
                                    {dosen.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            ) : (
                              <FormControl fullWidth size="small">
                                <TextField
                                  id="Ketua"
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                  value={jadwalProposal?.panelist_chairman}
                                />
                              </FormControl>
                            )}
                            <FormHelperText
                              error={!!errorMessages.ketuaPenelis}
                            >
                              {errorMessages.ketuaPenelis}
                            </FormHelperText>
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
                                MenuProps={{
                                  anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                  },
                                  transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left",
                                  },
                                  getContentAnchorEl: null,
                                  style: {
                                    maxHeight: "200px", // Sesuaikan dengan tinggi yang diinginkan
                                  },
                                }}
                                error={!!errorMessages.anggotaPenelis}
                              >
                                {daftarDosen.map((dosen) => (
                                  <MenuItem key={dosen.id} value={dosen.id}>
                                    {dosen.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            ) : (
                              <FormControl fullWidth size="small">
                                <TextField
                                  id="Anggota"
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                  value={jadwalProposal?.panelist_member}
                                />
                              </FormControl>
                            )}
                            <FormHelperText
                              error={!!errorMessages.anggotaPenelis}
                            >
                              {errorMessages.anggotaPenelis}
                            </FormHelperText>
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
                      Menyusun Jadwal Sidang Proposal
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
                                MenuProps={{
                                  anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                  },
                                  transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left",
                                  },
                                  getContentAnchorEl: null,
                                  style: {
                                    maxHeight: "200px", // Sesuaikan dengan tinggi yang diinginkan
                                  },
                                }}
                                error={!!errorMessages.startTime}
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
                              <FormControl fullWidth size="small">
                                <TextField
                                  id="start"
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                  value={startTime}
                                />
                              </FormControl>
                            )}
                            <FormHelperText error={!!errorMessages.startTime}>
                              {errorMessages.startTime}
                            </FormHelperText>
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
                                MenuProps={{
                                  anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                  },
                                  transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left",
                                  },
                                  getContentAnchorEl: null,
                                  style: {
                                    maxHeight: "200px", // Sesuaikan dengan tinggi yang diinginkan
                                  },
                                }}
                                error={!!errorMessages.endTime}
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
                              <FormControl fullWidth size="small">
                                <TextField
                                  id="end"
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                  value={endTime}
                                />
                              </FormControl>
                            )}
                            <FormHelperText error={!!errorMessages.endTime}>
                              {errorMessages.endTime}
                            </FormHelperText>
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
                                MenuProps={{
                                  anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left",
                                  },
                                  transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left",
                                  },
                                  getContentAnchorEl: null,
                                  style: {
                                    maxHeight: "200px", // Sesuaikan dengan tinggi yang diinginkan
                                  },
                                }}
                                error={!!errorMessages.tanggal}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                  ),
                                }}
                              />
                            ) : (
                              <FormControl fullWidth size="small">
                                <TextField
                                  id="date"
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                  value={tanggal}
                                />
                              </FormControl>
                            )}
                            <FormHelperText error={!!errorMessages.tanggal}>
                              {errorMessages.tanggal}
                            </FormHelperText>
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
                                error={!!errorMessages.ruangan}
                              />
                            ) : (
                              <FormControl fullWidth size="small">
                                <TextField
                                  id="room"
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                  value={ruangan}
                                />
                              </FormControl>
                            )}
                            <FormHelperText error={!!errorMessages.ruangan}>
                              {errorMessages.ruangan}
                            </FormHelperText>
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
                        <>
                          <Button
                            size="small"
                            onClick={handleBatalEdit}
                            sx={{
                              background: "white",
                              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                              textTransform: "none",
                              color: "black",
                              marginRight: "25px",
                            }}
                          >
                            Batal
                          </Button>
                          <Button
                            size="small"
                            onClick={handleConfirmClick}
                            color="primary"
                            variant="contained"
                            sx={{ textTransform: "none" }}
                          >
                            Simpan
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="small"
                          onClick={handleEditClick}
                          color="primary"
                          variant="contained"
                          sx={{ textTransform: "none" }}
                          disabled={jadwalProposal?.is_report_open !== null}
                        >
                          Perbarui Jadwal
                        </Button>
                      )}
                    </Div>
                  </>
                </Div>
              </>
            )}

            {progress !== null &&
              (progress === "Skripsi" || progress === "Finished") && (
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
                        <TableHead
                          sx={{ background: "rgba(26, 56, 96, 0.10)" }}
                        >
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

                    {/* Menampilkan Penyusunan Jadwal Proposal jika porgress di Proposal */}
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
                              <FormControl fullWidth size="small">
                                <TextField
                                  id="Ketua"
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                  value={jadwalSkripsi?.panelist_chairman}
                                />
                              </FormControl>
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
                              <FormControl fullWidth size="small">
                                <TextField
                                  id="Anggota"
                                  fullWidth
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  size="small"
                                  InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                      <InputAdornment position="start"></InputAdornment>
                                    ),
                                  }}
                                  value={jadwalSkripsi?.panelist_member}
                                />
                              </FormControl>
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
                        Menyusun Jadwal Sidang Skripsi
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
                                <FormControl fullWidth size="small">
                                  <TextField
                                    id="start"
                                    fullWidth
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    size="small"
                                    InputProps={{
                                      readOnly: true,
                                      startAdornment: (
                                        <InputAdornment position="start"></InputAdornment>
                                      ),
                                    }}
                                    value={startTime}
                                  />
                                </FormControl>
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
                                <FormControl fullWidth size="small">
                                  <TextField
                                    id="end"
                                    fullWidth
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    size="small"
                                    InputProps={{
                                      readOnly: true,
                                      startAdornment: (
                                        <InputAdornment position="start"></InputAdornment>
                                      ),
                                    }}
                                    value={endTime}
                                  />
                                </FormControl>
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
                                <FormControl fullWidth size="small">
                                  <TextField
                                    id="date"
                                    fullWidth
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    size="small"
                                    InputProps={{
                                      readOnly: true,
                                      startAdornment: (
                                        <InputAdornment position="start"></InputAdornment>
                                      ),
                                    }}
                                    value={tanggal}
                                  />
                                </FormControl>
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
                                <FormControl fullWidth size="small">
                                  <TextField
                                    id="room"
                                    fullWidth
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    size="small"
                                    InputProps={{
                                      readOnly: true,
                                      startAdornment: (
                                        <InputAdornment position="start"></InputAdornment>
                                      ),
                                    }}
                                    value={ruangan}
                                  />
                                </FormControl>
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
                          <>
                            <Button
                              onClick={handleBatalEdit}
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
                              size="small"
                              onClick={handleConfirmClick}
                              color="primary"
                              variant="contained"
                              sx={{ textTransform: "none" }}
                            >
                              Simpan
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="small"
                            onClick={handleEditClick}
                            color="primary"
                            variant="contained"
                            sx={{ textTransform: "none" }}
                            disabled={jadwalSkripsi?.is_report_open !== null}
                          >
                            Perbarui Jadwal
                          </Button>
                        )}
                      </Div>
                    </>
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
