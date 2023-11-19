import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
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

// View Document HKI
const PDFViewerHKI = ({ HKI, isUploading }) => {
  const viewPDFHKI = () => {
    if (isUploading) {
      // Jangan lakukan apa pun jika sedang mengunggah
      return;
    }

    // Buat URL objek untuk file PDF
    const pdfURL = HKI.file_path_hki;

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
        onClick={viewPDFHKI}
      >
        Lihat
      </span>
    </div>
  );
};

// View Document Artikel Jurnal
const PDFViewerArtikelJurnal = ({ jurnal, isUploading }) => {
  const viewPDFArtikelJurnal = () => {
    if (isUploading) {
      // Jangan lakukan apa pun jika sedang mengunggah
      return;
    }

    // Buat URL objek untuk file PDF
    const pdfURL = jurnal?.file_path_journal;

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
        onClick={viewPDFArtikelJurnal}
      >
        Lihat
      </span>
    </div>
  );
};

// View Document Source Code
const PDFViewerSourceCode = ({ sourceCode, isUploading }) => {
  const viewPDFSourceCode = () => {
    if (isUploading) {
      // Jangan lakukan apa pun jika sedang mengunggah
      return;
    }

    // Buat URL objek untuk file PDF
    const pdfURL = sourceCode?.file_path_sourcecode;

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
        onClick={viewPDFSourceCode}
      >
        Lihat
      </span>
    </div>
  );
};

const ArsipDocument = () => {
  // state - menyimpan request data
  const [HKI, setHKI] = useState();
  const [jurnal, setJurnal] = useState();
  const [sourceCode, setSourceCode] = useState();
  const [linkSourceCode, setLinkSourceCode] = useState();

  // state - disabled button
  const [isSubmittingHKI, setSubmittionHKI] = useState(false);
  const [isSubmittingJurnal, setSubmittionJurnal] = useState(false);
  const [isSubmittingSourceCode, setSubmittionSourceCode] = useState(false);
  const [isSubmittingLink, setSubmittionLink] = useState(false);

  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);
  const [skripsiId, setSkripsiId] = useState(null);

  const role = useParams().role;
  console.log(role);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchHKIData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/hki/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setHKI(response.data.data);
        console.log("Request Get HKI: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil HKI:", error);
      }
    };
    const fetchJurnalData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/journal/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setJurnal(response.data.data);
        console.log("Request Get jurnal: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil jurnal:", error);
      }
    };
    const fetchSourceCodeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/source-code/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setSourceCode(response.data.data);
        console.log("Request Get source code: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil source code:", error);
      }
    };
    const fetchLinkSourceCodeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/link-source-code/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setLinkSourceCode(response.data.data);
        console.log("Request Get link source code: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil link source code:",
          error
        );
      }
    };
    fetchHKIData();
    fetchJurnalData();
    fetchSourceCodeData();
    fetchLinkSourceCodeData();
  }, [token, skripsiId]);

  // HKI
  const handleUnggahHKI = (event) => {
    const file = event.target.files[0];

    // Cek apakah pengguna memilih file atau membatalkan
    if (!file) {
      // Tidak ada file dipilih, tidak perlu menonaktifkan tombol
      return;
    }

    // Nonaktifkan tombol unggah pembayaran
    setSubmittionHKI(true);

    // Validasi tipe file
    const allowedFileTypes = ["application/pdf"];

    if (!allowedFileTypes.includes(file.type)) {
      console.error("Tipe file tidak valid");
      setSubmittionHKI(false); // Aktifkan kembali tombol
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
        hki_file: {
          file_name_hki: file.name,
          file_size_hki: fileSizeString,
          buffer: base64String,
        },
      };

      // Panggil fungsi untuk mengirim file ke server
      sendHKIToServer(data);
    };

    reader.readAsDataURL(file);
  };

  const sendHKIToServer = (data) => {
    console.log("HKI yang akan diunggah: ", data);
    axios
      .put(`http://localhost:2000/api/v1/skripsi/hki/${skripsiId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Berhasil unggah HKI: ", response.data.data);

        // request data
        const fetchHKIData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/hki/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setHKI(response.data.data);
            console.log("Request Get HKI: ", response.data.data);
          } catch (error) {
            console.error("Terjadi kesalahan saat mengambil HKI:", error);
          }
        };
        fetchHKIData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat mengunggah HKI:",
          error.response.data.message
        );
      })
      .finally(() => {
        setSubmittionHKI(false);
      });
  };

  // Jurnal

  const handleUnggahJurnal = (event) => {
    const file = event.target.files[0];

    // Cek apakah pengguna memilih file atau membatalkan
    if (!file) {
      // Tidak ada file dipilih, tidak perlu menonaktifkan tombol
      return;
    }

    // Nonaktifkan tombol unggah pembayaran
    setSubmittionJurnal(true);

    // Validasi tipe file
    const allowedFileTypes = ["application/pdf"];

    if (!allowedFileTypes.includes(file.type)) {
      console.error("Tipe file tidak valid");
      setSubmittionJurnal(false); // Aktifkan kembali tombol
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
        journal_file: {
          file_name_journal: file.name,
          file_size_journal: fileSizeString,
          buffer: base64String,
        },
      };

      // Panggil fungsi untuk mengirim file ke server
      sendJurnalToServer(data);
    };

    reader.readAsDataURL(file);
  };

  const sendJurnalToServer = (data) => {
    console.log("Jurnal yang akan diunggah: ", data);
    axios
      .put(`http://localhost:2000/api/v1/skripsi/journal/${skripsiId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Berhasil unggah Jurnal: ", response.data.data);

        // request data
        const fetchJurnalData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/journal/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setJurnal(response.data.data);
            console.log("Request Get jurnal: ", response.data.data);
          } catch (error) {
            console.error("Terjadi kesalahan saat mengambil jurnal:", error);
          }
        };
        fetchJurnalData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat mengunggah Jurnal:",
          error.response.data.message
        );
      })
      .finally(() => {
        setSubmittionJurnal(false);
      });
  };

  // Source Code
  const handleUnggahCode = (event) => {
    const file = event.target.files[0];

    // Cek apakah pengguna memilih file atau membatalkan
    if (!file) {
      // Tidak ada file dipilih, tidak perlu menonaktifkan tombol
      return;
    }

    // Nonaktifkan tombol unggah pembayaran
    setSubmittionSourceCode(true);

    // Validasi ekstensi file
    const allowedFileExtensions = ["zip"];

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedFileExtensions.includes(fileExtension)) {
      console.error("Ekstensi file tidak valid:", fileExtension);
      setSubmittionSourceCode(false); // Aktifkan kembali tombol
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
        source_code_file: {
          file_name_sourcecode: file.name,
          file_size_sourcecode: fileSizeString,
          buffer: base64String,
        },
      };

      // Panggil fungsi untuk mengirim file ke server
      sendCodeToServer(data);
    };

    reader.readAsDataURL(file);
  };

  const sendCodeToServer = (data) => {
    console.log("Source Code yang akan diunggah: ", data);
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/source-code/${skripsiId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil unggah Source Code: ", response.data.data);

        // request data
        const fetchSourceCodeData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/source-code/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setSourceCode(response.data.data);
            console.log("Request Get source code: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil source code:",
              error
            );
          }
        };
        fetchSourceCodeData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat mengunggah Source Code:",
          error.response.data.message
        );
      })
      .finally(() => {
        setSubmittionSourceCode(false);
      });
  };

  // State untuk Link Source Code
  const [currentLink, setCurrentLink] = useState("");

  const handleUngggahLink = () => {
    if (currentLink !== null) {
      // Nonaktifkan tombol unggah
      setSubmittionLink(true);

      const linkData = {
        link_soucecode: currentLink,
      };
      axios
        .put(
          `http://localhost:2000/api/v1/skripsi/link-source-code/${skripsiId}`,
          linkData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // membersihkan kotak link
          setCurrentLink("");

          console.log("Berhasil unggah link: ", response.data.data);

          // request data
          const fetchLinkSourceCodeData = async () => {
            try {
              const response = await axios.get(
                `http://localhost:2000/api/v1/skripsi/link-source-code/${skripsiId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                  },
                }
              );
              setLinkSourceCode(response.data.data);
              console.log("Request Get link source code: ", response.data.data);
            } catch (error) {
              console.error(
                "Terjadi kesalahan saat mengambil link source code:",
                error
              );
            }
          };
          fetchLinkSourceCodeData();
        })
        .catch((error) => {
          console.error(
            "Terjadi kesalahan saat mengunggah link:",
            error.response.data.message
          );
        })
        .finally(() => {
          setSubmittionLink(false);
        });
    } else {
      // masukkan handle message error bahwa link harus di masukkan
    }
  };

  const handleHapusHKI = () => {
    // Nonaktifkan tombol Hapus
    setSubmittionHKI(true);

    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/hki/delete/${skripsiId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil menghapus HKI: ", response.data.data);

        // request data
        const fetchHKIData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/hki/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setHKI(response.data.data);
            console.log("Request Get HKI: ", response.data.data);
          } catch (error) {
            console.error("Terjadi kesalahan saat mengambil HKI:", error);
          }
        };
        fetchHKIData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat menghapus HKI:",
          error.response.data.message
        );
      })
      .finally(() => {
        // Aktifkan tombol Hapus
        setSubmittionHKI(false);
      });
  };

  const handleHapusJurnal = () => {
    // Nonaktifkan tombol Hapus
    setSubmittionJurnal(true);

    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/journal/delete/${skripsiId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil menghapus Jurnal: ", response.data.data);

        // request data
        const fetchJurnalData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/journal/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setJurnal(response.data.data);
            console.log("Request Get jurnal: ", response.data.data);
          } catch (error) {
            console.error("Terjadi kesalahan saat mengambil jurnal:", error);
          }
        };
        fetchJurnalData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat menghapus Jurnal:",
          error.response.data.message
        );
      })
      .finally(() => {
        // Aktifkan tombol Hapus
        setSubmittionSourceCode(false);
      });
  };

  const handleHapusCode = () => {
    // Nonaktifkan tombol Hapus
    setSubmittionSourceCode(true);

    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/source-code/delete/${skripsiId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil menghapus Source Code: ", response.data.data);

        // request data
        const fetchSourceCodeData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/source-code/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setSourceCode(response.data.data);
            console.log("Request Get source code: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil source code:",
              error
            );
          }
        };
        fetchSourceCodeData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat menghapus Source Code:",
          error.response.data.message
        );
      })
      .finally(() => {
        // Aktifkan tombol Hapus
        setSubmittionSourceCode(false);
      });
  };

  const handleHapusLink = () => {
    // Nonaktifkan tombol Hapus
    setSubmittionLink(true);

    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/link-source-code/delete/${skripsiId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // membersihkan kotak link
        setCurrentLink("");

        console.log("Berhasil menghapus Link: ", response.data.data);

        // request data
        const fetchLinkSourceCodeData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/link-source-code/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setLinkSourceCode(response.data.data);
            console.log("Request Get link source code: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil link source code:",
              error
            );
          }
        };
        fetchLinkSourceCodeData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat menghapus Link:",
          error.response.data.message
        );
      })
      .finally(() => {
        // Aktifkan tombol Hapus
        setSubmittionLink(false);
      });
  };

  // Fungsi untuk membatasi panjang tampilan link dengan pembagian baris
  const breakLongLink = (link) => {
    const maxLength = 25; // Panjang maksimum per baris
    const regex = new RegExp(`.{1,${maxLength}}`, "g");
    if (link !== null) {
      return link.match(regex).join("\n");
    }
  };

  // fungsi untuk membuka situs web link
  const openLink = (url) => {
    window.open(url, "_blank"); // Membuka tautan dalam tab atau jendela baru
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
          Arsip Document
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
            hidden={role === "MAHASISWA" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuMahasiswa
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Arsip Dokumen"}
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
              Unggah Dokumen HKI
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
                    background: isSubmittingHKI ? "#A0A0A0" : "#006AF5",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "6px",
                    width: "150px",
                    height: "30px",
                    cursor: isSubmittingHKI ? "not-allowed" : "pointer",
                    "&:hover": {
                      background: isSubmittingHKI ? "#A0A0A0" : "#006AF5",
                    },
                  }}
                  disabled={isSubmittingHKI}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleUnggahHKI}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end */}

              {/* Table Upload HKI Start*/}
              <TableContainer sx={{ marginBottom: "25px" }} component={Paper}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5", width: "100%" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      {/* <TableCell sx={{ fontSize: "12px", width: "3%" }}>
                        Nomor
                      </TableCell> */}
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: "45%",
                        }}
                      >
                        Nama File
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "12px",
                          padding: "11px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: "20%",
                        }}
                      >
                        Tanggal
                      </TableCell>
                      <TableCell sx={{ fontSize: "12px", width: "20%" }}>
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
                    {HKI && (
                      <TableRow>
                        {/* <TableCell>1</TableCell> */}
                        <TableCell sx={{ fontSize: "12px" }}>
                          {HKI?.file_name_hki}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {HKI?.upload_date_hki}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {HKI?.file_size_hki}
                        </TableCell>
                        <TableCell>
                          {HKI?.file_name_hki !== null && (
                            <Div sx={{ display: "flex" }}>
                              <span
                                style={{
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  color: "blue",
                                  fontSize: "12px",
                                }}
                              >
                                <PDFViewerHKI
                                  HKI={HKI}
                                  isUploading={isSubmittingHKI}
                                />
                              </span>
                              <Div
                                style={{
                                  margin: "0 5px",
                                  color: "#E0E0E0",
                                }}
                              >
                                |
                              </Div>
                              <span
                                style={{
                                  textDecoration: "none",
                                  cursor: isSubmittingHKI
                                    ? "not-allowed"
                                    : "pointer",
                                  color: isSubmittingHKI ? "#A0A0A0" : "red",
                                  fontSize: "12px",
                                }}
                                onClick={handleHapusHKI}
                                disabled={isSubmittingHKI}
                              >
                                Hapus
                              </span>
                            </Div>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload HKI End */}
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
              Unggah Artikel Jurnal
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
              {/* file upload for Artikel Jurnal */}
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                }}
                component={Paper}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    textTransform: "none",
                    background: isSubmittingJurnal ? "#A0A0A0" : "#006AF5",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "6px",
                    width: "150px",
                    height: "30px",
                    cursor: isSubmittingJurnal ? "not-allowed" : "pointer",
                    "&:hover": {
                      background: isSubmittingJurnal ? "#A0A0A0" : "#006AF5",
                    },
                  }}
                  disabled={isSubmittingJurnal}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleUnggahJurnal}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end for Artikel Jurnal */}

              {/* Table Upload Artikel Jurnal Start*/}
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
                    {jurnal && (
                      <TableRow key={jurnal?.id}>
                        {/* <TableCell sx={{ fontSize: "12px" }}>1</TableCell> */}
                        <TableCell sx={{ fontSize: "12px" }}>
                          {jurnal?.file_name_journal}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {jurnal?.upload_date_journal}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {jurnal?.file_size_journal}
                        </TableCell>
                        <TableCell>
                          {jurnal?.file_name_journal !== null && (
                            <Div sx={{ display: "flex" }}>
                              <span
                                style={{
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  color: "blue",
                                  fontSize: "12px",
                                }}
                              >
                                <PDFViewerArtikelJurnal
                                  jurnal={jurnal}
                                  isUploading={isSubmittingJurnal}
                                />
                              </span>
                              <Div
                                style={{
                                  margin: "0 5px",
                                  color: "#E0E0E0",
                                }}
                              >
                                |
                              </Div>
                              <span
                                style={{
                                  textDecoration: "none",
                                  cursor: isSubmittingJurnal
                                    ? "not-allowed"
                                    : "pointer",
                                  color: isSubmittingJurnal ? "#A0A0A0" : "red",
                                  fontSize: "12px",
                                }}
                                onClick={handleHapusJurnal}
                                disabled={isSubmittingJurnal}
                              >
                                Hapus
                              </span>
                            </Div>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload Artikel Jurnal End*/}
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
                fontWeight: 600,
              }}
            >
              Unggah Source code
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
              {/* file upload for Source Code */}
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
                    background: isSubmittingSourceCode ? "#A0A0A0" : "#006AF5",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "6px",
                    width: "150px",
                    height: "30px",
                    cursor: isSubmittingSourceCode ? "not-allowed" : "pointer",
                    "&:hover": {
                      background: isSubmittingSourceCode
                        ? "#A0A0A0"
                        : "#006AF5",
                    },
                  }}
                  disabled={isSubmittingSourceCode}
                >
                  <input
                    type="file"
                    accept=".zip"
                    onChange={handleUnggahCode}
                    style={{ display: "none" }}
                  />
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah file
                </Button>
              </Div>
              {/* file upload end for Source Code */}

              {/* Table Upload Source Code Start*/}
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
                    {sourceCode && (
                      <TableRow>
                        {/* <TableCell sx={{ fontSize: "12px" }}>1</TableCell> */}
                        <TableCell sx={{ fontSize: "12px" }}>
                          {sourceCode?.file_name_sourcecode}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {sourceCode?.upload_date_sourcecode}
                        </TableCell>
                        <TableCell sx={{ fontSize: "12px" }}>
                          {sourceCode?.file_size_sourcecode}
                        </TableCell>
                        <TableCell>
                          {sourceCode?.file_name_sourcecode !== null && (
                            <Div sx={{ display: "flex" }}>
                              <span
                                style={{
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  color: "blue",
                                  fontSize: "12px",
                                }}
                              >
                                <PDFViewerSourceCode
                                  sourceCode={sourceCode}
                                  isUploading={isSubmittingSourceCode}
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
                                  cursor: isSubmittingSourceCode
                                    ? "not-allowed"
                                    : "pointer",
                                  color: isSubmittingSourceCode
                                    ? "#A0A0A0"
                                    : "red",
                                  fontSize: "12px",
                                }}
                                onClick={handleHapusCode}
                                disabled={isSubmittingSourceCode}
                              >
                                Hapus
                              </span>
                            </Div>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Upload Source Code End*/}
              {/* file upload for Link Start */}
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "20px",
                }}
              >
                <input
                  style={{
                    height: "30px",
                    border: "1px solid #ccc",
                    width: "430px",
                    borderRadius: "6px",
                    fontSize: "12px",
                  }}
                  type="text"
                  placeholder="Masukkan link"
                  value={currentLink}
                  onChange={(e) => setCurrentLink(e.target.value)}
                />
                <div style={{ flex: 1 }}></div>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    textTransform: "none",
                    background: isSubmittingLink ? "#A0A0A0" : "#006AF5",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "6px",
                    width: "150px",
                    height: "30px",
                    cursor: isSubmittingLink ? "not-allowed" : "pointer",
                    "&:hover": {
                      background: isSubmittingLink ? "#A0A0A0" : "#006AF5",
                    },
                  }}
                  disabled={isSubmittingLink}
                  onClick={handleUngggahLink}
                >
                  <AttachmentIcon
                    sx={{ fontSize: "14px", marginRight: "5px" }}
                  />
                  Unggah Link
                </Button>
              </Div>
              {/* file upload for Link End */}
              {/* Table upload Link Start */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ background: "#F5F5F5" }}>
                    <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                      {/* <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "3%" }}
                      >
                        No
                      </TableCell> */}
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "65%" }}
                      >
                        Link
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: "12px", padding: "11px", width: "20%" }}
                      >
                        Tanggal
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
                    {linkSourceCode && (
                      <TableRow>
                        {/* <TableCell>1</TableCell> */}
                        <TableCell>
                          <span
                            style={{
                              textDecoration: "underline",
                              cursor: isSubmittingLink
                                ? "not-allowed"
                                : "pointer",
                              color: isSubmittingLink ? "#A0A0A0" : "blue",
                              fontSize: "12px",
                            }}
                            onClick={() =>
                              openLink(linkSourceCode?.link_soucecode)
                            }
                            disabled={isSubmittingLink}
                          >
                            {breakLongLink(linkSourceCode?.link_soucecode)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {linkSourceCode?.upload_date_link_soucecode}
                        </TableCell>
                        <TableCell>
                          {linkSourceCode?.link_soucecode !== null && (
                            <span
                              style={{
                                textDecoration: "none",
                                cursor: isSubmittingLink
                                  ? "not-allowed"
                                  : "pointer",
                                color: isSubmittingLink ? "#A0A0A0" : "red",
                                fontSize: "12px",
                              }}
                              onClick={handleHapusLink}
                              disabled={isSubmittingLink}
                            >
                              Hapus
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table upload Link End */}
            </Div>
            {/* Table 3 End */}
          </Div>
          {/* Element 2 End */}
        </Div>
      </Div>
    </Div>
  );
};

export default ArsipDocument;
