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
import React, { useState } from "react";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import WarningIcon from "@mui/icons-material/Warning";
import MenuSekertaris from "app/shared/MenuHorizontal/MenuSekertaris";
import MenuPenguji from "app/shared/MenuHorizontal/MenuPenguji";

const DocumentPersetujuanDosenPembimbing = () => {
  const [isSetujuClicked, setIsSetujuClicked] = useState(false);
  const [isTolakClicked, setIsTolakClicked] = useState(false);

  const [isSetujuDisabled, setIsSetujuDisabled] = useState(false);
  const [isTolakDisabled, setIsTolakDisabled] = useState(false);

  // menggubah statu Advisor setuju atau tolak
  const [advisorStatus, setAdvisorStatus] = useState([]);
  const [selectedRevisiProposalIndex, setSelectedRevisiProposalIndex] =
    useState(null);

  // popup konfirmasi setuju dan tolak
  const [setujuConfirmationDialogOpen, setSetujuConfirmationDialogOpen] =
    useState(false);
  const [tolakConfirmationDialogOpen, setTolakConfirmationDialogOpen] =
    useState(false);
  const [selectedActionIndex, setSelectedActionIndex] = useState(null);

  const handleActionClick = (index, status) => {
    // Memeriksa apakah tindakan tersebut sudah dilakukan
    if (
      (status === "Setuju" && isSetujuClicked) ||
      (status === "Tolak" && isTolakClicked)
    ) {
      // Jika sudah dilakukan, tidak melakukan apa-apa
      return;
    }

    setSelectedRevisiProposalIndex(index);
    setAdvisorStatus(status);

    if (status === "Setuju") {
      setIsSetujuClicked(true);
    } else if (status === "Tolak") {
      setIsTolakClicked(true);
    }
  };
  // Fungsi untuk menghasilkan data palsu
  const generateTableData = () => {
    const data = [
      {
        nomor: 1,
        namaFile: "Pengembangan sistem informasi di fakultasi ilmu komputer",
        tanggal: "2023-10-25",
        ukuran: "214134 kb",
        advisor: "Diterima",
        coAdvisor1: "Diterima",
        coAdvisor2: "Diterima",
      },
    ];
    return data;
  };

  // Fungsi komponen untuk membuat isi dari TableBody
  const tableData = generateTableData();

  const generateBuktiPembayaranData = () => {
    const data = [
      {
        nomor: 1,
        namaFile: "BuktiPembayaran.pdf",
        tanggal: "2023-10-25",
        ukuran: "223423423 kb",
      },
    ];
    return data;
  };

  const buktiPembayaranData = generateBuktiPembayaranData();

  const generateCekPlagiatData = () => {
    const data = [
      {
        nomor: 1,
        namaFile: "CekPlagiat.pdf",
        tanggal: "2023-10-25",
        ukuran: "223423423 kb",
      },
    ];
    return data;
  };

  const cekPlagiatData = generateCekPlagiatData();

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
          Dokumen Proposal
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
            <MenuPenguji />
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
              Dokumen Proposal
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
              {/* Table Upload Revisi Proposal Start*/}
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
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        SISTEM INFORMASI PELAYANAN PUSKESMAS TALAWAAN BERBASIS
                        WEB-APPLICATION
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        08/09/2023
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        5.6321 bytes
                      </TableCell>
                      <TableCell>
                        {advisorStatus === "Setuju" ? (
                          <Chip
                            size="small"
                            label="Diterima"
                            sx={{
                              background: "rgba(0, 255, 0, 0.10)",
                              color: "#008000",
                              fontSize: "10px",
                            }}
                          />
                        ) : advisorStatus === "Tolak" ? (
                          <Chip
                            size="small"
                            label="Ditolak"
                            sx={{
                              background: "rgba(255, 0, 0, 0.10)",
                              color: "#FF0000",
                              fontSize: "10px",
                            }}
                          />
                        ) : (
                          <Chip
                            size="small"
                            label="Menunggu"
                            sx={{
                              background: "rgba(255, 204, 0, 0.10)",
                              color: "#985211",
                              fontSize: "10px",
                            }}
                          />
                        )}
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
                        <Div sx={{ display: "flex", flexDirection: "column" }}>
                          <span
                            style={{
                              textDecoration: "none",
                              cursor: "pointer",
                              color: "blue",
                              fontSize: "12px",
                              borderBottom: "1px solid #000",
                              padding: "5px 0",
                            }}
                          >
                            View
                          </span>
                          {isSetujuClicked || isTolakClicked ? (
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "not-allowed",
                                color: "gray",
                                fontSize: "12px",
                                borderBottom: "1px solid #000",
                                padding: "5px 0",
                              }}
                            >
                              Setuju
                            </span>
                          ) : (
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "green",
                                fontSize: "12px",
                                borderBottom: "1px solid #000",
                                padding: "5px 0",
                              }}
                              onClick={() => {
                                setSelectedActionIndex(1);
                                setSetujuConfirmationDialogOpen(true);
                              }}
                            >
                              Setuju
                            </span>
                          )}
                          {isSetujuClicked || isTolakClicked ? (
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "not-allowed",
                                color: "gray",
                                fontSize: "12px",
                                marginTop: "5px",
                              }}
                            >
                              Tolak
                            </span>
                          ) : (
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "red",
                                fontSize: "12px",
                                marginTop: "5px",
                              }}
                              onClick={() => {
                                setSelectedActionIndex(2);
                                setTolakConfirmationDialogOpen(true);
                              }}
                            >
                              Tolak
                            </span>
                          )}
                        </Div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload Revisi Proposal End*/}

              {/* popup konfirmasi setuju */}
              <Dialog
                open={setujuConfirmationDialogOpen}
                onClose={() => setSetujuConfirmationDialogOpen(false)}
                maxWidth="xs"
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
                  <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
                    Menyetujui Revisi
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  Apakah Anda yakin ingin menyetujui tindakan ini?
                </DialogContent>
                <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <Button
                    onClick={() => setSetujuConfirmationDialogOpen(false)}
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
                      setSetujuConfirmationDialogOpen(false);
                      handleActionClick(selectedActionIndex, "Setuju");
                      setIsSetujuDisabled(true);
                    }}
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    color="primary"
                  >
                    Disetuju
                  </Button>
                </DialogActions>
              </Dialog>

              {/* popup konfirmasi tolak */}
              <Dialog
                open={tolakConfirmationDialogOpen}
                onClose={() => setTolakConfirmationDialogOpen(false)}
                maxWidth="xs"
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
                    Menolak Revisi
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  Apakah Anda yakin ingin menolak dokumen ini?
                </DialogContent>
                <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <Button
                    onClick={() => setTolakConfirmationDialogOpen(false)}
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
                      setTolakConfirmationDialogOpen(false);
                      handleActionClick(selectedActionIndex, "Tolak");
                      setIsTolakDisabled(true);
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
                    Ditolak
                  </Button>
                </DialogActions>
              </Dialog>
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
              Bukti Pembayaran
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
              {/* Table Upload Payment Start*/}
              <TableContainer sx={{ marginBottom: "25px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5" }}>
                    <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
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
                        sx={{ fontSize: "12px", padding: "11px", width: "5%" }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {buktiPembayaranData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.nomor}</TableCell>
                        <TableCell>{row.namaFile}</TableCell>
                        <TableCell>{row.tanggal}</TableCell>
                        <TableCell>{row.ukuran}</TableCell>
                        <TableCell>
                          <span
                            style={{
                              textDecoration: "none",
                              cursor: "pointer",
                              color: "blue",
                              fontSize: "12px",
                              alignItems: "center",
                            }}
                          >
                            View
                          </span>
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
              Hasil Cek plagiat
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
                        sx={{ fontSize: "12px", padding: "11px", width: "5%" }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cekPlagiatData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.nomor}</TableCell>
                        <TableCell>{row.namaFile}</TableCell>
                        <TableCell>{row.tanggal}</TableCell>
                        <TableCell>{row.ukuran}</TableCell>
                        <TableCell>
                          <span
                            style={{
                              textDecoration: "none",
                              cursor: "pointer",
                              color: "blue",
                              fontSize: "12px",
                              alignItems: "center",
                            }}
                          >
                            View
                          </span>
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

export default DocumentPersetujuanDosenPembimbing;
