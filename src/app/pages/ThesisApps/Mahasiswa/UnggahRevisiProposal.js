import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
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
import { pdfjs } from "react-pdf";
import WarningIcon from "@mui/icons-material/Warning";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import AttachmentIcon from "@mui/icons-material/Attachment";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// View Document Proposal
const PDFViewerRevisiProposal = ({ dokumenRevisi }) => {
  const viewPDFRevisiProposal = () => {
    // Buat URL objek untuk file PDF
    const pdfURL = URL.createObjectURL(dokumenRevisi);

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span sx={{ fontSize: "10px" }} onClick={viewPDFRevisiProposal}>
        View
      </span>
    </div>
  );
};

const UploadRevisiProposal = () => {
  // state - menyimpan request data
  const [dokumenRevisi, setDokumenRevisi] = useState();
  const [perubahan, setPerubahan] = useState();

  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);
  const [proposalId, setProposalId] = useState(null);

  const role = useParams().role;
  console.log(role);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchDokumenProposalData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/proposal/proposal-revision-document/${proposalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDokumenRevisi(response.data.data);
        console.log(
          "Request Get dokumen revisi proposal: ",
          response.data.data
        );
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil dokumen revisi proposal:",
          error
        );
      }
    };
    const fetchPerubahanData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/proposal/proposal-changes/${proposalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setPerubahan(response.data.data);
        console.log("Request Get perubahan proposal: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil perubahan proposal:",
          error
        );
      }
    };
    fetchDokumenProposalData();
    fetchPerubahanData();
  }, [token, proposalId]);

  // state untuk Upload RevisiProposal
  const [RevisiProposalUploadedFiles, setRevisiProposalUploadedFiles] =
    useState([]);
  const [selectedRevisiProposalFileName, setSelectedRevisiProposalFileName] =
    useState("");
  const [RevisiProposalFile, setRevisiProposalFile] = useState(null);

  // popup delete konfirmasi
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(-1);

  const onRevisiProposalFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (RevisiProposalUploadedFiles.length === 0) {
        setRevisiProposalFile(file);
        setSelectedRevisiProposalFileName(file.name);

        const newFileData = {
          name: file.name,
          date: new Date().toLocaleDateString(),
          size: file.size,
          advisor: "",
          coAdvisor1: "",
          coAdvisor2: "",
        };

        setRevisiProposalUploadedFiles([newFileData]);
      }
    }
  };

  // fungsi untuk menghapus file Proposal
  const handleDeleteRevisiProposalFile = (index) => {
    setDeletingIndex(index);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedFiles = [...RevisiProposalUploadedFiles];
    updatedFiles.splice(deletingIndex, 1);
    setRevisiProposalUploadedFiles(updatedFiles);
    setRevisiProposalFile(null);
    setSelectedRevisiProposalFileName("");
    setDeleteConfirmationOpen(false);
    setDeletingIndex(-1);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeletingIndex(-1);
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
          Unggah Revisi Proposal
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
              Perubahan
            </Typography>

            {/* View PerubahanStart*/}
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
                  <Typography>{perubahan?.changes_by_chairman}</Typography>
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
                  <Typography>{perubahan?.changes_by_member}</Typography>
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
                  <Typography>{perubahan?.changes_by_advisor}</Typography>
                </Div>
              </Div>
              {/* Perubahan Co-Advisor 1*/}
              {perubahan?.changes_by_co_advisor1 !== null && (
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
                    <Typography variant="subtitle2">Co-Advisor 1</Typography>
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
                    <Typography>{perubahan?.changes_by_co_advisor1}</Typography>
                  </Div>
                </Div>
              )}
              {/* Perubahan Co-Advisor 2*/}
              {perubahan?.changes_by_co_advisor2 !== null && (
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
                    <Typography variant="subtitle2">Co-Advisor 2</Typography>
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
                    <Typography>{perubahan?.changes_by_co_advisor2}</Typography>
                  </Div>
                </Div>
              )}
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
              {/* Upload Revisi Proposal*/}
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
                    onChange={onRevisiProposalFileChange}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* Upload Revisi Proposal End */}

              {/* Table Upload Revisi Proposal Start*/}
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
                        Ketua Panelis
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "15%" }}
                      >
                        Anggota Panelis
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "15%" }}
                      >
                        Advisor
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
                    {dokumenRevisi && (
                      <TableRow key={dokumenRevisi.id}>
                        <TableCell>1</TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {dokumenRevisi.file_name_revision}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {dokumenRevisi.upload_date_revision}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {dokumenRevisi.file_size_revision}
                        </TableCell>
                        <TableCell>
                          {dokumenRevisi.is_revision_approve_by_panelist_chairman ===
                          "Waiting" ? (
                            <Chip
                              size="small"
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : dokumenRevisi.is_revision_approve_by_panelist_chairman ===
                            "Approve" ? (
                            <Chip
                              size="small"
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : dokumenRevisi.is_revision_approve_by_panelist_chairman ===
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
                            dokumenRevisi.is_revision_approve_by_panelist_chairman
                          )}
                        </TableCell>
                        <TableCell>
                          {dokumenRevisi.is_revision_approve_by_panelist_member ===
                          "Waiting" ? (
                            <Chip
                              size="small"
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : dokumenRevisi.is_revision_approve_by_panelist_member ===
                            "Approve" ? (
                            <Chip
                              size="small"
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : dokumenRevisi.is_revision_approve_by_panelist_member ===
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
                            dokumenRevisi.is_revision_approve_by_panelist_member
                          )}
                        </TableCell>
                        <TableCell>
                          {dokumenRevisi.is_revision_approve_by_advisor ===
                          "Waiting" ? (
                            <Chip
                              size="small"
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : dokumenRevisi.is_revision_approve_by_advisor ===
                            "Approve" ? (
                            <Chip
                              size="small"
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : dokumenRevisi.is_revision_approve_by_advisor ===
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
                            dokumenRevisi.is_revision_approve_by_advisor
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
                              {dokumenRevisi && (
                                <PDFViewerRevisiProposal
                                  dokumenRevisi={dokumenRevisi}
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
                              onClick={() => handleDeleteRevisiProposalFile}
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
              {/* Table Upload Revisi Proposal End*/}
            </Div>
            {/* Table 2 End */}
            <Dialog
              open={deleteConfirmationOpen}
              onClose={handleCancelDelete}
              fullWidth
              maxWidth="sm"
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
                <Typography>
                  Apakah Anda yakin ingin menghapus dokumen ini?
                </Typography>
              </DialogContent>
              <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                <Button
                  onClick={handleCancelDelete}
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
                  onClick={handleConfirmDelete}
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
          {/* Element 2 End */}
        </Div>
      </Div>
    </Div>
  );
};

export default UploadRevisiProposal;
