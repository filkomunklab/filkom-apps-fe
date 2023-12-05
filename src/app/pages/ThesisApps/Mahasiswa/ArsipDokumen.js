import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuMahasiswa from "app/shared/MenuHorizontal/menuMahasiswa";
import AttachmentIcon from "@mui/icons-material/Attachment";
import AddIcon from "@mui/icons-material/Add";

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

const formatIndonesianDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0
  const year = date.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

const ArsipDocument = () => {
  // state - menyimpan request data
  const [HKI, setHKI] = useState();
  const [sourceCode, setSourceCode] = useState();
  const [linkList, setLinkList] = useState();

  // state - disabled button
  const [isSubmittingHKI, setSubmittionHKI] = useState(false);
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
    const fetchLinkData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/group/skripsi/all-link/${groupId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setLinkList(response.data.data);
        console.log("Request Get all link: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil semua ink:", error);
      }
    };
    fetchHKIData();
    fetchSourceCodeData();
    fetchLinkData();
  }, [token, skripsiId]);

  const [openUnggahLink, setOpenUnggahLink] = useState(false);
  const [openUpdateLink, setOpenUpdateLink] = useState(false);
  const [newLink, setNewLink] = useState();
  const [newLinkName, setNewLinkName] = useState();
  const [updateLink, setUpdateLink] = useState();
  const [updateLinkName, setUpdateLinkName] = useState();
  const [selectedLinkId, setSelectedLinkId] = useState();
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);

  // Unggah Link
  const handleClickOpenUnggahLink = () => {
    setOpenUnggahLink(true);
  };

  const handleCloseUnggahLink = () => {
    setOpenUnggahLink(false);
  };

  const handleSubmitNewLink = () => {
    const linkData = {
      group_id: groupId,
      name: newLinkName,
      link: newLink,
    };
    console.log("link yang akan diunggah: ", linkData);
    axios
      .post(`http://localhost:2000/api/v1/group/skripsi/link/`, linkData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // membersihkan kotak link
        setNewLink();
        setNewLinkName();

        console.log("Berhasil unggah link: ", response.data.data);

        // request data
        const fetchLinkData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/group/skripsi/all-link/${groupId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setLinkList(response.data.data);
            console.log("Request Get all link: ", response.data.data);
          } catch (error) {
            console.error("Terjadi kesalahan saat mengambil semua ink:", error);
          }
        };
        fetchLinkData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat mengunggah link:",
          error.response.data.message
        );
      });

    handleCloseUnggahLink();
  };

  // Update Link
  const handleOpenUpdateLink = () => {
    setOpenUpdateLink(true);
  };

  const handleCloseUpdateLink = () => {
    setOpenUpdateLink(false);
  };

  const handleSubmitUpdateLink = () => {
    const linkData = {
      name: updateLinkName,
      link: updateLink,
    };
    console.log("link yang akan diperbarui: ", linkData);
    axios
      .put(
        `http://localhost:2000/api/v1/group/skripsi/link/${selectedLinkId}`,
        linkData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // membersihkan kotak link
        setUpdateLink();
        setUpdateLinkName();

        console.log("Berhasil perbarui link: ", response.data.data);

        // request data
        const fetchLinkData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/group/skripsi/all-link/${groupId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setLinkList(response.data.data);
            console.log("Request Get all link: ", response.data.data);
          } catch (error) {
            console.error("Terjadi kesalahan saat mengambil semua ink:", error);
          }
        };
        fetchLinkData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat perbarui link:",
          error.response.data.message
        );
      });

    handleCloseUpdateLink();
  };

  // Delete Link
  const handleDeleteLink = (linkId) => {
    console.log("link id yang akan dihapus: ", linkId);
    axios
      .delete(`http://localhost:2000/api/v1/group/skripsi/link/${linkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Berhasil menghapus link: ", response.data.data);

        // request data
        const fetchLinkData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/group/skripsi/all-link/${groupId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setLinkList(response.data.data);
            console.log("Request Get all link: ", response.data.data);
          } catch (error) {
            console.error("Terjadi kesalahan saat mengambil semua ink:", error);
          }
        };
        fetchLinkData();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus link:", error);
      });
  };

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
              setLinkList(response.data.data);
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
            setLinkList(response.data.data);
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

  //------------------------------Unggah link2 -------------------------------------------
  const [open, setOpen] = useState(false);
  const [linkGroups, setLinkGroups] = useState([]);
  const [newLink2, setNewLink2] = useState({ name: "", url: "" });
  const [editGroupIndex, setEditGroupIndex] = useState(null);
  const [editLinkIndex, setEditLinkIndex] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    groupIndex: null,
    linkIndex: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditGroupIndex(null);
    setEditLinkIndex(null);
    setNewLink2({ name: "", url: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLink2((prevLink) => ({ ...prevLink, [name]: value }));
  };

  const handleAddLink = () => {
    const updatedGroups = [...linkGroups];

    if (editGroupIndex !== null && editLinkIndex !== null) {
      // Editing existing link
      updatedGroups[editGroupIndex].title = newLink2.name;
      updatedGroups[editGroupIndex].links[editLinkIndex] = {
        url: newLink2.url,
        date: new Date().toLocaleDateString("id-ID"),
      };
    } else {
      // Adding new link
      const newLink2Group = {
        title: newLink2.name,
        links: [
          {
            url: newLink2.url,
            date: new Date().toLocaleDateString("id-ID"),
          },
        ],
      };
      updatedGroups.push(newLink2Group);
    }

    setLinkGroups(updatedGroups);
    handleClose();
  };

  const handleEdit = (groupIndex, linkIndex) => {
    const editedLink = linkGroups[groupIndex].links[linkIndex];
    setEditGroupIndex(groupIndex);
    setEditLinkIndex(linkIndex);
    setNewLink2({ name: linkGroups[groupIndex].title, url: editedLink.url });
    setOpen(true);
  };

  const handleDeleteConfirm = (groupIndex, linkIndex) => {
    if (confirmDelete.linkIndex !== null) {
      // Deleting link
      setLinkGroups((prevGroups) => {
        const updatedGroups = [...prevGroups];
        updatedGroups[confirmDelete.groupIndex].links.splice(linkIndex, 1);
        return updatedGroups;
      });
    } else {
      // Deleting entire group
      setLinkGroups((prevGroups) => {
        const updatedGroups = [...prevGroups];
        updatedGroups.splice(groupIndex, 1);
        return updatedGroups;
      });
    }

    setConfirmDelete({ open: false, groupIndex: null, linkIndex: null });
    handleClose();
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
              {/* table upload link2 Start */}
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    textTransform: "none",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "6px",
                    width: "150px",
                    height: "30px",
                  }}
                  onClick={handleClickOpenUnggahLink}
                >
                  <AttachmentIcon sx={{ fontSize: "14px", margin: "5px" }} />
                  Unggah Link
                </Button>
              </Div>

              {/* dialog unggah link */}
              <Dialog
                open={openUnggahLink}
                onClose={handleCloseUnggahLink}
                maxWidth="xs"
                fullWidth
              >
                <DialogTitle>
                  <Typography variant="h3">Unggah Link</Typography>
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="nama"
                    label="Nama Link"
                    type="text"
                    fullWidth
                    value={newLinkName}
                    onChange={(e) => setNewLinkName(e.target.value)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="link"
                    label="Link"
                    type="text"
                    fullWidth
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                  />
                </DialogContent>
                <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <Button
                    onClick={handleCloseUnggahLink}
                    size="small"
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
                    onClick={handleSubmitNewLink}
                    size="small"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    color="primary"
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>

              {/* dialog update link */}
              <Dialog
                open={openUpdateLink}
                onClose={handleCloseUpdateLink}
                maxWidth="xs"
                fullWidth
              >
                <DialogTitle>
                  <Typography variant="h3">Update Link</Typography>
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="nama"
                    label="Nama Link"
                    type="text"
                    fullWidth
                    value={updateLinkName}
                    onChange={(e) => setUpdateLinkName(e.target.value)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="link"
                    label="Link"
                    type="text"
                    fullWidth
                    value={updateLink}
                    onChange={(e) => setUpdateLink(e.target.value)}
                  />
                </DialogContent>
                <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <Button
                    onClick={handleCloseUpdateLink}
                    size="small"
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
                    onClick={handleSubmitUpdateLink}
                    size="small"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    color="primary"
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>

              {linkList?.map((linkdata, index) => (
                <>
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
                    {linkdata.name}
                  </Typography>
                  <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                      <TableHead sx={{ background: "#F5F5F5" }}>
                        <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                          <TableCell
                            sx={{
                              fontSize: "12px",
                              padding: "11px",
                              width: "65%",
                            }}
                          >
                            Link
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "12px",
                              padding: "11px",
                              width: "20%",
                            }}
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
                        <TableRow key={index}>
                          <TableCell sx={{ fontSize: "12px" }}>
                            <a
                              href={linkdata.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "underline",
                                color: "blue",
                              }}
                            >
                              {linkdata.link}
                            </a>
                          </TableCell>
                          <TableCell>{linkdata.date}</TableCell>
                          <TableCell>
                            <Div sx={{ display: "flex" }}>
                              <span
                                style={{
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  color: "blue",
                                  fontSize: "12px",
                                }}
                                onClick={() => {
                                  setSelectedLinkId(linkdata.id);
                                  setUpdateLinkName(linkdata.name);
                                  setUpdateLink(linkdata.link);
                                  handleOpenUpdateLink();
                                }}
                              >
                                Update
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
                                  cursor: isSubmittingLink
                                    ? "not-allowed"
                                    : "pointer",
                                  color: isSubmittingLink ? "#A0A0A0" : "red",
                                  fontSize: "12px",
                                }}
                                onClick={() => {
                                  setSelectedLinkId(linkdata.id);
                                  handleDeleteLink(linkdata.id);
                                }}
                              >
                                Hapus
                              </span>
                            </Div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ))}

              {/* ----------------------Unggah Link2 Start ------------------------ */}
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    textTransform: "none",
                    color: "white",
                    fontSize: "12px",
                    borderRadius: "6px",
                    width: "150px",
                    height: "30px",
                  }}
                  onClick={handleClickOpen}
                >
                  <AddIcon
                    sx={{ fontSize: "14px", margin: "5px" }}
                    onClick={handleClickOpen}
                  />
                  Tambah Link
                </Button>
              </Div>
              {/* popup untuk tambah dan edit link Start */}
              <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>
                  {editGroupIndex !== null && editLinkIndex !== null
                    ? "Perubahan Link"
                    : "Tambah Link"}
                </DialogTitle>
                <DialogContent>
                  <TextField
                    label="Nama Link"
                    name="name"
                    value={newLink2.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="URL Link"
                    name="url"
                    value={newLink2.url}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </DialogContent>
                <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <Button
                    size="small"
                    sx={{
                      background: "white",
                      boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                      textTransform: "none",
                      color: "black",
                    }}
                    onClick={handleClose}
                  >
                    Batal
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                    color="primary"
                    onClick={handleAddLink}
                  >
                    {editGroupIndex !== null && editLinkIndex !== null
                      ? "Simpan"
                      : "Tambah"}
                  </Button>
                </DialogActions>
              </Dialog>
              {/* popup untuk tambah dan edit link End */}
            </Div>

            {linkGroups.map((group, groupIndex) => (
              <Div key={groupIndex} sx={{ width: "100%" }}>
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
                  {group.title}
                </Typography>
                <Div
                  sx={{
                    width: "100%",
                    padding: "0 25px",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "25px",
                  }}
                >
                  <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                      <TableHead sx={{ background: "#F5F5F5" }}>
                        <TableRow sx={{ color: "#rgba(25, 36, 52, 0.94)" }}>
                          <TableCell
                            sx={{
                              fontSize: "12px",
                              padding: "11px",
                              width: "65%",
                            }}
                          >
                            Link
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: "12px",
                              padding: "11px",
                              width: "20%",
                            }}
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
                        {group.links.map((link, linkIndex) => (
                          <TableRow>
                            <TableCell sx={{ fontSize: "12px" }}>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link.url}
                              </a>
                            </TableCell>
                            <TableCell>{link.date}</TableCell>
                            <TableCell>
                              <Div sx={{ display: "flex" }}>
                                <span
                                  style={{
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    color: "blue",
                                    fontSize: "12px",
                                  }}
                                  onClick={() =>
                                    handleEdit(groupIndex, linkIndex)
                                  }
                                >
                                  Update
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
                                    cursor: isSubmittingLink
                                      ? "not-allowed"
                                      : "pointer",
                                    color: isSubmittingLink ? "#A0A0A0" : "red",
                                    fontSize: "12px",
                                  }}
                                  onClick={() =>
                                    handleDeleteConfirm(groupIndex, linkIndex)
                                  }
                                >
                                  Hapus
                                </span>
                              </Div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Div>
              </Div>
            ))}
            {/* ----------------------Unggah Link2 End ------------------------ */}
            {/* Table 3 End */}
          </Div>
          {/* Element 2 End */}
        </Div>
      </Div>
    </Div>
  );
};

export default ArsipDocument;
