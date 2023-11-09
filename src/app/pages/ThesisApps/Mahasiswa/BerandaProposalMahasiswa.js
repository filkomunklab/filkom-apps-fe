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
import MenuAdvisorProposal from "app/shared/MenuHorizontal/MenuAdvisorProposal";
import MenuAnggotaPanalisProposal from "app/shared/MenuHorizontal/MenuAnggotaPanalisProposal";
import MenuCoAdvisorProposal from "app/shared/MenuHorizontal/MenuCoAdvisorProposal";
import MenuKaprodiProposal from "app/shared/MenuHorizontal/MenuKaprodiProposal";
import MenuKetuaPanalisProposal from "app/shared/MenuHorizontal/MenuKetuaPanalisProposal";
import MenuKetuaPanelisSkripsi from "app/shared/MenuHorizontal/MenuKetuaPanalisSkripsi";
import MenuPenguji from "app/shared/MenuHorizontal/MenuPenguji";
import MenuSekertaris from "app/shared/MenuHorizontal/MenuSekertaris";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BerandaProposalMahasiswa = () => {
  const [mahasiswaData, setMahasiswaData] = useState(null);

  const pengajuanProposal = [
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

  const dataStatusPengajuanProposal = [
    {
      advisor: "Waiting",
      coAdvisor1: "Approve",
      coAdvisor2: "Rejected",
    },
  ];

  const dataStatusSiapMajuSidang = [
    {
      dokumenProposal: "Rejected",
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

  const dataJadwalSidangProposal = [
    {
      mulai: "10:00",
      selesai: "11:30",
      tanggal: "12-11-2023",
      ruangan: "GK1-303",
    },
  ];

  const dataStatusSidangProposal = [
    {
      status: "Belum",
    },
  ];

  const dataStatusRevisiProposal = [
    {
      ketuaPenelis: "Belum",
      anggotaPenelis: "Belum",
      advisor: "Belum",
    },
  ];

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  // const { id } = JSON.parse(localStorage.getItem("user"));
  const roleTest = useParams().role;
  console.log(roleTest);

  // const idTest = useParams().id;
  // const roleTest = useParams().role;
  // console.log(idTest, roleTest);

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  console.log(role);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:2000/api/v1/group/submission_details/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       // Atur state 'setMahasiswaData' dengan data dari respons
  //       setMahasiswaData(response.data.data);
  //     } catch (error) {
  //       console.error(
  //         "Terjadi kesalahan saat mengambil data mahasiswa:",
  //         error
  //       );
  //     }
  //   };
  //   fetchData();
  // }, [token, id]);

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
          {/* DOSEN SKRIPSI */}
          <Div
            hidden={role.includes("DOSEN") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKetuaPanelisSkripsi />
          </Div>
          {/* ADVISOR */}
          <Div
            hidden={role.includes("ADVISOR") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuAdvisorProposal />
          </Div>
          {/* CO_ADVISOR */}
          <Div
            hidden={role.includes("CO_ADVISOR") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuCoAdvisorProposal />
          </Div>
          {/* KETUA PANALIS */}
          <Div
            hidden={role.includes("KETUA_PANALIS") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKetuaPanalisProposal />
          </Div>
          {/* ANGGOTA PANALIS */}
          <Div
            hidden={role.includes("ANGGOTA_PANALIS") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuAnggotaPanalisProposal />
          </Div>
          {/* KAPRODI */}
          {/* <Div
            hidden={role.includes("KAPRODI") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKaprodiProposal />
          </Div> */}
          {/* SEKERTARIS */}
          <Div
            hidden={role.includes("SEKERTARIS") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuSekertaris />
          </Div>
          {/* MAHASISWA */}
          <Div
            hidden={role.includes("MAHASISWA") ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuMahasiswa />
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
            {pengajuanProposal.map((judul) => (
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
                Status Pengajuan Proposal
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
                    {dataStatusPengajuanProposal.map((status, index) => (
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
              {/* Table Pengajuan Proposal End */}

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
                        Dokumen Proposal
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
                          {statusSidang.dokumenProposal === "Belum" ? (
                            <Chip label={"Belum"} />
                          ) : statusSidang.dokumenProposal === "Waiting" ? (
                            <Chip
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : statusSidang.dokumenProposal === "Approve" ? (
                            <Chip
                              label={"Diterima"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : statusSidang.dokumenProposal === "Rejected" ? (
                            <Chip
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            statusSidang.dokumenProposal
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

              {/* Table Jadwal Sidang Proposal Start */}
              <Typography
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Jadwal Sidang Proposal
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
                    {dataJadwalSidangProposal.map((jadwal, index) => (
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
              {/* Table Jadwal Sidang Proposal End */}

              {/* Table Sidang Proposal Start */}
              <Typography
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Status Sidang Proposal
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
                    {dataStatusSidangProposal.map(
                      (statusSidangProposal, index) => (
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>
                            {statusSidangProposal.status === "Belum" ? (
                              <Chip label={"Belum"} />
                            ) : statusSidangProposal.status === "Waiting" ? (
                              <Chip
                                label={"Menunggu"}
                                sx={{
                                  background: "rgba(255, 204, 0, 0.10)",
                                  color: "#985211",
                                }}
                              />
                            ) : statusSidangProposal.status === "Approve" ? (
                              <Chip
                                label={"Diterima"}
                                sx={{
                                  background: "rgba(21, 131, 67, 0.10)",
                                  color: "#0A7637",
                                }}
                              />
                            ) : statusSidangProposal.status === "Rejected" ? (
                              <Chip
                                label={"Ditolak"}
                                sx={{
                                  background: "rgba(226, 29, 18, 0.10)",
                                  color: "#CA150C",
                                }}
                              />
                            ) : (
                              statusSidangProposal.status
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Sidang Proposal End */}

              {/* Table Revisi Proposal Start */}
              <Typography
                sx={{
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  borderRadius: "6px 6px 0 0",
                  border: "1px",
                }}
              >
                Status Revisi Proposal
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
                    {dataStatusRevisiProposal.map((statusRevisi, index) => (
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
              {/* Table Revisi Proposal End */}
            </Div>
          </Div>
        </Div>
        {/* Element 2 End */}
      </Div>
    </Div>
  );
};

export default BerandaProposalMahasiswa;
