import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Div from "@jumbo/shared/Div";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  DialogContentText,
  TextareaAutosize,
  Paper,
} from "@mui/material";
import Riwayatlog from "app/shared/RiwayatLog/Riwayatlog";
import MenuAdvisor from "app/shared/MenuHorizontal/MenuAdvisor";
import MenuKetuaPanelis from "app/shared/MenuHorizontal/MenuKetuaPanelis";
import MenuAnggotaPanelis from "app/shared/MenuHorizontal/MenuAnggotaPanelis";
import MenuDekan from "app/shared/MenuHorizontal/MenuDekan";
import MenuKaprodi from "app/shared/MenuHorizontal/MenuKaprodi";

const BeritaAcara = () => {
  // state - menyimpan request data
  const [isOpen, setIsOpen] = useState();
  const [dataPenilaian, setDataPenilaian] = useState();
  const [dataPerubahan, setDataPerubahan] = useState();
  const [dataBeritaAcara, setDataBeritaAcara] = useState();
  const [dataKesimpulan, setDataKesimpulan] = useState();
  const [advisorAndCoAdvisor, setAdvisorAndCoAdvisor] = useState();

  const [selectedStudentId, setSelectedStudentId] = useState();
  const [selectedName, setSelectedName] = useState();
  const [selectedNIM, setSelectedNIM] = useState();
  const [selectedProdi, setSelectedProdi] = useState();

  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);
  const [proposalId, setProposalId] = useState(null);

  const userRole = useParams().role;
  console.log("role user akses page: ", userRole);

  const { role } = JSON.parse(localStorage.getItem("user"));
  // const role = ["ADVISOR", "DOSEN"];
  console.log("role user yang sign in: ", role);

  // fungsi untuk mendapatkan token JWT
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    const fetchIsOpenData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/proposal/proposal-report/open-access/${proposalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setIsOpen(response.data.data);
        console.log("Request Get proposal dibuka?: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil proposal dibuka?:",
          error
        );
      }
    };
    const fetchPenilaianData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/proposal/proposal-assessment/${proposalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDataPenilaian(response.data.data);
        console.log("Request Get penilaian: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil penilaian:", error);
      }
    };
    const fetchPerubahanData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/proposal/proposal-changes/${proposalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDataPerubahan(response.data.data);
        console.log("Request Get perubahan: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil perubahan:", error);
      }
    };
    const fetchBeritaAcaraData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/proposal/proposal-report/${proposalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDataBeritaAcara(response.data.data);
        console.log("Request Get berita acara: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil berita acara:", error);
      }
    };
    const fetchKesimpulanData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/proposal/proposal-report/conclusion/${proposalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDataKesimpulan(response.data.data);
        console.log("Request Get kesimpulan: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil kesimpulan:", error);
      }
    };
    fetchIsOpenData();
    fetchPenilaianData();
    fetchPerubahanData();
    fetchBeritaAcaraData();
    fetchKesimpulanData();
  }, [token, proposalId]);

  // State untuk mengontrol tampilan popup
  const [openScoreDialog, setOpenScoreDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewedChanges, setViewedChanges] = useState("");
  const [status, setStatus] = useState(""); // State untuk menyimpan status
  const [isRevisionEnabled, setIsRevisionEnabled] = useState(true);
  const [isScoreEnabled, setIsScoreEnabled] = useState(true);
  const [isSignInEnabled, setIsSignInEnabled] = useState(true);
  const [isSubmitButtonVisible, setIsSubmitButtonVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nilai, setNilai] = useState("");
  const [perubahan, setPerubahan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [errorMessageKesimpulan, setErrorMessageKesimpulan] = useState();
  const [errorMessagePenilaian, setErrorMessagePenilaian] = useState();
  const [openSignInConfirmationDialog, setOpenSignInConfirmationDialog] =
    useState(false);

  const handleOpenSignInConfirmationDialog = () => {
    setOpenSignInConfirmationDialog(true);
  };

  const handleCloseSignInConfirmationDialog = () => {
    setOpenSignInConfirmationDialog(false);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Mengubah status saat radio button berubah
  };

  const handleNilaiChange = (event) => {
    setNilai(event.target.value); // Mengubah nilai saat radio button berubah
  };

  const handlePerubahanChange = (event) => {
    setPerubahan(event.target.value); // Mengubah jenis perubahan saat radio button berubah
  };

  const handleDeskripsiChange = (event) => {
    setDeskripsi(event.target.value); // Ubah nama state saat radio button berubah
  };

  const [
    openConfirmationBeritaAcaraDialog,
    setOpenConfirmationBeritaAcaraDialog,
  ] = useState(false);

  const handleOpenConfirmationBeritaAcaraDialog = () => {
    if (!status || !perubahan || !nilai || !deskripsi) {
      // Tampilkan pesan kesalahan jika salah satu opsi belum diisi
      setErrorMessageKesimpulan("Harap isi semua opsi sebelum submit.");
      return;
    }
    setOpenConfirmationBeritaAcaraDialog(true);
  };

  const handleCloseConfirmationBeritaAcaraDialog = () => {
    setOpenConfirmationBeritaAcaraDialog(false);
  };

  // const history = useHistory();

  // Fungsi yang akan dijalankan ketika pengguna mengklik tombol "Ya" di dialog konfirmasi
  const handleSubmitData = () => {
    // Di sini Anda dapat menambahkan logika untuk mengirim data atau tindakan yang diperlukan

    const kesimpulan = {
      exam_conclution: status,
      changes_conclusion: perubahan,
      assessment_conclution: nilai,
      is_pass: deskripsi,
    };
    console.log("Kesimpulan yang akan dikirim: ", kesimpulan);
    axios
      .put(
        `http://localhost:2000/api/v1/proposal/proposal-report/conclusion/${proposalId}`,
        kesimpulan,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Berhasil mengisi kesimpulan:", response.data);

        // Setelah tindakan selesai, tutup dialog konfirmasi
        handleCloseConfirmationBeritaAcaraDialog();

        // request data kesimpulan
        const fetchKesimpulanData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/proposal/proposal-report/conclusion/${proposalId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDataKesimpulan(response.data.data);
            console.log("Request Get kesimpulan: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil kesimpulan:",
              error
            );
          }
        };
        const fetchIsOpenData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/proposal/proposal-report/open-access/${proposalId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setIsOpen(response.data.data);
            console.log("Request Get proposal dibuka?: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil proposal dibuka?:",
              error
            );
          }
        };
        fetchIsOpenData();
        fetchKesimpulanData();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengisi kesimpulan:", error);
      });
  };

  const [ketuaPenelisStatusBeritaAcara, setKetuaPenelisStatusBeritaAcara] =
    useState("Belum");
  const [KetuaPenelisStatusPerubahan, setKetuaPenelisStatusPerubahan] =
    useState("Belum");

  const [isSigned, setIsSigned] = useState(false);
  const [isSudmit, setIsSudmited] = useState(false);

  const handleSignClick = () => {
    // Logika untuk mengubah status
    if (!isSigned) {
      axios
        .put(
          `http://localhost:2000/api/v1/proposal/proposal-report/${proposalId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          //   setKetuaPenelisStatusBeritaAcara("Sudah");
          setIsSigned(true);
          handleCloseSignInConfirmationDialog();

          console.log("Berhasil mengisi berita acara:", response.data);

          // request data
          const fetchBeritaAcaraData = async () => {
            try {
              const response = await axios.get(
                `http://localhost:2000/api/v1/proposal/proposal-report/${proposalId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                  },
                }
              );
              setDataBeritaAcara(response.data.data);
              console.log("Request Get berita acara: ", response.data.data);
            } catch (error) {
              console.error(
                "Terjadi kesalahan saat mengambil berita acara:",
                error
              );
            }
          };
          fetchBeritaAcaraData();
        })
        .catch((error) => {
          console.error("Terjadi kesalahan saat mengisi berita acara:", error);
        });
    }
  };

  const handleSudmitClick = () => {
    // Logika untuk mengubah status
    if (!isSudmit) {
      setKetuaPenelisStatusPerubahan("Sudah");
      setIsSudmited(true);
    }
  };

  const handleOpenViewDialog = (changes) => {
    setViewedChanges(changes);
    setOpenViewDialog(true);

    // request data jika tekan "Lihat"
    const fetchPerubahanData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/proposal/proposal-changes/${proposalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDataPerubahan(response.data.data);
        console.log("Request Get perubahan: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil perubahan:", error);
      }
    };
    fetchPerubahanData();
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    // handleCloseRevisionDialog();
  };

  const handleOpenConfirmDialog = () => {
    // Memeriksa apakah salah satu opsi tidak terpilih
    if (
      selectedValues.value1 === "" ||
      selectedValues.value2 === "" ||
      selectedValues.value3 === "" ||
      selectedValues.value4 === ""
    ) {
      setErrorMessagePenilaian(
        "Anda harus memilih semua opsi sebelum mengirim penilaian."
      );
      return;
    }
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  // Fungsi untuk menutup dialog konfirmasi dan melakukan tindakan saat Simpan diklik
  const handleSave = () => {
    // Simpan nilai ke database atau tempat penyimpanan lainnya di sini

    const nilai = {
      student_id: selectedStudentId,
      value: total.toString(),
    };
    console.log("nilai yang akan dikirim: ", nilai);
    axios
      .put(
        `http://localhost:2000/api/v1/proposal/proposal-assessment/${proposalId}`,
        nilai,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Set nilai scoreSubmitted menjadi true untuk menampilkan nilai di tabel
        setScoreSubmitted(true);
        // reset nilai
        setSelectedValues({
          value1: "",
          value2: "",
          value3: "",
          value4: "",
          value5: "",
          value6: "",
          value7: "",
          value8: "",
          value9: "",
          value10: "",
          value11: "",
          value12: "",
        });

        // Setelah melakukan tindakan yang sesuai, tutup dialog konfirmasi
        handleCloseDialog();
        handleCloseConfirmDialog();

        console.log("Berhasil mengisi nilai:", response.data);

        // request data
        const fetchPenilaianData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/proposal/proposal-assessment/${proposalId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDataPenilaian(response.data.data);
            console.log("Request Get penilaian: ", response.data.data);
          } catch (error) {
            console.error("Terjadi kesalahan saat mengambil penilaian:", error);
          }
        };
        fetchPenilaianData();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengisi nilai:", error);
      });
  };

  const handleCancle = () => {
    // handleCloseDialog();
    handleCloseConfirmDialog();
  };

  // Fungsi untuk membuka popup
  const handleOpenDialog = () => {
    setOpenScoreDialog(true);
  };

  // Fungsi untuk menutup popup
  const handleCloseDialog = () => {
    // reset nilai
    setSelectedValues({
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      value9: "",
      value10: "",
      value11: "",
      value12: "",
    });
    // Tutup dialog
    setOpenScoreDialog(false);
  };

  // program fungsi penilian start
  const [selectedValues, setSelectedValues] = useState({
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    value5: "",
    value6: "",
    value7: "",
    value8: "",
    value9: "",
    value10: "",
    value11: "",
    value12: "",
  });

  const [scoreSubmitted, setScoreSubmitted] = useState(false); // Tambahkan state untuk melacak apakah nilai sudah dikirim

  const calculateTotal = () => {
    const values = Object.values(selectedValues);
    const totalValue = values.reduce((acc, curr) => {
      if (curr) {
        return acc + parseInt(curr, 10);
      }
      return acc;
    }, 0);
    const result = totalValue / 4;
    return result;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedValues({
      ...selectedValues,
      [name]: value,
    });
  };

  const total = calculateTotal();
  // program fungsi penilaian end

  const [openRevisionDialog, setOpenRevisionDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [revisionText, setRevisionText] = useState(""); // State untuk menyimpan teks revisi

  const handleOpenRevisionDialog = () => {
    setOpenRevisionDialog(true);
  };

  const handleCloseRevisionDialog = () => {
    setRevisionText("");
    setOpenRevisionDialog(false);
  };

  const handleRevisionSubmit = () => {
    // // Simpan teks revisi yang diisi oleh pengguna
    // setViewedChanges(revisionText);

    const perubahan = {
      changes: revisionText,
    };
    axios
      .put(
        `http://localhost:2000/api/v1/proposal/proposal-changes/${proposalId}`,
        perubahan,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Setelah tindakan selesai, tutup dialog revisi
        handleCloseRevisionDialog();
        handleCloseConfirmationDialog();

        console.log("Berhasil mengisi nilai:", response.data);

        // request data jika tekan "Lihat"
        const fetchPerubahanData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/proposal/proposal-changes/${proposalId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDataPerubahan(response.data.data);
            console.log("Request Get perubahan: ", response.data.data);
          } catch (error) {
            console.error("Terjadi kesalahan saat mengambil perubahan:", error);
          }
        };
        fetchPerubahanData();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengisi nilai:", error);
      });
  };

  // buka berita acara
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleBukaButtonClick = () => {
    // Menampilkan dialog konfirmasi saat tombol "Buka" diklik
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    // Menutup dialog konfirmasi
    setIsConfirmDialogOpen(false);
  };

  const handleBukaKonfirmasi = () => {
    axios
      .put(
        `http://localhost:2000/api/v1/proposal/proposal-report/open-access/${proposalId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setIsConfirmDialogOpen(false);

        console.log("Berhasil membuka berita acara: ", response.data.data);

        // request data
        const fetchIsOpenData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/proposal/proposal-report/open-access/${proposalId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setIsOpen(response.data.data);
            console.log("Request Get proposal dibuka?: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil proposal dibuka?:",
              error
            );
          }
        };
        const fetchPenilaianData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/proposal/proposal-assessment/${proposalId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDataPenilaian(response.data.data);
            console.log("Request Get penilaian: ", response.data.data);
          } catch (error) {
            console.error("Terjadi kesalahan saat mengambil penilaian:", error);
          }
        };
        const fetchPerubahanData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/proposal/proposal-changes/${proposalId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDataPerubahan(response.data.data);
            console.log("Request Get perubahan: ", response.data.data);
          } catch (error) {
            console.error("Terjadi kesalahan saat mengambil perubahan:", error);
          }
        };
        const fetchBeritaAcaraData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/proposal/proposal-report/${proposalId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDataBeritaAcara(response.data.data);
            console.log("Request Get berita acara: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil berita acara:",
              error
            );
          }
        };
        const fetchKesimpulanData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/proposal/proposal-report/conclusion/${proposalId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setDataKesimpulan(response.data.data);
            console.log("Request Get kesimpulan: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil kesimpulan:",
              error
            );
          }
        };
        fetchIsOpenData();
        fetchPenilaianData();
        fetchPerubahanData();
        fetchBeritaAcaraData();
        fetchKesimpulanData();
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat membuka berita acara:",
          error.response.data.message
        );
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
          Berita Acara Proposal
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
                setProposalId(data.proposal_id);
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
          {/* ADVISOR */}
          <Div
            hidden={userRole === "ADVISOR" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuAdvisor
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Berita Acara Proposal"}
            />
          </Div>
          {/* KETUA_PANELIS */}
          <Div
            hidden={userRole === "KETUA_PANELIS" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKetuaPanelis
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Berita Acara Proposal"}
            />
          </Div>
          {/* ANGGOTA_PANELIS */}
          <Div
            hidden={userRole === "ANGGOTA_PANELIS" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuAnggotaPanelis
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Berita Acara Proposal"}
            />
          </Div>
          {/* DEKAN */}
          <Div
            hidden={userRole === "DEKAN" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuDekan
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Berita Acara Proposal"}
            />
          </Div>
          {/* KAPRODI */}
          <Div
            hidden={userRole === "KAPRODI" ? false : true}
            sx={{ width: "100%" }}
          >
            <MenuKaprodi
              dataGroupId={groupId}
              dataProgress={progress}
              page={"Berita Acara Proposal"}
            />
          </Div>
          {/* Menu horizontal End */}
          {/* Berita acara belum dibuka */}
          {userRole !== "KETUA_PANELIS" && isOpen?.is_open === null && (
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
                Belum saatnya mengisi berita acara.
              </Typography>
            </Div>
          )}
          {/* Buka berita acara */}
          {userRole === "KETUA_PANELIS" && isOpen?.is_open === null && (
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
                  borderRadius: "6px",
                }}
              >
                Membuka Pengisian Berita Acara
              </Typography>
              <Div
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "12px",
                  alignSelf: "stretch",
                  padding: "14px 16px",
                  background: "rgba(26, 56, 96, 0.10)",
                  border: "1px",
                  borderRadius: "6px",
                  marginTop: "25px",
                }}
              >
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "none" }}
                  onClick={handleBukaButtonClick}
                >
                  Buka
                </Button>
              </Div>
              {/* Dialog Konfirmasi */}
              <Dialog
                open={isConfirmDialogOpen}
                onClose={handleConfirmDialogClose}
                fullWidth
                maxWidth="xs"
              >
                <DialogTitle
                  sx={{
                    color: "#0A0A0A",
                    fontSize: "20px",
                    fontWeight: "500px",
                  }}
                >
                  Membuka Berita Acara
                </DialogTitle>
                <DialogContent>
                  <Typography sx={{ color: "#616161" }}>
                    Apakah Anda ingin membuka pengisian berita acara?
                  </Typography>
                </DialogContent>
                <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                  <Button
                    onClick={handleConfirmDialogClose}
                    color="primary"
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
                    onClick={handleBukaKonfirmasi}
                    color="primary"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                  >
                    Buka
                  </Button>
                </DialogActions>
              </Dialog>
            </Div>
          )}
          {/* Berita acara dibuka/ditutup */}
          {isOpen?.is_open !== null && (
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
                  fontWeight: 600,
                }}
              >
                {isOpen && isOpen.title ? isOpen.title.toUpperCase() : ""}
              </Typography>
              {/* Table Penilaian Start */}

              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "flex",
                    padding: "14px 16px",
                    alignSelf: "stretch",
                    background: "rgba(26, 56, 96, 0.10)",
                  }}
                >
                  Penilaian
                </Typography>
                <Table>
                  <TableHead
                    sx={{
                      background: "rgba(26, 56, 96, 0.10)",
                      borderTop: "1px solid #ccc",
                    }}
                  >
                    <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "25%", textAlign: "center" }}>
                        Mahasiswa
                      </TableCell>
                      <TableCell sx={{ width: "25%", textAlign: "center" }}>
                        Ketua Panelis
                      </TableCell>
                      <TableCell sx={{ width: "25%", textAlign: "center" }}>
                        Anggota Panelis
                      </TableCell>
                      <TableCell sx={{ width: "25%", textAlign: "center" }}>
                        Advisor
                      </TableCell>
                      {(userRole === "KETUA_PANELIS" ||
                        userRole === "ANGGOTA_PANELIS" ||
                        userRole === "ADVISOR") && (
                        <TableCell sx={{ width: "25%", textAlign: "center" }}>
                          Action
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataPenilaian?.map((student, studentIndex) => (
                      <TableRow key={studentIndex}>
                        <TableCell sx={{ textAlign: "center" }}>
                          {studentIndex + 1}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {student.fullName}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {student.value_by_chairman}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {student.value_by_member}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {student.value_by_advisor}
                        </TableCell>
                        {userRole === "KETUA_PANELIS" && (
                          <TableCell sx={{ textAlign: "center" }}>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor:
                                  student.value_by_chairman === null
                                    ? "pointer"
                                    : "not-allowed",
                                color:
                                  student.value_by_chairman === null
                                    ? "blue"
                                    : "gray",
                              }}
                              onClick={() => {
                                if (student.value_by_chairman === null) {
                                  handleOpenDialog();
                                  setSelectedStudentId(student.student_id);
                                  setSelectedName(student.fullName);
                                  setSelectedNIM(student.nim);
                                  setSelectedProdi(
                                    student.major === "IF"
                                      ? "Informatika"
                                      : student.major === "SI"
                                      ? "Sistem Informasi"
                                      : ""
                                  );
                                }
                              }}
                            >
                              Nilai
                            </span>
                          </TableCell>
                        )}
                        {userRole === "ANGGOTA_PANELIS" && (
                          <TableCell>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor:
                                  student.value_by_member === null
                                    ? "pointer"
                                    : "not-allowed",
                                color:
                                  student.value_by_member === null
                                    ? "blue"
                                    : "gray",
                              }}
                              onClick={() => {
                                if (student.value_by_member === null) {
                                  handleOpenDialog();
                                  setSelectedStudentId(student.student_id);
                                  setSelectedName(student.fullName);
                                  setSelectedNIM(student.nim);
                                  setSelectedProdi(
                                    student.major === "IF"
                                      ? "Informatika"
                                      : student.major === "SI"
                                      ? "Sistem Informasi"
                                      : ""
                                  );
                                }
                              }}
                            >
                              Nilai
                            </span>
                          </TableCell>
                        )}
                        {userRole === "ADVISOR" && (
                          <TableCell>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor:
                                  student.value_by_advisor === null
                                    ? "pointer"
                                    : "not-allowed",
                                color:
                                  student.value_by_advisor === null
                                    ? "blue"
                                    : "gray",
                              }}
                              onClick={() => {
                                if (student.value_by_advisor === null) {
                                  handleOpenDialog();
                                  setSelectedStudentId(student.student_id);
                                  setSelectedName(student.fullName);
                                  setSelectedNIM(student.nim);
                                  setSelectedProdi(
                                    student.major === "IF"
                                      ? "Informatika"
                                      : student.major === "SI"
                                      ? "Sistem Informasi"
                                      : ""
                                  );
                                }
                              }}
                            >
                              Nilai
                            </span>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Penilaian End */}

              {/* Table Perubahan Start */}
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "flex",
                    padding: "14px 16px",
                    alignSelf: "stretch",
                    background: "rgba(26, 56, 96, 0.10)",
                  }}
                >
                  Perubahan
                </Typography>
                <Table>
                  <TableHead
                    sx={{
                      background: "rgba(26, 56, 96, 0.10)",
                      borderTop: "1px solid #ccc",
                    }}
                  >
                    <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                      <TableCell
                        sx={{
                          width: "20%",
                          textAlign: "center",
                        }}
                      >
                        Ketua Panelis
                      </TableCell>
                      <TableCell sx={{ width: "20%", textAlign: "center" }}>
                        Anggota Panelis
                      </TableCell>
                      <TableCell sx={{ width: "15%", textAlign: "center" }}>
                        Advisor
                      </TableCell>
                      {advisorAndCoAdvisor?.coAdvisor1 && (
                        <TableCell sx={{ width: "20%", textAlign: "center" }}>
                          Co-Advisor 1
                        </TableCell>
                      )}
                      {advisorAndCoAdvisor?.coAdvisor2 && (
                        <TableCell sx={{ width: "20%", textAlign: "center" }}>
                          Co-Advisor 2
                        </TableCell>
                      )}
                      <TableCell sx={{ width: "25%", textAlign: "center" }}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {dataPerubahan?.changes_by_chairman !== null ? (
                          <Chip
                            size="small"
                            label="Sudah"
                            sx={{
                              background: "rgba(0, 255, 0, 0.10)",
                              color: "#008000",
                              fontSize: "10px",
                            }}
                          />
                        ) : (
                          <Chip size="small" label="Belum" />
                        )}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {dataPerubahan?.changes_by_member !== null ? (
                          <Chip
                            size="small"
                            label="Sudah"
                            sx={{
                              background: "rgba(0, 255, 0, 0.10)",
                              color: "#008000",
                              fontSize: "10px",
                            }}
                          />
                        ) : (
                          <Chip size="small" label="Belum" />
                        )}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {dataPerubahan?.changes_by_advisor !== null ? (
                          <Chip
                            size="small"
                            label="Sudah"
                            sx={{
                              background: "rgba(0, 255, 0, 0.10)",
                              color: "#008000",
                              fontSize: "10px",
                              textAlign: "center",
                            }}
                          />
                        ) : (
                          <Chip
                            size="small"
                            label="Belum"
                            sx={{ textAlign: "center" }}
                          />
                        )}
                      </TableCell>
                      {advisorAndCoAdvisor?.coAdvisor1 && (
                        <TableCell sx={{ textAlign: "center" }}>
                          {dataPerubahan?.changes_by_co_advisor1 !== null ? (
                            <Chip
                              size="small"
                              label="Sudah"
                              sx={{
                                background: "rgba(0, 255, 0, 0.10)",
                                color: "#008000",
                                fontSize: "10px",
                                textAlign: "center",
                              }}
                            />
                          ) : (
                            <Chip
                              size="small"
                              label="Belum"
                              sx={{ textAlign: "center" }}
                            />
                          )}
                        </TableCell>
                      )}
                      {advisorAndCoAdvisor?.coAdvisor2 && (
                        <TableCell sx={{ textAlign: "center" }}>
                          {dataPerubahan?.changes_by_co_advisor2 !== null ? (
                            <Chip
                              size="small"
                              label="Sudah"
                              sx={{
                                background: "rgba(0, 255, 0, 0.10)",
                                color: "#008000",
                                fontSize: "10px",
                                textAlign: "center",
                              }}
                            />
                          ) : (
                            <Chip
                              size="small"
                              label="Belum"
                              sx={{ textAlign: "center" }}
                            />
                          )}
                        </TableCell>
                      )}
                      <TableCell
                        sx={{
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "blue",
                          }}
                          onClick={() => handleOpenViewDialog(viewedChanges)}
                        >
                          Lihat
                        </span>
                        {userRole === "KETUA_PANELIS" && (
                          <>
                            <Div sx={{ margin: "2px", color: "#E0E0E0" }}>
                              |
                            </Div>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor:
                                  dataPerubahan?.changes_by_chairman === null
                                    ? "pointer"
                                    : "not-allowed", // Mengubah tampilan kursor
                                color:
                                  dataPerubahan?.changes_by_chairman === null
                                    ? "blue"
                                    : "gray", // Mengubah warna
                              }}
                              onClick={() => {
                                if (
                                  dataPerubahan?.changes_by_chairman === null
                                ) {
                                  handleOpenRevisionDialog();
                                }
                              }}
                            >
                              Revisi
                            </span>
                          </>
                        )}
                        {userRole === "ANGGOTA_PANELIS" && (
                          <>
                            <Div sx={{ margin: "2px", color: "#E0E0E0" }}>
                              |
                            </Div>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor:
                                  dataPerubahan?.changes_by_member === null
                                    ? "pointer"
                                    : "not-allowed", // Mengubah tampilan kursor
                                color:
                                  dataPerubahan?.changes_by_member === null
                                    ? "blue"
                                    : "gray", // Mengubah warna
                              }}
                              onClick={() => {
                                if (dataPerubahan?.changes_by_member === null) {
                                  handleOpenRevisionDialog();
                                }
                              }}
                            >
                              Revisi
                            </span>
                          </>
                        )}
                        {userRole === "ADVISOR" && (
                          <>
                            <Div sx={{ margin: "2px", color: "#E0E0E0" }}>
                              |
                            </Div>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor:
                                  dataPerubahan?.changes_by_advisor === null
                                    ? "pointer"
                                    : "not-allowed", // Mengubah tampilan kursor
                                color:
                                  dataPerubahan?.changes_by_advisor === null
                                    ? "blue"
                                    : "gray", // Mengubah warna
                              }}
                              onClick={() => {
                                if (
                                  dataPerubahan?.changes_by_advisor === null
                                ) {
                                  handleOpenRevisionDialog();
                                }
                              }}
                            >
                              Revisi
                            </span>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Perubahan End */}

              {/* Table Berita Acara Start */}
              <TableContainer sx={{ marginBottom: "50px" }} component={Paper}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: "flex",
                    padding: "14px 16px",
                    alignSelf: "stretch",
                    background: "rgba(26, 56, 96, 0.10)",
                  }}
                >
                  Berita Acara
                </Typography>
                <Table>
                  <TableHead
                    sx={{
                      background: "rgba(26, 56, 96, 0.10)",
                      borderTop: "1px solid #ccc",
                    }}
                  >
                    <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "12%", textAlign: "center" }}>
                        Dekan Fakultas
                      </TableCell>
                      <TableCell sx={{ width: "12%", textAlign: "center" }}>
                        Ketua Panelis
                      </TableCell>
                      <TableCell sx={{ width: "12%", textAlign: "center" }}>
                        Anggota Panelis
                      </TableCell>
                      <TableCell sx={{ width: "12%", textAlign: "center" }}>
                        Advisor
                      </TableCell>
                      {(userRole === "DEKAN" ||
                        userRole === "ADVISOR" ||
                        userRole === "KETUA_PANELIS" ||
                        userRole === "ANGGOTA_PANELIS") && (
                        <TableCell sx={{ width: "5%", textAlign: "center" }}>
                          Action
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {dataBeritaAcara?.is_report_approve_by_dekan !==
                        null ? (
                          <>
                            <Chip
                              size="small"
                              label="Sudah"
                              sx={{
                                background: "rgba(0, 255, 0, 0.10)",
                                color: "#008000",
                                fontSize: "10px",
                              }}
                            />
                            <div>
                              {dataBeritaAcara?.dekan_report_approve_date}
                            </div>
                          </>
                        ) : (
                          <Chip size="small" label="Belum" />
                        )}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {dataBeritaAcara?.is_report_approve_by_panelist_chairman !==
                        null ? (
                          <>
                            <Chip
                              size="small"
                              label="Sudah"
                              sx={{
                                background: "rgba(0, 255, 0, 0.10)",
                                color: "#008000",
                                fontSize: "10px",
                              }}
                            />
                            <div>
                              {
                                dataBeritaAcara?.panelist_chairman_report_approve_date
                              }
                            </div>
                          </>
                        ) : (
                          <Chip size="small" label="Belum" />
                        )}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {dataBeritaAcara?.is_report_approve_by_panelist_member !==
                        null ? (
                          <>
                            <Chip
                              size="small"
                              label="Sudah"
                              sx={{
                                background: "rgba(0, 255, 0, 0.10)",
                                color: "#008000",
                                fontSize: "10px",
                              }}
                            />
                            <div>
                              {
                                dataBeritaAcara?.panelist_member_report_approve_date
                              }
                            </div>
                          </>
                        ) : (
                          <Chip size="small" label="Belum" />
                        )}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {dataBeritaAcara?.is_report_approve_by_advisor !==
                        null ? (
                          <>
                            <Chip
                              size="small"
                              label="Sudah"
                              sx={{
                                background: "rgba(0, 255, 0, 0.10)",
                                color: "#008000",
                                fontSize: "10px",
                              }}
                            />
                            <div>
                              {dataBeritaAcara?.advisor_report_approve_date}
                            </div>
                          </>
                        ) : (
                          <Chip size="small" label="Belum" />
                        )}
                      </TableCell>
                      {userRole === "DEKAN" && (
                        <TableCell sx={{ textAlign: "center" }}>
                          <span
                            style={{
                              textDecoration: "none",
                              cursor:
                                dataBeritaAcara?.is_report_approve_by_dekan ===
                                null
                                  ? "pointer"
                                  : "not-allowed",
                              color:
                                dataBeritaAcara?.is_report_approve_by_dekan ===
                                null
                                  ? "blue"
                                  : "gray",
                            }}
                            onClick={() => {
                              if (
                                dataBeritaAcara?.is_report_approve_by_dekan ===
                                null
                              ) {
                                handleOpenSignInConfirmationDialog("");
                              }
                            }}
                          >
                            Setujui
                          </span>
                        </TableCell>
                      )}
                      {userRole === "KETUA_PANELIS" && (
                        <TableCell sx={{ textAlign: "center" }}>
                          <span
                            style={{
                              textDecoration: "none",
                              cursor:
                                dataBeritaAcara?.is_report_approve_by_panelist_chairman ===
                                null
                                  ? "pointer"
                                  : "not-allowed",
                              color:
                                dataBeritaAcara?.is_report_approve_by_panelist_chairman ===
                                null
                                  ? "blue"
                                  : "gray",
                            }}
                            onClick={() => {
                              if (
                                dataBeritaAcara?.is_report_approve_by_panelist_chairman ===
                                null
                              ) {
                                handleOpenSignInConfirmationDialog("");
                              }
                            }}
                          >
                            Setujui
                          </span>
                        </TableCell>
                      )}
                      {userRole === "ANGGOTA_PANELIS" && (
                        <TableCell sx={{ textAlign: "center" }}>
                          <span
                            style={{
                              textDecoration: "none",
                              cursor:
                                dataBeritaAcara?.is_report_approve_by_panelist_member ===
                                null
                                  ? "pointer"
                                  : "not-allowed",
                              color:
                                dataBeritaAcara?.is_report_approve_by_panelist_member ===
                                null
                                  ? "blue"
                                  : "gray",
                            }}
                            onClick={() => {
                              if (
                                dataBeritaAcara?.is_report_approve_by_panelist_member ===
                                null
                              ) {
                                handleOpenSignInConfirmationDialog("");
                              }
                            }}
                          >
                            Setujui
                          </span>
                        </TableCell>
                      )}
                      {userRole === "ADVISOR" && (
                        <TableCell sx={{ textAlign: "center" }}>
                          <span
                            style={{
                              textDecoration: "none",
                              cursor:
                                dataBeritaAcara?.is_report_approve_by_advisor ===
                                null
                                  ? "pointer"
                                  : "not-allowed",
                              color:
                                dataBeritaAcara?.is_report_approve_by_advisor ===
                                null
                                  ? "blue"
                                  : "gray",
                            }}
                            onClick={() => {
                              if (
                                dataBeritaAcara?.is_report_approve_by_advisor ===
                                null
                              ) {
                                handleOpenSignInConfirmationDialog("");
                              }
                            }}
                          >
                            Setujui
                          </span>
                        </TableCell>
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Berita Acara End */}
              {/* Radio Button Penilaian Akhir Start */}

              {/* Kesimpulan dari Pengujian Ketua panelis start */}
              {userRole === "KETUA_PANELIS" && isOpen?.is_open === true && (
                <Div
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Div
                    sx={{
                      display: "flex",
                      padding: "0px 25px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography variant="subtitle2">
                      Kesimpulan Ujian Proposal
                    </Typography>
                    <Div>
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="status"
                          name="status"
                          value={status}
                          onChange={handleStatusChange}
                        >
                          <FormControlLabel
                            value="Approve"
                            control={<Radio />}
                            label="Diterima"
                            onChange={(e) => setStatus(e.target.value)}
                          />
                          <FormControlLabel
                            value="Rejected"
                            control={<Radio />}
                            label="Ditolak"
                            onChange={(e) => setStatus(e.target.value)}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Div>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "0px 25px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    <Div>
                      <Div>
                        <Typography variant="subtitle2">Perubahan</Typography>
                        <Div>
                          <FormControl component="fieldset">
                            <RadioGroup
                              row
                              aria-label="perubahan"
                              name="perubahan"
                              value={perubahan}
                              onChange={(e) => setPerubahan(e.target.value)}
                            >
                              <FormControlLabel
                                value="Major"
                                control={<Radio />}
                                label="Major"
                              />
                              <FormControlLabel
                                value="Minor"
                                control={<Radio />}
                                label="Minor"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Div>
                      </Div>
                    </Div>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "0px 25px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    <Div>
                      <Div>
                        <Typography variant="subtitle2">
                          Nilai Kesimpulan Ujian Skripsi
                        </Typography>
                        <Div>
                          <FormControl component="fieldset">
                            <RadioGroup
                              row
                              aria-label="nilai"
                              name="nilai"
                              value={nilai}
                              onChange={(e) => setNilai(e.target.value)}
                            >
                              <FormControlLabel
                                value="A"
                                control={<Radio />}
                                label="A"
                              />
                              <FormControlLabel
                                value="A-"
                                control={<Radio />}
                                label="A-"
                              />
                              <FormControlLabel
                                value="B+"
                                control={<Radio />}
                                label="B+"
                              />
                              <FormControlLabel
                                value="B"
                                control={<Radio />}
                                label="B"
                              />
                              <FormControlLabel
                                value="B-"
                                control={<Radio />}
                                label="B-"
                              />
                              <FormControlLabel
                                value="C+"
                                control={<Radio />}
                                label="C+"
                              />
                              <FormControlLabel
                                value="C"
                                control={<Radio />}
                                label="C"
                              />
                              <FormControlLabel
                                value="C-"
                                control={<Radio />}
                                label="C-"
                              />
                              <FormControlLabel
                                value="D+"
                                control={<Radio />}
                                label="D+"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Div>
                      </Div>
                    </Div>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "0px 25px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    <Div>
                      <Div>
                        <Typography variant="subtitle2">Deskripsi</Typography>
                        <Div>
                          <FormControl component="fieldset">
                            <RadioGroup
                              row
                              aria-label="deskripsi"
                              name="deskripsi"
                              value={deskripsi}
                              onChange={(e) => setDeskripsi(e.target.value)}
                            >
                              <FormControlLabel
                                value="Pass"
                                control={<Radio />}
                                label="Lulus"
                              />
                              <FormControlLabel
                                value="Fail"
                                control={<Radio />}
                                label="Tidak Lulus"
                              />
                              <FormControlLabel
                                value="Repeat"
                                control={<Radio />}
                                label="Mengulang"
                              />
                            </RadioGroup>
                          </FormControl>
                        </Div>
                      </Div>
                      <Typography style={{ color: "red" }}>
                        {errorMessageKesimpulan}
                      </Typography>
                    </Div>
                  </Div>
                  {/* Radio Button Penilaian Akhir End */}
                  <Div
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "59.43px",
                      padding: "12px 24px 12px 0px",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: "12px",
                      background: "#F5F5F5",
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ textTransform: "none" }}
                      color="primary"
                      onClick={handleOpenConfirmationBeritaAcaraDialog}
                      // disabled={}
                    >
                      Submit
                    </Button>
                  </Div>
                </Div>
              )}
              {/* Kesimpulan dari Pengujian Ketua panelis start */}
              {isOpen?.is_open === false && (
                <Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "0px 25px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography variant="subtitle2">
                      Kesimpulan Ujian Proposal
                    </Typography>
                    <Div>
                      <Typography variant="body1">
                        {dataKesimpulan?.exam_conclution === "Approve"
                          ? "Diterima"
                          : dataKesimpulan?.exam_conclution === "Rejected"
                          ? "Ditolak"
                          : ""}
                      </Typography>
                    </Div>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "0px 25px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    <Div>
                      <Typography variant="subtitle2">Perubahan</Typography>
                      <Typography variant="body1">
                        {dataKesimpulan?.changes_conclusion}
                      </Typography>
                    </Div>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "0px 25px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    <Div>
                      <Typography variant="subtitle2">
                        Nilai Kesimpulan Ujian Skripsi
                      </Typography>
                      <Typography variant="body1">
                        {dataKesimpulan?.assessment_conclution}
                      </Typography>
                    </Div>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "0px 25px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    <Div>
                      <Typography variant="subtitle2">Deskripsi</Typography>
                      <Typography variant="body1">
                        {dataKesimpulan?.is_pass === "Pass"
                          ? "Lulus"
                          : dataKesimpulan?.is_pass === "Repeat"
                          ? "Mengulang"
                          : dataKesimpulan?.is_pass === "Fail"
                          ? "Tidak Lulus"
                          : ""}
                      </Typography>
                    </Div>
                  </Div>
                  {/* Radio Button Penilaian Akhir End */}
                </Div>
              )}
            </Div>
          )}
        </Div>
        {/* Element 2 End */}
      </Div>

      {/* Dialog Penilaian Start */}
      <Dialog
        open={openScoreDialog}
        onClose={() => handleCloseDialog(true)} // Memanggil handleCloseDialog dengan argumen true ketika dialog ditutup
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            padding: "14px 16px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
            textAlign: "center",
          }}
        >
          PENILAIAN
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "15px",
            alignSelf: "stretch",
          }}
        >
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "100px" }}>Judul Proposal</Typography>
            <Typography>:</Typography>
            <Typography>
              {isOpen && isOpen.title ? isOpen.title.toUpperCase() : ""}
            </Typography>
          </Div>
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "100px" }}>Mahasiswa</Typography>
            <Typography>:</Typography>
            <Typography>{selectedName}</Typography>
          </Div>
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "100px" }}>NIM</Typography>
            <Typography>:</Typography>
            <Typography>{selectedNIM}</Typography>
          </Div>
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "100px" }}>Program Studi</Typography>
            <Typography>:</Typography>
            <Typography>
              {selectedProdi === "IF"
                ? "Informatika"
                : selectedProdi === "SI"
                ? "Sistem Informasi"
                : ""}
            </Typography>
          </Div>
          {/* nilai */}
          <TableHead
            sx={{ background: "#F5F5F5", width: "100%" }}
            component={Paper}
          >
            <TableRow>
              <TableCell sx={{ width: "5%" }}>No</TableCell>
              <TableCell sx={{ width: "35%" }}>Kriteria</TableCell>
              <TableCell sx={{ width: "60%" }}>Range Nilai</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }} component={Paper}>
            {/* Table Row Start*/}
            <TableRow>
              <TableCell sx={{ width: "5%" }}>1</TableCell>
              <TableCell sx={{ width: "35%" }}>Penguasaan Materi</TableCell>
              <TableCell sx={{ width: "60%" }}>
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value1 === "9"}
                  onChange={handleChange}
                  value="9"
                  name="value1"
                  inputProps={{ "aria-label": "9" }}
                />
                9
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value1 === "8"}
                  onChange={handleChange}
                  value="8"
                  name="value1"
                  inputProps={{ "aria-label": "8" }}
                />
                8
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value1 === "7"}
                  onChange={handleChange}
                  value="7"
                  name="value1"
                  inputProps={{ "aria-label": "7" }}
                />
                7
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value1 === "6"}
                  onChange={handleChange}
                  value="6"
                  name="value1"
                  inputProps={{ "aria-label": "6" }}
                />
                6
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value1 === "5"}
                  onChange={handleChange}
                  value="5"
                  name="value1"
                  inputProps={{ "aria-label": "5" }}
                />
                5
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value1 === "4"}
                  onChange={handleChange}
                  value="4"
                  name="value1"
                  inputProps={{ "aria-label": "4" }}
                />
                4
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value1 === "3"}
                  onChange={handleChange}
                  value="3"
                  name="value1"
                  inputProps={{ "aria-label": "3" }}
                />
                3
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value1 === "2"}
                  onChange={handleChange}
                  value="2"
                  name="value1"
                  inputProps={{ "aria-label": "2" }}
                />
                2
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value1 === "1"}
                  onChange={handleChange}
                  value="1"
                  name="value1"
                  inputProps={{ "aria-label": "1" }}
                />
                1
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "5%" }}>2</TableCell>
              <TableCell sx={{ width: "35%" }}>
                Konten (Aplikasi dan Materi)
              </TableCell>
              <TableCell sx={{ width: "60%" }}>
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value2 === "9"}
                  onChange={handleChange}
                  value="9"
                  name="value2"
                  inputProps={{ "aria-label": "9" }}
                />
                9
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value2 === "8"}
                  onChange={handleChange}
                  value="8"
                  name="value2"
                  inputProps={{ "aria-label": "8" }}
                />
                8
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value2 === "7"}
                  onChange={handleChange}
                  value="7"
                  name="value2"
                  inputProps={{ "aria-label": "7" }}
                />
                7
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value2 === "6"}
                  onChange={handleChange}
                  value="6"
                  name="value2"
                  inputProps={{ "aria-label": "6" }}
                />
                6
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value2 === "5"}
                  onChange={handleChange}
                  value="5"
                  name="value2"
                  inputProps={{ "aria-label": "5" }}
                />
                5
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value2 === "4"}
                  onChange={handleChange}
                  value="4"
                  name="value2"
                  inputProps={{ "aria-label": "4" }}
                />
                4
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value2 === "3"}
                  onChange={handleChange}
                  value="3"
                  name="value2"
                  inputProps={{ "aria-label": "3" }}
                />
                3
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value2 === "2"}
                  onChange={handleChange}
                  value="2"
                  name="value2"
                  inputProps={{ "aria-label": "2" }}
                />
                2
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value2 === "1"}
                  onChange={handleChange}
                  value="1"
                  name="value2"
                  inputProps={{ "aria-label": "1" }}
                />
                1
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "5%" }}>3</TableCell>
              <TableCell sx={{ width: "35%" }}>Presentasi</TableCell>
              <TableCell sx={{ width: "60%" }}>
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value3 === "9"}
                  onChange={handleChange}
                  value="9"
                  name="value3"
                  inputProps={{ "aria-label": "9" }}
                />
                9
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value3 === "8"}
                  onChange={handleChange}
                  value="8"
                  name="value3"
                  inputProps={{ "aria-label": "8" }}
                />
                8
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value3 === "7"}
                  onChange={handleChange}
                  value="7"
                  name="value3"
                  inputProps={{ "aria-label": "7" }}
                />
                7
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value3 === "6"}
                  onChange={handleChange}
                  value="6"
                  name="value3"
                  inputProps={{ "aria-label": "6" }}
                />
                6
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value3 === "5"}
                  onChange={handleChange}
                  value="5"
                  name="value3"
                  inputProps={{ "aria-label": "5" }}
                />
                5
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value3 === "4"}
                  onChange={handleChange}
                  value="4"
                  name="value3"
                  inputProps={{ "aria-label": "4" }}
                />
                4
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value3 === "3"}
                  onChange={handleChange}
                  value="3"
                  name="value3"
                  inputProps={{ "aria-label": "3" }}
                />
                3
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value3 === "2"}
                  onChange={handleChange}
                  value="2"
                  name="value3"
                  inputProps={{ "aria-label": "2" }}
                />
                2
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value3 === "1"}
                  onChange={handleChange}
                  value="1"
                  name="value3"
                  inputProps={{ "aria-label": "1" }}
                />
                1
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: "5%" }}>4</TableCell>
              <TableCell sx={{ width: "35%" }}>
                Mempertahankan Pendapat
              </TableCell>
              <TableCell sx={{ width: "60%" }}>
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value4 === "9"}
                  onChange={handleChange}
                  value="9"
                  name="value4"
                  inputProps={{ "aria-label": "9" }}
                />
                9
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value4 === "8"}
                  onChange={handleChange}
                  value="8"
                  name="value4"
                  inputProps={{ "aria-label": "8" }}
                />
                8
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value4 === "7"}
                  onChange={handleChange}
                  value="7"
                  name="value4"
                  inputProps={{ "aria-label": "7" }}
                />
                7
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value4 === "6"}
                  onChange={handleChange}
                  value="6"
                  name="value4"
                  inputProps={{ "aria-label": "6" }}
                />
                6
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value4 === "5"}
                  onChange={handleChange}
                  value="5"
                  name="value4"
                  inputProps={{ "aria-label": "5" }}
                />
                5
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value4 === "4"}
                  onChange={handleChange}
                  value="4"
                  name="value4"
                  inputProps={{ "aria-label": "4" }}
                />
                4
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value4 === "3"}
                  onChange={handleChange}
                  value="3"
                  name="value4"
                  inputProps={{ "aria-label": "3" }}
                />
                3
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value4 === "2"}
                  onChange={handleChange}
                  value="2"
                  name="value4"
                  inputProps={{ "aria-label": "2" }}
                />
                2
                <Radio
                  sx={{ margin: "4px" }}
                  checked={selectedValues.value4 === "1"}
                  onChange={handleChange}
                  value="1"
                  name="value4"
                  inputProps={{ "aria-label": "1" }}
                />
                1
              </TableCell>
            </TableRow>
            {/* Table Row End*/}
          </TableBody>
          <Div
            sx={{
              display: "flex",
              alignItems: "center", // Menengahkan vertikal
              justifyContent: "center", // Menengahkan horizontal
              alignSelf: "stretch",
            }}
          >
            <Typography style={{ color: "red" }}>
              {errorMessagePenilaian}
            </Typography>
          </Div>
          {/* Jumlah nilai */}
          <Div
            sx={{
              display: "flex",
              alignItems: "center", // Menengahkan vertikal
              justifyContent: "center", // Menengahkan horizontal
              alignSelf: "stretch",
            }}
          >
            <Typography>Jumlah Nilai = {total}</Typography>
          </Div>
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
            onClick={handleOpenConfirmDialog}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Penilaian End */}

      {/* Dialog konfirmasi  Penilaian Start*/}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Penilaian</DialogTitle>
        <DialogContent>
          <Typography>Apakah Anda yakin ingin memberikan nilai?</Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCancle}
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
            onClick={() => {
              setIsScoreEnabled(false); // Menonaktifkan elemen "Score"
              handleSave();
            }}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialong Konfirmasi Penilaian End */}

      {/* Dialog Perubahan Start */}
      <Dialog
        open={openRevisionDialog}
        onClose={handleCloseRevisionDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            padding: "14px 16px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
            textAlign: "center",
          }}
        >
          PERUBAHAN
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            alignSelf: "stretch",
          }}
        >
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "15px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "150px" }}>Judul Proposal</Typography>
            <Typography>:</Typography>
            <Typography>
              {isOpen && isOpen.title ? isOpen.title.toUpperCase() : ""}
            </Typography>
          </Div>
          <Div
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              alignSelf: "stretch",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead sx={{ background: "#F5F5F5", width: "100%" }}>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Nama Lengkap</TableCell>
                    <TableCell>Nim</TableCell>
                    <TableCell>Program Studi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataPenilaian?.map((student, studentIndex) => (
                    <TableRow>
                      <TableCell>{studentIndex + 1}</TableCell>
                      <TableCell>{student.fullName}</TableCell>
                      <TableCell>{student.nim}</TableCell>
                      <TableCell>{student.major}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <DialogContentText sx={{ width: "100%", margin: "auto" }}>
              Perubahan
            </DialogContentText>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Masukkan Perubahan"
              style={{
                width: "100%",
                marginBottom: "25px",

                resize: "vertical",
              }}
              value={revisionText} // Set the value of the textarea to revisionText
              onChange={(e) => setRevisionText(e.target.value)} // Update revisionText when input changes
            />
          </Div>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseRevisionDialog}
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
            onClick={handleOpenConfirmationDialog}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Perubahan End*/}

      {/* Dialong Konfirmasi Perubahan Start*/}
      <Dialog
        open={openConfirmationDialog}
        onClose={handleCloseRevisionDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Perubahan</DialogTitle>
        <DialogContent>
          <Typography>Apakah Anda yakin ingin memberikan perubahan?</Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseConfirmationDialog}
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
            onClick={() => {
              handleRevisionSubmit();
              handleSudmitClick();
              setIsRevisionEnabled(false);
            }}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialong Konfirmasi Perubahan End */}

      {/* Melihat Perubahan Start */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle
          sx={{
            padding: "10px 12px",
            background: "rgba(26, 56, 96, 0.10)",
            borderRadius: "6px 6px 0 0",
            border: "1px",
            textAlign: "center",
          }}
        >
          PERUBAHAN
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "15px",
            alignSelf: "stretch",
          }}
        >
          <Div
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              alignSelf: "stretch",
            }}
          >
            <Typography sx={{ width: "100px" }}>Judul Proposal</Typography>
            <Typography>:</Typography>
            <Typography>
              {isOpen && isOpen.title ? isOpen.title.toUpperCase() : ""}
            </Typography>
          </Div>

          <Div
            sx={{
              display: "flex",
              padding: "0px 50px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "25px",
              alignSelf: "stretch",
            }}
          >
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Ketua Panelis
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  border: "2px solid #F5F5F5",
                }}
              >
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {dataPerubahan?.changes_by_chairman}
                </Typography>
              </Div>
            </Div>
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Anggota Panelis
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {dataPerubahan?.changes_by_member}
                </Typography>
              </Div>
            </Div>
            <Div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                alignSelf: "stretch",
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
              }}
            >
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                  background: "#F5F5F5",
                }}
              >
                Advisor
              </Div>
              <Div
                sx={{
                  display: "flex",
                  padding: "14px 16px",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 0 0",
                  alignSelf: "stretch",
                }}
              >
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {dataPerubahan?.changes_by_advisor}
                </Typography>
              </Div>
            </Div>
            {advisorAndCoAdvisor?.coAdvisor1 && (
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    padding: "14px 16px",
                    alignItems: "center",
                    gap: "10px",
                    flex: "1 0 0",
                    alignSelf: "stretch",
                    background: "#F5F5F5",
                  }}
                >
                  Co-Advisor 1
                </Div>
                <Div
                  sx={{
                    display: "flex",
                    padding: "14px 16px",
                    alignItems: "center",
                    gap: "10px",
                    flex: "1 0 0",
                    alignSelf: "stretch",
                  }}
                >
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {dataPerubahan?.changes_by_co_advisor1}
                  </Typography>
                </Div>
              </Div>
            )}
            {advisorAndCoAdvisor?.coAdvisor2 && (
              <Div
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
                }}
              >
                <Div
                  sx={{
                    display: "flex",
                    padding: "14px 16px",
                    alignItems: "center",
                    gap: "10px",
                    flex: "1 0 0",
                    alignSelf: "stretch",
                    background: "#F5F5F5",
                  }}
                >
                  Co-Advisor 2
                </Div>
                <Div
                  sx={{
                    display: "flex",
                    padding: "14px 16px",
                    alignItems: "center",
                    gap: "10px",
                    flex: "1 0 0",
                    alignSelf: "stretch",
                  }}
                >
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {dataPerubahan?.changes_by_co_advisor2}
                  </Typography>
                </Div>
              </Div>
            )}
          </Div>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseViewDialog}
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
      </Dialog>
      {/* Melihat Perubahan End */}

      {/* Konfirmasi Sidang Proposal Start*/}
      <Dialog
        open={openConfirmationBeritaAcaraDialog}
        onClose={handleCloseConfirmationBeritaAcaraDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Sidang Proposal</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menyetujui hasil sidang ini?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseConfirmationBeritaAcaraDialog}
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
            onClick={handleSubmitData} // Anda perlu membuat fungsi handleSubmitData sesuai dengan kebutuhan Anda
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Setuju
          </Button>
        </DialogActions>
      </Dialog>
      {/* konfrimasi Sidang Proposal End */}
      <Dialog
        open={openSignInConfirmationDialog}
        onClose={handleCloseSignInConfirmationDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Berita Acara</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menyetujui berita acara?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
          <Button
            onClick={handleCloseSignInConfirmationDialog}
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
            onClick={() => {
              handleSignClick();
              //   handleCloseSignInConfirmationDialog();
              setIsSignInEnabled();
            }}
            variant="contained"
            sx={{ textTransform: "none" }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
};

export default BeritaAcara;
