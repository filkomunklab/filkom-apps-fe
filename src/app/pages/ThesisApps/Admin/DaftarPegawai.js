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
  const [selectedJabatan, setSelectedJabatan] = useState([]);
  const [jurusan, setJurusan] = useState("");
  const [pegawaiList, setPegawaiList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    namaPegawai: "",
    nidnNik: "",
    selectedJabatan: "",
    jurusan: "",
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEditPegawai, setSelectedEditPegawai] = useState(null);

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

    if (selectedJabatan.length === 0) {
      newErrorMessages.selectedJabatan = "Jabatan harus diisi";
      hasError = true;
    }

    if (selectedJabatan.length > 2) {
      newErrorMessages.selectedJabatan =
        "Hanya dapat memilih maksimal 2 jabatan.";
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
      jabatan: selectedJabatan.join(", "),
      jurusan: jurusan,
    };

    setPegawaiList([...pegawaiList, newPegawai]);
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setNamaPegawai("");
    setNidnNik("");
    setSelectedJabatan([]);
    setJurusan("");
    setOpenDialog(false);
    setErrorMessages({
      namaPegawai: "",
      nidnNik: "",
      selectedJabatan: "",
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
    setSelectedJabatan(pegawai.jabatan.split(", "));
    setJurusan(pegawai.jurusan);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setSelectedEditPegawai(null);
    setNamaPegawai("");
    setNidnNik("");
    setSelectedJabatan([]);
    setJurusan("");
    setOpenEditDialog(false);
    setErrorMessages({
      namaPegawai: "",
      nidnNik: "",
      selectedJabatan: "",
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

    if (selectedJabatan.length === 0) {
      newErrorMessages.selectedJabatan = "Jabatan harus diisi";
      hasError = true;
    }

    if (selectedJabatan.length > 2) {
      newErrorMessages.selectedJabatan =
        "Hanya dapat memilih maksimal 2 jabatan.";
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

    if (!namaPegawai || !nidnNik || selectedJabatan.length === 0 || !jurusan) {
      setErrorMessages({
        namaPegawai: !namaPegawai ? "Nama harus diisi" : "",
        nidnNik: !nidnNik ? "NIDN/NIK harus diisi" : "",
        selectedJabatan:
          selectedJabatan.length === 0 ? "Jabatan harus diisi" : "",
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
              jabatan: selectedJabatan.join(", "),
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
            {/* Input Jabatan */}
            <Div>
              <FormControl fullWidth>
                <InputLabel>Jabatan</InputLabel>
                <Select
                  multiple
                  label="Jabatan"
                  value={selectedJabatan}
                  onChange={(e) => setSelectedJabatan(e.target.value)}
                  error={!!errorMessages.selectedJabatan}
                >
                  <MenuItem value="Dosen">Dosen</MenuItem>
                  <MenuItem value="Kaprodi">Kaprodi</MenuItem>
                  <MenuItem value="Dekan">Dekan</MenuItem>
                </Select>
              </FormControl>
              <FormHelperText error={!!errorMessages.selectedJabatan}>
                {errorMessages.selectedJabatan}
              </FormHelperText>
            </Div>
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
          <div>
            <FormControl fullWidth>
              <InputLabel>Jabatan</InputLabel>
              <Select
                multiple
                label="Jabatan"
                value={selectedJabatan}
                onChange={(e) => setSelectedJabatan(e.target.value)}
                error={!!errorMessages.selectedJabatan}
              >
                <MenuItem value="Dosen">Dosen</MenuItem>
                <MenuItem value="Kaprodi">Kaprodi</MenuItem>
                <MenuItem value="Dekan">Dekan</MenuItem>
              </Select>
            </FormControl>
            <FormHelperText error={!!errorMessages.selectedJabatan}>
              {errorMessages.selectedJabatan}
            </FormHelperText>
          </div>
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
        <DialogActions>
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
          <Button onClick={handleDeletePegawai} color="secondary">
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
