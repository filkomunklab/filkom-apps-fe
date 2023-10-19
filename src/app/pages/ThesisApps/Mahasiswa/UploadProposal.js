import Div from "@jumbo/shared/Div";
import { FileUpload } from "@mui/icons-material";
import {
  Button,
  Chip,
  FormControl,
  Input,
  InputLabel,
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
import AttachmentIcon from "@mui/icons-material/Attachment";
import Page from "@jumbo/shared/Page";
import { Document, pdfjs } from "react-pdf"; // Import react-pdf

const UploadProposal = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null); // State untuk file PDF
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles([...uploadedFiles, file]);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleViewPdf = (file) => {
    setSelectedPdf(file);
  };
  return (
    <Div>
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
                      // width: "150px",
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
                  Pengajuan Skripsi
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
                    Upload Skripsi
                  </MenuItem>
                  <MenuItem onClick={() => setAnchorEl(null)}>
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
            {/* Header Start */}
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
              Ungah Dokumen Proposal
            </Typography>
            {/* Header End */}

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
              {/* file upload Start */}
              <Div sx={{ display: "flex", marginBottom: "20px" }}>
                <Button
                  style={{
                    textTransform: "none",
                    background: "#006AF5",
                    color: "white",
                    fontSize: "10px",
                    borderRadius: "6px 0 0 6px",
                    padding: "6px 12px", // Sesuaikan padding dengan ukuran tombol yang lebih kecil
                    width: "80px", // Sesuaikan lebar tombol
                    height: "30px", // Sesuaikan tinggi tombol
                  }}
                >
                  <input
                    type="file"
                    id="fileupload"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="filename" className="hide">
                    Pilih File
                  </label>
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
                  readOnly
                  placeholder="No file uploaded"
                  value={selectedFile ? selectedFile.name : ""}
                  onClick={() => document.getElementById("fileupload").click()}
                />
              </Div>
              {/* file upload end */}

              {/* Table Upload Proposal Start*/}

              <TableContainer sx={{ marginBottom: "50px" }}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ fontSize: "12px", padding: "11px" }}>
                        Nomor
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "11px" }}>
                        Nama File
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "11px" }}>
                        Tanggal
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "11px" }}>
                        Ukuran
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "11px" }}>
                        Advisor
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "11px" }}>
                        Co-Advisor 1
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", padding: "11px" }}>
                        Co-Advisor 2
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          textAlign: "center",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {uploadedFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {file.name}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {new Date().toLocaleDateString()}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {(file.size / 1024).toFixed(2)} KB
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              color: "#985211",
                              background: "rgba(255, 204, 0, 0.10)",
                              fontSize: "12px",
                            }}
                          >
                            Menunggu
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              color: "#985211",
                              background: "rgba(255, 204, 0, 0.10)",
                              fontSize: "12px",
                            }}
                          >
                            Menunggu
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              color: "#985211",
                              background: "rgba(255, 204, 0, 0.10)",
                              fontSize: "12px",
                            }}
                          >
                            Menunggu
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          <Div sx={{ display: "flex" }}>
                            <Button
                              variant="text"
                              size="small"
                              sx={{
                                color: "#006AF5",
                                marginRight: "5px",
                                padding: "0",
                                fontSize: "10px",
                                width: "5px",
                                height: "5px",
                              }}
                              onClick={() => {
                                // Tindakan yang akan dijalankan saat tombol "View" ditekan
                                alert("Tombol View ditekan");
                                // Anda dapat mengganti tindakan di atas dengan apa pun yang Anda inginkan
                              }}
                            >
                              View
                            </Button>
                            {/* <Div
                              sx={{
                                width: "1px",
                                height: "2px",
                                margin: "0 2px",
                                color: "#E0E0E0",
                                margin: "auto",
                              }}
                            >
                              |
                            </Div> */}
                            <Button
                              variant="text"
                              size="small"
                              sx={{
                                color: "red",
                                padding: "0",
                                fontSize: "10px",
                                width: "5px",
                                height: "5px",
                              }}
                              onClick={() => {
                                // Tindakan yang akan dijalankan saat tombol "Delete" ditekan
                                alert("Tombol Delete ditekan");
                                // Anda dapat mengganti tindakan di atas dengan apa pun yang Anda inginkan
                              }}
                            >
                              Delete
                            </Button>
                          </Div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload Proposal End */}
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>
      {/* Tampilkan PDF yang dipilih */}
      {selectedPdf && (
        <div>
          <Document file={selectedPdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          {/* Tombol navigasi halaman PDF */}
          <Button
            onClick={() => setPageNumber(Math.max(pageNumber - 1, 1))}
            disabled={pageNumber <= 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPageNumber(Math.min(pageNumber + 1, numPages))}
            disabled={pageNumber >= numPages}
          >
            Next
          </Button>
        </div>
      )}
    </Div>
  );
};

export default UploadProposal;
