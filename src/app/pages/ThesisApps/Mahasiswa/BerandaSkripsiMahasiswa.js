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
import MenuPengajuanSkripsiDosen from "app/shared/MenuHorizontal/MenuPengajuanSkripsiDosen";
import MenuSekertaris from "app/shared/MenuHorizontal/MenuSekertaris";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import React from "react";

const BerandaSkripsiMahasiswa = () => {
  const pengajuanSkripsi = [
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

  const dataStatusPengajuanSkripsi = [
    {
      advisor: "Waiting",
      coAdvisor1: "Approve",
      coAdvisor2: "Rejected",
    },
  ];

  const dataStatusSiapMajuSidang = [
    {
      dokumenSkripsi: "Rejected",
      buktiPembayaran: "Waiting",
      hasilCekPlagiat: "Approve",
    },
  ];

  const dataTimPanelis = [
    {
      ketuaPenelis: "-",
      anggotaPenelis: "-",
      advisor: "Andrew T. Liem, MT, PhD",
    },
  ];

  const dataJadwalSidangSkripsi = [
    {
      mulai: "10:00",
      selesai: "11:30",
      tanggal: "12-11-2023",
      ruangan: "GK1-303",
    },
  ];

  const dataStatusSidangSkripsi = [
    {
      status: "Belum",
    },
  ];

  const dataStatusRevisiSkripsi = [
    {
      ketuaPenelis: "Belum",
      anggotaPenelis: "Belum",
      advisor: "Belum",
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
            display: "flex",
            width: "1050px",
            paddingBottom: "0px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            borderRadius: "8px",
          }}
        >
          {/* Menu Horizontal Mahasiswa Start */}
          <Div
            hidden={role.includes("MAHASISWA") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuMahasiswa />
          </Div>
          {/* Menu horizontal MahasiswaEnd */}
          {/* Menu Horizontal Dosen Start */}
          <Div
            hidden={
              role.includes(
                "DOSEN",
                "ADVISOR",
                "CO_ADVISOR",
                "DOSEN_SKRIPSI",
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
            <MenuPengajuanSkripsiDosen />
          </Div>
          {/* menu horizontal sekertaris start */}
          <Div
            hidden={role.includes("SEKERTARIS") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuSekertaris />
          </Div>
          {/* menu horizontal sekertaris end */}
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
            {pengajuanSkripsi.map((judul) => (
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

              {/* Table Pengajuan Skripsi Start */}
              <Typography
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Status Pengajuan Skripsi
              </Typography>
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "25%" }}>Advisor</TableCell>
                      <TableCell sx={{ width: "25%" }}>Co-Advisor 1</TableCell>
                      <TableCell sx={{ width: "25%" }}>Co-Advisor 2</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataStatusPengajuanSkripsi.map((status, index) => (
                      <TableRow key={index}>
                        <TableCell>1</TableCell>
                        <TableCell>
                          {status.advisor === "Belum" ? (
                            <Chip label={"Belum"} />
                          ) : status.advisor === "Waiting" ? (
                            <Chip
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : status.advisor === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : status.advisor === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            status.advisor
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {status.coAdvisor1 === "Belum" ? (
                            <Chip label={"Belum"} />
                          ) : status.coAdvisor1 === "Waiting" ? (
                            <Chip
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : status.coAdvisor1 === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : status.coAdvisor1 === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            status.coAdvisor1
                          )}
                        </TableCell>
                        <TableCell>
                          {status.coAdvisor2 === "Belum" ? (
                            <Chip label={"Belum"} />
                          ) : status.coAdvisor2 === "Waiting" ? (
                            <Chip
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : status.coAdvisor2 === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : status.coAdvisor2 === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            status.coAdvisor2
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Pengajuan Skripsi End */}

              {/* Table Status Siap Maju Sidang Start*/}
              <Typography
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Status Siap Maju Sidang
              </Typography>
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        Dokumen Skripsi
                      </TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        Bukti Pembayaran
                      </TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        Hasil Cek Plagiat
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataStatusSiapMajuSidang.map((statusSidang, index) => (
                      <TableRow key={index}>
                        <TableCell>1</TableCell>
                        <TableCell>
                          {statusSidang.dokumenSkripsi === "Belum" ? (
                            <Chip label={"Belum"} />
                          ) : statusSidang.dokumenSkripsi === "Waiting" ? (
                            <Chip
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : statusSidang.dokumenSkripsi === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : statusSidang.dokumenSkripsi === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            statusSidang.dokumenSkripsi
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {statusSidang.buktiPembayaran === "Belum" ? (
                            <Chip label={"Belum"} />
                          ) : statusSidang.buktiPembayaran === "Waiting" ? (
                            <Chip
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : statusSidang.buktiPembayaran === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : statusSidang.buktiPembayaran === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            statusSidang.buktiPembayaran
                          )}
                        </TableCell>
                        <TableCell>
                          {statusSidang.hasilCekPlagiat === "Belum" ? (
                            <Chip label={"Belum"} />
                          ) : statusSidang.hasilCekPlagiat === "Waiting" ? (
                            <Chip
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : statusSidang.hasilCekPlagiat === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : statusSidang.hasilCekPlagiat === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            statusSidang.hasilCekPlagiat
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Status Siap Maju Sidang End */}

              {/* Table Tim Panelis Start*/}
              <Typography
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Tim Panelis
              </Typography>
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "25%" }}>Ketua Penelis</TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        Anggota Penelis
                      </TableCell>
                      <TableCell sx={{ width: "25%" }}>Advisor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataTimPanelis.map((timPanelis, index) => (
                      <TableRow key={index}>
                        <TableCell>1</TableCell>
                        <TableCell>{timPanelis.ketuaPenelis}</TableCell>
                        <TableCell>{timPanelis.anggotaPenelis}</TableCell>
                        <TableCell>{timPanelis.advisor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Tim Panelis End*/}

              {/* Table Jadwal Sidang Skripsi Start */}
              <Typography
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Jadwal Sidang Skripsi
              </Typography>
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "20%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "20%" }}>Mulai</TableCell>
                      <TableCell sx={{ width: "20%" }}>Selesai</TableCell>
                      <TableCell sx={{ width: "20%" }}>Tanggal</TableCell>
                      <TableCell sx={{ width: "20%" }}>Ruangan</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataJadwalSidangSkripsi.map((jadwal, index) => (
                      <TableRow key={index}>
                        <TableCell>1</TableCell>
                        <TableCell>{jadwal.mulai}</TableCell>
                        <TableCell>{jadwal.selesai}</TableCell>
                        <TableCell>{jadwal.tanggal}</TableCell>
                        <TableCell>{jadwal.ruangan}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Jadwal Sidang Skripsi End */}

              {/* Table Sidang Skripsi Start */}
              <Typography
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Status Sidang Skripsi
              </Typography>
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "50%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "50%" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataStatusSidangSkripsi.map(
                      (statusSidangSkripsi, index) => (
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>
                            {statusSidangSkripsi.status === "Belum" ? (
                              <Chip label={"Belum"} />
                            ) : statusSidangSkripsi.status === "Waiting" ? (
                              <Chip
                                label={"Menunggu"}
                                sx={{
                                  background: "rgba(255, 204, 0, 0.10)",
                                  color: "#985211",
                                }}
                              />
                            ) : statusSidangSkripsi.status === "Approve" ? (
                              <Chip
                                label={"Diterima"}
                                sx={{
                                  background: "rgba(21, 131, 67, 0.10)",
                                  color: "#0A7637",
                                }}
                              />
                            ) : statusSidangSkripsi.status === "Rejected" ? (
                              <Chip
                                label={"Ditolak"}
                                sx={{
                                  background: "rgba(226, 29, 18, 0.10)",
                                  color: "#CA150C",
                                }}
                              />
                            ) : (
                              statusSidangSkripsi.status
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Sidang Skripsi End */}

              {/* Table Revisi Skripsi Start */}
              <Typography
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Status Revisi Skripsi
              </Typography>
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "25%" }}>Ketua Penelis</TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        Anggota Penelis
                      </TableCell>
                      <TableCell sx={{ width: "25%" }}>Advisor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataStatusRevisiSkripsi.map((statusRevisi, index) => (
                      <TableRow key={index}>
                        <TableCell>1</TableCell>
                        <TableCell>
                          {statusRevisi.ketuaPenelis === "Belum" ? (
                            <Chip label={"Belum"} />
                          ) : statusRevisi.ketuaPenelis === "Waiting" ? (
                            <Chip
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : statusRevisi.ketuaPenelis === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : statusRevisi.ketuaPenelis === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            statusRevisi.ketuaPenelis
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: "13px" }}>
                          {statusRevisi.anggotaPenelis === "Belum" ? (
                            <Chip label={"Belum"} />
                          ) : statusRevisi.anggotaPenelis === "Waiting" ? (
                            <Chip
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : statusRevisi.anggotaPenelis === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : statusRevisi.anggotaPenelis === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            statusRevisi.anggotaPenelis
                          )}
                        </TableCell>
                        <TableCell>
                          {statusRevisi.advisor === "Belum" ? (
                            <Chip label={"Belum"} />
                          ) : statusRevisi.advisor === "Waiting" ? (
                            <Chip
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : statusRevisi.advisor === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : statusRevisi.advisor === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            statusRevisi.advisor
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Revisi Skripsi End */}
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>
    </Div>
  );
};

export default BerandaSkripsiMahasiswa;
