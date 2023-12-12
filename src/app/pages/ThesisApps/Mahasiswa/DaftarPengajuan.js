import React, { useState, useEffect } from "react";
import Div from "@jumbo/shared/Div";
import MuiAlert from "@mui/material/Alert";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  TextareaAutosize,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Paper,
  FormHelperText,
  Snackbar,
  Alert,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
import { Add, Attachment, Clear } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

// View Document pengajuan judul
const PDFViewerPengajuanJudul = ({ pengajuanJudulFile }) => {
  const viewPDFPengajuanJudul = () => {
    // Mengonversi base64 string ke binary
    const binaryString = window.atob(pengajuanJudulFile.buffer);

    // Membuat array dari karakter binary string
    const binaryArray = [];
    for (let i = 0; i < binaryString.length; i++) {
      binaryArray.push(binaryString.charCodeAt(i));
    }

    // Membuat blob dari array binary
    const blob = new Blob([new Uint8Array(binaryArray)], {
      type: "application/pdf",
    });

    // Buat tautan URL dari blob
    const pdfURL = URL.createObjectURL(blob);

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <span
      onClick={viewPDFPengajuanJudul}
      style={{
        fontSize: "14px",
        cursor: "pointer",
        color: "blue",
      }}
    >
      Lihat
    </span>
  );
};

function DaftarPengajuan() {
  // ======================== STATE ===========================
  // mengatur loading page
  const [loadingPage, setLoadingPage] = useState(true);
  // console.log("loading page", loadingPage);
  // mengatur loading form
  const [loadingForm, setLoadingForm] = useState(true);
  // console.log("loading form", loadingForm);

  // menyimpan hasil request - daftar pengajuan
  const [daftarPengajuan, setDaftarPengajuan] = useState();
  // menyimpan hasil request - daftar kelas
  const [daftarKelas, setDaftarKelas] = useState();
  // menyimpan hasil request - daftar parner
  const [daftarPartner, setDaftarPartner] = useState();
  // menyimpan hasil request - daftar dosen
  const [daftarDosen, setDaftarDosen] = useState([]);

  // mengatur notif error
  const [alerts, setAlerts] = useState([]);

  // menyimpan kelas yang dipilih - id
  const [selectedClassroomId, setSelectedClassroomId] = useState(""); // State untuk ID kelas yang dipilih

  // menyimpan partner yang dipilih
  const [partnerData, setPartnerData] = useState([
    { id: null, selectedPartnerName: "" },
  ]);

  // menyimpan dosen yang dipilih - advisor
  const [selectedAdvisorId, setSelectedAdvisorId] = useState("");
  // menambah co-advisor 1 & 2
  const [addCoAdvisor, setAddCoAdvisor] = useState([
    { id: null, selectedCoAdvisorName: "" },
  ]);

  // menyimpan status konsultasi yang dipilih
  // const [selectedKonsultasi, setSelectedKonsultasi] = useState(null);
  const [konsultasi, setKonsultasi] = useState(null);

  // menyimpan judul yang diinput
  const [judul, setJudul] = useState(""); // State untuk judul yang dimasukkan

  // State -  Dialog
  const [openMengajukanJudul, setOpenMengajukanJudul] = useState(false);

  // State - file
  const [unggahFile, setUnggahFile] = useState();
  // State - konfirmasi pengajuan
  const [isConfirmAjukanOpen, setIsConfirmAjukanOpen] = useState(false);

  // Tambahkan state untuk melacak apakah file telah diunggah
  const [isFileUploaded, setFileUploaded] = useState(false);

  // error message
  const [errorMessages, setErrorMessages] = useState({
    kelas: "",
    file: "",
    judul: "",
    advisor: "",
    konsultasi: "",
  });

  // ======================== FUNCTION ===========================
  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  // console.log("token", token);

  const navigate = useNavigate();

  const fetchDaftarPengajuanData = async () => {
    jwtAuthAxios
      .get("/group/thesis_list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // menyimpan hasil request
        setDaftarPengajuan(response.data.data);
        // console.log("Request get daftar pengajuan: ", response.data.data);
        // menonaktifkan loading page
        setLoadingPage(false);
        // console.log("loading page", loadingPage);
      })
      .catch((error) => {
        // redirect ke home
        if (
          error.response.data.data.error ===
          "You don't have permission to perform this action"
        ) {
          navigate(`/`);
        } else {
          const newAlert = {
            id: `error-${Math.random()}`,
            open: true,
            severity: "error",
            title: "Terjadi Kesalahan!",
            message: "Tidak dapat menampilkan daftar pengajuan.",
          };
          addAlert(newAlert);
          // console.error(
          //   "Terjadi kesalahan saat mengambil daftar pengajuan:",
          //   error
          // );
        }
      })
      .finally(() => {
        // menonaktifkan loading page
        setLoadingPage(false);
        // console.log("loading page", loadingPage);
      });
  };

  const fetchDaftarKelasData = async () => {
    jwtAuthAxios
      .get("/group/classroom_list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // menyimpan hasil request
        setDaftarKelas(response.data.data);
        console.log("Request get daftar kelas: ", response.data.data);
      })
      .catch((error) => {
        // console.error("Terjadi kesalahan saat mengambil daftar kelas:", error);
      });
  };

  const fetchDaftarMahasiswaData = async () => {
    jwtAuthAxios
      .get(`/group/classroom/students-list/${selectedClassroomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // menyimpan hasil request
        setDaftarPartner(response.data.data);
        // console.log("Request get daftar mahasiswa: ", response.data.data);
      })
      .catch((error) => {
        // console.error(
        //   "Terjadi kesalahan saat mengambil daftar mahasiswa:",
        //   error
        // );
      });
  };

  const fetchDaftarDosenData = async () => {
    jwtAuthAxios
      .get(`/group/dosen-list`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
        },
      })
      .then((response) => {
        // menyimpan hasil request
        setDaftarDosen(response.data.data);
        // console.log("Request get daftar dosen: ", response.data.data);
      })
      .catch((error) => {
        // console.error("Terjadi kesalahan saat mengambil daftar dosen:", error);
      });
  };

  useEffect(() => {
    fetchDaftarPengajuanData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDaftarKelasData();
        await fetchDaftarMahasiswaData();
        await fetchDaftarDosenData();
        // menonaktifkan loading form
        setLoadingForm(false);
      } catch (error) {
        // menonaktifkan loading form
        setLoadingForm(false);
        const newErrorAlert = {
          id: `error-${Math.random()}`,
          open: true,
          severity: "error",
          title: "Terjadi Kesalahan!",
          message: "Tidak dapat menampilkan data formulir.",
        };
        addAlert(newErrorAlert);
      }
    };
    fetchData();
  }, [token, selectedClassroomId]);

  // mengatur notif error
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const addAlert = (newAlert) => {
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };
  const closeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  // buka mengajukan judul
  const handleOpenMengajukanJudul = async () => {
    setOpenMengajukanJudul(true);
  };

  // tutup mengajukan Judul
  const handleCloseMengajukanJudul = () => {
    // clean error
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      kelas: "",
      file: "",
      judul: "",
      advisor: "",
      konsultasi: "",
    }));
    // clean form
    setSelectedClassroomId("");
    setPartnerData([{ id: null, selectedPartnerName: "" }]);
    setUnggahFile();
    setJudul("");
    setSelectedAdvisorId("");
    setAddCoAdvisor([{ id: null, selectedCoAdvisorName: "" }]);
    setKonsultasi(null);
    // reset status menjadi false
    setFileUploaded(false);
    // close Mengajukan Judul
    setOpenMengajukanJudul(false);
  };

  // ganti partner
  const handleChangePartner = (e, index) => {
    const selectedPartner = daftarPartner.find(
      (partner) => partner.fullName === e.target.value
    );

    if (selectedPartner) {
      const updatedPartners = partnerData.map((partner, i) =>
        i === index
          ? {
              ...partner,
              id: selectedPartner.id,
              selectedPartnerName: e.target.value,
            }
          : partner
      );
      setPartnerData(updatedPartners);
    }
  };

  // tambah partner
  const handleAddPartner = () => {
    if (partnerData.length < 4) {
      setPartnerData([...partnerData, { id: null, selectedPartnerName: "" }]);
    }
  };

  // hapus partner
  const handleDeletePartner = (index) => {
    if (index > 0) {
      const updatedPartners = [...partnerData];
      updatedPartners.splice(index, 1);
      setPartnerData(updatedPartners);
    }
  };

  // ganti
  const handleChangeAdvisor = (e) => {
    setSelectedAdvisorId(e.target.value);
    // clean error
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      advisor: "",
    }));
  };

  // ganti co-advisor
  const handleChangeCoAdvisor = (e, index) => {
    const selectedCoAdvisor = daftarDosen.find(
      (dosen) => dosen.name === e.target.value
    );

    if (selectedCoAdvisor) {
      const updatedCoAdvisor = addCoAdvisor.map((dosen, i) =>
        i === index
          ? {
              ...dosen,
              id: selectedCoAdvisor.id,
              selectedCoAdvisorName: e.target.value,
            }
          : dosen
      );
      setAddCoAdvisor(updatedCoAdvisor);
    }
  };

  // tambah co-advisor
  const handleAddCoAdvisor = () => {
    // menambah co-advisor tidak lebih dari 2
    if (addCoAdvisor.length < 3) {
      setAddCoAdvisor([
        ...addCoAdvisor,
        { id: null, selectedCoAdvisorName: "" },
      ]);
    }
  };

  // hapus co-advisor
  const handleDeleteCoAdvisor = (index) => {
    if (index > 0) {
      const updatedCoAdvisor = [...addCoAdvisor];
      updatedCoAdvisor.splice(index, 1);
      setAddCoAdvisor(updatedCoAdvisor);
    }
  };

  // konsultasi
  const handleChangeStatusKonsultasi = (e) => {
    const value = e.target.value;

    // clean error
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      konsultasi: "",
    }));

    if (value === "ya") {
      setKonsultasi(true);
    } else if (value === "tidak") {
      setKonsultasi(false);
    } else {
      setKonsultasi();
    }
  };

  // unggah file
  const handleAddFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Bersihkan error
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        file: "",
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        // e.target.result berisi data URL dari file
        const dataURL = e.target.result;

        // Mengonversi data URL ke base64
        const base64String = dataURL.split(",")[1].replace(/\s/g, ""); // Menghilangkan spasi yang mungkin muncul dalam base64

        // Tambahkan data file baru ke state pengajuanJudulUploadedFiles
        const newFileData = {
          name: file.name,
          size: file.size,
          buffer: base64String,
        };

        setUnggahFile(newFileData);
        // Set menjadi true
        setFileUploaded(true);
      };

      reader.readAsDataURL(file);
    } else {
      //  set error
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        file: "Dibutuhkan",
      }));
    }
  };

  // hapus file
  const handleDeleteFile = () => {
    // hapus file
    setUnggahFile();

    //  set error
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      file: "Dibutuhkan",
    }));
  };

  // buka konfirmasi ajukan judul
  const handleOpenConfirmAjukan = async () => {
    let isFormValid = true;
    let newErrorMessages = {
      kelas: "",
      file: "",
      judul: "",
      advisor: "",
      konsultasi: "",
    };

    if (!selectedClassroomId) {
      newErrorMessages.kelas = "Dibutuhkan";
      isFormValid = false;
    }
    if (!unggahFile) {
      newErrorMessages.file = "Dibutuhkan";
      isFormValid = false;
    }
    if (!judul) {
      newErrorMessages.judul = "Dibutuhkan";
      isFormValid = false;
    }
    if (!selectedAdvisorId) {
      newErrorMessages.advisor = "Dibutuhkan";
      isFormValid = false;
    }
    if (!konsultasi) {
      newErrorMessages.konsultasi = "Dibutuhkan";
      isFormValid = false;
    }

    if (isFormValid) {
      setIsConfirmAjukanOpen(true);
    } else {
      // set error
      setErrorMessages(newErrorMessages);
    }
  };

  // tutup konfirmasi ajukan judul
  const handleCloseConfirmAjukan = () => {
    setIsConfirmAjukanOpen(false);
  };

  // Kirim ajukan judul
  const handleConfirmSubmit = () => {
    const submission_file = {
      file_name: unggahFile.name,
      file_size: unggahFile.size.toString(),
      buffer: unggahFile.buffer,
    };
    const partner1Id = partnerData[0] ? partnerData[0].id : null;
    const partner2Id = partnerData[1] ? partnerData[1].id : null;
    const partner3Id = partnerData[2] ? partnerData[2].id : null;

    const pengajuanData = {
      partner1: partner1Id,
      partner2: partner2Id,
      partner3: partner3Id,
      title: judul,
      is_consultation: konsultasi,
      proposed_advisor_id: selectedAdvisorId,
      proposed_co_advisor1_id: addCoAdvisor[0] ? addCoAdvisor[0].id : null,
      proposed_co_advisor2_id: addCoAdvisor[1] ? addCoAdvisor[1].id : null,
      classroom_id: selectedClassroomId,
      submission_file,
    };
    console.log("data yang diajukan", pengajuanData);

    jwtAuthAxios
      .post(`/submission`, pengajuanData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const newAlert = {
          id: `success-${Math.random()}`,
          open: true,
          severity: "success",
          title: "Sukses!",
          message: "Berhasil mengajukan judul.",
        };
        addAlert(newAlert);

        console.log("Berhasil menambahkan data:", response.data);
        // clean error
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          kelas: "",
          file: "",
          judul: "",
          advisor: "",
          konsultasi: "",
        }));
        // clean form
        setSelectedClassroomId("");
        setPartnerData([{ id: null, selectedPartnerName: "" }]);
        setUnggahFile();
        setJudul("");
        setSelectedAdvisorId("");
        setAddCoAdvisor([{ id: null, selectedCoAdvisorName: "" }]);
        setKonsultasi(null);
        // reset status menjadi false
        setFileUploaded(false);
        // Tutup popup konfirmasi
        setIsConfirmAjukanOpen(false);
        // Tutup mengajukan judul
        setOpenMengajukanJudul(false);

        // request data
        fetchDaftarPengajuanData();
      })
      .catch((error) => {
        const newAlert = {
          id: `error-${Math.random()}`,
          open: true,
          severity: "error",
          title: "Terjadi Kesalahan!",
          message: "Tidak dapat mengajukan judul.",
        };
        addAlert(newAlert);
        console.error("Terjadi kesalahan saat menambahkan data:", error);
      });
  };

  // Menampilkan ikon loading jika data masih dalam proses fetching
  if (loadingPage) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Div>
      <Div>
        <Div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "24px",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Typography style={{ fontSize: "24px", fontWeight: "600px" }}>
            Daftar Pengajuan
          </Typography>
          <Div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
              alignItems: "center",
            }}
          >
            <Button
              style={{
                borderRadius: "60px",
                padding: "12px 16px",
                alignItems: "center",
                background: "#006AF5",
                color: "#ffff",
                "&:hover": {
                  color: "#006AF5",
                },
              }}
              onClick={handleOpenMengajukanJudul}
            >
              <Add />
              Ajukan Judul
            </Button>
          </Div>
        </Div>
      </Div>

      {daftarPengajuan?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ background: "rgba(26, 56, 96, 0.10)" }}>
              <TableRow>
                <TableCell style={{ width: "60px", margin: "0 100px" }}>
                  No
                </TableCell>
                <TableCell style={{ width: "800px", margin: "0 100px" }}>
                  Judul
                </TableCell>
                <TableCell style={{ width: "200px", margin: "0 100px" }}>
                  Status Judul
                </TableCell>
                <TableCell style={{ width: "200px", margin: "0 100px" }}>
                  Status Proposal
                </TableCell>
                <TableCell style={{ width: "200px", margin: "0 100px" }}>
                  Status Skripsi
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {daftarPengajuan?.map((pengajuan, index) => (
                <TableRow key={pengajuan.group_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{pengajuan.title}</TableCell>
                  <TableCell>
                    {pengajuan.is_approve === "Waiting" ? (
                      <Chip
                        label={"Menunggu"}
                        sx={{
                          background: "rgba(255, 204, 0, 0.10)",
                          color: "#985211",
                        }}
                      />
                    ) : pengajuan.is_approve === "Approve" ? (
                      <Chip
                        label={"Diterima"}
                        sx={{
                          background: "rgba(21, 131, 67, 0.10)",
                          color: "#0A7637",
                        }}
                      />
                    ) : pengajuan.is_approve === "Rejected" ? (
                      <Chip
                        label={"Ditolak"}
                        sx={{
                          background: "rgba(226, 29, 18, 0.10)",
                          color: "#CA150C",
                        }}
                      />
                    ) : (
                      <Chip label={"Belum"} />
                    )}
                  </TableCell>
                  <TableCell>
                    {pengajuan.is_pass_proposal === "Repeat" ? (
                      <Chip
                        label={"Mengulang"}
                        sx={{
                          background: "rgba(255, 204, 0, 0.10)",
                          color: "#985211",
                        }}
                      />
                    ) : pengajuan.is_pass_proposal === "Pass" ? (
                      <Chip
                        label={"Lulus"}
                        sx={{
                          background: "rgba(21, 131, 67, 0.10)",
                          color: "#0A7637",
                        }}
                      />
                    ) : pengajuan.is_pass_proposal === "Fail" ? (
                      <Chip
                        label={"Tidak Lulus"}
                        sx={{
                          background: "rgba(226, 29, 18, 0.10)",
                          color: "#CA150C",
                        }}
                      />
                    ) : (
                      <Chip label={"Belum"} />
                    )}
                  </TableCell>
                  <TableCell>
                    {pengajuan.is_pass_skripsi === "Repeat" ? (
                      <Chip
                        label={"Mengulang"}
                        sx={{
                          background: "rgba(255, 204, 0, 0.10)",
                          color: "#985211",
                        }}
                      />
                    ) : pengajuan.is_pass_skripsi === "Pass" ? (
                      <Chip
                        label={"Lulus"}
                        sx={{
                          background: "rgba(21, 131, 67, 0.10)",
                          color: "#0A7637",
                        }}
                      />
                    ) : pengajuan.is_pass_skripsi === "Fail" ? (
                      <Chip
                        label={"Tidak Lulus"}
                        sx={{
                          background: "rgba(226, 29, 18, 0.10)",
                          color: "#CA150C",
                        }}
                      />
                    ) : (
                      <Chip label={"Belum"} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link
                      href="#"
                      to={`/sistem-informasi-skripsi/daftar-pengajuan/beranda/${pengajuan.group_id}/MAHASISWA`}
                      style={{
                        textDecoration: "none",
                        color: "blue",
                        fontSize: "12px",
                      }}
                    >
                      Detail
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
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
              color: "#CA150C",
              background: "rgba(226, 29, 18, 0.50)",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Anda belum melakukan pengajuan.
          </Typography>
        </Div>
      )}

      <Dialog
        open={openMengajukanJudul}
        onClose={handleCloseMengajukanJudul}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle
          style={{
            background: "rgba(26, 56, 96, 0.10)",
            width: "full",
            height: "75px",
            marginBottom: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Mengajukan Judul
        </DialogTitle>
        {loadingForm ? (
          <Div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Div>
        ) : (
          <DialogContent>
            <DialogTitle
              style={{
                background: "rgba(26, 56, 96, 0.10)",
                width: "100%",
                height: "75px",
                marginBottom: "25px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                borderRadius: "6px",
              }}
            >
              Kelas
            </DialogTitle>
            {/* select kelas */}
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
                marginBottom: "25px",
              }}
            >
              <Typography variant="subtitle2" gutterBottom component="div">
                Kelas <span style={{ color: "red" }}>*</span>
              </Typography>
            </Div>
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
                marginBottom: "25px",
              }}
            >
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-kelas-small-label">
                  Kelas Poposal
                </InputLabel>
                <Select
                  labelId="demo-select-kelas-small-label"
                  id="demo-select-kelas-small"
                  value={selectedClassroomId}
                  label="Kelas Proposal"
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedClassroomId(selectedValue);

                    if (selectedValue.trim() !== "") {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        kelas: "",
                      }));
                    } else {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        kelas: "Dibutuhkan",
                      }));
                    }
                  }}
                  error={Boolean(errorMessages.kelas)}
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
                >
                  {daftarKelas?.map((kelas, index) => (
                    <MenuItem key={kelas.id} value={kelas.id}>
                      {kelas.classroom}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText
                  sx={{ fontSize: "14px" }}
                  error={Boolean(errorMessages.kelas)}
                >
                  {errorMessages.kelas}
                </FormHelperText>
              </FormControl>
            </Div>
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
                marginBottom: "25px",
              }}
            >
              <Typography variant="subtitle2" gutterBottom component="div">
                Partner
              </Typography>
            </Div>
            {partnerData.map((partner, index) => (
              <>
                {index > 0 && (
                  <Div
                    key={partner.id}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "0 25px",
                      gap: "25px",
                      marginBottom: "25px",
                    }}
                  >
                    <Div>
                      <FormControl fullWidth size="small">
                        <InputLabel id={`nama-partner-label-${index}`}>
                          Nama Partner {index}
                        </InputLabel>
                        <Select
                          labelId={`nama-partner-label-${index}`}
                          id={`nama-partner-select-${index}`}
                          label={`Nama Partner ${index + 1}`}
                          value={partner.selectedPartnerName}
                          onChange={(e) => handleChangePartner(e, index)}
                          style={{
                            minWidth: "990px",
                            width: "100%",
                          }}
                        >
                          {daftarPartner?.map((partner) => (
                            <MenuItem key={partner.id} value={partner.fullName}>
                              {partner.fullName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Div>
                    <Button
                      component="label"
                      sx={{
                        textTransform: "none",
                        color: "#757575",
                        fontSize: "12px",
                        borderRadius: "6px",
                        width: "30px",
                        height: "35px",
                        cursor: "pointer",
                        marginRight: "30px",
                      }}
                      onClick={() => handleDeletePartner(index)}
                    >
                      <Clear />
                    </Button>
                  </Div>
                )}
              </>
            ))}
            {partnerData.length < 4 && (
              <Div
                sx={{
                  width: "100%",
                  padding: "0 25px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "25px",
                }}
              >
                <Button
                  style={{ fontSize: "14px", marginBottom: "25px" }}
                  onClick={handleAddPartner}
                  disabled={!selectedClassroomId}
                >
                  <Add fontSize="small" />
                  Tambah Partner
                </Button>
              </Div>
            )}

            <Div>
              <DialogTitle
                style={{
                  background: "rgba(26, 56, 96, 0.10)",
                  width: "100%",
                  height: "75px",
                  marginBottom: "25px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderRadius: "6px",
                }}
              >
                Mini Proposal
              </DialogTitle>
              <Div
                sx={{
                  width: "100%",
                  padding: "0 25px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "25px",
                }}
              >
                {/* Upload Pengajuan Judul Start */}
                <Div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    component="div"
                    style={{ marginRight: "auto", textAlign: "center" }}
                  >
                    Dokumen Mini Proposal{" "}
                    <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <Button
                    variant="contained"
                    component="label"
                    style={{
                      textTransform: "none",
                      background: errorMessages.file ? "#E60000" : "#006AF5",
                      color: "white",
                      fontSize: "12px",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      width: "130px",
                      height: "30px",
                    }}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleAddFile}
                      style={{ display: "none" }}
                    />
                    <Attachment style={{ fontSize: "16px", margin: "5px" }} />
                    Unggah file
                  </Button>
                </Div>

                {/* Table Upload Pengajuan Judul Start*/}
                <TableContainer
                  sx={{ marginBottom: !errorMessages.file ? "25px" : "" }}
                  component={Paper}
                >
                  <Table>
                    <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                      <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                        <TableCell
                          sx={{
                            fontSize: "12px",
                            padding: "11px",
                            width: "45%",
                          }}
                        >
                          Nama File
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "12px",
                            padding: "11px",
                            width: "20%",
                          }}
                        >
                          Ukuran
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "12px",
                            padding: "11px",
                            width: "12%",
                          }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {unggahFile
                            ? unggahFile.name
                            : "Belum ada file yang diunggah"}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {unggahFile ? unggahFile.size : ""}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {unggahFile ? (
                            <Div
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  color: "blue",
                                  bottom: "0",
                                }}
                              >
                                <PDFViewerPengajuanJudul
                                  pengajuanJudulFile={unggahFile}
                                />
                              </span>
                              <Div
                                style={{
                                  margin: "0 5px", // Margin di sekitar garis vertikal
                                  color: "#E0E0E0",
                                }}
                              >
                                |
                              </Div>
                              <span
                                style={{
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  color: "red",
                                  fontSize: "14px",
                                }}
                                onClick={() => handleDeleteFile()}
                              >
                                Hapus
                              </span>
                            </Div>
                          ) : (
                            ""
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Table Upload Pengajuan Judul End*/}

                {errorMessages.file && (
                  <Div sx={{ marginBottom: "25px" }}>
                    <Typography variant="caption" color="error">
                      {errorMessages.file}
                    </Typography>
                  </Div>
                )}
              </Div>
              {/* Upload Pengajuan Judul End */}
              {/* Judul Start */}
              <Div
                sx={{
                  width: "100%",
                  padding: "0 25px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "25px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  component="div"
                  sx={{
                    marginBottom: "10px",
                  }}
                >
                  Judul <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Masukkan judul"
                  style={{
                    width: "100%",
                    height: 50,
                    marginBottom: !errorMessages.judul ? "25px" : "",
                    display: "block",
                    resize: "vertical",
                    borderColor: errorMessages.judul ? "red" : "",
                  }}
                  value={judul}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setJudul(inputValue);
                    if (inputValue.trim() !== "") {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        judul: "",
                      }));
                    } else {
                      setErrorMessages((prevErrors) => ({
                        ...prevErrors,
                        judul: "Dibutuhkan",
                      }));
                    }
                  }}
                />
                {errorMessages.judul && (
                  <Div sx={{ marginBottom: "25px" }}>
                    <Typography variant="caption" color="error">
                      {errorMessages.judul}
                    </Typography>
                  </Div>
                )}
              </Div>
              {/* Judul End */}

              {/* Select Dosen Pembimbing Start */}
              <Div
                sx={{
                  width: "100%",
                  padding: "0 25px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "25px",
                  marginBottom: "25px",
                }}
              >
                <Typography variant="subtitle2" gutterBottom component="div">
                  Advisor <span style={{ color: "red" }}>*</span>
                </Typography>
                <FormControl fullWidth size="small" sx={{ marginTop: "15px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Mengusulkan Advisor
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedAdvisorId}
                    label="Mengusulkan Advisor"
                    onChange={handleChangeAdvisor}
                    error={Boolean(errorMessages.advisor)}
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
                  >
                    {daftarDosen?.map((dosen) => (
                      <MenuItem key={dosen.id} value={dosen.id}>
                        {dosen.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText
                    sx={{ fontSize: "14px" }}
                    error={Boolean(errorMessages.advisor)}
                  >
                    {errorMessages.advisor}
                  </FormHelperText>
                </FormControl>
              </Div>
              <Div
                sx={{
                  width: "100%",
                  padding: "0 25px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "25px",
                  marginBottom: "15px",
                }}
              >
                <Typography variant="subtitle2" gutterBottom component="div">
                  Co-Advisor
                </Typography>
              </Div>
              {addCoAdvisor.map((coAdvisor, index) => (
                <>
                  {index > 0 && (
                    <Div
                      key={coAdvisor.id}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0 25px",
                        gap: "25px",
                        marginBottom: "25px",
                      }}
                    >
                      <Div>
                        <FormControl
                          style={{
                            alignItems: "center",
                            flex: "1",
                          }}
                          size="small"
                        >
                          <InputLabel id="demo-simple-select-label">
                            {`Mengusulkan Co-Advisor ${index}`}
                          </InputLabel>
                          <Select
                            labelId={`demo-simple-select-label-${index}`}
                            id={`demo-simple-select-${index}`}
                            label={`Mengusulkan Co-Advisor ${index + 1}`}
                            value={coAdvisor.selectedCoAdvisorName}
                            onChange={(e) => handleChangeCoAdvisor(e, index)}
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
                            style={{
                              minWidth: "990px",
                              width: "100%",
                            }}
                          >
                            {daftarDosen?.map((dosen) => (
                              <MenuItem key={dosen.id} value={dosen.name}>
                                {dosen.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <Button
                          component="label"
                          sx={{
                            textTransform: "none",
                            color: "#757575",
                            fontSize: "12px",
                            borderRadius: "6px",
                            width: "30px",
                            height: "35px",
                            cursor: "pointer",
                            marginLeft: "30px",
                          }}
                          onClick={() => handleDeleteCoAdvisor(index)}
                        >
                          <Clear />
                        </Button>
                      </Div>
                    </Div>
                  )}
                </>
              ))}
              {addCoAdvisor.length < 3 && (
                <Div
                  sx={{
                    width: "100%",
                    padding: "0 25px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "25px",
                  }}
                >
                  <Button
                    style={{ fontSize: "14px", marginBottom: "25px" }}
                    onClick={handleAddCoAdvisor}
                    disabled={!selectedAdvisorId}
                  >
                    <Add fontSize="small" />
                    Tambah Co-Advisor
                  </Button>
                </Div>
              )}
              {/* Select Dosen Pembimbing End */}
              {/* Radio Button Start */}
              <Div
                sx={{
                  width: "100%",
                  padding: "0 25px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "25px",
                }}
              >
                <Typography variant="subtitle2" gutterBottom component="div">
                  Apakah Anda sudah melakukan konsultasi dengan Advisor sebelum
                  mengajukan judul? <span style={{ color: "red" }}>*</span>
                </Typography>
                <RadioGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  value={
                    konsultasi === true
                      ? "ya"
                      : konsultasi === false
                      ? "tidak"
                      : ""
                  }
                  onChange={handleChangeStatusKonsultasi}
                >
                  <FormControlLabel
                    value="ya"
                    control={
                      <Radio
                        sx={{
                          color: errorMessages.konsultasi ? "red" : "primary",
                        }}
                      />
                    }
                    label="Ya"
                  />
                  <FormControlLabel
                    value="tidak"
                    control={
                      <Radio
                        sx={{
                          color: errorMessages.konsultasi ? "red" : "primary",
                        }}
                      />
                    }
                    label="Tidak"
                  />
                </RadioGroup>
                {errorMessages.konsultasi && (
                  <Div sx={{ marginBottom: "25px" }}>
                    <Typography variant="caption" color="error">
                      {errorMessages.konsultasi}
                    </Typography>
                  </Div>
                )}
              </Div>
              {/* Radio Button End*/}
            </Div>
          </DialogContent>
        )}

        <DialogActions style={{ background: "#F5F5F5" }}>
          <Button
            onClick={handleCloseMengajukanJudul}
            style={{
              borderRadius: "6px",
              border: "##E0E0E0",
              background: "#FFFF",
              color: "black",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleOpenConfirmAjukan}
            color="primary"
            style={{
              background: "#006AF5",
              color: "#ffff",
              "&:hover": {
                color: "#006AF5",
              },
            }}
          >
            Ajukan
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isConfirmAjukanOpen}
        onClose={handleCloseConfirmAjukan}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle style={{ fontSize: "20px", fontWeight: "500" }}>
          Mengajukan Judul
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin mengajukan judul ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ background: "#F5F5F5" }}>
          <Button
            onClick={handleCloseConfirmAjukan}
            style={{
              borderRadius: "6px",
              border: "#E0E0E0",
              background: "#FFFF",
              color: "black",
              textTransform: "none",
            }}
          >
            Batal
          </Button>
          <Button
            onClick={handleConfirmSubmit}
            color="primary"
            style={{
              background: "#006AF5",
              color: "#ffff",
              textTransform: "none",
              "&:hover": {
                color: "#006AF5",
              },
            }}
          >
            Kirim
          </Button>
        </DialogActions>
      </Dialog>

      {alerts.map((alert, index) => (
        <Snackbar
          key={alert.id}
          open={alert.open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          style={{ marginBottom: `${index * 10}px` }}
        >
          <Alert
            onClose={() => {
              console.log("close alert: ", alert.id);
              closeAlert(alert.id);
            }}
            severity={alert.severity}
          >
            <AlertTitle>{alert.title}</AlertTitle>
            {alert.message}
          </Alert>
        </Snackbar>
      ))}
    </Div>
  );
}

export default DaftarPengajuan;
