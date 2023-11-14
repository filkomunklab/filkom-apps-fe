import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { pdfjs } from "react-pdf";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import AttachmentIcon from "@mui/icons-material/Attachment";

// View Document Proposal
const PDFViewerSkripsi = ({ dokumenSkripsi }) => {
  const viewPDFSkripsi = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = dokumenSkripsi.file_path_skripsi;

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span sx={{ fontSize: "10px" }} onClick={viewPDFSkripsi}>
        View
      </span>
    </div>
  );
};

// View Document Payment
const PDFViewerPayment = ({ paymentFile }) => {
  const viewPDFPayment = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = paymentFile.file_path_payment;

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span onClick={viewPDFPayment}>View</span>
    </div>
  );
};

// View Document Cek Plagiat
const PDFViewerCekPlagiat = ({ plagiarismFile }) => {
  const viewPDFCekPlagiat = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = plagiarismFile.file_path_plagiarismcheck;

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span onClick={viewPDFCekPlagiat}>View</span>
    </div>
  );
};

const UploadSkipsi = () => {
  // state - menyimpan request data
  const [dokumenSkripsi, setDokumenSkripsi] = useState();
  const [buktiPembayaran, setBuktiPembayaran] = useState();
  const [hasilCekPlagiat, setHasilCekPlagiat] = useState();

  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);
  const [skrkipsiId, setSkripsiId] = useState(null);

  const role = useParams().role;
  console.log(role);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchDokumenSkripsiData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/skripsi-document/${skrkipsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDokumenSkripsi(response.data.data);
        console.log("Request Get dokumen skripsi: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil dokumen skripsi:",
          error
        );
      }
    };
    const fetchBuktiPembayaranData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/skripsi-payment/${skrkipsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setBuktiPembayaran(response.data.data);
        console.log("Request Get bukti pembayaran: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil bukti pembayaran:",
          error
        );
      }
    };
    const fetchHasilCekPlagiatData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/skripsi-plagiarism-check/${skrkipsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setHasilCekPlagiat(response.data.data);
        console.log("Request Get hasil cek plagiat: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil hail cek plagiat:",
          error
        );
      }
    };
    fetchDokumenSkripsiData();
    fetchBuktiPembayaranData();
    fetchHasilCekPlagiatData();
  }, [token, skrkipsiId]);

  // state untuk Upload Skripsi
  const [SkripsiUploadedFiles, setSkripsiUploadedFiles] = useState([]);
  const [selectedSkripsiFileName, setSelectedSkripsiFileName] = useState("");
  const [SkripsiFile, setSkripsiFile] = useState(null);

  // State untuk Bukti Pembayaran
  const [paymentFile, setPaymentFile] = useState(null);
  const [selectedPaymentFileName, setSelectedPaymentFileName] = useState("");
  const [paymentUploadedFiles, setPaymentUploadedFiles] = useState([]);

  // State untuk Hasil Cek Plagiat
  const [plagiarismFile, setPlagiarismFile] = useState(null);
  const [selectedPlagiarismFileName, setSelectedPlagiarismFileName] =
    useState("");
  const [plagiarismUploadedFiles, setPlagiarismUploadedFiles] = useState([]);

  const onProposalFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (SkripsiUploadedFiles.length === 0) {
        setSkripsiFile(file);
        setSelectedSkripsiFileName(file.name);

        const newFileData = {
          name: file.name,
          date: new Date().toLocaleDateString(),
          size: file.size,
          advisor: "",
          coAdvisor1: "",
          coAdvisor2: "",
        };

        setSkripsiUploadedFiles([newFileData]);
      }
    }
  };

  const onPaymentFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (paymentUploadedFiles.length === 0) {
        setPaymentFile(file);
        setSelectedPaymentFileName(file.name);

        // Tambahkan data file baru ke state paymentUploadedFiles
        const newFileData = {
          name: file.name,
          date: new Date().toLocaleDateString(),
          size: file.size,
        };

        setPaymentUploadedFiles([newFileData]);
      } else {
        // alert(
        //   "Anda sudah mengunggah satu file. Hapus file sebelumnya untuk mengunggah yang baru."
        // );
      }
    }
  };

  const onPlagiarismFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (plagiarismUploadedFiles.length === 0) {
        setPlagiarismFile(file);
        setSelectedPlagiarismFileName(file.name);

        // Tambahkan data file baru ke state plagiarismUploadedFiles
        const newFileData = {
          name: file.name,
          date: new Date().toLocaleDateString(),
          size: file.size,
        };

        setPlagiarismUploadedFiles([newFileData]);
      } else {
        // alert(
        //   "Anda sudah mengunggah satu file. Hapus file sebelumnya untuk mengunggah yang baru."
        // );
      }
    }
  };

  // fungsi untuk menghapus file Proposal
  const handleDeleteProposalFile = (index) => {
    const updatedFiles = [...SkripsiUploadedFiles];
    updatedFiles.splice(index, 1);
    setSkripsiUploadedFiles(updatedFiles);
    setSkripsiFile(null);
    setSelectedSkripsiFileName("");
  };

  // Fungsi untuk menghapus file bukti pembayaran
  const handleDeletePaymentFile = (index) => {
    const updatedFiles = [...paymentUploadedFiles];
    updatedFiles.splice(index, 1);
    setPaymentUploadedFiles(updatedFiles);
    setPaymentFile(null);
    setSelectedPaymentFileName("");
  };

  // Fungsi untuk menghapus file hasil cek plagiat
  const handleDeletePlagiarismFile = (index) => {
    const updatedFiles = [...plagiarismUploadedFiles];
    updatedFiles.splice(index, 1);
    setPlagiarismUploadedFiles(updatedFiles);
    setPlagiarismFile(null);
    setSelectedPlagiarismFileName("");
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
          Unggah Skripsi
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
                setSkripsiId(data.skripsi_id);
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
              Unggah Dokumen Skripsi
            </Typography>

            {/* Table 1 Start*/}
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
              }}
            >
              {/* file upload Start */}
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
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
                    width: "150px",
                    height: "30px",
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={onProposalFileChange}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end */}

              {/* Table Upload Proposal Start*/}
              <TableContainer sx={{ marginBottom: "25px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5", width: "100%" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "3%" }}
                      >
                        Nomor
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          width: "15%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        Nama File
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          maxWidth: "10%",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        Tanggal
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "10%" }}
                      >
                        Ukuran
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "15%" }}
                      >
                        Advisor
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "15%" }}
                      >
                        Co-Advisor 1
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "15%" }}
                      >
                        Co-Advisor 2
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
                    {dokumenSkripsi && (
                      <TableRow key={dokumenSkripsi.id}>
                        <TableCell>1</TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {dokumenSkripsi.file_name_skripsi}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {dokumenSkripsi.upload_date_skripsi}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {dokumenSkripsi.file_size_skripsi}
                        </TableCell>
                        <TableCell>
                          {dokumenSkripsi.is_skripsi_approve_by_advisor ===
                          "Waiting" ? (
                            <Chip
                              size="small"
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : dokumenSkripsi.is_skripsi_approve_by_advisor ===
                            "Approve" ? (
                            <Chip
                              size="small"
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : dokumenSkripsi.is_skripsi_approve_by_advisor ===
                            "Rejected" ? (
                            <Chip
                              size="small"
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            dokumenSkripsi.is_skripsi_approve_by_advisor
                          )}
                        </TableCell>
                        <TableCell>
                          {dokumenSkripsi.is_skripsi_approve_by_co_advisor1 ===
                          "Waiting" ? (
                            <Chip
                              size="small"
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : dokumenSkripsi.is_skripsi_approve_by_co_advisor1 ===
                            "Approve" ? (
                            <Chip
                              size="small"
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : dokumenSkripsi.is_skripsi_approve_by_co_advisor1 ===
                            "Rejected" ? (
                            <Chip
                              size="small"
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            dokumenSkripsi.is_skripsi_approve_by_co_advisor1
                          )}
                        </TableCell>
                        <TableCell>
                          {dokumenSkripsi.is_skripsi_approve_by_co_advisor2 ===
                          "Waiting" ? (
                            <Chip
                              size="small"
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : dokumenSkripsi.is_skripsi_approve_by_co_advisor2 ===
                            "Approve" ? (
                            <Chip
                              size="small"
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : dokumenSkripsi.is_skripsi_approve_by_co_advisor2 ===
                            "Rejected" ? (
                            <Chip
                              size="small"
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            dokumenSkripsi.is_skripsi_approve_by_co_advisor2
                          )}
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
                              {dokumenSkripsi && (
                                <PDFViewerSkripsi
                                  dokumenSkripsi={
                                    dokumenSkripsi.file_path_skripsi
                                  }
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
                                fontSize: "12px",
                              }}
                              onClick={() => handleDeleteProposalFile}
                            >
                              Delete
                            </span>
                          </Div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload Proposal End */}
            </Div>
            {/* Table 1 End */}
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
              Unggah Bukti Pembayaran
            </Typography>

            {/* Table 2 Start */}
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
              }}
            >
              {/* file upload for Payment */}
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
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
                    width: "150px",
                    height: "30px",
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={onPaymentFileChange}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end for Payment */}

              {/* Table Upload Payment Start*/}
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
                    {buktiPembayaran && (
                      <TableRow key={buktiPembayaran.id}>
                        <TableCell sx={{ fontSize: "12px" }}>1</TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {buktiPembayaran.file_name_payment}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {buktiPembayaran.upload_date_payment}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {buktiPembayaran.file_size_payment}
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
                              {buktiPembayaran && (
                                <PDFViewerPayment
                                  buktiPembayaran={buktiPembayaran}
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
                                fontSize: "12px",
                              }}
                              onClick={() => handleDeletePaymentFile}
                            >
                              Delete
                            </span>
                          </Div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload Payment End*/}
            </Div>
            {/* Table 2 End */}

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
              Unggah Hasil Cek plagiat
            </Typography>
            {/* Table 3 Start */}
            <Div
              sx={{
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
              }}
            >
              {/* file upload for Payment */}
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
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
                    width: "150px",
                    height: "30px",
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={onPlagiarismFileChange}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end for Payment */}

              {/* Table Upload Payment Start*/}
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
                    {hasilCekPlagiat && (
                      <TableRow key={hasilCekPlagiat.id}>
                        <TableCell sx={{ fontSize: "12px" }}>1</TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {hasilCekPlagiat.file_name_plagiarismcheck}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {hasilCekPlagiat.upload_date_plagiarismcheck}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {hasilCekPlagiat.file_size_plagiarismcheck}
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
                              {hasilCekPlagiat && (
                                <PDFViewerCekPlagiat
                                  hasilCekPlagiat={hasilCekPlagiat}
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
                                fontSize: "12px",
                              }}
                              onClick={() => handleDeletePlagiarismFile}
                            >
                              Delete
                            </span>
                          </Div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload Payment End*/}
            </Div>
            {/* Table 3 End */}
          </Div>
          {/* Element 2 End */}
        </Div>
      </Div>
    </Div>
  );
};

export default UploadSkipsi;
