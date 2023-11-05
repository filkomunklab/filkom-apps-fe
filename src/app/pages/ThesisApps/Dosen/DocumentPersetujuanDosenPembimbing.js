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
  // Advisor setuju dan tolak
  const [isSetujuClicked, setIsSetujuClicked] = useState(false);
  const [isTolakClicked, setIsTolakClicked] = useState(false);
  const [isSetujuDisabled, setIsSetujuDisabled] = useState(false);
  const [isTolakDisabled, setIsTolakDisabled] = useState(false);

  // coAdvisor1 setuju dan tolak
  const [isSetujuClickedCoAdvisor1, setIsSetujuClickedCoAdvisor1] =
    useState(false);
  const [isTolakClickedCoAdvisor1, setIsTolakClickedCoAdvisor1] =
    useState(false);
  const [isSetujuDisabledCoAdvisor1, setIsSetujuDisabledCoAdvisor1] =
    useState(false);
  const [isTolakDisabledCoAdvisor1, setIsTolakDisabledCoAdvisor1] =
    useState(false);

  // coAdvisor12 setuju dan tolak
  const [isSetujuClickedCoAdvisor2, setIsSetujuClickedCoAdvisor2] =
    useState(false);
  const [isTolakClickedCoAdvisor2, setIsTolakClickedCoAdvisor2] =
    useState(false);
  const [isSetujuDisabledCoAdvisor2, setIsSetujuDisabledCoAdvisor2] =
    useState(false);
  const [isTolakDisabledCoAdvisor2, setIsTolakDisabledCoAdvisor2] =
    useState(false);

  // menggubah statu Advisor dan co_advisor setuju atau tolak
  const [advisorStatus, setAdvisorStatus] = useState([]);
  const [coAdvisor1Status, setCoAdvisor1Status] = useState([]);
  const [coAdvisor2Status, setCoAdvisor2Status] = useState([]);
  const [selectedRevisiProposalIndex, setSelectedRevisiProposalIndex] =
    useState(null);
  const [
    selectedRevisiProposalIndexCoAdvisor1,
    setSelectedRevisiProposalIndexCoAdvisor1,
  ] = useState(null);
  const [
    selectedRevisiProposalIndexCoAdvisor2,
    setSelectedRevisiProposalIndexCoAdvisor2,
  ] = useState(null);

  // popup konfirmasi setuju dan tolak advisor
  const [setujuConfirmationDialogOpen, setSetujuConfirmationDialogOpen] =
    useState(false);
  const [tolakConfirmationDialogOpen, setTolakConfirmationDialogOpen] =
    useState(false);
  const [selectedActionIndex, setSelectedActionIndex] = useState(null);

  // popup konfirmasi setuju dan tolak Coadvisor 1
  const [
    setujuConfirmationDialogOpenCoAdvisor1,
    setSetujuConfirmationDialogOpenCoAdvisor1,
  ] = useState(false);
  const [
    tolakConfirmationDialogOpenCoAdvisor1,
    setTolakConfirmationDialogOpenCoAdvisor1,
  ] = useState(false);
  const [selectedActionIndexCoAdvisor1, setSelectedActionIndexCoAdvisor1] =
    useState(null);

  // popup konfirmasi setuju dan tolak Coadvisor 2
  const [
    setujuConfirmationDialogOpenCoAdvisor2,
    setSetujuConfirmationDialogOpenCoAdvisor2,
  ] = useState(false);
  const [
    tolakConfirmationDialogOpenCoAdvisor2,
    setTolakConfirmationDialogOpenCoAdvisor2,
  ] = useState(false);
  const [selectedActionIndexCoAdvisor2, setSelectedActionIndexCoAdvisor2] =
    useState(null);

  //status setuju dan tolak Advisor
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

  //status setuju dan tolak CoAdvisor 1
  const handleActionClickCoAdvisor1 = (index, status) => {
    // Memeriksa apakah tindakan tersebut sudah dilakukan
    if (
      (status === "Setuju" && isSetujuClickedCoAdvisor1) ||
      (status === "Tolak" && isTolakClickedCoAdvisor1)
    ) {
      // Jika sudah dilakukan, tidak melakukan apa-apa
      return;
    }

    setSelectedRevisiProposalIndexCoAdvisor1(index);
    setCoAdvisor1Status(status);

    if (status === "Setuju") {
      setIsSetujuClickedCoAdvisor1(true);
    } else if (status === "Tolak") {
      setIsTolakClickedCoAdvisor1(true);
    }
  };

  //status setuju dan tolak CoAdvisor 2
  const handleActionClickCoAdvisor2 = (index, status) => {
    // Memeriksa apakah tindakan tersebut sudah dilakukan
    if (
      (status === "Setuju" && isSetujuClickedCoAdvisor2) ||
      (status === "Tolak" && isTolakClickedCoAdvisor2)
    ) {
      // Jika sudah dilakukan, tidak melakukan apa-apa
      return;
    }

    setSelectedRevisiProposalIndexCoAdvisor2(index);
    setCoAdvisor2Status(status);

    if (status === "Setuju") {
      setIsSetujuClickedCoAdvisor2(true);
    } else if (status === "Tolak") {
      setIsTolakClickedCoAdvisor2(true);
    }
  };

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

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  console.log(role);

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
          {/* Menu Horizontal Dosen Start */}
          <Div
            hidden={
              role.includes(
                "DOSEN",
                "ADVISOR",
                "CO_ADVISOR",
                "KETUA_PANALIS",
                "ANGGOTA_PANALIS",
                "KAPRODI",
                "DEKAN"
              )
                ? false
                : true
            }
            sx={{ width: "100%" }}
          >
            <MenuPenguji />
          </Div>
          {/* Menu horizontal Dosen End */}

          {/* Menu Horizontal Sekertaris Start */}
          <Div
            hidden={role.includes("SEKERTARIS") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuSekertaris />
          </Div>
          {/* Menu horizontal Sekertaris End */}
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
                      {/* status Advisor */}
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
                      {/* status CoAdvisor1 */}
                      <TableCell>
                        {coAdvisor1Status === "Setuju" ? (
                          <Chip
                            size="small"
                            label="Diterima"
                            sx={{
                              background: "rgba(0, 255, 0, 0.10)",
                              color: "#008000",
                              fontSize: "10px",
                            }}
                          />
                        ) : coAdvisor1Status === "Tolak" ? (
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
                      {/* Status CoAdvisor2 */}
                      <TableCell>
                        {coAdvisor2Status === "Setuju" ? (
                          <Chip
                            size="small"
                            label="Diterima"
                            sx={{
                              background: "rgba(0, 255, 0, 0.10)",
                              color: "#008000",
                              fontSize: "10px",
                            }}
                          />
                        ) : coAdvisor2Status === "Tolak" ? (
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
                        <Div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              textDecoration: "none",
                              cursor: "pointer",
                              color: "blue",
                              fontSize: "12px",
                              padding: "5px 0",
                            }}
                          >
                            View
                          </span>
                          {/* Button untuk Advisor */}
                          <Div
                            hidden={role.includes("DOSEN") ? false : true}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            {isSetujuClicked || isTolakClicked ? (
                              <span
                                style={{
                                  textDecoration: "none",
                                  cursor: "not-allowed",
                                  color: "gray",
                                  fontSize: "12px",
                                  borderTop: "1px solid #000",
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
                                  borderTop: "1px solid #000",
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
                          {/* button untuk CoAdvisor1 */}
                          {/* <Div
                            hidden={role.includes("CO_ADVISOR1") ? false : true} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                          >
                            {isSetujuClickedCoAdvisor1 ||
                            isTolakClickedCoAdvisor1 ? (
                              <span
                                style={{
                                  textDecoration: "none",
                                  cursor: "not-allowed",
                                  color: "gray",
                                  fontSize: "12px",
                                  borderTop: "1px solid #000",
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
                                  borderTop: "1px solid #000",
                                  borderBottom: "1px solid #000",
                                  padding: "5px 0",
                                }}
                                onClick={() => {
                                  setSelectedActionIndexCoAdvisor1(1);
                                  setSetujuConfirmationDialogOpenCoAdvisor1(
                                    true
                                  );
                                }}
                              >
                                Setuju
                              </span>
                            )}
                            {isSetujuClickedCoAdvisor1 ||
                            isTolakClickedCoAdvisor1 ? (
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
                                  setSelectedActionIndexCoAdvisor1(2);
                                  setTolakConfirmationDialogOpenCoAdvisor1(
                                    true
                                  );
                                }}
                              >
                                Tolak
                              </span>
                            )}
                          </Div> */}
                          {/* button untuk CoAdvisor2 */}
                          {/* <Div
                            hidden={role.includes("CO_ADVISOR2") ? false : true}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            {isSetujuClickedCoAdvisor2 ||
                            isTolakClickedCoAdvisor2 ? (
                              <span
                                style={{
                                  textDecoration: "none",
                                  cursor: "not-allowed",
                                  color: "gray",
                                  fontSize: "12px",
                                  borderTop: "1px solid #000",
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
                                  borderTop: "1px solid #000",
                                  borderBottom: "1px solid #000",
                                  padding: "5px 0",
                                }}
                                onClick={() => {
                                  setSelectedActionIndexCoAdvisor2(1);
                                  setSetujuConfirmationDialogOpenCoAdvisor2(
                                    true
                                  );
                                }}
                              >
                                Setuju
                              </span>
                            )}
                            {isSetujuClickedCoAdvisor2 ||
                            isTolakClickedCoAdvisor2 ? (
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
                                  setSelectedActionIndexCoAdvisor2(2);
                                  setTolakConfirmationDialogOpenCoAdvisor2(
                                    true
                                  );
                                }}
                              >
                                Tolak
                              </span>
                            )}
                          </Div> */}
                        </Div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload Revisi Proposal End*/}

              {/* popup konfirmasi setuju Advisor */}
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
              {/* popup konfirmasi tolak Advisor*/}
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

              {/* popup konfirmasi setuju CoAdvisor1 */}
              <Dialog
                open={setujuConfirmationDialogOpenCoAdvisor1}
                onClose={() => setSetujuConfirmationDialogOpenCoAdvisor1(false)}
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
                    onClick={() =>
                      setSetujuConfirmationDialogOpenCoAdvisor1(false)
                    }
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
                      setSetujuConfirmationDialogOpenCoAdvisor1(false);
                      handleActionClickCoAdvisor1(
                        selectedActionIndex,
                        "Setuju"
                      );
                      setIsSetujuDisabledCoAdvisor1(true);
                    }}
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    color="primary"
                  >
                    Disetuju
                  </Button>
                </DialogActions>
              </Dialog>
              {/* popup konfirmasi tolak CoAdvisor1 */}
              <Dialog
                open={tolakConfirmationDialogOpenCoAdvisor1}
                onClose={() => setTolakConfirmationDialogOpenCoAdvisor1(false)}
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
                    onClick={() =>
                      setTolakConfirmationDialogOpenCoAdvisor1(false)
                    }
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
                      setTolakConfirmationDialogOpenCoAdvisor1(false);
                      handleActionClickCoAdvisor1(selectedActionIndex, "Tolak");
                      setIsTolakDisabledCoAdvisor1(true);
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

              {/* popup konfirmasi setuju CoAdvisor 2 */}
              <Dialog
                open={setujuConfirmationDialogOpenCoAdvisor2}
                onClose={() => setSetujuConfirmationDialogOpenCoAdvisor2(false)}
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
                    onClick={() =>
                      setSetujuConfirmationDialogOpenCoAdvisor2(false)
                    }
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
                      setSetujuConfirmationDialogOpenCoAdvisor2(false);
                      handleActionClickCoAdvisor2(
                        selectedActionIndex,
                        "Setuju"
                      );
                      setIsSetujuDisabledCoAdvisor2(true);
                    }}
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    color="primary"
                  >
                    Disetuju
                  </Button>
                </DialogActions>
              </Dialog>
              {/* popup konfirmasi tolak CoAdvisor 2 */}
              <Dialog
                open={tolakConfirmationDialogOpenCoAdvisor2}
                onClose={() => setTolakConfirmationDialogOpenCoAdvisor2(false)}
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
                    onClick={() =>
                      setTolakConfirmationDialogOpenCoAdvisor2(false)
                    }
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
                      setTolakConfirmationDialogOpenCoAdvisor2(false);
                      handleActionClickCoAdvisor2(selectedActionIndex, "Tolak");
                      setIsTolakDisabledCoAdvisor2(true);
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
