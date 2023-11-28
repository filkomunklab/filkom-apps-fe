import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import Div from "@jumbo/shared/Div";
import { pdfjs } from "react-pdf";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import AttachmentIcon from "@mui/icons-material/Attachment";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// View Document pengajuan judul
const PDFViewerPengajuanJudul = ({ pengajuanJudulFile }) => {
  const viewPDFPengajuanJudul = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = URL.createObjectURL(pengajuanJudulFile);

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span onClick={viewPDFPengajuanJudul} style={{ fontSize: "14px" }}>
        Lihat
      </span>
    </div>
  );
};

function DaftarPengajuan() {
  // State -  Dialog
  const [open, setOpen] = useState(false);
  // State - Daftar pengajuan
  const [daftarPengajuan, setDaftarPengajuan] = useState([]);
  // State - Daftar kelas
  const [kelas, setKelas] = useState(""); // State untuk nilai yang dipilih dalam Select
  const [selectedClassroomId, setSelectedClassroomId] = useState(""); // State untuk ID kelas yang dipilih
  const [daftarKelas, setDaftarKelas] = useState([]);
  // State - Daftar partner
  const [daftarPartner, setDaftarPartner] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([""]);
  const [inputCount, setInputCount] = useState(1);
  const [partnerIds, setPartnerIds] = useState([]);
  // State - Daftar dosen
  const [daftarDosen, setDaftarDosen] = useState([]);
  const [selectedAdvisorId, setSelectedAdvisorId] = useState("");
  const [selectedCoAdvisor1Id, setSelectedCoAdvisor1Id] = useState("");
  const [selectedCoAdvisor2Id, setSelectedCoAdvisor2Id] = useState("");
  // state - judul
  const [judulPengajuanBaru, setJudulPengajuanBaru] = useState(""); // State untuk judul yang dimasukkan
  // state - konsultasi
  const [selectedOption, setSelectedOption] = useState(null);
  const [konsultasi, setKonsultasi] = useState(null);
  // State - file
  const [pengajuanJudulFile, setPengajuanJudulFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [UploadedFiles, setUploadedFiles] = useState([]);
  // State - konfirmasi pengajuan
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  // State - error message
  const [judulError, setJudulError] = useState(""); // State untuk pesan error judul
  // State - group id

  // const [judulPengajuan, setJudulPengajuan] = useState([]);
  const [dosenPembibingError, setDosenPembibingError] = useState("");
  const [selectFileError, setSelectFileError] = useState("");
  const [selectKelasError, setSelectKelasError] = useState("");
  const [selectedOptionError, setSelectedOptionError] = useState("");

  // Tambahkan state untuk melacak apakah file telah diunggah
  const [isFileUploaded, setFileUploaded] = useState(false);

  // fungsi membuka tombol AJUKAN JUDUL
  const handleClickOpen = async () => {
    setOpen(true);
  };

  // fungsi untuk mendapatkan data GET
  // token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchDaftarPengajuanData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/thesis_list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'daftarPengajuan' dengan data dari respons
        setDaftarPengajuan(response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar pengajuan:",
          error
        );
      }
    };

    const fetchDaftarKelasData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/classroom_list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Mengubah format data dari backend menjadi format yang sesuai
        const formattedData = response.data.data.map((kelasItem, index) => ({
          label: kelasItem.classroom,
          value: kelasItem.id,
        }));
        setDaftarKelas(formattedData);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar kelas:", error);
      }
    };

    const fetchDaftarMahasiswaData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/group/classroom/students-list/${selectedClassroomId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDaftarPartner(response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar mahasiswa:",
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
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil daftar dosen:", error);
      }
    };

    fetchDaftarPengajuanData(); // Panggil fungsi fetchData saat komponen dimuat
    fetchDaftarKelasData();
    fetchDaftarMahasiswaData();
    fetchDaftarDosenData();
  }, [token, selectedClassroomId]);

  // fungsi - ganti kelas
  const handleKelasChange = (event) => {
    const selectedClassroomId = event.target.value; // Mengambil ID kelas yang dipilih
    setSelectedClassroomId(selectedClassroomId);
    setSelectKelasError("");
  };

  // fungsi - ganti partner
  const handlePartnerChange = (e, index) => {
    // menambah id partner yang dipilih
    const selectedPartner = daftarPartner.find(
      (partner) => partner.fullName === e.target.value.fullName
    );
    console.log(e.target.value);
    if (selectedPartner) {
      const selectedPartnerId = selectedPartner.id;

      const newPartnerIds = [...partnerIds];
      newPartnerIds[index] = selectedPartnerId;
      setPartnerIds(newPartnerIds);
      console.log(selectedPartnerId);
    }

    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = e.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  // fungsi - tombol tambah partner
  const handleAddSelect = () => {
    if (inputCount < 4) {
      setInputCount(inputCount + 1);
      setSelectedOptions([...selectedOptions, ""]);
    }
  };

  // fungsi - menghapus partner
  const handleDeleteSelect = (index) => {
    if (index >= 0) {
      // menghapus id partner yang dipilih
      const newPartnerIds = [...partnerIds];
      newPartnerIds[index] = null;
      setPartnerIds(newPartnerIds);
      console.log(partnerIds);

      const newSelectedOptions = [...selectedOptions];
      newSelectedOptions.splice(index, 1);
      setSelectedOptions(newSelectedOptions);

      setInputCount(inputCount - 1);
    }
  };

  const handleAdvisorChange = (e) => {
    setSelectedAdvisorId(e.target.value);
    setDosenPembibingError(""); // Ini akan menghilangkan pesan error ketika Advisor diubah
  };

  // fungsi - radio button konsultasi
  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value) {
      setSelectedOptionError(""); // Bersihkan pesan error saat ada pilihan yang dipilih
    }

    if (value === "ya") {
      setKonsultasi(true);
    } else if (value === "tidak") {
      setKonsultasi(false);
    } else {
      // Handle kasus ketika tidak ada opsi yang dipilih
      setKonsultasi(false); // Atau Anda bisa menentukan nilai yang sesuai dengan kebutuhan Anda.
    }
  };

  // fungsi - tombol pilih file
  const onPengajuanJudulFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (UploadedFiles.length === 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // e.target.result berisi data URL dari file
          const dataURL = e.target.result;

          // Mengonversi data URL ke base64
          const base64String = dataURL.split(",")[1];

          setPengajuanJudulFile(file);
          setSelectedFileName(file.name);

          // Tambahkan data file baru ke state pengajuanJudulUploadedFiles
          const newFileData = {
            name: file.name,
            size: file.size,
            buffer: base64String,
          };
          console.log(newFileData);
          setUploadedFiles([newFileData]);
          // Set menjadi true
          setFileUploaded(true);
        };

        reader.readAsDataURL(file);
      } else {
      }
      setSelectFileError(""); // Clear error message when a file is uploaded
    }
  };

  // fungsi - tombol menghapus file Pengajuan Judul
  const handleDeleteFile = (index) => {
    const updatedFiles = [...UploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
    setPengajuanJudulFile(null);
    setSelectedFileName("");
  };

  // fungsi - tombol menumtup Mengajukan Judul
  const handleClose = () => {
    setOpen(false);
    setJudulError(""); // Bersihkan pesan error ketika dialog ditutup
    setDosenPembibingError("");

    // reset kelas terpilih
    setKelas(null);
    // reset id kelas terpilih
    setSelectedClassroomId(null);
    // reset baris partner
    setInputCount(1);
    // reset partner yang dipilih
    setPartnerIds([]);
    setSelectedOptions([]);
    // reset id dosen terpillih
    setSelectedAdvisorId(null);
    setSelectedCoAdvisor1Id(null);
    setSelectedCoAdvisor2Id(null);
    // reset konsultasi pilihan
    setSelectedOption(null);
    // reset data konsultasi
    setKonsultasi(null);
    // reset judul
    setJudulPengajuanBaru("");
    // reset file dan nama file
    setPengajuanJudulFile(null);
    setSelectedFileName("");
    // reset daftar file yang telah diunggah
    setUploadedFiles([]);
    // reset status menjadi false
    setFileUploaded(false);
  };

  const [errorMessages, setErrorMessages] = useState({
    judulPengajuanBaru: "",
    selectedClassroomId: "",
    selectedAdvisorId: "",
    selectedOption: "",
  });

  // fungsi - tombol Ajukan
  const handleSubmit = async () => {
    let isFormValid = true;
    let newErrorMessages = {};

    if (!judulPengajuanBaru) {
      newErrorMessages.judulPengajuanBaru = "Judul harus diisi";
      isFormValid = false;
    }

    if (!selectedClassroomId) {
      newErrorMessages.selectedClassroomId = "Kelas harus diisi";
      isFormValid = false;
    }

    if (!selectedAdvisorId) {
      newErrorMessages.selectedAdvisorId = "Advisor harus diisi";
      isFormValid = false;
    }

    if (!selectedOption) {
      newErrorMessages.selectedOption = "Harus memasukkan konsultasi di sini";
      isFormValid = false;
    }

    if (!pengajuanJudulFile) {
      setSelectFileError("Anda harus unggah file");
      isFormValid = false;
    }

    if (isFormValid) {
      setIsConfirmDialogOpen(true);
    } else {
      setErrorMessages(newErrorMessages);
      // Tampilkan pesan kesalahan
    }
  };
  // fungsi - menutup konfirmasi pengajuan
  const handleCloseConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  // fungsi - mengirim pengajuan judul
  const handleConfirmSubmit = () => {
    // Tambahkan judul baru ke dalam state judulPengajuan
    // setJudulPengajuan([...judulPengajuan, judulPengajuanBaru]);

    // Tutup popup konfirmasi
    setIsConfirmDialogOpen(false);

    const submission_file = {
      file_name: UploadedFiles[0].name,
      file_size: UploadedFiles[0].size.toString(),
      buffer: UploadedFiles[0].buffer,
    };
    const pengajuanData = {
      partner1: partnerIds[0] || null,
      partner2: partnerIds[1] || null,
      partner3: partnerIds[2] || null,
      title: judulPengajuanBaru,
      is_consultation: konsultasi,
      proposed_advisor_id: selectedAdvisorId,
      proposed_co_advisor1_id: selectedCoAdvisor1Id || null,
      proposed_co_advisor2_id: selectedCoAdvisor2Id || null,
      classroom_id: selectedClassroomId,
      submission_file,
    };
    console.log(pengajuanData);
    axios
      .post(`http://localhost:2000/api/v1/submission`, pengajuanData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          // Tutup dialog
          setOpen(false);
          // reset kelas terpilih
          setKelas(null);
          // reset id kelas terpilih
          setSelectedClassroomId(null);
          // reset baris partner
          setInputCount(1);
          // reset partner yang dipilih
          setPartnerIds([]);
          // reset id dosen terpillih
          setSelectedAdvisorId(null);
          setSelectedCoAdvisor1Id(null);
          setSelectedCoAdvisor2Id(null);
          // reset konsultasi pilihan
          setSelectedOption(null);
          // reset data konsultasi
          setKonsultasi(null);
          // reset judul
          setJudulPengajuanBaru("");
          // reset file dan nama file
          setPengajuanJudulFile(null);
          setSelectedFileName("");
          // reset daftar file yang telah diunggah
          setUploadedFiles([]);
          // reset status menjadi false
          setFileUploaded(false);
          console.log("Berhasil menambahkan data:", response.data);
        } else {
          console.error("Gagal menambahkan data:", response.data);
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  };

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
              onClick={handleClickOpen}
            >
              <AddIcon />
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
                <TableRow key={index}>
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
                      pengajuan.is_approve
                    )}
                  </TableCell>
                  <TableCell>
                    {pengajuan.is_pass_proposal === null ? (
                      <Chip label={"Belum"} />
                    ) : pengajuan.is_pass_proposal === "Repeat" ? (
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
                      pengajuan.is_pass_proposal
                    )}
                  </TableCell>
                  <TableCell>
                    {pengajuan.is_pass_skripsi === null ? (
                      <Chip label={"Belum"} />
                    ) : pengajuan.is_pass_skripsi === "Repeat" ? (
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
                      pengajuan.is_pass_skripsi
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

      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
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
            Kelas Proposal
          </DialogTitle>
          {/* select kelas */}
          <Div sx={{ marginBottom: "25px" }}>
            <FormControl sx={{ m: 1, minWidth: "98%" }} size="small">
              <InputLabel id="demo-select-kelas-small-label">Kelas</InputLabel>
              <Select
                labelId="demo-select-kelas-small-label"
                id="demo-select-kelas-small"
                value={selectedClassroomId}
                label="Kelas"
                onChange={handleKelasChange}
                error={!!errorMessages.selectedClassroomId}
                helperText={errorMessages.kelas}
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
                {daftarKelas?.map((kelasItem, index) => (
                  <MenuItem key={index} value={kelasItem.value}>
                    {kelasItem.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                sx={{ fontSize: "14px" }}
                error={!!errorMessages.selectedClassroomId}
              >
                {errorMessages.selectedClassroomId}
              </FormHelperText>
            </FormControl>
          </Div>
          <Div>
            {selectKelasError && (
              <Typography
                style={{
                  color: "red",
                  marginTop: "-20px",
                  marginBottom: "25px",
                }}
              >
                {selectKelasError}
              </Typography>
            )}
          </Div>
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
            Buat Kelompok
          </DialogTitle>
          {[...Array(inputCount)].map((_, index) => (
            <Div key={index} sx={{ display: "flex", gap: "15px" }}>
              {index > 0 && ( // Munculkan input nama partner setelah indeks 0
                <Div>
                  <FormControl
                    style={{ minWidth: 120, alignItems: "center" }}
                    size="small"
                  >
                    <InputLabel id={`nama-partner-label-${index}`}>
                      Nama Partner {index}
                    </InputLabel>
                    <Select
                      labelId={`nama-partner-label-${index}`}
                      id={`nama-partner-select-${index}`}
                      label={`Nama Partner ${index + 1}`}
                      fullWidth
                      value={selectedOptions[index]}
                      onChange={(e) => handlePartnerChange(e, index)}
                      style={{ marginBottom: "25px", width: "400px" }}
                    >
                      {daftarPartner
                        ? daftarPartner?.map((partner, partnerIndex) => (
                            <MenuItem key={partnerIndex} value={partner}>
                              {partner.fullName}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                  </FormControl>
                </Div>
              )}
              <Div sx={{ marginTop: "6px" }}>
                {index > 0 && ( // Munculkan tombol hapus setelah indeks 0
                  <span
                    style={{
                      textDecoration: "none",
                      cursor: "pointer",
                      color: "#757575",
                    }}
                    onClick={() => handleDeleteSelect(index)}
                  >
                    <ClearIcon />
                  </span>
                )}
              </Div>
            </Div>
          ))}
          {inputCount < 4 && (
            <Button
              style={{ fontSize: "14px", marginBottom: "25px" }}
              onClick={handleAddSelect}
            >
              <AddIcon fontSize="small" />
              Tambah Partner
            </Button>
          )}

          <Div>
            {/*TextArea Start */}
            <Div>
              <DialogContentText style={{ width: "100%", margin: "auto" }}>
                Judul
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Masukkan judul"
                style={{
                  width: "100%",
                  height: 50,
                  marginBottom: "25px",
                  display: "block",
                  resize: "vertical",
                  borderColor: errorMessages.judulPengajuanBaru ? "red" : "",
                }}
                value={judulPengajuanBaru}
                onChange={(e) => {
                  setJudulPengajuanBaru(e.target.value);
                  setErrorMessages({
                    ...errorMessages,
                    judulPengajuanBaru: "",
                  }); // Bersihkan pesan error saat pengguna mengubah judul
                }}
              />
              {errorMessages.judulPengajuanBaru && (
                <Typography style={{ color: "red", marginTop: "-20px" }}>
                  {errorMessages.judulPengajuanBaru}
                </Typography>
              )}
            </Div>
            {/* TextArea End */}

            {/* Upload Pengajuan Judul Start */}
            <Div
              sx={{
                display: "flex",
                marginBottom: "20px",
                marginTop: "20px",
                gap: "25px",
              }}
            >
              <Button
                variant="contained"
                component="label"
                sx={{
                  textTransform: "none",
                  background: "#006AF5",
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
                  onChange={onPengajuanJudulFileChange}
                  style={{ display: "none" }}
                />
                <AttachmentIcon sx={{ fontSize: "16px", margin: "5px" }} />
                Unggah file
              </Button>
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                {selectFileError && (
                  <Typography style={{ color: "red", marginTop: "-20px" }}>
                    {selectFileError}
                  </Typography>
                )}
              </Div>
            </Div>

            {/* UPload Pengajuan Judul End */}
            {/* Table Upload Pengajuan Judul Start*/}
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
                  {UploadedFiles?.map((file, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {file.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {file.size} bytes
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <Div
                          sx={{
                            display: "flex",
                            justifyContent: "center",
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
                            {pengajuanJudulFile && (
                              <PDFViewerPengajuanJudul
                                pengajuanJudulFile={pengajuanJudulFile}
                              />
                            )}
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
                            onClick={() => handleDeleteFile(index)}
                          >
                            Hapus
                          </span>
                        </Div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Table Upload Pengajuan Judul End*/}

            {/* Select Dosen Pembimbing Start */}
            <Div sx={{ display: "flex", marginBottom: "25px" }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-select-small"></InputLabel>
                <InputLabel id="demo-simple-select-label">
                  Mengusulkan Advisor
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedAdvisorId}
                  label="Mengusulkan Advisor"
                  onChange={handleAdvisorChange}
                  error={!!errorMessages.selectedAdvisorId}
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
                  error={!!errorMessages.selectedAdvisorId}
                >
                  {errorMessages.selectedAdvisorId}
                </FormHelperText>
              </FormControl>
              <FormControl fullWidth sx={{ margin: "0 25px" }} size="small">
                <InputLabel id="demo-simple-select-label">
                  Mengusulkan Co-Advisor 1
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCoAdvisor1Id}
                  label="Mengusulkan Co-Advisor 1"
                  onChange={(e) => setSelectedCoAdvisor1Id(e.target.value)}
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
                  <MenuItem value="">-</MenuItem>
                  {daftarDosen?.map((dosen) => (
                    <MenuItem key={dosen.id} value={dosen.id}>
                      {dosen.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">
                  Mengusulkan Co-Advisor 2
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCoAdvisor2Id}
                  label="Mengusulkan Co-Advisor 2"
                  onChange={(e) => setSelectedCoAdvisor2Id(e.target.value)}
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
                  <MenuItem value="">-</MenuItem>
                  {daftarDosen?.map((dosen) => (
                    <MenuItem key={dosen.id} value={dosen.id}>
                      {dosen.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Div>
            {/* Select Dosen Pembimbing End */}
            {/* Radio Button Start */}
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="subtitle2" gutterBottom component="div">
                Apakah Anda sudah melakukan konsultasi dengan Advisor sebelum
                mengajukan judul?
              </Typography>
              <RadioGroup
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                value={selectedOption}
                onChange={handleOptionChange}
                error={!!errorMessages.selectedOption}
                helperText={errorMessages.selectedOption}
              >
                <FormControlLabel value="ya" control={<Radio />} label="Ya" />
                <FormControlLabel
                  value="tidak"
                  control={<Radio />}
                  label="Tidak"
                />
              </RadioGroup>
              {errorMessages.selectedOption && (
                <div style={{ color: "red" }}>
                  {errorMessages.selectedOption}
                </div>
              )}
            </Div>
            {/* Radio Button End*/}
          </Div>
        </DialogContent>

        <DialogActions style={{ background: "#F5F5F5" }}>
          <Button
            onClick={handleClose}
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
            onClick={handleSubmit}
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
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirmDialog}
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
            onClick={handleCloseConfirmDialog}
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
    </Div>
  );
}

export default DaftarPengajuan;
