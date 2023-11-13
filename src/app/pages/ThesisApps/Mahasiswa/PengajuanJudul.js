import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextareaAutosize,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Paper,
} from "@mui/material";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import { pdfjs } from "react-pdf";
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
      <span onClick={viewPDFPengajuanJudul}>Lihat</span>
    </div>
  );
};

const PengajuanJudul = () => {
  // state - simpan request pengajuan judul
  const [pengajuanJudul, setPengajuanJudul] = useState();
  // state - simpan request daftar dosen
  const [daftarDosen, setDaftarDosen] = useState([]);

  const groupId = useParams().groupId;
  // console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);

  const [initialPengajuanJudulFile, setInitialPengajuanJudulFile] =
    useState(null);
  const [initialPengajuanJudulFileName, setInitialPengajuanJudulFileName] =
    useState("");
  const [initialPengajuanJudulFileSize, setInitialPengajuanJudulFileSize] =
    useState([]);

  if (progress !== null) {
    console.log("Progress:", progress);
  }
  if (submissionId !== null) {
    console.log("submission_id:", submissionId);
  }

  const role = useParams().role;
  console.log(role);

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
        setJudul(response.data.data.title || "");
        setAdvisor(response.data.data.proposed_advisor_id || "");
        setCoAdvisor1(response.data.data.proposed_co_advisor1_id || "");
        setCoAdvisor2(response.data.data.proposed_co_advisor2_id || "");
        setSelectedOption(response.data.data.is_consultation ? "ya" : "tidak");
        setKonsultasi(response.data.data.is_consultation);

        const newFileData = {
          name: response.data.data.file_name,
          size: response.data.data.file_size,
          path: response.data.data.file_path,
        };
        setPengajuanJudulUploadedFiles([newFileData]);
        setInitialPengajuanJudulFile([newFileData]);
        setInitialPengajuanJudulFileName(response.data.data.file_name);
        setInitialPengajuanJudulFileSize(response.data.data.file_size);

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

  // State untuk input select
  const [selectedOption, setSelectedOption] = useState("");
  const [konsultasi, setKonsultasi] = useState(null);
  // menyembunyikan status
  const [isStatusVisible, setStatusVisible] = useState(true);
  const [initialSelectedOption, setInitialSelectedOption] = useState("");
  const [advisor, setAdvisor] = useState(""); // State untuk advisor
  const [coAdvisor1, setCoAdvisor1] = useState(""); // State untuk co-advisor 1
  const [coAdvisor2, setCoAdvisor2] = useState(""); // State untuk co-advisor 2

  // State untuk option yang dipilih pada dialog

  // State untuk mengelola berbagai data termasuk judul, latar belakang, dll.

  const [isEditing, setIsEditing] = useState(false);
  const [judul, setJudul] = useState("");
  // State untuk manajemen dialog konfirmasi perubahan judul
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [initialJudul, setInitialJudul] = useState(judul);

  const handleCancelAllEdits = () => {
    setJudul(initialJudul);
    setIsEditing(false);
    setSelectedOption(initialSelectedOption);
    setStatusVisible(true);
  };

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
    resetUploadedFile(); // Panggil fungsi resetUploadedFile
  };

  const resetUploadedFile = () => {
    setPengajuanJudulFile(initialPengajuanJudulFile);
    setSelectedPengajuanJudulFileName(initialPengajuanJudulFileName);
    setPengajuanJudulUploadedFiles(initialPengajuanJudulFile);
    setIsPaymentUploaded(false);
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

  const [pengajuanJudulFile, setPengajuanJudulFile] = useState(null);
  const [selectedPengajuanJudulFileName, setSelectedPengajuanJudulFileName] =
    useState("");
  const [pengajuanJudulUploadedFiles, setPengajuanJudulUploadedFiles] =
    useState([]);
  // Tambahkan state untuk melacak apakah file pembayaran telah diunggah
  const [isPaymentUploaded, setIsPaymentUploaded] = useState(false);

  const onPengajuanJudulFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (pengajuanJudulUploadedFiles.length === 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // e.target.result berisi data URL dari file
          const dataURL = e.target.result;

          // Mengonversi data URL ke base64
          const base64String = dataURL.split(",")[1];

          setPengajuanJudulFile(file);
          setSelectedPengajuanJudulFileName(file.name);

          // Tambahkan data file baru ke state paymentUploadedFiles
          const newFileData = {
            name: file.name,
            size: file.size,
            buffer: base64String,
          };
          setPengajuanJudulUploadedFiles([newFileData]);
          // Set isPaymentUploaded menjadi true
          setIsPaymentUploaded(true);
        };
        reader.readAsDataURL(file);
      } else {
        // alert(
        //   "Anda sudah mengunggah satu file. Hapus file sebelumnya untuk mengunggah yang baru."
        // );
      }
    }
  };
  // Fungsi untuk menghapus file Pengajuan Judul
  const handleDeletePengajuanJudulFile = (index) => {
    if (index >= 0 && index < pengajuanJudulUploadedFiles.length && isEditing) {
      // Hapus file dari state
      const updatedFiles = [...pengajuanJudulUploadedFiles];
      updatedFiles.splice(index, 1);
      setPengajuanJudulUploadedFiles(updatedFiles);
      // Reset file yang dipilih
      setPengajuanJudulFile(null);
      setSelectedPengajuanJudulFileName("");
      // Juga set isPaymentUploaded menjadi false karena file dihapus
      setIsPaymentUploaded(false);
    }
  };

  // fungsi - tombol menumtup Konfirmasi perbarui
  const handleClose = () => {
    setIsEditing(false);
  };

  // fungsi - radio button konsultasi
  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value === "ya") {
      setKonsultasi(true);
    } else if (value === "tidak") {
      setKonsultasi(false);
    } else {
      // Handle kasus ketika tidak ada opsi yang dipilih
      setKonsultasi(false); // Atau Anda bisa menentukan nilai yang sesuai dengan kebutuhan Anda.
    }
  };

  const handleUpdatePengajuanJudul = () => {
    closeConfirmationDialog();

    const submission_file = {
      file_name: pengajuanJudulUploadedFiles[0].name,
      file_size: pengajuanJudulUploadedFiles[0].size.toString(),
      buffer: pengajuanJudulUploadedFiles[0].buffer,
    };
    const pengajuanData = {
      title: judul,
      is_consultation: konsultasi,
      proposed_advisor_id: advisor,
      proposed_co_advisor1_id: coAdvisor1 || null,
      proposed_co_advisor2_id: coAdvisor2 || null,
      submission_file,
    };
    console.log(pengajuanData);
    axios
      .put(
        `http://localhost:2000/api/v1/submission/${submissionId}`,
        pengajuanData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // batalkan edit/perbarui
        setIsEditing(false);
        closeConfirmationDialog();
        handleCancelEdit();
        handleCancelAllEdits();

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
            setJudul(response.data.data.title || "");
            setAdvisor(response.data.data.proposed_advisor_id || "");
            setCoAdvisor1(response.data.data.proposed_co_advisor1_id || "");
            setCoAdvisor2(response.data.data.proposed_co_advisor2_id || "");
            setSelectedOption(
              response.data.data.is_consultation ? "ya" : "tidak"
            );
            setKonsultasi(response.data.data.is_consultation);

            const newFileData = {
              name: response.data.data.file_name,
              size: response.data.data.file_size,
              path: response.data.data.file_path,
            };
            setPengajuanJudulUploadedFiles([newFileData]);
            setInitialPengajuanJudulFile([newFileData]);
            setInitialPengajuanJudulFileName(response.data.data.file_name);
            setInitialPengajuanJudulFileSize(response.data.data.file_size);

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
        console.error("Terjadi kesalahan:", error);
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
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
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
          {/* Menu Horizontal Start */}
          {/* MAHASISWA */}
          <Div
            hidden={role.includes("MAHASISWA") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuMahasiswa dataGroupId={groupId} dataProgress={progress} />
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
                  <Typography>Status</Typography>
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
              </Div>
              {/* Judul End */}
              {/* Upload Pengajuan Judul Start */}
              {isEditing && (
                <Div sx={{ display: "flex", marginBottom: "20px" }}>
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      textTransform: "none",
                      background: "#006AF5",
                      color: "white",
                      fontSize: "12px",
                      borderRadius: "6px",
                      width: "130px",
                      height: "30px",
                      padding: "6px 12px",
                    }}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={onPengajuanJudulFileChange}
                      style={{ display: "none" }}
                    />
                    <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                    Unggah file
                  </Button>
                </Div>
              )}
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
                          textAlign: "center",
                          width: "12%",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pengajuanJudulUploadedFiles.map((file, index) => (
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
                                cursor: isEditing ? "pointer" : "default", // Nonaktifkan jika bukan mode edit
                                color: isEditing ? "red" : "#E0E0E0", // Ubah warna saat dalam mode edit
                                fontSize: "12px",
                              }}
                              onClick={() =>
                                handleDeletePengajuanJudulFile(index)
                              }
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
                  <InputLabel id="demo-simple-select-label">
                    Mengusulkan Advisor
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={advisor}
                    label="Mengusulkan Advisor"
                    onChange={(e) => setAdvisor(e.target.value)}
                    disabled={!isEditing}
                    sx={{
                      width: "230px",
                      overflow: "hidden",
                      textOverflow: "ellipsis", // Opsi ini akan memotong teks yang terlalu panjang
                    }}
                  >
                    <MenuItem value="">-</MenuItem>
                    {daftarDosen.map((dosen) => (
                      <MenuItem key={dosen.id} value={dosen.id}>
                        {dosen.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {isEditing && (
                  <>
                    {coAdvisor1 !== null && (
                      <FormControl
                        fullWidth
                        size="small"
                        sx={{ margin: "0 25px" }}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Mengusulkan Co-Advisor 1
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={coAdvisor1}
                          label="Mengusulkan Co-Advisor 1"
                          onChange={(e) => setCoAdvisor1(e.target.value)}
                          disabled={!isEditing}
                          sx={{
                            width: "230px",
                            overflow: "hidden",
                            textOverflow: "ellipsis", // Opsi ini akan memotong teks yang terlalu panjang
                          }}
                        >
                          <MenuItem value="">-</MenuItem>
                          {daftarDosen.map((dosen) => (
                            <MenuItem key={dosen.id} value={dosen.id}>
                              {dosen.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}

                    {coAdvisor2 !== null && (
                      <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">
                          Mengusulkan Co-Advisor 2
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={coAdvisor2}
                          label="Mengusulkan Co-Advisor 2"
                          onChange={(e) => setCoAdvisor2(e.target.value)}
                          disabled={!isEditing}
                          sx={{
                            width: "230px",
                            overflow: "hidden",
                            textOverflow: "ellipsis", // Opsi ini akan memotong teks yang terlalu panjang
                          }}
                        >
                          <MenuItem value="">-</MenuItem>
                          {daftarDosen.map((dosen) => (
                            <MenuItem key={dosen.id} value={dosen.id}>
                              {dosen.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </>
                )}
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
                  aria-label="konsultasi"
                  name="konsultasi"
                  value={selectedOption}
                  onChange={handleOptionChange}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    value="ya"
                    control={<Radio disabled={!isEditing} />}
                    label="Ya"
                  />
                  <FormControlLabel
                    value="tidak"
                    control={<Radio disabled={!isEditing} />}
                    label="Tidak"
                  />
                </RadioGroup>
              </Div>
              {/* Radio Button End*/}

              <Div
                sx={{
                  display: "flex",
                  padding: "12px 24px 12px 0px",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  background: "#F5F5F5",
                }}
              >
                {isEditing ? (
                  <Div>
                    <Button
                      onClick={() => {
                        handleClose();
                        handleCancelEdit();
                      }}
                      size="small"
                      sx={{
                        textTransform: "none",
                        borderRadius: "6px",
                        border: "#E0E0E0",
                        background: "#FFFF",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
                        color: "black",
                        marginRight: "25px",
                      }}
                    >
                      Kembali
                    </Button>
                    <Button
                      onClick={handleSaveClick}
                      sx={{
                        padding: "3px",
                        background: "#006AF5",
                        color: "#FFFF",
                        fontSize: "12px",
                        textTransform: "none",
                        "&:hover": {
                          color: "#005FDB",
                        },
                      }}
                    >
                      Perbarui
                    </Button>
                  </Div>
                ) : (
                  <Button
                    onClick={handleEditClick}
                    sx={{
                      padding: "3px",
                      background: "#006AF5",
                      color: "#FFFF",
                      fontSize: "12px",
                      textTransform: "none",
                      "&:hover": {
                        color: "#005FDB",
                      },
                    }}
                  >
                    Ubah
                  </Button>
                )}
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
        <DialogTitle sx={{ fontSize: "20px", fontWeight: "500" }}>
          Perbarui Pengajuan Judul
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
              // handleCancelEdit();
              // handleCancelAllEdits();
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
              handleUpdatePengajuanJudul();
              // closeConfirmationDialog();
              // setIsEditing(false);
              // setInitialJudul(judul);
              // Simpan perubahan ke server jika diperlukan
            }}
            color="primary"
            sx={{
              textTransform: "none",
              borderRadius: "6px",
              background: "#006AF5",
              color: "#ffff",
              "&:hover": {
                color: "#006AF5",
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

export default PengajuanJudul;
