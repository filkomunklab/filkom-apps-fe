import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";

const keywords = [
  "informatika",
  "repository",
  "manajemen",
  "pengembangan",
  // Tambahkan kata kunci lain di sini
];

const MetaDataRepository = () => {
  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);

  const role = useParams().role;
  console.log(role);

  const [openDialog, setOpenDialog] = useState(false);
  const [penulisCount, setPenulisCount] = useState(1); // Awalnya satu input select
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleTambahPenulis = () => {
    if (penulisCount < 5) {
      setPenulisCount(penulisCount + 1);
    }
  };

  const handleKeywordChange = (event, newValue) => {
    setSelectedKeywords(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmSubmit = () => {
    // Lakukan pengiriman data di sini
    // Kemudian tutup dialog konfirmasi
    setOpenDialog(false);
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
          Metadata Repository
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
            {/* kata kunci */}
            <Div sx={{ width: "100%" }}>
              <Autocomplete
                size="small"
                multiple
                id="keywords"
                options={keywords}
                freeSolo
                value={selectedKeywords}
                onChange={handleKeywordChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="kata kunci"
                    variant="outlined"
                    placeholder="Contoh: informatika, repository, manajemen"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      size="small"
                      label={option.toLowerCase()}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
            </Div>

            {/* Abstrak */}
            <Div sx={{ width: "100%" }}>
              <DialogContentText sx={{ width: "100%", margin: "auto" }}>
                Abstrak
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Masukan Abstrak"
                style={{
                  width: "100%",
                  display: "block",
                  resize: "vertical",
                }}
              />
            </Div>
            <Div sx={{ width: "100%" }}>
              <DialogContentText sx={{ width: "100%", margin: "auto" }}>
                Referensi
              </DialogContentText>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Masukan Refrensi"
                style={{
                  width: "100%",
                  display: "block",
                  resize: "vertical",
                }}
              />
            </Div>
            <Div
              sx={{
                display: "flex",
                padding: "12px 24px 12px 0px",
                justifyContent: "flex-end",
                alignItems: "center",
                background: "#F5F5F5",
                width: "100%",
              }}
            >
              <Button
                size="small"
                variant="contained"
                sx={{ textTransform: "none" }}
                color="primary"
                onClick={handleOpenDialog}
              >
                Submit
              </Button>
            </Div>
          </Div>
          {/* Element 2 End */}
          {/* Dialog konfirmasi */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
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
                Submit Metadata
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Apakah Anda yakin semua data sudah benar?
              </DialogContentText>
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
                onClick={handleConfirmSubmit}
                variant="contained"
                sx={{ textTransform: "none" }}
                color="primary"
              >
                Ya
              </Button>
            </DialogActions>
          </Dialog>
        </Div>
      </Div>
    </Div>
  );
};

export default MetaDataRepository;
