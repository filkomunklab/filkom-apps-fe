import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
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
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import AttachmentIcon from "@mui/icons-material/Attachment";

// View Document Skripsi
const PDFViewerSkripsi = ({ dokumenSkripsi, isUploading }) => {
  const viewPDFSkripsi = () => {
    if (isUploading) {
      // Jangan lakukan apa pun jika sedang mengunggah
      return;
    }

    // Buat URL objek untuk file PDF
    const pdfURL = dokumenSkripsi.file_path_skripsi;

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span
        style={{
          cursor: isUploading ? "not-allowed" : "pointer",
          color: isUploading ? "#A0A0A0" : "blue",
        }}
        onClick={viewPDFSkripsi}
      >
        Lihat
      </span>
    </div>
  );
};

// View Document Payment
const PDFViewerPayment = ({ buktiPembayaran, isUploading }) => {
  const viewPDFPayment = () => {
    if (isUploading) {
      // Jangan lakukan apa pun jika sedang mengunggah
      return;
    }

    // Buat URL objek untuk file PDF
    const pdfURL = buktiPembayaran.file_path_payment;

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span
        style={{
          cursor: isUploading ? "not-allowed" : "pointer",
          color: isUploading ? "#A0A0A0" : "blue",
        }}
        onClick={viewPDFPayment}
      >
        Lihat
      </span>
    </div>
  );
};

// View Document Cek Plagiat
const PDFViewerCekPlagiat = ({ hasilCekPlagiat, isUploading }) => {
  const viewPDFCekPlagiat = () => {
    if (isUploading) {
      // Jangan lakukan apa pun jika sedang mengunggah
      return;
    }

    // Buat URL objek untuk file PDF
    const pdfURL = hasilCekPlagiat.file_path_plagiarismcheck;

    // Buka tautan dalam tab atau jendela baru
    window.open(pdfURL, "_blank");
  };

  return (
    <div>
      <span
        style={{
          cursor: isUploading ? "not-allowed" : "pointer",
          color: isUploading ? "#A0A0A0" : "blue",
        }}
        onClick={viewPDFCekPlagiat}
      >
        Lihat
      </span>
    </div>
  );
};

const UploadSkipsi = () => {
  // state - menyimpan request data
  const [dokumenSkripsi, setDokumenSkripsi] = useState();
  const [buktiPembayaran, setBuktiPembayaran] = useState();
  const [hasilCekPlagiat, setHasilCekPlagiat] = useState();

  // state - disabled button
  const [isSubmittingSkripsi, setSubmittionSkripsi] = useState(false);
  const [isSubmittingPayment, setSubmittionPayment] = useState(false);
  const [isSubmittingPlagiat, setSubmittionPlagiat] = useState(false);

  const [advisorAndCoAdvisor, setAdvisorAndCoAdvisor] = useState();

  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);
  const [skripsiId, setSkripsiId] = useState(null);

  const userRole = useParams().role;
  console.log("role user akses page: ", userRole);

  const { role } = JSON.parse(localStorage.getItem("user"));
  console.log("role user yang sign in: ", role);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchDokumenSkripsiData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/skripsi-document/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDokumenSkripsi(response.data.data);
        console.log("Request Get dokumen skripsi: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil dokumen skripsi:",
          error
        );
      }
    };
    const fetchBuktiPembayaranData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/skripsi-payment/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setBuktiPembayaran(response.data.data);
        console.log("Request Get bukti pembayaran: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil bukti pembayaran:",
          error
        );
      }
    };
    const fetchHasilCekPlagiatData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/skripsi-plagiarism-check/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setHasilCekPlagiat(response.data.data);
        console.log("Request Get hasil cek plagiat: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil hail cek plagiat:",
          error
        );
      }
    };
    fetchDokumenSkripsiData();
    fetchBuktiPembayaranData();
    fetchHasilCekPlagiatData();
  }, [token, skripsiId]);

  const handleUnggahDokumenProposal = (event) => {
    const file = event.target.files[0];

    // Cek apakah pengguna memilih file atau membatalkan
    if (!file) {
      // Tidak ada file dipilih, tidak perlu menonaktifkan tombol
      return;
    }

    // Nonaktifkan tombol unggah pembayaran
    setSubmittionSkripsi(true);

    // Validasi tipe file
    const allowedFileTypes = ["application/pdf"];

    if (!allowedFileTypes.includes(file.type)) {
      console.error("Tipe file tidak valid");
      setSubmittionSkripsi(false); // Aktifkan kembali tombol
      return;
    }

    const reader = new FileReader();

    // Menangani kesalahan FileReader
    reader.onerror = (error) => {
      console.error("Terjadi kesalahan saat membaca file:", error);
    };

    reader.onload = (e) => {
      const dataURL = e.target.result;

      // Mengonversi data URL ke base64
      const base64String = dataURL.split(",")[1];

      // Logika pengolahan file
      const fileSizeInKB = file.size / 1024; // Konversi ke KB
      const fileSizeString =
        fileSizeInKB < 1024
          ? fileSizeInKB.toFixed(2) + " KB"
          : (fileSizeInKB / 1024).toFixed(2) + " MB";

      // Logika pengolahan file
      const data = {
        skripsi_file: {
          file_name_skripsi: file.name,
          file_size_skripsi: fileSizeString,
          buffer: base64String,
        },
      };

      // Panggil fungsi untuk mengirim file ke server
      sendDokumenSkripsiToServer(data);
    };

    reader.readAsDataURL(file);
  };

  const sendDokumenSkripsiToServer = (data) => {
    console.log("Dokumen skripsi yang akan diunggah: ", data);
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/skripsi-document/${skripsiId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil unggah dokumen skripsi: ", response.data.data);

        // request data
        const fetchDokumenSkripsiData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/skripsi-document/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDokumenSkripsi(response.data.data);
            console.log("Request Get dokumen skripsi: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil dokumen skripsi:",
              error
            );
          }
        };
        fetchDokumenSkripsiData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat mengunggah dokumen skripsi:",
          error.response.data.message
        );
      })
      .finally(() => {
        setSubmittionSkripsi(false);
      });
  };

  const handleUnggahBuktiPembayaran = (event) => {
    const file = event.target.files[0];

    // Cek apakah pengguna memilih file atau membatalkan
    if (!file) {
      // Tidak ada file dipilih, tidak perlu menonaktifkan tombol
      return;
    }

    // Nonaktifkan tombol unggah pembayaran
    setSubmittionPayment(true);

    // Validasi tipe file
    const allowedFileTypes = ["application/pdf"];

    if (!allowedFileTypes.includes(file.type)) {
      console.error("Tipe file tidak valid");
      setSubmittionPayment(false); // Aktifkan kembali tombol
      return;
    }

    const reader = new FileReader();

    // Menangani kesalahan FileReader
    reader.onerror = (error) => {
      console.error("Terjadi kesalahan saat membaca file:", error);
    };

    reader.onload = (e) => {
      const dataURL = e.target.result;

      // Mengonversi data URL ke base64
      const base64String = dataURL.split(",")[1];

      // Logika pengolahan file
      const fileSizeInKB = file.size / 1024; // Konversi ke KB
      const fileSizeString =
        fileSizeInKB < 1024
          ? fileSizeInKB.toFixed(2) + " KB"
          : (fileSizeInKB / 1024).toFixed(2) + " MB";

      // Logika pengolahan file
      const data = {
        payment_file: {
          file_name_payment: file.name,
          file_size_payment: fileSizeString,
          buffer: base64String,
        },
      };

      // Panggil fungsi untuk mengirim file ke server
      sendBuktiPembayaranToServer(data);
    };

    reader.readAsDataURL(file);
  };

  const sendBuktiPembayaranToServer = (data) => {
    console.log("Bukti pembayaran yang akan diunggah: ", data);
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/skripsi-payment/${skripsiId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil unggah bukti pembayaran: ", response.data.data);

        // request data
        const fetchBuktiPembayaranData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/skripsi-payment/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setBuktiPembayaran(response.data.data);
            console.log("Request Get bukti pembayaran: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil bukti pembayaran:",
              error
            );
          }
        };
        fetchBuktiPembayaranData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat mengunggah bukti pembayaran:",
          error.response.data.message
        );
      })
      .finally(() => {
        setSubmittionPayment(false);
      });
  };

  const handleUnggahPlagiat = (event) => {
    const file = event.target.files[0];

    // Cek apakah pengguna memilih file atau membatalkan
    if (!file) {
      // Tidak ada file dipilih, tidak perlu menonaktifkan tombol
      return;
    }

    // Nonaktifkan tombol unggah pembayaran
    setSubmittionPlagiat(true);

    // Validasi tipe file
    const allowedFileTypes = ["application/pdf"];

    if (!allowedFileTypes.includes(file.type)) {
      console.error("Tipe file tidak valid");
      setSubmittionPlagiat(false); // Aktifkan kembali tombol
      return;
    }

    const reader = new FileReader();

    // Menangani kesalahan FileReader
    reader.onerror = (error) => {
      console.error("Terjadi kesalahan saat membaca file:", error);
    };

    reader.onload = (e) => {
      const dataURL = e.target.result;

      // Mengonversi data URL ke base64
      const base64String = dataURL.split(",")[1];

      // Logika pengolahan file
      const fileSizeInKB = file.size / 1024; // Konversi ke KB
      const fileSizeString =
        fileSizeInKB < 1024
          ? fileSizeInKB.toFixed(2) + " KB"
          : (fileSizeInKB / 1024).toFixed(2) + " MB";

      // Logika pengolahan file
      const data = {
        plagiarism_file: {
          file_name_plagiarismcheck: file.name,
          file_size_plagiarismcheck: fileSizeString,
          buffer: base64String,
        },
      };

      // Panggil fungsi untuk mengirim file ke server
      sendPlagiatToServer(data);
    };

    reader.readAsDataURL(file);
  };

  const sendPlagiatToServer = (data) => {
    console.log("Hasil cek plagiat yang akan diunggah: ", data);
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/skripsi-plagiarism-check/${skripsiId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil unggah hasil cek plagiat: ", response.data.data);

        // request data
        const fetchHasilCekPlagiatData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/skripsi-plagiarism-check/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setHasilCekPlagiat(response.data.data);
            console.log("Request Get hasil cek plagiat: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil hail cek plagiat:",
              error
            );
          }
        };
        fetchHasilCekPlagiatData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat mengunggah hasil cek plagiat:",
          error.response.data.message
        );
      })
      .finally(() => {
        setSubmittionPlagiat(false);
      });
  };

  const handleHapusDokumenSkripsi = () => {
    // Nonaktifkan tombol Hapus
    setSubmittionSkripsi(true);

    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/skripsi-document/delete/${skripsiId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil menghapus dokumen skripsi: ", response.data.data);

        // request data
        const fetchDokumenSkripsiData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/skripsi-document/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDokumenSkripsi(response.data.data);
            console.log("Request Get dokumen skripsi: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil dokumen skripsi:",
              error
            );
          }
        };
        fetchDokumenSkripsiData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat menghapus dokumen skripsi:",
          error.response.data.message
        );
      })
      .finally(() => {
        // Aktifkan tombol Hapus
        setSubmittionSkripsi(false);
      });
  };

  const handleHapusBuktiPembayaran = () => {
    // Nonaktifkan tombol Hapus
    setSubmittionPayment(true);

    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/skripsi-payment/delete/${skripsiId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(
          "Berhasil menghapus bukti pembayaran: ",
          response.data.data
        );

        // request data
        const fetchBuktiPembayaranData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/skripsi-payment/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setBuktiPembayaran(response.data.data);
            console.log("Request Get bukti pembayaran: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil bukti pembayaran:",
              error
            );
          }
        };
        fetchBuktiPembayaranData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat menghapus bukti pembayaran:",
          error.response.data.message
        );
      })
      .finally(() => {
        // Aktifkan tombol Hapus
        setSubmittionPayment(false);
      });
  };

  const handleHapusPlagiat = () => {
    // Nonaktifkan tombol Hapus
    setSubmittionPlagiat(true);

    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/skripsi-plagiarism-check/delete/${skripsiId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(
          "Berhasil menghapus hasil cek plagiat: ",
          response.data.data
        );

        // request data
        const fetchHasilCekPlagiatData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/skripsi-plagiarism-check/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setHasilCekPlagiat(response.data.data);
            console.log("Request Get hasil cek plagiat: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil hail cek plagiat:",
              error
            );
          }
        };
        fetchHasilCekPlagiatData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat menghapus hasil cek plagiat:",
          error.response.data.message
        );
      })
      .finally(() => {
        // Aktifkan tombol Hapus
        setSubmittionPlagiat(false);
      });
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
          Unggah Skripsi
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
                setSkripsiId(data.skripsi_id);
                setAdvisorAndCoAdvisor({
                  coAdvisor1: data.co_advisor1,
                  coAdvisor2: data.co_advisor2,
                });
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
            hidden={userRole === "MAHASISWA" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuMahasiswa
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Unggah Skripsi"}
            />
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
              Unggah Dokumen Skripsi
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
              {/* file upload Start */}
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    textTransform: "none",
                    background: isSubmittingSkripsi ? "#A0A0A0" : "#006AF5",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "6px",
                    width: "150px",
                    height: "30px",
                    cursor: isSubmittingSkripsi ? "not-allowed" : "pointer",
                    "&:hover": {
                      background: isSubmittingSkripsi ? "#A0A0A0" : "#006AF5",
                    },
                  }}
                  disabled={isSubmittingSkripsi}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleUnggahDokumenProposal}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end */}

              {/* Table Upload Skripsi Start*/}
              <TableContainer sx={{ marginBottom: "25px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5", width: "100%" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      {/* <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "3%" }}
                      >
                        Nomor
                      </TableCell> */}
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
                      {advisorAndCoAdvisor?.coAdvisor1 && (
                        <TableCell
                          sx={{
                            fontSize: "12px",
                            padding: "11px",
                            width: "15%",
                          }}
                        >
                          Co-Advisor 1
                        </TableCell>
                      )}
                      {advisorAndCoAdvisor?.coAdvisor2 && (
                        <TableCell
                          sx={{
                            fontSize: "12px",
                            padding: "11px",
                            width: "15%",
                          }}
                        >
                          Co-Advisor 2
                        </TableCell>
                      )}
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
                      {/* <TableCell>{index + 1}</TableCell> */}
                      <TableCell sx={{ fontSize: "12px" }}>
                        {dokumenSkripsi?.file_name_skripsi}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {dokumenSkripsi?.upload_date_skripsi}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {dokumenSkripsi?.file_size_skripsi}
                      </TableCell>
                      {/* status Advisor */}
                      <TableCell>
                        {dokumenSkripsi?.is_skripsi_approve_by_advisor ===
                        "Waiting" ? (
                          <Chip
                            size="small"
                            label={"Menunggu"}
                            sx={{
                              background: "rgba(255, 204, 0, 0.10)",
                              color: "#985211",
                            }}
                          />
                        ) : dokumenSkripsi?.is_skripsi_approve_by_advisor ===
                          "Approve" ? (
                          <Chip
                            size="small"
                            label={"Disetujui"}
                            sx={{
                              background: "rgba(21, 131, 67, 0.10)",
                              color: "#0A7637",
                            }}
                          />
                        ) : dokumenSkripsi?.is_skripsi_approve_by_advisor ===
                          "Rejected" ? (
                          <Chip
                            size="small"
                            label={"Ditolak"}
                            sx={{
                              background: "rgba(226, 29, 18, 0.10)",
                              color: "#CA150C",
                            }}
                          />
                        ) : (
                          dokumenSkripsi?.is_skripsi_approve_by_advisor
                        )}
                      </TableCell>
                      {/* status CoAdvisor 1 */}
                      {advisorAndCoAdvisor?.coAdvisor1 && (
                        <TableCell>
                          {dokumenSkripsi?.is_skripsi_approve_by_co_advisor1 ===
                          "Waiting" ? (
                            <Chip
                              size="small"
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : dokumenSkripsi?.is_skripsi_approve_by_co_advisor1 ===
                            "Approve" ? (
                            <Chip
                              size="small"
                              label={"Disetujui"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : dokumenSkripsi?.is_skripsi_approve_by_co_advisor1 ===
                            "Rejected" ? (
                            <Chip
                              size="small"
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            dokumenSkripsi?.is_skripsi_approve_by_co_advisor1
                          )}
                        </TableCell>
                      )}
                      {/* status CoAdvisor 2 */}
                      {advisorAndCoAdvisor?.coAdvisor2 && (
                        <TableCell>
                          {dokumenSkripsi?.is_skripsi_approve_by_co_advisor2 ===
                          "Waiting" ? (
                            <Chip
                              size="small"
                              label={"Menunggu"}
                              sx={{
                                background: "rgba(255, 204, 0, 0.10)",
                                color: "#985211",
                              }}
                            />
                          ) : dokumenSkripsi?.is_skripsi_approve_by_co_advisor2 ===
                            "Approve" ? (
                            <Chip
                              size="small"
                              label={"Disetujui"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          ) : dokumenSkripsi?.is_skripsi_approve_by_co_advisor2 ===
                            "Rejected" ? (
                            <Chip
                              size="small"
                              label={"Ditolak"}
                              sx={{
                                background: "rgba(226, 29, 18, 0.10)",
                                color: "#CA150C",
                              }}
                            />
                          ) : (
                            dokumenSkripsi?.is_skripsi_approve_by_co_advisor2
                          )}
                        </TableCell>
                      )}
                      <TableCell>
                        {dokumenSkripsi?.file_name_skripsi !== null && (
                          <Div sx={{ display: "flex" }}>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "blue",
                                fontSize: "12px",
                              }}
                            >
                              <PDFViewerSkripsi
                                dokumenSkripsi={dokumenSkripsi}
                                isUploading={isSubmittingSkripsi}
                              />
                            </span>
                            <Div
                              style={{
                                margin: "0 5px", // Margin di sekitar garis vertikal
                                color: "#E0E0E0",
                              }}
                            >
                              |
                            </Div>
                            {/* tombol unggah proposal jika tidak ada co-advisor */}
                            {advisorAndCoAdvisor?.coAdvisor1 === null &&
                              advisorAndCoAdvisor?.coAdvisor2 === null && (
                                <span
                                  style={{
                                    textDecoration: "none",
                                    cursor:
                                      isSubmittingSkripsi ||
                                      dokumenSkripsi?.is_skripsi_approve_by_advisor ===
                                        "Approve"
                                        ? "not-allowed"
                                        : "pointer",
                                    color:
                                      isSubmittingSkripsi ||
                                      dokumenSkripsi?.is_skripsi_approve_by_advisor ===
                                        "Approve"
                                        ? "#A0A0A0"
                                        : "red",
                                    fontSize: "12px",
                                  }}
                                  onClick={() => {
                                    if (
                                      !isSubmittingSkripsi &&
                                      dokumenSkripsi?.is_skripsi_approve_by_advisor !==
                                        "Approve"
                                    ) {
                                      handleHapusDokumenSkripsi();
                                    }
                                  }}
                                  disabled={
                                    isSubmittingSkripsi ||
                                    dokumenSkripsi?.is_skripsi_approve_by_advisor ===
                                      "Approve"
                                  }
                                >
                                  Hapus
                                </span>
                              )}
                            {/* tombol unggah proposal jika ada co-advisor 1 saja */}
                            {advisorAndCoAdvisor?.coAdvisor1 &&
                              advisorAndCoAdvisor?.coAdvisor2 === null && (
                                <span
                                  style={{
                                    textDecoration: "none",
                                    cursor:
                                      isSubmittingSkripsi ||
                                      (dokumenSkripsi?.is_skripsi_approve_by_advisor ===
                                        "Approve" &&
                                        dokumenSkripsi?.is_skripsi_approve_by_co_advisor1 ===
                                          "Approve")
                                        ? "not-allowed"
                                        : "pointer",
                                    color:
                                      isSubmittingSkripsi ||
                                      (dokumenSkripsi?.is_skripsi_approve_by_advisor ===
                                        "Approve" &&
                                        dokumenSkripsi?.is_skripsi_approve_by_co_advisor1 ===
                                          "Approve")
                                        ? "#A0A0A0"
                                        : "red",
                                    fontSize: "12px",
                                  }}
                                  onClick={() => {
                                    if (
                                      !isSubmittingSkripsi &&
                                      dokumenSkripsi?.is_skripsi_approve_by_advisor !==
                                        "Approve" &&
                                      dokumenSkripsi?.is_skripsi_approve_by_co_advisor1 !==
                                        "Approve"
                                    ) {
                                      handleHapusDokumenSkripsi();
                                    }
                                  }}
                                  disabled={
                                    isSubmittingSkripsi ||
                                    (dokumenSkripsi?.is_skripsi_approve_by_advisor ===
                                      "Approve" &&
                                      dokumenSkripsi?.is_skripsi_approve_by_co_advisor1 ===
                                        "Approve")
                                  }
                                >
                                  Hapus
                                </span>
                              )}
                            {/* tombol unggah proposal jika ada co-advisor 1 dan 2 */}
                            {advisorAndCoAdvisor?.coAdvisor1 &&
                              advisorAndCoAdvisor?.coAdvisor2 && (
                                <span
                                  style={{
                                    textDecoration: "none",
                                    cursor:
                                      isSubmittingSkripsi ||
                                      (dokumenSkripsi?.is_skripsi_approve_by_advisor ===
                                        "Approve" &&
                                        dokumenSkripsi?.is_skripsi_approve_by_co_advisor1 ===
                                          "Approve" &&
                                        dokumenSkripsi?.is_skripsi_approve_by_co_advisor2 ===
                                          "Approve")
                                        ? "not-allowed"
                                        : "pointer",
                                    color:
                                      isSubmittingSkripsi ||
                                      (dokumenSkripsi?.is_skripsi_approve_by_advisor ===
                                        "Approve" &&
                                        dokumenSkripsi?.is_skripsi_approve_by_co_advisor1 ===
                                          "Approve" &&
                                        dokumenSkripsi?.is_skripsi_approve_by_co_advisor2 ===
                                          "Approve")
                                        ? "#A0A0A0"
                                        : "red",
                                    fontSize: "12px",
                                  }}
                                  onClick={() => {
                                    if (
                                      !isSubmittingSkripsi &&
                                      dokumenSkripsi?.is_skripsi_approve_by_advisor !==
                                        "Approve" &&
                                      dokumenSkripsi?.is_skripsi_approve_by_co_advisor1 !==
                                        "Approve" &&
                                      dokumenSkripsi?.is_skripsi_approve_by_co_advisor2 !==
                                        "Approve"
                                    ) {
                                      handleHapusDokumenSkripsi();
                                    }
                                  }}
                                  disabled={
                                    isSubmittingSkripsi ||
                                    (dokumenSkripsi?.is_skripsi_approve_by_advisor ===
                                      "Approve" &&
                                      dokumenSkripsi?.is_skripsi_approve_by_co_advisor1 ===
                                        "Approve" &&
                                      dokumenSkripsi?.is_skripsi_approve_by_co_advisor2 ===
                                        "Approve")
                                  }
                                >
                                  Hapus
                                </span>
                              )}
                          </Div>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload Skripsi End */}
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
              Unggah Bukti Pembayaran
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
              {/* file upload for Payment */}
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    textTransform: "none",
                    background: isSubmittingPayment ? "#A0A0A0" : "#006AF5",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "6px",
                    width: "150px",
                    height: "30px",
                    cursor: isSubmittingPayment ? "not-allowed" : "pointer",
                    "&:hover": {
                      background: isSubmittingPayment ? "#A0A0A0" : "#006AF5",
                    },
                  }}
                  disabled={isSubmittingPayment}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleUnggahBuktiPembayaran}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end for Payment */}

              {/* Table Upload Payment Start*/}
              <TableContainer sx={{ marginBottom: "25px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      {/* <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "3%" }}
                      >
                        Nomor
                      </TableCell> */}
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
                      {/* <TableCell sx={{ fontSize: "12px" }}>
                          {index + 1}
                        </TableCell> */}
                      <TableCell sx={{ fontSize: "12px" }}>
                        {buktiPembayaran?.file_name_payment}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {buktiPembayaran?.upload_date_payment}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {buktiPembayaran?.file_size_payment}
                      </TableCell>
                      <TableCell>
                        {buktiPembayaran?.file_name_payment !== null && (
                          <Div sx={{ display: "flex" }}>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "blue",
                                fontSize: "12px",
                              }}
                            >
                              <PDFViewerPayment
                                paymentFile={buktiPembayaran}
                                isUploading={isSubmittingPayment}
                              />
                            </span>
                            <Div
                              style={{
                                margin: "0 5px", // Margin di sekitar garis vertikal
                                color: "#E0E0E0",
                              }}
                            >
                              |
                            </Div>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: isSubmittingPayment
                                  ? "not-allowed"
                                  : "pointer",
                                color: isSubmittingPayment ? "#A0A0A0" : "red",
                                fontSize: "12px",
                              }}
                              onClick={handleHapusBuktiPembayaran}
                              disabled={isSubmittingPayment}
                            >
                              Hapus
                            </span>
                          </Div>
                        )}
                      </TableCell>
                    </TableRow>
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
              Unggah Hasil Cek plagiat
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
              {/* file upload for Payment */}
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    textTransform: "none",
                    background: isSubmittingPlagiat ? "#A0A0A0" : "#006AF5",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "6px",
                    width: "150px",
                    height: "30px",
                    cursor: isSubmittingPlagiat ? "not-allowed" : "pointer",
                    "&:hover": {
                      background: isSubmittingPlagiat ? "#A0A0A0" : "#006AF5",
                    },
                  }}
                  disabled={isSubmittingPlagiat}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleUnggahPlagiat}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end for Payment */}

              {/* Table Upload Payment Start*/}
              <TableContainer sx={{ marginBottom: "25px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      {/* <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "3%" }}
                      >
                        Nomor
                      </TableCell> */}
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
                      {/* <TableCell sx={{ fontSize: "12px" }}>
                          {index + 1}
                        </TableCell> */}
                      <TableCell sx={{ fontSize: "12px" }}>
                        {hasilCekPlagiat?.file_name_plagiarismcheck}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {hasilCekPlagiat?.upload_date_plagiarismcheck}
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px" }}>
                        {hasilCekPlagiat?.file_size_plagiarismcheck} bytes
                      </TableCell>
                      <TableCell>
                        {hasilCekPlagiat?.file_name_plagiarismcheck !==
                          null && (
                          <Div sx={{ display: "flex" }}>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "blue",
                                fontSize: "12px",
                              }}
                            >
                              <PDFViewerCekPlagiat
                                plagiarismFile={hasilCekPlagiat}
                                isUploading={isSubmittingPlagiat}
                              />
                            </span>
                            <Div
                              style={{
                                margin: "0 5px", // Margin di sekitar garis vertikal
                                color: "#E0E0E0",
                              }}
                            >
                              |
                            </Div>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: isSubmittingPlagiat
                                  ? "not-allowed"
                                  : "pointer",
                                color: isSubmittingPlagiat ? "#A0A0A0" : "red",
                                fontSize: "12px",
                              }}
                              onClick={handleHapusPlagiat}
                              disabled={isSubmittingPlagiat}
                            >
                              Hapus
                            </span>
                          </Div>
                        )}
                      </TableCell>
                    </TableRow>
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

export default UploadSkipsi;
