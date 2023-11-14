import Div from "@jumbo/shared/Div";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import MenuPengajuanSkripsiDosen from "app/shared/MenuHorizontal/MenuPengajuanSkripsiDosen";
import MenuPenguji from "app/shared/MenuHorizontal/MenuPenguji";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PerubahanProposalCoAdvisor2 = () => {
  const [coAdvisorChange, setCoAdvisorChange] = useState(""); // State untuk menyimpan perubahan Co-Advisor
  const [displayedChange, setDisplayedChange] = useState(""); // State untuk menampilkan perubahan di Typography
  const [isSubmitted, setIsSubmitted] = useState(false); // Menyimpan status apakah sudah disubmit atau belum
  const [openDialog, setOpenDialog] = useState(false); // Menyimpan status dialog konfirmasi

  const [ButtonVisible, setButtonVisible] = useState(true);

  const handleCoAdvisorChange = (event) => {
    setCoAdvisorChange(event.target.value);
  };

  const handleCoAdvisorSubmit = () => {
    // Saat tombol "Submit" ditekan, buka dialog konfirmasi
    setOpenDialog(true);
  };

  const handleConfirmSubmit = () => {
    setButtonVisible(false);
    // Fungsi ini akan dipanggil saat pengguna mengonfirmasi submit
    setDisplayedChange(coAdvisorChange);
    setIsSubmitted(true);
    setOpenDialog(false); // Tutup dialog setelah dikonfirmasi
  };

  const handleCloseDialog = () => {
    // Fungsi ini akan dipanggil saat pengguna menutup dialog
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
        <Typography variant="subtitle2" sx={{ fontSize: "24px" }}>
          Perubahan Proposal
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
            <MenuPengajuanSkripsiDosen />
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
                  {/* input textarea perubahan Start */}
                  {isSubmitted ? ( // Cek apakah sudah disubmit
                    <Typography>
                      {displayedChange.split("\n").map((point, index) => (
                        <div key={index}>{point}</div>
                      ))}
                    </Typography>
                  ) : (
                    <TextareaAutosize
                      aria-label="minimum height"
                      rowsMin={4}
                      style={{
                        width: "100%",
                        height: 108,
                        marginBottom: "25px",
                        display: "block",
                        resize: "vertical",
                      }}
                      placeholder="Masukkan perubahan di sini"
                      value={coAdvisorChange}
                      onChange={handleCoAdvisorChange}
                    />
                  )}

                  {/* input textarea perubahan End */}
                </Div>
              </Div>
              {ButtonVisible && (
                <Div
                  sx={{
                    display: "flex",
                    padding: "12px 24px 12px 0",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "12px",
                    alignSelf: "stretch",
                    background: "rgba(26, 56, 96, 0.10)",
                    borderRadius: "6px",
                  }}
                >
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    color="primary"
                    onClick={handleCoAdvisorSubmit}
                    disabled={isSubmitted} // Menonaktifkan tombol "Submit" jika sudah disubmit
                  >
                    Submit
                  </Button>
                </Div>
              )}
            </Div>
          </Div>
          {/* Element 2 End */}
        </Div>
      </Div>

      {/* Dialog Konfirmasi */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          id="form-dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            alignSelf: "stretch",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
            Revisi Proposal
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Apakah Anda yakin ingin mengirim perubahan ini?
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
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
};

export default PerubahanProposalCoAdvisor2;
