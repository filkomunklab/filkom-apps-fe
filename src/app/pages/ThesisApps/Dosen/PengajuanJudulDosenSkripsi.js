import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  DialogActions,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuDosenSkripsi from "app/shared/MenuHorizontal/MenuDosenSkripsi";
import MenuDekan from "app/shared/MenuHorizontal/MenuDekan";
import MenuKaprodi from "app/shared/MenuHorizontal/MenuKaprodi";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";

const PengajuanJudulDosenSkripsi = () => {
  // state - simpan request pengajuan judul
  const [pengajuanJudul, setPengajuanJudul] = useState();
  const [daftarDosen, setDaftarDosen] = useState();

  const groupId = useParams().groupId;
  // console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);

  const userRole = useParams().role;
  console.log("role user akses page: ", userRole);

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  console.log("role user yang sign in: ", role);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchPengajuanJudulData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/submission/${submissionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setPengajuanJudul' dengan data dari respons
        setPengajuanJudul(response.data.data);

        // Setel visibility tombol sesuai kondisi is_approve
        setGantiAdvisorCoAdvisorButtonVisible(
          response.data.data.is_approve === "Waiting"
        );
        setTolakTerimaButtonsVisible(
          response.data.data.is_approve === "Waiting"
        );
        console.log("Request Get pengajuan judul: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil pengajuan judul:",
          error
        );
      }
    };
    const fetchDaftarDosenData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/group/dosen-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDaftarDosen(response.data.data);
        console.log("Request Get daftar dosen: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar dosen:", error);
      }
    };
    fetchPengajuanJudulData();
    fetchDaftarDosenData();
  }, [token, submissionId]);

  const [confirmTolakOpen, setConfirmTolakOpen] = useState(false); // State untuk dialog konfirmasi tolak
  const [confirmTerimaOpen, setConfirmTerimaOpen] = useState(false); // State untuk dialog konfirmasi terima

  const [
    gantiAdvisorCoAdvisorButtonVisible,
    setGantiAdvisorCoAdvisorButtonVisible,
  ] = useState(false);

  const [tolakTerimaButtonsVisible, setTolakTerimaButtonsVisible] =
    useState(false);

  const handleTolakClick = () => {
    // Menampilkan dialog konfirmasi tolak
    setConfirmTolakOpen(true);
  };

  const handleTerimaClick = () => {
    // Menampilkan dialog konfirmasi terima
    setConfirmTerimaOpen(true);
  };

  const handleTolak = () => {
    // Di sini Anda bisa menambahkan logika untuk menolak pengajuan setelah konfirmasi
    // Setelah pengajuan ditolak, update status menjadi "Ditolak"
    // setStatus("Ditolak");

    // Tutup dialog konfirmasi
    setConfirmTolakOpen(false);
    console.log("token di handle tolak: ", token);
    axios
      .put(
        `http://localhost:2000/api/v1/submission/reject/${submissionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTolakTerimaButtonsVisible(false);
        setGantiAdvisorCoAdvisorButtonVisible(false);

        console.log("Berhasil menolak pengajuan ");
        // Ambil data terbaru dari database
        const fetchPengajuanJudulData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/submission/${submissionId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            // Atur state 'setPengajuanJudul' dengan data dari respons
            setPengajuanJudul(response.data.data);

            // Setel visibility tombol sesuai kondisi is_approve
            setGantiAdvisorCoAdvisorButtonVisible(
              response.data.data.is_approve === "Waiting"
            );
            setTolakTerimaButtonsVisible(
              response.data.data.is_approve === "Waiting"
            );
            console.log("Request Get pengajuan judul: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil pengajuan judul:",
              error
            );
          }
        };
        fetchPengajuanJudulData();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menolak pengajuan:", error);
      });
  };

  const handleTerima = () => {
    // Di sini Anda bisa menambahkan logika untuk menerima pengajuan setelah konfirmasi
    // Setelah pengajuan diterima, update status menjadi "Diterima"
    // setStatus("Diterima");

    // Tutup dialog konfirmasi
    setConfirmTerimaOpen(false);
    axios
      .put(
        `http://localhost:2000/api/v1/submission/approve/${submissionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTolakTerimaButtonsVisible(false);
        setGantiAdvisorCoAdvisorButtonVisible(false);

        console.log("Berhasil menerima pengajuan ");
        // Ambil data terbaru dari database
        const fetchPengajuanJudulData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/submission/${submissionId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            // Atur state 'setPengajuanJudul' dengan data dari respons
            setPengajuanJudul(response.data.data);

            // Setel visibility tombol sesuai kondisi is_approve
            setGantiAdvisorCoAdvisorButtonVisible(
              response.data.data.is_approve === "Waiting"
            );
            setTolakTerimaButtonsVisible(
              response.data.data.is_approve === "Waiting"
            );
            console.log("Request Get pengajuan judul: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil pengajuan judul:",
              error
            );
          }
        };
        fetchPengajuanJudulData();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menolak pengajuan:", error);
      });
  };

  const [status, setStatus] = useState("Menunggu"); // Tambahkan state untuk status

  const handleAdvisorChange = (e) => {
    setAdvisor(e.target.value);
  };

  const handleCoAdvisor1Change = (e) => {
    setCoAdvisor1(e.target.value);
  };

  const handleCoAdvisor2Change = (e) => {
    setCoAdvisor2(e.target.value);
  };

  // menyembunyikan status
  const [isStatusVisible] = useState(true);

  // State untuk mengelola berbagai data termasuk judul, latar belakang, dll.
  const [judul] = useState(
    "Pengembangan Sistem Informasi Skripsi di Fakultas Ilmu Komputer Universitas Klabat"
  );

  const [openDialog, setOpenDialog] = useState(false);

  // State untuk mengelola pilihan advisor dan co-advisor
  const [advisor, setAdvisor] = useState("");
  const [coAdvisor1, setCoAdvisor1] = useState("");
  const [coAdvisor2, setCoAdvisor2] = useState("");

  const handleClickOpen = () => {
    // isi state advisor dan co advisor dengan nilai awal sebelum diganti
    setAdvisor(pengajuanJudul?.proposed_advisor_id);
    setCoAdvisor1(pengajuanJudul?.proposed_co_advisor1_id);
    setCoAdvisor2(pengajuanJudul?.proposed_co_advisor2_id);
    setOpenDialog(true);
  };

  const handleClose = () => {
    // set advisor dan co advisor ke nilai awal
    setAdvisor(pengajuanJudul?.proposed_advisor_id);
    setCoAdvisor1(pengajuanJudul?.proposed_co_advisor1_id);
    setCoAdvisor2(pengajuanJudul?.proposed_co_advisor2_id);
    setOpenDialog(false);
  };

  const handleSave = () => {
    // Di sini Anda dapat melakukan apa pun yang diperlukan untuk menyimpan perubahan advisor dan co-advisor.
    // Anda bisa menggunakan nilai dari state advisor, coAdvisor1, dan coAdvisor2 untuk melakukan penyimpanan.

    // Setelah Anda menyimpan perubahan, Anda bisa menutup dialog.
    handleClose();

    const data = {
      proposed_advisor_id: advisor,
      proposed_co_advisor1_id: coAdvisor1 || null,
      proposed_co_advisor2_id: coAdvisor2 || null,
    };
    console.log(data);
    axios
      .put(
        `http://localhost:2000/api/v1/submission/advisor-and-co-advisor/${submissionId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil mengganti advisor dan co-advisor ");
        // Ambil data terbaru dari database
        const fetchPengajuanJudulData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/submission/${submissionId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            // Atur state 'setPengajuanJudul' dengan data dari respons
            setPengajuanJudul(response.data.data);

            // Setel visibility tombol sesuai kondisi is_approve
            setGantiAdvisorCoAdvisorButtonVisible(
              response.data.data.is_approve === "Waiting"
            );
            setTolakTerimaButtonsVisible(
              response.data.data.is_approve === "Waiting"
            );
            console.log("Request Get pengajuan judul: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil pengajuan judul:",
              error
            );
          }
        };
        fetchPengajuanJudulData();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengganti pembimbing:", error);
      });
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
        <Typography variant="subtitle2" sx={{ fontSize: "24px" }}>
          Pengajuan Judul
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
                setSubmissionId(data.submission_id);
              }
            }}
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
          {/* Menu Horizontal DOSEN Start */}
          {/* <Div
            hidden={role.includes("DOSEN", "KAPRODI", "DEKAN") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuPengajuanJudulDosen />
          </Div> */}
          {/* Menu horizontal MAHASISWA End */}
          {/* DOSEN SKRIPSI */}
          <Div
            hidden={userRole.includes("DOSEN_MK") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuDosenSkripsi dataGroupId={groupId} dataProgress={progress} />
          </Div>

          {/* DEKAN */}
          <Div
            hidden={userRole.includes("DEKAN") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuDekan dataGroupId={groupId} dataProgress={progress} />
          </Div>

          {/* KAPRODI */}
          <Div
            hidden={userRole.includes("KARPODI") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKaprodi dataGroupId={groupId} dataProgress={progress} />
          </Div>

          {/* MAHASISWA */}
          {/* <Div
            hidden={userRole.includes("MAHASISWA") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuMahasiswa dataGroupId={groupId} dataProgress={progress} />
          </Div> */}
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
              <Typography variant="subtitle2">Status</Typography>
              {pengajuanJudul?.is_approve === "Waiting" ? (
                <Chip
                  label="Menunggu"
                  sx={{
                    background: "rgba(255, 204, 0, 0.10)",
                    color: "#985211",
                    height: "25px",
                  }}
                />
              ) : pengajuanJudul?.is_approve === "Approve" ? (
                <Chip
                  label={"Diterima"}
                  sx={{
                    background: "rgba(21, 131, 67, 0.10)",
                    color: "#0A7637",
                  }}
                />
              ) : pengajuanJudul?.is_approve === "Rejected" ? (
                <Chip
                  label={"Ditolak"}
                  sx={{
                    background: "rgba(226, 29, 18, 0.10)",
                    color: "#CA150C",
                  }}
                />
              ) : (
                pengajuanJudul?.is_approve
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
                      <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "25%" }}>Nama Lengkap</TableCell>
                      <TableCell sx={{ width: "25%" }}>NIM</TableCell>
                      <TableCell sx={{ width: "25%" }}>Program Studi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pengajuanJudul?.students?.map((student, studentIndex) => (
                      <TableRow>
                        <TableCell>{studentIndex + 1}</TableCell>
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
              {/* Judul Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography variant="subtitle2">Judul</Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {pengajuanJudul?.title}
                </Typography>
              </Div>
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
                      <TableCell>1</TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {pengajuanJudul?.file_name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {pengajuanJudul?.upload_date}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {pengajuanJudul?.file_size}
                      </TableCell>
                      <TableCell>
                        <span
                          style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "blue",
                            fontSize: "12px",
                            padding: "5px 0",
                          }}
                        >
                          Lihat
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Judul End */}
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
                    {/* Menampilkan Advisor */}
                    <Typography variant="subtitle2">
                      Mengusulkan Advisor
                    </Typography>
                    <Typography>
                      {
                        daftarDosen?.find(
                          (dosen) =>
                            dosen.id === pengajuanJudul?.proposed_advisor_id
                        )?.name
                      }
                    </Typography>
                  </Div>
                  {pengajuanJudul?.proposed_co_advisor1_id !== null && (
                    <Div
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "15px",
                      }}
                    >
                      {/* Menampilkan Co-advisor 1 */}
                      <Typography variant="subtitle2">
                        Mengusulkan Co-Advisor 1
                      </Typography>
                      <Typography>
                        {
                          daftarDosen?.find(
                            (dosen) =>
                              dosen.id ===
                              pengajuanJudul?.proposed_co_advisor1_id
                          )?.name
                        }
                      </Typography>
                    </Div>
                  )}
                  {pengajuanJudul?.proposed_co_advisor2_id !== null && (
                    <Div
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "15px",
                      }}
                    >
                      {/* Menampilkan co-advisor 2 */}
                      <Typography variant="subtitle2">
                        Mengusulkan Co-Advisor 2
                      </Typography>
                      <Typography>
                        {
                          daftarDosen?.find(
                            (dosen) =>
                              dosen.id ===
                              pengajuanJudul?.proposed_co_advisor2_id
                          )?.name
                        }
                      </Typography>
                    </Div>
                  )}
                </Div>
              </Div>
              {/* Select Dosen Pembimbing End */}

              {/* Button Ganti Dosen Pembimbing Start */}
              <Div hidden={role.includes("DOSEN_MK") ? false : true}>
                {gantiAdvisorCoAdvisorButtonVisible && (
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: "none", marginBottom: "25px" }}
                    onClick={handleClickOpen}
                  >
                    <BorderColorIcon fontSize="small" />
                    Ganti Advisor dan Co-Advisor
                  </Button>
                )}
                {/* Button GAnti Dosen Pembimbing End */}

                {/* Radio Button Start */}
                <Div
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="subtitle2" component="div">
                    Apakah Anda sudah melakukan konsultasi dengan Advisor
                    sebelum mengajukan judul?
                  </Typography>
                  <Typography>
                    {pengajuanJudul?.is_consultation === true
                      ? "Ya"
                      : pengajuanJudul?.is_consultation === false
                      ? "Tidak"
                      : pengajuanJudul?.is_consultation}
                  </Typography>
                </Div>
              </Div>
            </Div>
            <Div
              hidden={role.includes("DOSEN_MK") ? false : true}
              sx={{ width: "100%" }}
            >
              {tolakTerimaButtonsVisible && (
                <Div
                  sx={{
                    display: "flex",
                    padding: "12px 24px 12px 0px",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "12px",
                    alignSelf: "stretch",
                    background: "#F5F5F5",
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    color="error"
                    onClick={handleTolakClick} // Menggunakan fungsi handleTolakClick saat tombol Tolak diklik
                  >
                    Tolak
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    color="primary"
                    onClick={handleTerimaClick} // Menggunakan fungsi handleTerimaClick saat tombol Terima diklik
                  >
                    Terima
                  </Button>
                </Div>
              )}
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
        {/* Dialog Select Dosen Pembimbing Start */}
        <Dialog
          open={openDialog}
          onClose={handleClose}
          fullWidth
          width="lg"
          sx={{ margin: "25px", gap: "2" }}
        >
          <DialogTitle
            sx={{
              background: "#F5F5F5",
              textAlign: "center",
            }}
          >
            Ganti Advisor dan Co-Advisor
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ margin: "25px 0 25px 0" }}>
              <InputLabel>Mengusulkan Advisor</InputLabel>
              <Select
                label="Mengusulkan Advisor"
                value={advisor}
                onChange={handleAdvisorChange}
              >
                <MenuItem value="">-</MenuItem>
                {daftarDosen?.map((dosen) => (
                  <MenuItem key={dosen.id} value={dosen.id}>
                    {dosen.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: "25px" }}>
              <InputLabel>Mengusulkan Co-Advisor 1</InputLabel>
              <Select
                label="Mengusulkan Co-Advisor 1"
                value={coAdvisor1}
                onChange={handleCoAdvisor1Change}
              >
                <MenuItem value="">-</MenuItem>
                {daftarDosen?.map((dosen) => (
                  <MenuItem key={dosen.id} value={dosen.id}>
                    {dosen.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Mengusulkan Co-Advisor 2</InputLabel>
              <Select
                label="Mengusulkan Co-Advisor 2"
                value={coAdvisor2}
                onChange={handleCoAdvisor2Change}
              >
                <MenuItem value="">-</MenuItem>
                {daftarDosen?.map((dosen) => (
                  <MenuItem key={dosen.id} value={dosen.id}>
                    {dosen.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ background: "#F5F5F5" }}>
            <Button
              onClick={handleClose}
              color="primary"
              sx={{
                background: "white",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                textTransform: "none",
                color: "black",
              }}
            >
              Batal
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Ganti
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog Select Dosen Pembimbing Start */}
      </Div>

      {/* Dialog konfirmasi Tolak */}
      <Dialog
        open={confirmTolakOpen}
        onClose={() => setConfirmTolakOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle variant="subtitle2">Menolak Pengajuan Judul</DialogTitle>
        <DialogContent>
          <Typography>Apakah Anda yakin ingin menerima judul ini?</Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={() => setConfirmTolakOpen(false)}
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
            onClick={handleTolak}
            sx={{
              textTransform: "none",
              background: "#FC0",
              color: "black",
              "&:hover": {
                color: "#FC0",
              },
            }}
          >
            Tolak
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog konfirmasi Terima */}
      <Dialog
        open={confirmTerimaOpen}
        onClose={() => setConfirmTerimaOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle variant="subtitle2">Konfirmasi Terima</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menerima pengajuan ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={() => setConfirmTerimaOpen(false)}
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
            onClick={handleTerima}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Terima
          </Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
};

export default PengajuanJudulDosenSkripsi;
