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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  // State - menyimpan Perubahan
  const [abstrak, setAbstrak] = useState("");
  const [bab1, setBab1] = useState("");
  const [bab2, setBab2] = useState("");
  const [bab3, setBab3] = useState("");
  const [bab4, setBab4] = useState("");
  const [bab5, setBab5] = useState("");
  const [lainnya, setLainnya] = useState("");

  // State - mengatur tanggal
  const [selectedDate, setSelectedDate] = useState("");

  // state - menyimpan nilai kesimpulan
  const [nilaiMahasiswa, setNilaiMahasiswa] = useState([]);

  const groupId = useParams().groupId;
  console.log("group id: ", groupId);
  const [progress, setProgress] = useState(null);
  const [skripsiId, setSkripsiId] = useState(null);

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
          `http://localhost:2000/api/v1/skripsi/skripsi-report/open-access/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setIsOpen(response.data.data);
        console.log("Request Get skripsi dibuka?: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil skripsi dibuka?:",
          error
        );
      }
    };
    const fetchPenilaianData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/skripsi-assessment/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDataPenilaian(response.data.data);

        // Membuat array objek baru untuk nilaiMahasiswa
        const newNilaiMahasiswa = response.data.data.map((mahasiswa) => ({
          student_id: mahasiswa.student_id,
          assessment_conclution: "",
        }));
        console.log("nilai mahasiswa di fetch", newNilaiMahasiswa);

        // Mengatur nilaiMahasiswa dengan array baru yang dibuat
        setNilaiMahasiswa(newNilaiMahasiswa);

        console.log("Request Get penilaian: ", response.data.data);
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil penilaian:", error);
      }
    };
    const fetchPerubahanData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/skripsi-changes/${skripsiId}`,
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
          `http://localhost:2000/api/v1/skripsi/skripsi-report/${skripsiId}`,
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
          `http://localhost:2000/api/v1/skripsi/skripsi-report/conclusion/${skripsiId}`,
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
    const fetchNilaiKesimpulanData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/skripsi/skripsi-report/conclusion-value/${skripsiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
            },
          }
        );
        setDataNilaiKesimpulan(response.data.data);
        console.log("Request Get nilai kesimpulan: ", response.data.data);
      } catch (error) {
        console.error(
          "Terjadi kesalahan saat mengambil nilai kesimpulan:",
          error
        );
      }
    };
    fetchIsOpenData();
    fetchPenilaianData();
    fetchPerubahanData();
    fetchBeritaAcaraData();
    fetchKesimpulanData();
    fetchNilaiKesimpulanData();
  }, [token, skripsiId]);

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

  // mengatur tanggal
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleOpenSignInConfirmationDialog = () => {
    setOpenSignInConfirmationDialog(true);
  };

  const handleCloseSignInConfirmationDialog = () => {
    setOpenSignInConfirmationDialog(false);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value); // Mengubah status saat radio button berubah
  };

  const [
    openConfirmationBeritaAcaraDialog,
    setOpenConfirmationBeritaAcaraDialog,
  ] = useState(false);

  const handleOpenConfirmationBeritaAcaraDialog = () => {
    if (!status || !perubahan || !deskripsi) {
      for (const entry of nilaiMahasiswa) {
        if (
          entry?.assessment_conclution === null ||
          entry?.assessment_conclution === ""
        ) {
          // Tampilkan pesan kesalahan jika salah satu opsi belum diisi
          setErrorMessageKesimpulan("Harap isi semua opsi sebelum submit.");
          return;
        }
      }
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

    console.log("nilai mahasiswa: ", nilaiMahasiswa);
    for (const entry of nilaiMahasiswa) {
      const nilaiKesimpulan = {
        student_id: entry.student_id,
        assessment_conclution: entry?.assessment_conclution,
      };
      console.log("Nilai kesimpulan yang akan dikirim: ", nilaiKesimpulan);
      axios
        .put(
          `http://localhost:2000/api/v1/skripsi/skripsi-report/conclusion-value/${skripsiId}`,
          nilaiKesimpulan,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(
            `Berhasil mengisi nilai kesimpulan ${entry.student_id}: `,
            response.data
          );
        })
        .catch((error) => {
          console.error(
            `Terjadi kesalahan saat mengisi nilai kesimpulan ${entry.student_id}: `,
            error
          );
        });
    }

    const batasRevisi = {
      submission_dateline: selectedDate,
    };
    console.log("Tanggal batas revisi yang akan dikirim: ", batasRevisi);
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/submission-dateline/${skripsiId}`,
        batasRevisi,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(`Berhasil mengisi tanggal batas revisi: `, response.data);
      })
      .catch((error) => {
        console.error(
          `Terjadi kesalahan saat mengisi tanggal batas revisi: `,
          error
        );
      });

    const kesimpulan = {
      exam_conclution: status,
      changes_conclusion: perubahan,
      is_pass: deskripsi,
    };
    console.log("Kesimpulan yang akan dikirim: ", kesimpulan);
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/skripsi-report/conclusion/${skripsiId}`,
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
              `http://localhost:2000/api/v1/skripsi/skripsi-report/conclusion/${skripsiId}`,
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
              `http://localhost:2000/api/v1/skripsi/skripsi-report/open-access/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setIsOpen(response.data.data);
            console.log("Request Get skripsi dibuka?: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil skripsi dibuka?:",
              error
            );
          }
        };
        const fetchPenilaianData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/skripsi-assessment/${skripsiId}`,
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
        fetchIsOpenData();
        fetchKesimpulanData();
        fetchPenilaianData();
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
          `http://localhost:2000/api/v1/skripsi/skripsi-report/${skripsiId}`,
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
                `http://localhost:2000/api/v1/skripsi/skripsi-report/${skripsiId}`,
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
          `http://localhost:2000/api/v1/skripsi/skripsi-changes/${skripsiId}`,
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
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/skripsi-assessment/${skripsiId}`,
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
              `http://localhost:2000/api/v1/skripsi/skripsi-assessment/${skripsiId}`,
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

  const handleOpenRevisionDialog = () => {
    // ketika menekan "Komen" = mengambil data perubahan sesuai role
    if (userRole === "KETUA_PANELIS") {
      setAbstrak(dataPerubahan?.changes_by_chairman_abstrak);
      setBab1(dataPerubahan?.changes_by_chairman_bab1);
      setBab2(dataPerubahan?.changes_by_chairman_bab2);
      setBab3(dataPerubahan?.changes_by_chairman_bab3);
      setBab4(dataPerubahan?.changes_by_chairman_bab4);
      setBab5(dataPerubahan?.changes_by_chairman_bab5);
      setLainnya(dataPerubahan?.changes_by_chairman_other);
    }
    if (userRole === "ANGGOTA_PANELIS") {
      setAbstrak(dataPerubahan?.changes_by_member_abstrak);
      setBab1(dataPerubahan?.changes_by_member_bab1);
      setBab2(dataPerubahan?.changes_by_member_bab2);
      setBab3(dataPerubahan?.changes_by_member_bab3);
      setBab4(dataPerubahan?.changes_by_member_bab4);
      setBab5(dataPerubahan?.changes_by_member_bab5);
      setLainnya(dataPerubahan?.changes_by_member_other);
    }
    if (userRole === "ADVISOR") {
      setAbstrak(dataPerubahan?.changes_by_advisor_abstrak);
      setBab1(dataPerubahan?.changes_by_advisor_bab1);
      setBab2(dataPerubahan?.changes_by_advisor_bab2);
      setBab3(dataPerubahan?.changes_by_advisor_bab3);
      setBab4(dataPerubahan?.changes_by_advisor_bab4);
      setBab5(dataPerubahan?.changes_by_advisor_bab5);
      setLainnya(dataPerubahan?.changes_by_advisor_other);
    }
    setOpenRevisionDialog(true);
  };

  const handleCloseRevisionDialog = () => {
    setAbstrak();
    setBab1();
    setBab2();
    setBab3();
    setBab4();
    setBab5();
    setLainnya();
    setOpenRevisionDialog(false);
  };

  const handleRevisionSubmit = () => {
    const perubahan = {
      abstrak: abstrak,
      bab1: bab1,
      bab2: bab2,
      bab3: bab3,
      bab4: bab4,
      bab5: bab5,
      other: lainnya,
    };
    axios
      .put(
        `http://localhost:2000/api/v1/skripsi/skripsi-changes/${skripsiId}`,
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
              `http://localhost:2000/api/v1/skripsi/skripsi-changes/${skripsiId}`,
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
        `http://localhost:2000/api/v1/skripsi/skripsi-report/open-access/${skripsiId}`,
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
              `http://localhost:2000/api/v1/skripsi/skripsi-report/open-access/${skripsiId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Gantilah 'token' dengan nilai token yang sesuai
                },
              }
            );
            setIsOpen(response.data.data);
            console.log("Request Get skripsi dibuka?: ", response.data.data);
          } catch (error) {
            console.error(
              "Terjadi kesalahan saat mengambil skripsi dibuka?:",
              error
            );
          }
        };
        const fetchPenilaianData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:2000/api/v1/skripsi/skripsi-assessment/${skripsiId}`,
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
              `http://localhost:2000/api/v1/skripsi/skripsi-changes/${skripsiId}`,
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
              `http://localhost:2000/api/v1/skripsi/skripsi-report/${skripsiId}`,
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
              `http://localhost:2000/api/v1/skripsi/skripsi-report/conclusion/${skripsiId}`,
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
          Berita Acara Skripsi
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
              page={"Berita Acara Skripsi"}
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
              page={"Berita Acara Skripsi"}
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
              page={"Berita Acara Skripsi"}
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
              page={"Berita Acara Skripsi"}
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
              page={"Berita Acara Skripsi"}
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

              <TableContainer sx={{ marginBottom: "50px" }}>
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
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "25%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "25%" }}>Mahasiswa</TableCell>
                      <TableCell sx={{ width: "25%" }}>Ketua Penelis</TableCell>
                      <TableCell sx={{ width: "25%" }}>
                        Anggota Penelis
                      </TableCell>
                      <TableCell sx={{ width: "25%" }}>Advisor</TableCell>
                      {(userRole === "KETUA_PANELIS" ||
                        userRole === "ANGGOTA_PANELIS" ||
                        userRole === "ADVISOR") && (
                        <TableCell sx={{ width: "25%" }}>Action</TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataPenilaian?.map((student, studentIndex) => (
                      <TableRow key={studentIndex}>
                        <TableCell>{studentIndex + 1}</TableCell>
                        <TableCell>{student.fullName}</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {userRole === "KETUA_PANELIS" ||
                          userRole === "KAPRODI" ||
                          userRole === "DEKAN" ? (
                            student.value_by_chairman
                          ) : userRole !== "KETUA_PANELIS" &&
                            student.value_by_chairman === null ? (
                            <Chip label={"Belum"} />
                          ) : (
                            <Chip
                              label={"Sudah"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {userRole === "KETUA_PANELIS" ||
                          userRole === "ANGGOTA_PANELIS" ||
                          userRole === "KAPRODI" ||
                          userRole === "DEKAN" ? (
                            student.value_by_member
                          ) : userRole !== "KETUA_PANELIS" &&
                            student.value_by_member === null ? (
                            <Chip label={"Belum"} />
                          ) : (
                            <Chip
                              label={"Sudah"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center" }}>
                          {userRole === "KETUA_PANELIS" ||
                          userRole === "ADVISOR" ||
                          userRole === "KAPRODI" ||
                          userRole === "DEKAN" ? (
                            student.value_by_advisor
                          ) : userRole !== "KETUA_PANELIS" &&
                            student.value_by_advisor === null ? (
                            <Chip label={"Belum"} />
                          ) : (
                            <Chip
                              label={"Sudah"}
                              sx={{
                                background: "rgba(21, 131, 67, 0.10)",
                                color: "#0A7637",
                              }}
                            />
                          )}
                        </TableCell>
                        {userRole === "KETUA_PANELIS" && (
                          <TableCell sx={{ textAlign: "center" }}>
                            <span
                              style={{
                                textDecoration: "none",
                                cursor:
                                  isOpen?.is_open === true
                                    ? "pointer"
                                    : "not-allowed",
                                color:
                                  isOpen?.is_open === true ? "blue" : "gray",
                              }}
                              onClick={() => {
                                if (isOpen?.is_open === true) {
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
                                  isOpen?.is_open === true
                                    ? "pointer"
                                    : "not-allowed",
                                color:
                                  isOpen?.is_open === true ? "blue" : "gray",
                              }}
                              onClick={() => {
                                if (isOpen?.is_open === true) {
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
                                  isOpen?.is_open === true
                                    ? "pointer"
                                    : "not-allowed",
                                color:
                                  isOpen?.is_open === true ? "blue" : "gray",
                              }}
                              onClick={() => {
                                if (isOpen?.is_open === true) {
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
              <TableContainer sx={{ marginBottom: "50px" }}>
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
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "25%", textAlign: "center" }}>
                        Ketua Penelis
                      </TableCell>
                      <TableCell sx={{ width: "25%", textAlign: "center" }}>
                        Anggota Penelis
                      </TableCell>
                      <TableCell sx={{ width: "25%", textAlign: "center" }}>
                        Advisor
                      </TableCell>
                      {advisorAndCoAdvisor?.coAdvisor1 && (
                        <TableCell sx={{ width: "25%" }}>
                          Co-Advisor 1
                        </TableCell>
                      )}
                      {advisorAndCoAdvisor?.coAdvisor2 && (
                        <TableCell sx={{ width: "25%", textAlign: "center" }}>
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
                        {dataPerubahan?.changes_by_chairman_abstrak !== null ? (
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
                        {dataPerubahan?.changes_by_member_abstrak !== null ? (
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
                      <TableCell sx={{ textAlign: "center" }}>
                        {dataPerubahan?.changes_by_advisor_abstrak !== null ? (
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
                          {dataPerubahan?.changes_by_co_advisor1_abstrak !==
                          null ? (
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
                          {dataPerubahan?.changes_by_co_advisor2_abstrak !==
                          null ? (
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
                                  isOpen?.is_open === true
                                    ? "pointer"
                                    : "not-allowed", // Mengubah tampilan kursor
                                color:
                                  isOpen?.is_open === true ? "blue" : "gray", // Mengubah warna
                              }}
                              onClick={() => {
                                if (isOpen?.is_open === true) {
                                  handleOpenRevisionDialog();
                                }
                              }}
                            >
                              Komen
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
                                  isOpen?.is_open === true
                                    ? "pointer"
                                    : "not-allowed", // Mengubah tampilan kursor
                                color:
                                  isOpen?.is_open === true ? "blue" : "gray", // Mengubah warna
                              }}
                              onClick={() => {
                                if (isOpen?.is_open === true) {
                                  handleOpenRevisionDialog();
                                }
                              }}
                            >
                              Komen
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
                                  isOpen?.is_open === true
                                    ? "pointer"
                                    : "not-allowed", // Mengubah tampilan kursor
                                color:
                                  isOpen?.is_open === true ? "blue" : "gray", // Mengubah warna
                              }}
                              onClick={() => {
                                if (isOpen?.is_open === true) {
                                  handleOpenRevisionDialog();
                                }
                              }}
                            >
                              Komen
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
              <TableContainer sx={{ marginBottom: "50px" }}>
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
                  <TableHead sx={{ background: "rgba(26, 56, 96, 0.10)" }}>
                    <TableRow sx={{ color: "rgba(25, 36, 52, 0.94)" }}>
                      <TableCell sx={{ width: "5%" }}>Nomor</TableCell>
                      <TableCell sx={{ width: "12%", textAlign: "center" }}>
                        Dekan Fakultas
                      </TableCell>
                      <TableCell sx={{ width: "12%", textAlign: "center" }}>
                        Ketua Penelis
                      </TableCell>
                      <TableCell sx={{ width: "12%", textAlign: "center" }}>
                        Anggota Penelis
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
                            Tandai
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
                            Tandai
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
                            Tandai
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
                            Tandai
                          </span>
                        </TableCell>
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Table Berita Acara End */}
              {/* Radio Button Penilaian Akhir Start */}

              {/* Kesimpulan dari Pengujian Ketua penelis start */}
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
                      Kesimpulan Ujian Skripsi
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
                  {/* Nilai Kesimpulan Mahasiswa */}
                  <Div
                    sx={{
                      display: "flex",
                      padding: "0px 25px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    {dataPenilaian?.map((mahasiswa, index) => (
                      <Div key={index}>
                        <Typography variant="subtitle2">
                          Kesimpulan Nilai {mahasiswa.fullName}
                        </Typography>
                        <Div>
                          <FormControl component="fieldset">
                            <RadioGroup
                              row
                              aria-label="nilai"
                              name="nilai"
                              value={
                                nilaiMahasiswa[index]?.assessment_conclution
                              }
                              onChange={(e) =>
                                setNilaiMahasiswa((prevNilai) =>
                                  prevNilai.map((item, i) =>
                                    i === index
                                      ? {
                                          ...item,
                                          assessment_conclution:
                                            e.currentTarget.value,
                                        }
                                      : item
                                  )
                                )
                              }
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
                    ))}
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
                    <TextField
                      id="date"
                      label="Batas pengumpulan revisi"
                      type="date"
                      fullWidth
                      placeholder="dd/mm/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      sx={{ marginTop: "25px" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
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
                      disabled={
                        dataPenilaian?.some(
                          (value) =>
                            value.value_by_chairman === null ||
                            value.value_by_member === null ||
                            value.value_by_advisor === null
                        ) ||
                        dataPerubahan?.changes_by_chairman_abstrak === null ||
                        dataPerubahan?.changes_by_member_abstrak === null ||
                        dataPerubahan?.changes_by_advisor_abstrak === null ||
                        dataBeritaAcara?.is_report_approve_by_panelist_chairman ===
                          null ||
                        dataBeritaAcara?.is_report_approve_by_panelist_member ===
                          null ||
                        dataBeritaAcara?.is_report_approve_by_advisor === null
                      }
                    >
                      Submit
                    </Button>
                  </Div>
                </Div>
              )}
              {/* Kesimpulan dari Pengujian Ketua penelis start */}
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
                      Kesimpulan Ujian Skripsi
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
                  {/* Nilai Kesimpulan Mahasiswa */}
                  <Div
                    sx={{
                      display: "flex",
                      padding: "0px 25px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      alignSelf: "stretch",
                    }}
                  >
                    {dataPenilaian?.map((mahasiswa, index) => (
                      <Div key={index}>
                        <Typography variant="subtitle2">
                          Kesimpulan Nilai {mahasiswa.fullName}
                        </Typography>
                        <Typography>{mahasiswa.value_conclusion}</Typography>
                      </Div>
                    ))}
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
            <Typography sx={{ width: "100px" }}>Judul Skripsi</Typography>
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
            <Typography>{selectedProdi}</Typography>
          </Div>
          {/* nilai */}
          <TableHead sx={{ background: "#F5F5F5", width: "100%" }}>
            <TableRow>
              <TableCell sx={{ width: "5%" }}>No</TableCell>
              <TableCell sx={{ width: "35%" }}>Kriteria</TableCell>
              <TableCell sx={{ width: "60%" }}>Range Nilai</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ width: "100%" }}>
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
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              alignSelf: "stretch",
            }}
          >
            <DialogContentText sx={{ width: "100%", margin: "auto" }}>
              Abstrak
            </DialogContentText>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              maxRows={10}
              placeholder="Masukan Perubahan Abstrak"
              style={{
                width: "100%",
                marginBottom: "25px",

                resize: "vertical",
              }}
              value={abstrak}
              onChange={(e) => setAbstrak(e.target.value)}
            />
            <DialogContentText sx={{ width: "100%", margin: "auto" }}>
              Bab 1
            </DialogContentText>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              maxRows={10}
              placeholder="Masukan Perubahan Bab 1"
              style={{
                width: "100%",
                marginBottom: "25px",

                resize: "vertical",
              }}
              value={bab1}
              onChange={(e) => setBab1(e.target.value)}
            />
            <DialogContentText sx={{ width: "100%", margin: "auto" }}>
              Bab 2
            </DialogContentText>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              maxRows={10}
              placeholder="Masukkan Perubahan Bab 2"
              style={{
                width: "100%",
                marginBottom: "25px",

                resize: "vertical",
              }}
              value={bab2}
              onChange={(e) => setBab2(e.target.value)}
            />
            <DialogContentText sx={{ width: "100%", margin: "auto" }}>
              Bab 3
            </DialogContentText>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              maxRows={10}
              placeholder="Masukkan Perubahan Bab 3"
              style={{
                width: "100%",
                marginBottom: "25px",

                resize: "vertical",
              }}
              value={bab3}
              onChange={(e) => setBab3(e.target.value)}
            />
            <DialogContentText sx={{ width: "100%", margin: "auto" }}>
              Bab 4
            </DialogContentText>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              maxRows={10}
              placeholder="Masukkan Perubahan Bab 4"
              style={{
                width: "100%",
                marginBottom: "25px",

                resize: "vertical",
              }}
              value={bab4}
              onChange={(e) => setBab4(e.target.value)}
            />
            <DialogContentText sx={{ width: "100%", margin: "auto" }}>
              Bab 5
            </DialogContentText>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              maxRows={10}
              placeholder="Masukkan Perubahan Bab 5"
              style={{
                width: "100%",
                marginBottom: "25px",

                resize: "vertical",
              }}
              value={bab5}
              onChange={(e) => setBab5(e.target.value)}
            />
            <DialogContentText sx={{ width: "100%", margin: "auto" }}>
              Lainnya
            </DialogContentText>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              maxRows={10}
              placeholder="Masukkan Perubahan Lainnya"
              style={{
                width: "100%",
                marginBottom: "25px",

                resize: "vertical",
              }}
              value={lainnya}
              onChange={(e) => setLainnya(e.target.value)}
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
          <Typography>
            Apakah Anda yakin ingin memberikan dataPerubahan?
          </Typography>
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
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ background: "#F5F5F5" }}
                >
                  <Typography>Ketua Panelis</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Abstrak</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_chairman_abstrak}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 1</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_chairman_bab1}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 2</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_chairman_bab2}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 3</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_chairman_bab3}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 4</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_chairman_bab4}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 5</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_chairman_bab5}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Lainnya</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_chairman_other}
                    </Typography>
                  </Div>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ background: "#F5F5F5" }}
                >
                  <Typography>Anggota Panelis</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Abstrak</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_member_abstrak}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 1</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_member_bab1}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 2</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_member_bab2}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 3</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_member_bab3}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 4</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_member_bab4}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 5</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_member_bab5}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Lainnya</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_member_other}
                    </Typography>
                  </Div>
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ background: "#F5F5F5" }}
                >
                  <Typography>Advisor</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Abstrak</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_advisor_abstrak}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 1</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_advisor_bab1}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 2</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_advisor_bab2}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 3</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_advisor_bab3}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 4</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_advisor_bab4}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Bab 5</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_advisor_bab5}
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      padding: "14px 16px",
                      flexDirection: "column",
                      gap: "10px",
                      flex: "1 0 0",
                      alignSelf: "stretch",
                    }}
                  >
                    <Typography>Lainnya</Typography>
                    <Typography>
                      {dataPerubahan?.changes_by_advisor_other}
                    </Typography>
                  </Div>
                </AccordionDetails>
              </Accordion>
              {advisorAndCoAdvisor?.coAdvisor1 && (
                <Accordion sx={{ width: "100%" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ background: "#F5F5F5" }}
                  >
                    <Typography>Co-Advisor 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Abstrak</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor1_abstrak}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 1</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor1_bab1}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 2</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor1_bab2}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 3</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor1_bab3}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 4</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor1_bab4}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 5</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor1_bab5}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Lainnya</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor1_other}
                      </Typography>
                    </Div>
                  </AccordionDetails>
                </Accordion>
              )}
              {advisorAndCoAdvisor?.coAdvisor2 && (
                <Accordion sx={{ width: "100%" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ background: "#F5F5F5" }}
                  >
                    <Typography>Co-Advisor 2</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Abstrak</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor2_abstrak}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 1</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor2_bab1}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 2</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor2_bab2}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 3</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor2_bab3}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 4</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor2_bab4}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Bab 5</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor2_bab5}
                      </Typography>
                    </Div>
                    <Div
                      sx={{
                        display: "flex",
                        padding: "14px 16px",
                        flexDirection: "column",
                        gap: "10px",
                        flex: "1 0 0",
                        alignSelf: "stretch",
                      }}
                    >
                      <Typography>Lainnya</Typography>
                      <Typography>
                        {dataPerubahan?.changes_by_co_advisor2_other}
                      </Typography>
                    </Div>
                  </AccordionDetails>
                </Accordion>
              )}
            </Div>
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

      {/* Konfirmasi Sidang Skripsi Start*/}
      <Dialog
        open={openConfirmationBeritaAcaraDialog}
        onClose={handleCloseConfirmationBeritaAcaraDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Sidang Skripsi</DialogTitle>
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
      {/* konfrimasi Sidang Skripsi End */}
      <Dialog
        open={openSignInConfirmationDialog}
        onClose={handleCloseSignInConfirmationDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Berita Acara</DialogTitle>
        <DialogContent>
          <Typography>
            Apakah Anda yakin ingin menandatangani berita acara?
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
