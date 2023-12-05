import React, { useState, useEffect } from "react";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const DaftarPengajuanProposalDekan = () => {
  // State untuk melacak panel accordion yang terbuka
  const [expanded, setExpanded] = useState(false);

  // state Pencarian
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Fungsi untuk menangani perubahan pada state accordion yang terbuka
  const handleChange = (panel) => (event, isExpanded) => {
    // Mengatur state expanded berdasarkan apakah panel tersebut terbuka
    setExpanded(isExpanded ? panel : false);
  };

  const [daftarSkripsi, setDaftarSkripsi] = useState();

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  // Fungsi untuk menangani pencarian
  const handleSearch = () => {
    const results = daftarSkripsi.semesterData.flatMap((semesterData) =>
      semesterData.proposals.filter((proposal) => {
        const studentNames = proposal.students.map((student) =>
          student.fullName.toLowerCase()
        );
        return (
          studentNames.some((name) =>
            name.includes(searchKeyword.toLowerCase())
          ) ||
          proposal.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      })
    );

    setSearchResults(results);
    setSearchQuery(searchKeyword);
    setIsSearchModalOpen(true);
  };

  // Fungsi untuk menutup modal pencarian
  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  useEffect(() => {
    const fetchDaftarSkripsiData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/group/skripsi-filkom",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Atur state 'setDaftarPengajuanProposal' dengan data dari respons
        setDaftarSkripsi(response.data.data);
        console.log("Request get daftar proposal: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil daftar pengajuan:",
          error
        );
      }
    };
    fetchDaftarSkripsiData();
  }, [token]);

  return (
    <Div>
      {/* Table Master Start */}
      <Div
        sx={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        {/* Header Start */}
        <Div
          sx={{
            width: "100%",
            display: "flex",
            padding: "24px",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: "1 0 0",
              alignSelf: "stretch",
              width: "100%",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "32px",
            }}
          >
            Daftar Judul Skripsi
          </Typography>
          {/* <Div
            sx={{
              flexDirection: "row",
              display: "flex",
              width: "441px",
              padding: "12px 16px",
              alignItems: "center",
              gap: "16px",
              flexShrink: 0,
            }}
          >
            <TextField
              id="search-input"
              variant="outlined"
              placeholder="Cari Nama Mahasiswa atau Judul"
              size="small"
              sx={{
                borderRadius: 25,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 25,
                },
              }}
              fullWidth
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Div> */}
          {/* popup Pencarian */}
          {/* <Dialog
            open={isSearchModalOpen}
            onClose={handleCloseSearchModal}
            fullWidth
            maxWidth="xl"
          >
            <DialogTitle sx={{ textAlign: "center" }}>
              <Typography variant="h2" gutterBottom>
                Hasil Pencarian
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Typography sx={{ marginBottom: "20px" }}>
                Pencarian Anda : {searchQuery}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: "#F5F5F5" }}>
                      <TableCell sx={{ width: "25px", fontSize: "13px" }}>
                        Nomor
                      </TableCell>
                      <TableCell sx={{ width: "200px", fontSize: "13px" }}>
                        Mahasiswa
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Judul</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Status</TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchResults.map((proposal, proposalIndex) => (
                      <TableRow key={proposalIndex}>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {proposalIndex + 1}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {proposal.students.map((student) => (
                            <div key={student.id}>{student.fullName}</div>
                          ))}
                        </TableCell>

                        <TableCell sx={{ fontSize: "13px" }}>
                          {proposal.title}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {proposal.is_pass === null ? (
                            <Chip label={"Belum"} />
                          ) : proposal.is_pass === "Repeat" ? (
                            <Chip
                              label={"Mengulang"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : proposal.is_pass === "Pass" ? (
                            <Chip
                              label={"Lulus"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : proposal.is_pass === "Fail" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            proposal.is_pass
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography
                            component={Link}
                            to={`/sistem-informasi-skripsi/daftar-pengajuan-proposal-dekan/beranda/${proposal.group_id}/DEKAN`}
                            sx={{
                              textDecoration: "none",
                              color: "blue",
                            }}
                          >
                            Detail
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
              <Button
                onClick={handleCloseSearchModal}
                color="primary"
                sx={{
                  background: "white",
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                  textTransform: "none",
                  color: "black",
                }}
              >
                Kembali
              </Button>
            </DialogActions>
          </Dialog> */}
        </Div>
        {/* Header End */}
        {/* Semester Start */}
        {daftarSkripsi?.length > 0 ? (
          <Div
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "25px",
              width: "100%",
              height: "900px",
              overflowY: "auto",
              background: "#FFF",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            {daftarSkripsi?.map((skripsi, index) => (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: "25px", fontSize: "13px" }}>
                        Nomor
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>Judul</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontSize: "13px" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "13px" }}>
                        {skripsi.title}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
          </Div>
        ) : (
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
                color: "#CA150C",
                background: "rgba(226, 29, 18, 0.50)",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              Belum ada skripsi.
            </Typography>
          </Div>
        )}
        {/* Table Mahasiswa Proposal End */}
      </Div>
      {/* Table Master End */}
    </Div>
  );
};

export default DaftarPengajuanProposalDekan;
