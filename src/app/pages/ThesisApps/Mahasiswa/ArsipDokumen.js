import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
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

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// View Document HKI
const PDFViewerHKI = ({ HKIFile }) => {
  const viewPDFHKI = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = URL.createObjectURL(HKIFile);

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span sx={{ fontSize: "10px" }} onClick={viewPDFHKI}>
        View
      </span>
    </div>
  );
};

// View Document Artikel Jurnal
const PDFViewerArtikelJurnal = ({ artikelJurnalFile }) => {
  const viewPDFArtikelJurnal = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = URL.createObjectURL(artikelJurnalFile);

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span onClick={viewPDFArtikelJurnal}>View</span>
    </div>
  );
};

// View Document Source Code
const PDFViewerSourceCode = ({ sourceCodeFile }) => {
  const viewPDFSourceCode = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = URL.createObjectURL(sourceCodeFile);

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span onClick={viewPDFSourceCode}>View</span>
    </div>
  );
};

const ArsipDocument = () => {
  // state - menyimpan request data
  const [HKI, setHKI] = useState();
  const [jurnal, seJurnal] = useState();
  const [sourceCode, setSourceCode] = useState();
  const [linkSourceCode, setLinkSourceCode] = useState();

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
    const fetchHKIData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/hki/${skrkipsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setHKI(response.data.data);
        console.log("Request Get HKI: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil HKI:", error);
      }
    };
    const fetchJurnalData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/journal/${skrkipsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setHKI(response.data.data);
        console.log("Request Get jurnal: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil jurnal:", error);
      }
    };
    const fetchSourceCodeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/source-code/${skrkipsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setHKI(response.data.data);
        console.log("Request Get source code: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil source code:", error);
      }
    };
    const fetchLinkSourceCodeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/link-source-code/${skrkipsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setHKI(response.data.data);
        console.log("Request Get link source code: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil link source code:",
          error
        );
      }
    };
    fetchHKIData();
    fetchJurnalData();
    fetchSourceCodeData();
    fetchLinkSourceCodeData();
  }, [token, skrkipsiId]);

  // state untuk Upload HKI
  const [HKIUploadedFiles, setHKIUploadedFiles] = useState([]);
  const [selectedHKIFileName, setSelectedHKIFileName] = useState("");
  const [HKIFile, setHKIFile] = useState(null);

  // State untuk Bukti Pembayaran
  const [artikelJurnalFile, setArtikelJurnalFile] = useState(null);
  const [selectedArtikelJurnalFileName, setSelectedArtikelJurnalFileName] =
    useState("");
  const [artikelJurnalUploadedFiles, setArtikelJurnalUploadedFiles] = useState(
    []
  );

  // State untuk Hasil Source Code
  const [sourceCodeFile, setSourceCodeFile] = useState(null);
  const [selectedSourceCodeFileName, setSelectedSourceCodeFileName] =
    useState("");
  const [sourceCodeUploadedFiles, setSourceCodeUploadedFiles] = useState([]);

  // State untuk Link Source Code
  const [links, setLinks] = useState([]);
  const [currentLink, setCurrentLink] = useState("");
  const [linkUploaded, setLinkUploaded] = useState(false);

  const onHKIFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (HKIUploadedFiles.length === 0) {
        setHKIFile(file);
        setSelectedHKIFileName(file.name);

        const newFileData = {
          name: file.name,
          date: new Date().toLocaleDateString(),
          size: file.size,
        };

        setHKIUploadedFiles([newFileData]);
      }
    }
  };

  const onArtikelJurnalFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (artikelJurnalUploadedFiles.length === 0) {
        setArtikelJurnalFile(file);
        setSelectedArtikelJurnalFileName(file.name);

        // Tambahkan data file baru ke state artikel jurnal UploadedFiles
        const newFileData = {
          name: file.name,
          date: new Date().toLocaleDateString(),
          size: file.size,
        };

        setArtikelJurnalUploadedFiles([newFileData]);
      } else {
        // alert(
        //   "Anda sudah mengunggah satu file. Hapus file sebelumnya untuk mengunggah yang baru."
        // );
      }
    }
  };

  const onSourceCodeFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (sourceCodeUploadedFiles.length === 0) {
        setSourceCodeFile(file);
        setSelectedSourceCodeFileName(file.name);

        // Tambahkan data file baru ke state upload Source code
        const newFileData = {
          name: file.name,
          date: new Date().toLocaleDateString(),
          size: file.size,
        };

        setSourceCodeUploadedFiles([newFileData]);
      } else {
        // alert(
        //   "Anda sudah mengunggah satu file. Hapus file sebelumnya untuk mengunggah yang baru."
        // );
      }
    }
  };

  const addLink = () => {
    if (!linkUploaded) {
      if (currentLink) {
        setLinks([...links, currentLink]);
        setCurrentLink(""); // Mengosongkan input setelah menambahkan link
        setLinkUploaded(true); // Menandai bahwa link telah diunggah
      }
    } else {
      alert(
        "Anda sudah mengunggah satu link. Hapus link sebelumnya untuk menambahkan yang baru."
      );
    }
  };

  const clearLink = () => {
    setLinkUploaded(false);
    setLinks([]);
  };

  // Fungsi untuk membatasi panjang tampilan link dengan pembagian baris
  const breakLongLink = (link) => {
    const maxLength = 25; // Panjang maksimum per baris
    const regex = new RegExp(`.{1,${maxLength}}`, "g");
    return link.match(regex).join("\n");
  };

  // fungsi untuk membuka situs web link
  const openLink = (url) => {
    window.open(url, "_blank"); // Membuka tautan dalam tab atau jendela baru
  };

  // fungsi untuk menghapus file HKI
  const handleDeleteHKIFile = (index) => {
    const updatedFiles = [...HKIUploadedFiles];
    updatedFiles.splice(index, 1);
    setHKIUploadedFiles(updatedFiles);
    setHKIFile(null);
    setSelectedHKIFileName("");
  };

  // Fungsi untuk menghapus file Artikel Jurnal
  const handleDeleteArtikelJurnalFile = (index) => {
    const updatedFiles = [...artikelJurnalUploadedFiles];
    updatedFiles.splice(index, 1);
    setArtikelJurnalUploadedFiles(updatedFiles);
    setArtikelJurnalFile(null);
    setSelectedArtikelJurnalFileName("");
  };

  // Fungsi untuk menghapus file hasil Source Code
  const handleDeleteSourceCodeFile = (index) => {
    const updatedFiles = [...sourceCodeUploadedFiles];
    updatedFiles.splice(index, 1);
    setSourceCodeUploadedFiles(updatedFiles);
    setSourceCodeFile(null);
    setSelectedSourceCodeFileName("");
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
          Arsip Document
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
              Unggah Dokumen HKI
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
                    padding: "6px 12px",
                    width: "130px",
                    height: "30px",
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={onHKIFileChange}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end */}

              {/* Table Upload HKI Start*/}
              <TableContainer sx={{ marginBottom: "25px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5", width: "100%" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ fontSize: "12px", width: "3%" }}>
                        Nomor
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: "45%",
                        }}
                      >
                        Nama File
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: "20%",
                        }}
                      >
                        Tanggal
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", width: "20%" }}>
                        Ukuran
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          width: "12%",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {HKIUploadedFiles.map((file, index) => (
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
                          <Div sx={{ display: "flex" }}>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "blue",
                                fontSize: "12px",
                              }}
                            >
                              {HKIFile && <PDFViewerHKI HKIFile={HKIFile} />}
                            </span>
                            <Div
                              style={{
                                margin: "0 5px",
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
                              onClick={() => handleDeleteHKIFile(index)}
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
              {/* Table Upload HKI End */}
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
              Unggah Artikel Jurnal
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
              {/* file upload for Artikel Jurnal */}
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                }}
                component={Paper}
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
                    onChange={onArtikelJurnalFileChange}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end for Artikel Jurnal */}

              {/* Table Upload Artikel Jurnal Start*/}
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
                    {artikelJurnalUploadedFiles.map((file, index) => (
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
                              {artikelJurnalFile && (
                                <PDFViewerArtikelJurnal
                                  artikelJurnalFile={artikelJurnalFile}
                                />
                              )}
                            </span>
                            <Div
                              style={{
                                margin: "0 5px",
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
                              onClick={() =>
                                handleDeleteArtikelJurnalFile(index)
                              }
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
              {/* Table Upload Artikel Jurnal End*/}
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
                fontWeight: 600,
              }}
            >
              Unggah Source code
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
              {/* file upload for Source Code */}
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
                    padding: "6px 12px",
                    width: "130px",
                    height: "30px",
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={onSourceCodeFileChange}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end for Source Code */}

              {/* Table Upload Source Code Start*/}
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
                    {sourceCodeUploadedFiles.map((file, index) => (
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
                              {sourceCodeFile && (
                                <PDFViewerSourceCode
                                  sourceCodeFile={sourceCodeFile}
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
                              onClick={() => handleDeleteSourceCodeFile(index)}
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
              {/* Table Upload Source Code End*/}
              {/* file upload for Link Start */}
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                }}
              >
                <input
                  style={{
                    height: "30px",
                    border: "1px solid #ccc",
                    width: "430px",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                  type="text"
                  placeholder="Masukkan link"
                  value={currentLink}
                  onChange={(e) => setCurrentLink(e.target.value)}
                />
                <div style={{ flex: 1 }}></div>
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
                  onClick={addLink}
                >
                  <AttachmentIcon
                    sx={{ fontSize: "14px", marginRight: "5px" }}
                  />
                  Unggah Link
                </Button>
              </Div>
              {/* file upload for Link End */}
              {/* Table upload Link Start */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "3%" }}
                      >
                        No
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "65%" }}
                      >
                        Link
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "20%" }}
                      >
                        Tanggal
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "12%" }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {links.map((link, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <span
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              color: "blue",
                              fontSize: "12px",
                            }}
                            onClick={() => openLink(link)}
                          >
                            {breakLongLink(link)}
                          </span>
                        </TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span
                            style={{
                              textDecoration: "none",
                              cursor: "pointer",
                              color: "red",
                              fontSize: "12px",
                            }}
                            onClick={() => clearLink(index)}
                          >
                            Delete
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table upload Link End */}
            </Div>
            {/* Table 3 End */}
          </Div>
          {/* Element 2 End */}
        </Div>
      </Div>
    </Div>
  );
};

export default ArsipDocument;
