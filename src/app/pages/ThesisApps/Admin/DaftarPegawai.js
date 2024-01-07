import React, { useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Menu,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Div from "@jumbo/shared/Div";

const DaftarPegawai = () => {
  const [namaPegawai, setNamaPegawai] = useState("");
  const [nidnNik, setNidnNik] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [jabatan1, setJabatan1] = useState("");
  const [jabatan2, setJabatan2] = useState("");
  const [pegawaiList, setPegawaiList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    namaPegawai: "",
    nidnNik: "",
    jabatan1: "",
    jabatan2: "",
    jurusan: "",
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEditPegawai, setSelectedEditPegawai] = useState(null);
  const [editingPegawai, setEditingPegawai] = useState(null);

  const handleTambahPegawai = () => {
    let hasError = false;
    const newErrorMessages = {};

    if (!namaPegawai) {
      newErrorMessages.namaPegawai = "Nama harus diisi";
      hasError = true;
    }

    if (!nidnNik) {
      newErrorMessages.nidnNik = "NIDN/NIK harus diisi";
      hasError = true;
    }

    if (!jabatan1) {
      newErrorMessages.jabatan1 = "Jabatan 1 harus dipilih";
      hasError = true;
    }

    if (!jabatan2) {
      newErrorMessages.jabatan2 = "Jabatan 2 harus dipilih";
      hasError = true;
    }

    if (jabatan1 === jabatan2) {
      newErrorMessages.jabatan1 = "Jabatan tidak boleh sama";
      newErrorMessages.jabatan2 = "Jabatan tidak boleh sama";
      hasError = true;
    }

    if (!jurusan) {
      newErrorMessages.jurusan = "Jurusan harus dipilih";
      hasError = true;
    }

    if (hasError) {
      setErrorMessages(newErrorMessages);
      // Display error message to the user
      return;
    }

    const newPegawai = {
      nama: namaPegawai,
      nidnNik: nidnNik,
      jabatan: `${jabatan1}, ${jabatan2}`,
      jurusan: jurusan,
    };
    setPegawaiList([...pegawaiList, newPegawai]);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setNamaPegawai("");
    setNidnNik("");
    setJabatan1("");
    setJabatan2("");
    setJurusan("");
    setOpenDialog(false);
    setErrorMessages({
      namaPegawai: "",
      nidnNik: "",
      jabatan1: "",
      jabatan2: "",
      jurusan: "",
    });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPegawai, setSelectedPegawai] = useState(null);

  const handleMoreVertClick = (event, pegawai) => {
    setAnchorEl(event.currentTarget);
    setSelectedPegawai(pegawai);
  };

  const handleMoreVertClose = () => {
    setAnchorEl(null);
    setSelectedPegawai(null);
  };

  const handleDeleteDialogOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeletePegawai = () => {
    console.log(`Menghapus pegawai: ${selectedPegawai.nama}`);
    setPegawaiList((prevList) =>
      prevList.filter((pegawai) => pegawai !== selectedPegawai)
    );
    handleMoreVertClose();
    handleDeleteDialogClose();
  };

  const handleEditDialogOpen = (pegawai) => {
    setSelectedEditPegawai(pegawai);
    setNamaPegawai(pegawai.nama);
    setNidnNik(pegawai.nidnNik);
    const [jabatan1, jabatan2] = pegawai.jabatan.split(", ");
    setJabatan1(jabatan1);
    setJabatan2(jabatan2);
    setJurusan(pegawai.jurusan);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setSelectedEditPegawai(null);
    setNamaPegawai("");
    setNidnNik("");
    setJabatan1("");
    setJabatan2("");
    setJurusan("");
    setOpenEditDialog(false);
    setErrorMessages({
      namaPegawai: "",
      nidnNik: "",
      jabatan1: "",
      jabatan2: "",
      jurusan: "",
    });
  };

  //   const handleEditPegawai = () => {
  //     // Implementasi logika edit pegawai
  //     console.log(`Mengedit pegawai: ${selectedPegawai.nama}`);
  //     // Implementasi logika edit sesuai kebutuhan Anda
  //     handleCloseDialog();
  //     handleMoreVertClose();
  //     handleEditDialogClose();
  //   };

  const handleEditPegawai = () => {
    let hasError = false;
    const newErrorMessages = {};

    if (!namaPegawai) {
      newErrorMessages.namaPegawai = "Nama harus diisi";
      hasError = true;
    }

    if (!nidnNik) {
      newErrorMessages.nidnNik = "NIDN/NIK harus diisi";
      hasError = true;
    }

    if (!jabatan1) {
      newErrorMessages.jabatan1 = "Jabatan 1 harus dipilih";
      hasError = true;
    }

    if (jabatan1 === jabatan2) {
      newErrorMessages.jabatan1 = "Jabatan tidak boleh sama";
      newErrorMessages.jabatan2 = "Jabatan tidak boleh sama";
      hasError = true;
    }

    if (!jabatan2) {
      newErrorMessages.jabatan2 = "Jabatan 2 harus dipilih";
      hasError = true;
    }

    if (!jurusan) {
      newErrorMessages.jurusan = "Jurusan harus dipilih";
      hasError = true;
    }

    if (hasError) {
      setErrorMessages(newErrorMessages);
      return;
    }

    if (!namaPegawai || !nidnNik || !jurusan) {
      setErrorMessages({
        namaPegawai: !namaPegawai ? "Nama harus diisi" : "",
        nidnNik: !nidnNik ? "NIDN/NIK harus diisi" : "",
        jurusan: !jurusan ? "Jurusan harus dipilih" : "",
      });
      return;
    }

    // Update the selected pegawai in the list
    setPegawaiList((prevList) =>
      prevList.map((pegawai) =>
        pegawai === selectedEditPegawai
          ? {
              ...pegawai,
              nama: namaPegawai,
              nidnNik: nidnNik,
              jabatan: `${jabatan1}, ${jabatan2}`,
              jurusan: jurusan,
            }
          : pegawai
      )
    );

    handleCloseDialog();
    handleEditDialogClose();
  };

  return (
    <Div>
      <Div
        style={{
          display: "flex",
          padding: "24px",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "12px",
          alignSelf: "stretch",
        }}
      >
        <Typography
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: "1 0 0",
            alignSelf: "stretch",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "32px",
          }}
        >
          Daftar Pegawai
        </Typography>

        <Div
          style={{
            display: "flex",
            padding: "13px 0px",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "12px",
            width: "30%",
          }}
        >
          <Div style={{ width: "50%" }}>
            <Button
              onClick={handleOpenDialog}
              style={{
                textTransform: "none",
                borderRadius: "60px",
                alignItems: "center",
                background: "#006AF5",
                padding: "12px",
                color: "#ffff",
                "&:hover": { color: "#006AF5" },
              }}
            >
              <AddIcon style={{ fontSize: "18px" }} />
              Tambah Pegawai
            </Button>
          </Div>
        </Div>
        {/* Dialog untuk Tambah Pegawai */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: "1 0 0",
              alignSelf: "stretch",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "32px",
            }}
          >
            Tambah Pegawai
          </DialogTitle>
          <DialogContent>
            {/* Input Nama */}
            <TextField
              label="Nama"
              variant="outlined"
              value={namaPegawai}
              fullWidth
              margin="normal"
              onChange={(e) => setNamaPegawai(e.target.value)}
              error={!!errorMessages.namaPegawai}
            />
            <FormHelperText error={!!errorMessages.namaPegawai}>
              {errorMessages.namaPegawai}
            </FormHelperText>
            {/* Input NIDN/NIK */}
            <TextField
              label="NIDN/NIK"
              variant="outlined"
              value={nidnNik}
              fullWidth
              margin="normal"
              onChange={(e) => setNidnNik(e.target.value)}
              error={!!errorMessages.nidnNik}
            />
            <FormHelperText error={!!errorMessages.nidnNik}>
              {errorMessages.nidnNik}
            </FormHelperText>
            {/* Input Jabatan 1 */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Jabatan 1</InputLabel>
              <Select
                label="Jabatan 1"
                value={jabatan1}
                onChange={(e) => setJabatan1(e.target.value)}
                error={!!errorMessages.jabatan1}
              >
                <MenuItem value={"Dosen"}>Dosen</MenuItem>
                <MenuItem value={"Kaprodi"}>Kaprodi</MenuItem>
                <MenuItem value={"Dekan"}>Dekan</MenuItem>
              </Select>
              <FormHelperText error={!!errorMessages.jabatan1}>
                {errorMessages.jabatan1}
              </FormHelperText>
            </FormControl>
            {/* Input Jabatan 2 */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Jabatan 2</InputLabel>
              <Select
                label="Jabatan 2"
                value={jabatan2}
                onChange={(e) => setJabatan2(e.target.value)}
                error={!!errorMessages.jabatan2}
              >
                <MenuItem value={"Dosen"}>Dosen</MenuItem>
                <MenuItem value={"Kaprodi"}>Kaprodi</MenuItem>
                <MenuItem value={"Dekan"}>Dekan</MenuItem>
              </Select>
              <FormHelperText error={!!errorMessages.jabatan2}>
                {errorMessages.jabatan2}
              </FormHelperText>
            </FormControl>
            {/* Input Jurusan */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Jurusan</InputLabel>
              <Select
                label="Jurusan"
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
                error={!!errorMessages.jurusan}
              >
                <MenuItem value={"informatika"}>Informatika</MenuItem>
                <MenuItem value={"Sistem Informasi"}>Sistem Informasi</MenuItem>
                {/* Add other department options if needed */}
              </Select>
            </FormControl>
            <FormHelperText error={!!errorMessages.jurusan}>
              {errorMessages.jurusan}
            </FormHelperText>
          </DialogContent>
          <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
            <Button
              onClick={handleCloseDialog}
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
              variant="contained"
              color="primary"
              onClick={handleTambahPegawai}
              sx={{ textTransform: "none" }}
            >
              Simpan
            </Button>
          </DialogActions>
        </Dialog>
      </Div>
      {/* Dialog untuk Edit Pegawai */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: "1 0 0",
            alignSelf: "stretch",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "32px",
          }}
        >
          Edit Pegawai
        </DialogTitle>
        <DialogContent>
          {/* Input Nama */}
          <TextField
            label="Nama"
            variant="outlined"
            value={namaPegawai}
            fullWidth
            margin="normal"
            onChange={(e) => setNamaPegawai(e.target.value)}
            error={!!errorMessages.namaPegawai}
          />
          <FormHelperText error={!!errorMessages.namaPegawai}>
            {errorMessages.namaPegawai}
          </FormHelperText>
          {/* Input NIDN/NIK */}
          <TextField
            label="NIDN/NIK"
            variant="outlined"
            value={nidnNik}
            fullWidth
            margin="normal"
            onChange={(e) => setNidnNik(e.target.value)}
            error={!!errorMessages.nidnNik}
          />
          <FormHelperText error={!!errorMessages.nidnNik}>
            {errorMessages.nidnNik}
          </FormHelperText>
          {/* Input Jabatan */}
          {/* Input Jabatan 1 */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Jabatan 1</InputLabel>
            <Select
              label="Jabatan 1"
              value={jabatan1}
              onChange={(e) => setJabatan1(e.target.value)}
              error={!!errorMessages.jabatan1}
            >
              <MenuItem value={"Dosen"}>Dosen</MenuItem>
              <MenuItem value={"Kaprodi"}>Kaprodi</MenuItem>
              <MenuItem value={"Dekan"}>Dekan</MenuItem>
            </Select>
            <FormHelperText error={!!errorMessages.jabatan1}>
              {errorMessages.jabatan1}
            </FormHelperText>
          </FormControl>
          {/* Input Jabatan 2 */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Jabatan 2</InputLabel>
            <Select
              label="Jabatan 2"
              value={jabatan2}
              onChange={(e) => setJabatan2(e.target.value)}
              error={!!errorMessages.jabatan2}
            >
              <MenuItem value={"Dosen"}>Dosen</MenuItem>
              <MenuItem value={"Kaprodi"}>Kaprodi</MenuItem>
              <MenuItem value={"Dekan"}>Dekan</MenuItem>
            </Select>
            <FormHelperText error={!!errorMessages.jabatan2}>
              {errorMessages.jabatan2}
            </FormHelperText>
          </FormControl>
          {/* Input Jurusan */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Jurusan</InputLabel>
            <Select
              label="Jurusan"
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
              error={!!errorMessages.jurusan}
            >
              <MenuItem value={"informatika"}>Informatika</MenuItem>
              <MenuItem value={"Sistem Informasi"}>Sistem Informasi</MenuItem>
              {/* Add other department options if needed */}
            </Select>
          </FormControl>
          <FormHelperText error={!!errorMessages.jurusan}>
            {errorMessages.jurusan}
          </FormHelperText>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleEditDialogClose}
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
            variant="contained"
            color="primary"
            onClick={handleEditPegawai}
            sx={{ textTransform: "none" }}
          >
            Tambah
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog untuk Delete Pegawai */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Hapus Pegawai</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menghapus pegawai ini?
          </Typography>
        </DialogContent>
        <DialogActions style={{ background: "#F5F5F5" }}>
          <Button
            onClick={handleDeleteDialogClose}
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
            onClick={handleDeletePegawai}
            variant="contained"
            color="error"
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        {/* Tabel Pegawai */}
        <Table>
          <TableHead style={{ background: "#F5F5F5" }}>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>NIDN/NIK</TableCell>
              <TableCell>Jabatan</TableCell>
              <TableCell>Jurusan</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pegawaiList.map((pegawai, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pegawai.nama}</TableCell>
                <TableCell>{pegawai.nidnNik}</TableCell>
                <TableCell>{pegawai.jabatan}</TableCell>
                <TableCell>{pegawai.jurusan}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="more-vert"
                    aria-controls={`menu-${index}`}
                    aria-haspopup="true"
                    onClick={(e) => handleMoreVertClick(e, pegawai)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`menu-${index}`}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMoreVertClose}
                  >
                    <MenuItem
                      onClick={() => handleEditDialogOpen(pegawai)}
                      sx={{ color: "blue" }}
                    >
                      Edit
                    </MenuItem>

                    <MenuItem
                      onClick={handleDeleteDialogOpen}
                      sx={{ color: "red" }}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Div>
  );
};

export default DaftarPegawai;
