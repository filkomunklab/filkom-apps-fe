import React, { useState } from "react";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  DialogActions,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuPenguji from "app/shared/MenuHorizontal/MenuPenguji";

const PengajuanJudulDosenSkripsi = () => {
  const [confirmTolakOpen, setConfirmTolakOpen] = useState(false); // State untuk dialog konfirmasi tolak
  const [confirmTerimaOpen, setConfirmTerimaOpen] = useState(false); // State untuk dialog konfirmasi terima

  const [
    gantiAdvisorCoAdvisorButtonVisible,
    setGantiAdvisorCoAdvisorButtonVisible,
  ] = useState(true);

  const [tolakTerimaButtonsVisible, setTolakTerimaButtonsVisible] =
    useState(true);

  const handleTolakClick = () => {
    // Menampilkan dialog konfirmasi tolak
    setConfirmTolakOpen(true);
  };

  const handleTerimaClick = () => {
    // Menampilkan dialog konfirmasi terima
    setConfirmTerimaOpen(true);
  };

  const handleTolak = () => {
    setTolakTerimaButtonsVisible(false);
    setGantiAdvisorCoAdvisorButtonVisible(false);
    // Di sini Anda bisa menambahkan logika untuk menolak pengajuan setelah konfirmasi
    // Setelah pengajuan ditolak, update status menjadi "Ditolak"
    setStatus("Ditolak");

    // Tutup dialog konfirmasi
    setConfirmTolakOpen(false);
  };

  const handleTerima = () => {
    setTolakTerimaButtonsVisible(false);
    setGantiAdvisorCoAdvisorButtonVisible(false);
    // Di sini Anda bisa menambahkan logika untuk menerima pengajuan setelah konfirmasi
    // Setelah pengajuan diterima, update status menjadi "Diterima"
    setStatus("Diterima");

    // Tutup dialog konfirmasi
    setConfirmTerimaOpen(false);
  };

  const [status, setStatus] = useState("Menunggu"); // Tambahkan state untuk status

  const handleAdvisorChange = (e) => {
    setAdvisor(e.target.value);
  };

  const handleCoAdvisor1Change = (e) => {
    setCoAdvisor1(e.target.value);
  };

  const handleCoAdvisor2Change = (e) => {
    setCoAdvisor2(e.target.value);
  };

  // menyembunyikan status
  const [isStatusVisible] = useState(true);

  // State untuk mengelola berbagai data termasuk judul, latar belakang, dll.
  const [judul] = useState(
    "Pengembangan Sistem Informasi Skripsi di Fakultas Ilmu Komputer Universitas Klabat"
  );

  const [openDialog, setOpenDialog] = useState(false);

  // State untuk mengelola pilihan advisor dan co-advisor
  const [advisor, setAdvisor] = useState("");
  const [coAdvisor1, setCoAdvisor1] = useState("");
  const [coAdvisor2, setCoAdvisor2] = useState("");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    // Di sini Anda dapat melakukan apa pun yang diperlukan untuk menyimpan perubahan advisor dan co-advisor.
    // Anda bisa menggunakan nilai dari state advisor, coAdvisor1, dan coAdvisor2 untuk melakukan penyimpanan.

    // Setelah Anda menyimpan perubahan, Anda bisa menutup dialog.
    handleClose();
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
        <Typography variant="subtitle2" sx={{ fontSize: "24px" }}>
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
            <Div sx={{ marginBottom: "25px" }}>
              <Typography variant="subtitle2">Status</Typography>
              <Chip
                label={status} // Gunakan nilai status yang diperbarui
                sx={{
                  background:
                    status === "Menunggu"
                      ? "rgba(255, 204, 0, 0.10)"
                      : status === "Ditolak"
                      ? "rgba(226, 29, 18, 0.10)"
                      : "rgba(21, 131, 67, 0.1)",
                  color:
                    status === "Menunggu"
                      ? "#985211"
                      : status === "Diterima"
                      ? "rgba(10, 118, 55, 1)"
                      : "#CA150C",
                  height: "25px",
                }}
              />
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
                variant="subtitle2"
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
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Geovalga Fransiscus Lim</TableCell>
                      <TableCell>105021910051</TableCell>
                      <TableCell>Informatika</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>Frances Rully Yong</TableCell>
                      <TableCell>105021910051</TableCell>
                      <TableCell>Informatika</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Kelompok mahasiswa End */}
              {/* Judul Start */}
              <Div sx={{ marginBottom: "25px" }}>
                <Typography variant="subtitle2">Judul</Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>{judul}</Typography>
              </Div>
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
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Judul End */}
              {/* Select Dosen Pembimbing Start */}
              <Div
                sx={{
                  display: "flex",
                  height: "62px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "15px",
                  alignSelf: "stretch",
                  marginBottom: "20px",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "40px",
                  }}
                >
                  <Div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    {/* Menampilkan Advisor */}
                    <Typography variant="subtitle2">Advisor</Typography>
                    <Typography>{advisor}</Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    {/* Menampilkan Co-advisor 1 */}
                    <Typography variant="subtitle2">Co-Advisor 1</Typography>
                    <Typography>{coAdvisor1}</Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    {/* Menampilkan co-advisor 2 */}
                    <Typography variant="subtitle2">Co-Advisor 2</Typography>
                    <Typography>{coAdvisor2}</Typography>
                  </Div>
                </Div>
              </Div>
              {/* Select Dosen Pembimbing End */}

              {/* Button Ganti Dosen Pembimbing Start */}
              {gantiAdvisorCoAdvisorButtonVisible && (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none", marginBottom: "25px" }}
                  onClick={handleClickOpen}
                >
                  <BorderColorIcon fontSize="small" />
                  Ganti Advisor dan Co-Advisor
                </Button>
              )}
              {/* Button GAnti Dosen Pembimbing End */}

              {/* Radio Button Start */}
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography component="div">
                  Apakah Anda sudah melakukan konsultasi dengan Advisor sebelum
                  mengajukan judul?
                </Typography>
                <Typography>Ya</Typography>
              </Div>
            </Div>
            {tolakTerimaButtonsVisible && (
              <Div
                sx={{
                  display: "flex",
                  padding: "12px 24px 12px 0px",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "12px",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  color="error"
                  onClick={handleTolakClick} // Menggunakan fungsi handleTolakClick saat tombol Tolak diklik
                >
                  Tolak
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  color="primary"
                  onClick={handleTerimaClick} // Menggunakan fungsi handleTerimaClick saat tombol Terima diklik
                >
                  Terima
                </Button>
              </Div>
            )}
          </Div>
        </Div>
        {/* Element 2 End */}
        {/* Dialog Select Dosen Pembimbing Start */}
        <Dialog
          open={openDialog}
          onClose={handleClose}
          fullWidth
          width="lg"
          sx={{ margin: "25px", gap: "2" }}
        >
          <DialogTitle
            sx={{
              background: "#F5F5F5",
              textAlign: "center",
            }}
          >
            Ganti Advisor dan Co-Advisor
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ margin: "25px 0 25px 0" }}>
              <InputLabel>Advisor</InputLabel>
              <Select
                label="Advisor"
                value={advisor}
                onChange={handleAdvisorChange}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={"Andrew T. Liem, MT, PhD"}>
                  Andrew T. Liem, MT, PhD
                </MenuItem>
                <MenuItem value={"Green Mandias, SKom, MCs"}>
                  Green Mandias, SKom, MCs
                </MenuItem>
                <MenuItem value={"Stenly R. Pungus, MT, PhD"}>
                  Stenly R. Pungus, MT, PhD
                </MenuItem>
                <MenuItem value={"Debby E. Sondakh, MT, PhD"}>
                  Debby E. Sondakh, MT, PhD
                </MenuItem>
                <MenuItem value={"Ir. Edson Y. Putra, MKom"}>
                  Ir. Edson Y. Putra, MKom
                </MenuItem>
                <MenuItem value={"Green A. Sandag, SKom, MS"}>
                  Green A. Sandag, SKom, MS
                </MenuItem>
                <MenuItem value={"Jacquline M. S. Waworundeng, ST, MT"}>
                  Jacquline M. S. Waworundeng, ST, MT
                </MenuItem>
                <MenuItem value={"Jimmy H. Moedjahedy, SKom, MKom, MM"}>
                  Jimmy H. Moedjahedy, SKom, MKom, MM
                </MenuItem>
                <MenuItem value={"Joe Y. Mambu, BSIT, MCIS"}>
                  Joe Y. Mambu, BSIT, MCIS
                </MenuItem>
                <MenuItem value={"Lidya C. Laoh, SKom, MMSi"}>
                  Lidya C. Laoh, SKom, MMSi
                </MenuItem>
                <MenuItem value={"Marshal Tombeng,"}>Marshal Tombeng,</MenuItem>
                <MenuItem value={"Oktoverano H. Lengkong, SKom, MDs, MM"}>
                  Oktoverano H. Lengkong, SKom, MDs, MM
                </MenuItem>
                <MenuItem value={"Reymon Rotikan, SKom, MS, MM"}>
                  Reymon Rotikan, SKom, MS, MM
                </MenuItem>
                <MenuItem value={"Reynoldus A. Sahulata, SKom, MM"}>
                  Reynoldus A. Sahulata, SKom, MM
                </MenuItem>
                <MenuItem value={"Rolly Lontaan, MKom"}>
                  Rolly Lontaan, MKom
                </MenuItem>
                <MenuItem value={"Semmy W. Taju, SKom"}>
                  Semmy W. Taju, SKom
                </MenuItem>
                <MenuItem value={"Senly I. Adam, SKom, MSc"}>
                  Senly I. Adam, SKom, MSc
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: "25px" }}>
              <InputLabel>Co-Advisor 1</InputLabel>
              <Select
                label="Co-Advisor 1"
                value={coAdvisor1}
                onChange={handleCoAdvisor1Change}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={"Andrew T. Liem, MT, PhD"}>
                  Andrew T. Liem, MT, PhD
                </MenuItem>
                <MenuItem value={"Green Mandias, SKom, MCs"}>
                  Green Mandias, SKom, MCs
                </MenuItem>
                <MenuItem value={"Stenly R. Pungus, MT, PhD"}>
                  Stenly R. Pungus, MT, PhD
                </MenuItem>
                <MenuItem value={"Debby E. Sondakh, MT, PhD"}>
                  Debby E. Sondakh, MT, PhD
                </MenuItem>
                <MenuItem value={"Ir. Edson Y. Putra, MKom"}>
                  Ir. Edson Y. Putra, MKom
                </MenuItem>
                <MenuItem value={"Green A. Sandag, SKom, MS"}>
                  Green A. Sandag, SKom, MS
                </MenuItem>
                <MenuItem value={"Jacquline M. S. Waworundeng, ST, MT"}>
                  Jacquline M. S. Waworundeng, ST, MT
                </MenuItem>
                <MenuItem value={"Jimmy H. Moedjahedy, SKom, MKom, MM"}>
                  Jimmy H. Moedjahedy, SKom, MKom, MM
                </MenuItem>
                <MenuItem value={"Joe Y. Mambu, BSIT, MCIS"}>
                  Joe Y. Mambu, BSIT, MCIS
                </MenuItem>
                <MenuItem value={"Lidya C. Laoh, SKom, MMSi"}>
                  Lidya C. Laoh, SKom, MMSi
                </MenuItem>
                <MenuItem value={"Marshal Tombeng,"}>Marshal Tombeng,</MenuItem>
                <MenuItem value={"Oktoverano H. Lengkong, SKom, MDs, MM"}>
                  Oktoverano H. Lengkong, SKom, MDs, MM
                </MenuItem>
                <MenuItem value={"Reymon Rotikan, SKom, MS, MM"}>
                  Reymon Rotikan, SKom, MS, MM
                </MenuItem>
                <MenuItem value={"Reynoldus A. Sahulata, SKom, MM"}>
                  Reynoldus A. Sahulata, SKom, MM
                </MenuItem>
                <MenuItem value={"Rolly Lontaan, MKom"}>
                  Rolly Lontaan, MKom
                </MenuItem>
                <MenuItem value={"Semmy W. Taju, SKom"}>
                  Semmy W. Taju, SKom
                </MenuItem>
                <MenuItem value={"Senly I. Adam, SKom, MSc"}>
                  Senly I. Adam, SKom, MSc
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Co-Advisor 2</InputLabel>
              <Select
                label="Co-Advisor 2"
                value={coAdvisor2}
                onChange={handleCoAdvisor2Change}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={"Andrew T. Liem, MT, PhD"}>
                  Andrew T. Liem, MT, PhD
                </MenuItem>
                <MenuItem value={"Green Mandias, SKom, MCs"}>
                  Green Mandias, SKom, MCs
                </MenuItem>
                <MenuItem value={"Stenly R. Pungus, MT, PhD"}>
                  Stenly R. Pungus, MT, PhD
                </MenuItem>
                <MenuItem value={"Debby E. Sondakh, MT, PhD"}>
                  Debby E. Sondakh, MT, PhD
                </MenuItem>
                <MenuItem value={"Ir. Edson Y. Putra, MKom"}>
                  Ir. Edson Y. Putra, MKom
                </MenuItem>
                <MenuItem value={"Green A. Sandag, SKom, MS"}>
                  Green A. Sandag, SKom, MS
                </MenuItem>
                <MenuItem value={"Jacquline M. S. Waworundeng, ST, MT"}>
                  Jacquline M. S. Waworundeng, ST, MT
                </MenuItem>
                <MenuItem value={"Jimmy H. Moedjahedy, SKom, MKom, MM"}>
                  Jimmy H. Moedjahedy, SKom, MKom, MM
                </MenuItem>
                <MenuItem value={"Joe Y. Mambu, BSIT, MCIS"}>
                  Joe Y. Mambu, BSIT, MCIS
                </MenuItem>
                <MenuItem value={"Lidya C. Laoh, SKom, MMSi"}>
                  Lidya C. Laoh, SKom, MMSi
                </MenuItem>
                <MenuItem value={"Marshal Tombeng,"}>Marshal Tombeng,</MenuItem>
                <MenuItem value={"Oktoverano H. Lengkong, SKom, MDs, MM"}>
                  Oktoverano H. Lengkong, SKom, MDs, MM
                </MenuItem>
                <MenuItem value={"Reymon Rotikan, SKom, MS, MM"}>
                  Reymon Rotikan, SKom, MS, MM
                </MenuItem>
                <MenuItem value={"Reynoldus A. Sahulata, SKom, MM"}>
                  Reynoldus A. Sahulata, SKom, MM
                </MenuItem>
                <MenuItem value={"Rolly Lontaan, MKom"}>
                  Rolly Lontaan, MKom
                </MenuItem>
                <MenuItem value={"Semmy W. Taju, SKom"}>
                  Semmy W. Taju, SKom
                </MenuItem>
                <MenuItem value={"Senly I. Adam, SKom, MSc"}>
                  Senly I. Adam, SKom, MSc
                </MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ background: "#F5F5F5" }}>
            <Button
              onClick={handleClose}
              color="primary"
              sx={{
                background: "white",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                textTransform: "none",
                color: "black",
              }}
            >
              Batal
            </Button>
            <Button onClick={handleSave} color="primary" variant="contained">
              Simpan
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog Select Dosen Pembimbing Start */}
      </Div>

      {/* Dialog konfirmasi Tolak */}
      <Dialog
        open={confirmTolakOpen}
        onClose={() => setConfirmTolakOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle variant="subtitle2">Menolak Pengajuan Judul</DialogTitle>
        <DialogContent>
          <Typography>Apakah Anda yakin ingin menerima judul ini?</Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={() => setConfirmTolakOpen(false)}
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
            onClick={handleTolak}
            sx={{
              textTransform: "none",
              background: "#FC0",
              color: "black",
              "&:hover": {
                color: "#FC0",
              },
            }}
          >
            Tolak
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog konfirmasi Terima */}
      <Dialog
        open={confirmTerimaOpen}
        onClose={() => setConfirmTerimaOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle variant="subtitle2">Konfirmasi Terima</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin menerima pengajuan ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={() => setConfirmTerimaOpen(false)}
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
            onClick={handleTerima}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Terima
          </Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
};

export default PengajuanJudulDosenSkripsi;
