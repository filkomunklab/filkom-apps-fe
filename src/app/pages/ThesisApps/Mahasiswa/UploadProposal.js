import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// View Document Proposal
const PDFViewerProposal = ({ proposalFile }) => {
  const viewPDFProposal = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = URL.createObjectURL(proposalFile);

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span sx={{ fontSize: "10px" }} onClick={viewPDFProposal}>
        View
      </span>
    </div>
  );
};

// View Document Payment
const PDFViewerPayment = ({ paymentFile }) => {
  const viewPDFPayment = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = URL.createObjectURL(paymentFile);

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
    const pdfURL = URL.createObjectURL(plagiarismFile);

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span onClick={viewPDFCekPlagiat}>View</span>
    </div>
  );
};

const UploadProposal = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open2 = Boolean(anchorE2);

  // state untuk Upload Proposal
  const [proposalUploadedFiles, setProposalUploadedFiles] = useState([]);
  const [selectedProposalFileName, setSelectedProposalFileName] = useState("");
  const [proposalFile, setProposalFile] = useState(null);

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
      if (proposalUploadedFiles.length === 0) {
        setProposalFile(file);
        setSelectedProposalFileName(file.name);

        const newFileData = {
          name: file.name,
          date: new Date().toLocaleDateString(),
          size: file.size,
          advisor: "",
          coAdvisor1: "",
          coAdvisor2: "",
        };

        setProposalUploadedFiles([newFileData]);
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
        alert(
          "Anda sudah mengunggah satu file. Hapus file sebelumnya untuk mengunggah yang baru."
        );
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
        alert(
          "Anda sudah mengunggah satu file. Hapus file sebelumnya untuk mengunggah yang baru."
        );
      }
    }
  };

  // fungsi untuk menghapus file Proposal
  const handleDeleteProposalFile = (index) => {
    const updatedFiles = [...proposalUploadedFiles];
    updatedFiles.splice(index, 1);
    setProposalUploadedFiles(updatedFiles);
    setProposalFile(null);
    setSelectedProposalFileName("");
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
          Upload Proposal
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
          {/* Riwayat Log Start */}
          <Div
            sx={{
              width: "320px",
              height: "500px",
              borderRadius: "6px",
              border: "1px solid rgba(26, 56, 96, 0.10)",
              background: "#FFF",
            }}
          >
            Riwayat Log
          </Div>
          {/* Riwayat Log End */}

          {/* Dosen Pembimbing Start */}
          <Div
            sx={{
              display: "flex",
              width: "320px",
              flexDirection: "column",
              alignItems: "flex-start",
              borderRadius: "6px",
              border: "1px solid rgba(26, 56, 96, 0.10)",
              background: "#FFF",
            }}
          >
            {/* Advisor */}
            <Div
              sx={{
                display: "flex",
                width: "480px",
                alignItems: "flex-start",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  width: "150px",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: 2,
                  flexShrink: "0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Advisor
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "flex-start",
                  gap: 2,
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                -
              </Div>
            </Div>
            {/* Co-Advisor 1*/}
            <Div
              sx={{
                display: "flex",
                width: "480px",
                alignItems: "flex-start",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  width: "150px",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: 2,
                  flexShrink: "0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Co-Advisor 1
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "flex-start",
                  gap: 2,
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                -
              </Div>
            </Div>
            {/* Co-Advisor 2*/}
            <Div
              sx={{
                display: "flex",
                width: "480px",
                alignItems: "flex-start",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  width: "150px",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: 2,
                  flexShrink: "0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Co-Advisor 2
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "flex-start",
                  gap: 2,
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                -
              </Div>
            </Div>
          </Div>
          {/* Dosen Pembimbing End */}
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
          <Div
            sx={{
              display: "flex",
              // padding: "5px 16px",
              width: "100%",
              alignSelf: "stretch",
              borderRadius: "8px",
              border: "1px solid #E0E0E0",
              background: "#FFF",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
              flexDirection: "column",
            }}
          >
            <Div sx={{ width: "100%", display: "flex" }}>
              <Div sx={{ margin: "auto" }}>
                <Link to="#">
                  <Button
                    sx={{
                      fontSize: "13px",
                      padding: "6px 16px",
                      fontWeight: 500,
                      color: "#192434",
                      textTransform: "none",
                      "&:hover": {
                        color: "#006AF5",
                      },
                    }}
                  >
                    Beranda
                  </Button>
                </Link>
              </Div>
              <Div
                sx={{
                  width: "1px",
                  transform: "90px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              ></Div>
              <Div sx={{ margin: "auto" }}>
                <Link to="#">
                  <Button
                    sx={{
                      width: "100%",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#192434",
                      textTransform: "none",
                      "&:hover": {
                        color: "#006AF5",
                      },
                    }}
                  >
                    Pengajuan Judul
                  </Button>
                </Link>
              </Div>
              <Div
                sx={{
                  width: "1px",
                  transform: "90px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              ></Div>
              <Div sx={{ margin: "auto" }}>
                <Link to="#">
                  <Button
                    sx={{
                      // width: "130px",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#192434",
                      textTransform: "none",
                      "&:hover": {
                        color: "#006AF5",
                      },
                    }}
                  >
                    Konsultasi
                  </Button>
                </Link>
              </Div>
              <Div
                sx={{
                  width: "1px",
                  transform: "90px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              ></Div>
              <Div sx={{ margin: "auto" }}>
                <Button
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Pengajuan Proposal
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Upload Proposal
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Upload Revisi Proposal
                  </MenuItem>
                </Menu>
              </Div>
              <Div
                sx={{
                  width: "1px",
                  transform: "90px",
                  alignSelf: "stretch",
                  background: "rgba(26, 56, 96, 0.10)",
                }}
              ></Div>
              {/* Menu Pengajuan Skripsi */}
              <Div>
                <Button
                  onClick={(event) => setAnchorE2(event.currentTarget)}
                  sx={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#192434",
                    textTransform: "none",
                    "&:hover": {
                      color: "#006AF5",
                    },
                  }}
                >
                  Pengajuan Skripsi
                </Button>
                <Menu
                  anchorEl={anchorE2}
                  open={open2}
                  onClose={() => setAnchorE2(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Upload Skripsi
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorE2(null)}>
                    Upload Revisi Skripsi
                  </MenuItem>
                </Menu>
              </Div>
            </Div>
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
              Unggah Dokumen Proposal
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
              <Div sx={{ display: "flex", marginBottom: "20px" }}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    textTransform: "none",
                    background: "#006AF5",
                    color: "white",
                    fontSize: "10px",
                    borderRadius: "6px 0 0 6px",
                    padding: "6px 12px",
                    width: "80px",
                    height: "30px",
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={onProposalFileChange}
                    style={{ display: "none" }}
                  />
                  Pilih File
                </Button>
                <input
                  style={{
                    height: "30px",
                    border: "1px solid #ccc",
                    width: "350px",
                    borderRadius: "0 6px 6px 0",
                    fontSize: "10px",
                  }}
                  type="text"
                  id="filename"
                  autoComplete="off"
                  disabled
                  readOnly
                  value={selectedProposalFileName || "No file uploaded"}
                />
              </Div>
              {/* file upload end */}

              {/* Table Upload Proposal Start*/}
              <TableContainer sx={{ marginBottom: "25px" }}>
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
                    {proposalUploadedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {file.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {file.date}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {file.size} bytes
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label="Menunggu"
                            sx={{
                              background: "rgba(255, 204, 0, 0.10)",
                              color: "#985211",
                              fontSize: "10px",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label="Menunggu"
                            sx={{
                              background: "rgba(255, 204, 0, 0.10)",
                              color: "#985211",
                              fontSize: "10px",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            label="Menunggu"
                            sx={{
                              background: "rgba(255, 204, 0, 0.10)",
                              color: "#985211",
                              fontSize: "10px",
                            }}
                          />
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
                              {proposalFile && (
                                <PDFViewerProposal
                                  proposalFile={proposalFile}
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
                              onClick={() => handleDeleteProposalFile(index)}
                            >
                              Delete
                            </span>
                          </Div>
                        </TableCell>
                      </TableRow>
                    ))}
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
              <Div sx={{ display: "flex", marginBottom: "20px" }}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    textTransform: "none",
                    background: "#006AF5",
                    color: "white",
                    fontSize: "10px",
                    borderRadius: "6px 0 0 6px",
                    padding: "6px 12px",
                    width: "80px",
                    height: "30px",
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={onPaymentFileChange}
                    style={{ display: "none" }}
                  />
                  Pilih File
                </Button>
                <input
                  style={{
                    height: "30px",
                    border: "1px solid #ccc",
                    width: "350px",
                    borderRadius: "0 6px 6px 0",
                    fontSize: "10px",
                  }}
                  type="text"
                  id="paymentFilename"
                  autoComplete="off"
                  disabled
                  readOnly
                  value={selectedPaymentFileName || "No file uploaded"}
                />
              </Div>
              {/* file upload end for Payment */}

              {/* Table Upload Payment Start*/}
              <TableContainer sx={{ marginBottom: "25px" }}>
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
                    {paymentUploadedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {file.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {file.date}
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
                              {paymentFile && (
                                <PDFViewerPayment paymentFile={paymentFile} />
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
                              onClick={() => handleDeletePaymentFile(index)}
                            >
                              Delete
                            </span>
                          </Div>
                        </TableCell>
                      </TableRow>
                    ))}
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
              <Div sx={{ display: "flex", marginBottom: "20px" }}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    textTransform: "none",
                    background: "#006AF5",
                    color: "white",
                    fontSize: "10px",
                    borderRadius: "6px 0 0 6px",
                    padding: "6px 12px",
                    width: "80px",
                    height: "30px",
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={onPlagiarismFileChange}
                    style={{ display: "none" }}
                  />
                  Pilih File
                </Button>
                <input
                  style={{
                    height: "30px",
                    border: "1px solid #ccc",
                    width: "350px",
                    borderRadius: "0 6px 6px 0",
                    fontSize: "10px",
                  }}
                  type="text"
                  id="paymentFilename"
                  autoComplete="off"
                  disabled
                  readOnly
                  value={selectedPlagiarismFileName || "No file uploaded"}
                />
              </Div>
              {/* file upload end for Payment */}

              {/* Table Upload Payment Start*/}
              <TableContainer sx={{ marginBottom: "25px" }}>
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
                    {plagiarismUploadedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {file.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {file.date}
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
                              {plagiarismFile && (
                                <PDFViewerCekPlagiat
                                  plagiarismFile={plagiarismFile}
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
                              onClick={() => handleDeletePlagiarismFile(index)}
                            >
                              Delete
                            </span>
                          </Div>
                        </TableCell>
                      </TableRow>
                    ))}
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

export default UploadProposal;
