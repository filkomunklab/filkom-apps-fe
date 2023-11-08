import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import WarningIcon from "@mui/icons-material/Warning";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import AttachmentIcon from "@mui/icons-material/Attachment";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// View Document Skripsi
const PDFViewerRevisiSkripsi = ({ RevisiSkripsiFile }) => {
  const viewPDFRevisiSkripsi = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = URL.createObjectURL(RevisiSkripsiFile);

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span sx={{ fontSize: "10px" }} onClick={viewPDFRevisiSkripsi}>
        View
      </span>
    </div>
  );
};

const UploadRevisiSkripsi = () => {
  // state untuk Upload Revisi Skripsi
  const [RevisiSkripsiUploadedFiles, setRevisiSkripsiUploadedFiles] = useState(
    []
  );
  const [selectedRevisiSkripsiFileName, setSelectedRevisiSkripsiFileName] =
    useState("");
  const [RevisiSkripsiFile, setRevisiSkripsiFile] = useState(null);

  // popup delete konfirmasi
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const onRevisiSkripsiFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (RevisiSkripsiUploadedFiles.length === 0) {
        setRevisiSkripsiFile(file);
        setSelectedRevisiSkripsiFileName(file.name);

        const newFileData = {
          name: file.name,
          date: new Date().toLocaleDateString(),
          size: file.size,
          advisor: "",
          coAdvisor1: "",
          coAdvisor2: "",
        };

        setRevisiSkripsiUploadedFiles([newFileData]);
      }
    }
  };

  // fungsi untuk menghapus file Proposal
  const handleDeleteRevisiSkripsiFile = (index) => {
    const updatedFiles = [...RevisiSkripsiUploadedFiles];
    updatedFiles.splice(index, 1);
    setRevisiSkripsiUploadedFiles(updatedFiles);
    setRevisiSkripsiFile(null);
    setSelectedRevisiSkripsiFileName("");
  };

  const openConfirmDialog = (index) => {
    setDeletingIndex(index);
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setDeletingIndex(null);
    setConfirmDialogOpen(false);
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
          Unggah Revisi Skripsi
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
          <Riwayatlog />
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
          <Div sx={{ width: "100%" }}>
            <MenuMahasiswa />
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
              Perubahan
            </Typography>

            {/* View Perubahan Start*/}
            <Div
              sx={{
                display: "flex",
                width: "100%",
                padding: "0 25px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "25px",
              }}
            >
              {/* Perubahan Ketua Penelis */}
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    background: "rgba(26, 56, 96, 0.10)",
                    padding: "14px 16px",
                    borderRadius: "6px",
                  }}
                >
                  <Typography variant="subtitle2">Ketua Penelis</Typography>
                </Div>
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    padding: "14px 16px",
                    border: "2px solid rgba(26, 56, 96, 0.10)",
                    borderRadius: "0 0 6px 6px",
                  }}
                >
                  <Typography>
                    1.Ubah Judul. 2.Ganti Metode. 3.Ganti MongoDB menjadi
                    PostgreSQL. 4. Perbaiki Typo penulisan di Bab 1 dan 2.
                  </Typography>
                </Div>
              </Div>
              {/* Perubahan Anggota Penelis */}
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    background: "rgba(26, 56, 96, 0.10)",
                    padding: "14px 16px",
                    borderRadius: "6px",
                  }}
                >
                  <Typography variant="subtitle2">Anggota Penelis</Typography>
                </Div>
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    padding: "14px 16px",
                    border: "2px solid rgba(26, 56, 96, 0.10)",
                    borderRadius: "0 0 6px 6px",
                  }}
                >
                  <Typography>
                    Tambahkan perbandingan metode-metode yang digunakan.
                    Menambahkan metode Perbaiki font dan ukuran menggunakan
                    standar kampus
                  </Typography>
                </Div>
              </Div>
              {/* Perubahan Advisor */}
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    background: "rgba(26, 56, 96, 0.10)",
                    padding: "14px 16px",
                    borderRadius: "6px",
                  }}
                >
                  <Typography variant="subtitle2">Advisor</Typography>
                </Div>
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    padding: "14px 16px",
                    border: "2px solid rgba(26, 56, 96, 0.10)",
                    borderRadius: "0 0 6px 6px",
                  }}
                >
                  <Typography>
                    Tambahkan sebuah fitur-fitur. Tambahkan user Mahasiswa.
                  </Typography>
                </Div>
              </Div>
              {/* Perubahan Co-Advisor */}
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    background: "rgba(26, 56, 96, 0.10)",
                    padding: "14px 16px",
                    borderRadius: "6px",
                  }}
                >
                  <Typography variant="subtitle2">Co-Advisor</Typography>
                </Div>
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    padding: "14px 16px",
                    border: "2px solid rgba(26, 56, 96, 0.10)",
                    borderRadius: "0 0 6px 6px",
                  }}
                >
                  <Typography>
                    Tambahkan sebuah fitur-fitur. Tambahkan user Mahasiswa.
                  </Typography>
                </Div>
              </Div>
            </Div>
            {/* View Perubahan End */}
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
              Unggah Revisi Proposal
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
              {/* file upload Revisi Skripsi */}
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
                    onChange={onRevisiSkripsiFileChange}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end for Revisi Pripsi */}

              {/* Table Upload Revisi Skripsi Start*/}
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
                    {RevisiSkripsiUploadedFiles.map((file, index) => (
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
                              {RevisiSkripsiFile && (
                                <PDFViewerRevisiSkripsi
                                  RevisiSkripsiFile={RevisiSkripsiFile}
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
                              onClick={() => openConfirmDialog(index)}
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
              {/* Table UplRevisi Skripsi End*/}
            </Div>
            {/* Table 2 End */}
          </Div>
          {/* Element 2 End */}
        </Div>
        <Dialog
          open={confirmDialogOpen}
          onClose={closeConfirmDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              alignSelf: "stretch",
            }}
          >
            <WarningIcon fontSize="small" sx={{ marginRight: "6px" }} />
            <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
              Menghapus Dokumen
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Apakah Anda yakin ingin menghapus file ini?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
            <Button
              onClick={closeConfirmDialog}
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
              onClick={() => {
                handleDeleteRevisiSkripsiFile(deletingIndex);
                closeConfirmDialog();
              }}
              sx={{
                textTransform: "none",
                background: "#FC0",
                color: "#263445",
                "&:hover": {
                  color: "#FC0",
                },
              }}
            >
              Hapus
            </Button>
          </DialogActions>
        </Dialog>
      </Div>
    </Div>
  );
};

export default UploadRevisiSkripsi;
