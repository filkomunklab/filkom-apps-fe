import Div from "@jumbo/shared/Div";
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MenuPengajuanJudulDosen from "app/shared/MenuHorizontal/MenuPengajuanJudulDosen";
import MenuPenguji from "app/shared/MenuHorizontal/MenuPenguji";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import React from "react";

const BerandaPengajuanJudul = () => {
  const pengajuanJudul = [
    {
      title:
        "PENGEMBANGAN SISTEM INFORMASI SKRIPSI DI FAKULTAS ILMU KOMPUTER UNIVERSITAS KLABAT",
    },
  ];

  const dataKelompokMahasiswa = [
    {
      namaLengkap: "Geovalga Fransiscus Lim",
      nim: "105021910051",
      programStudi: "Informatika",
    },
    {
      namaLengkap: "Frances Rully Yong",
      nim: "105021910051",
      programStudi: "Informatika",
    },
  ];

  const dataStatusRevisiJudul = [
    {
      ketuaPenelis: "Waiting",
    },
  ];

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
          Beranda
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
          <Div
            hidden={role.includes("DOSEN", "KAPRODI", "DEKAN") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuPengajuanJudulDosen />
          </Div>
          {/* Menu Horizontal Start */}
          <Div
            hidden={role.includes("MAHASISWA") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuMahasiswa />
            {/* Menu horizontal End */}
          </Div>
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
            {pengajuanJudul.map((judul) => (
              <Typography
                sx={{
                  width: "100%",
                  display: "flex",
                  padding: "24px",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  color: "#192434",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: 600, // Membuat teks lebih tebal (nilai 600)
                }}
              >
                {judul.title}
              </Typography>
            ))}
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
                    {dataKelompokMahasiswa.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{data.namaLengkap}</TableCell>
                        <TableCell>{data.nim}</TableCell>
                        <TableCell>{data.programStudi}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Kelompok mahasiswa End */}

              {/* Table Pengajuan Proposal Start */}
              <Typography
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Status Pengajuan Judul
              </Typography>
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "50%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "50%" }}>Dosen Skripsi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataStatusRevisiJudul.map((statusPersetujuan, index) => (
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>
                          {statusPersetujuan.ketuaPenelis === "Waiting" ? (
                            <Chip
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : statusPersetujuan.ketuaPenelis === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : statusPersetujuan.ketuaPenelis === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            statusPersetujuan.ketuaPenelis
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {statusPersetujuan.anggotaPenelis === "Belum" ? (
                            <Chip label={"Belum"} />
                          ) : statusPersetujuan.anggotaPenelis === "Waiting" ? (
                            <Chip
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : statusPersetujuan.anggotaPenelis === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : statusPersetujuan.anggotaPenelis ===
                            "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            statusPersetujuan.anggotaPenelis
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Pengajuan Proposal End */}
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>
    </Div>
  );
};

export default BerandaPengajuanJudul;
