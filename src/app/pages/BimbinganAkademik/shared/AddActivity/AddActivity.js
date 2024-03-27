import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  TextField,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Autocomplete,
  Checkbox,
  Modal,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import SuccessOrError from "app/pages/BimbinganAkademik/components/Modal/SuccessOrError";
import { useNavigate } from "react-router-dom";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";
import CustomAlert from "app/pages/BimbinganAkademik/components/Alert/Alert";

const requiredStyle = {
  color: "red",
  marginLeft: "4px",
};

function RTypography({ children, sx }) {
  return (
    <Typography variant="body1" sx={sx}>
      {children}
      <span style={requiredStyle}>*</span>
    </Typography>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
  maxWidth: "100%",
  "@media (maxWidth: 768px)": {
    maxWidth: "80%",
  },
  "@media (maxWidth: 480px)": {
    maxWidth: "80%",
  },
};

const AddActivity = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const role = Boolean(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")).role
    : [];

  // Alert
  const [alert, setAlert] = useState(null);
  const showAlert = (message) => {
    setAlert({ message });
  };
  const hideAlert = () => {
    setAlert(null);
  };

  //inisialisasi
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [attendance, setAttendance] = useState("");
  const [valueStudent, setValueStudent] = useState("");
  const [studentOptions, setStudentOptions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("00:00");
  const [showLabel, setShowLabel] = useState(true);
  const [showLabel2, setShowLabel2] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const prevSelectedStudentRef = useRef();
  prevSelectedStudentRef.current = selectedStudent;

  //modal
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSuccessModal = () => setOpenSuccessModal(true);
  const handleCloseSuccessModal = () => setOpenSuccessModal(false);
  const handleOpenErrorModal = () => setOpenErrorModal(true);
  const handleCloseErrorModal = () => setOpenErrorModal(false);

  const getRole = () => {
    const filter = role.includes("KAPRODI")
      ? "kaprodi"
      : role.includes("DEKAN")
      ? "dekan"
      : "dosen-pembimbing";

    return filter;
  };

  const handleStudentChange = (event) => {
    setValueStudent(event.target.value);
    setShowLabel2(false);
  };

  const handleAttendanceChange = (event) => {
    setAttendance(event.target.value);
    setShowLabel(false);
  };

  const handleSubmitFirstModal = () => {
    handleCloseFirstModal();
    handleOpenSuccessModal();
  };

  const getStudentList = async () => {
    try {
      const { guidanceClassId } = JSON.parse(localStorage.getItem("user"));

      let response, responseMajor;

      if (valueStudent === "GUIDANCE_CLASS") {
        response = await jwtAuthAxios.get(
          `/guidance-class/${guidanceClassId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            signal,
          }
        );
      } else {
        const { id } = JSON.parse(localStorage.getItem("user"));
        responseMajor = await jwtAuthAxios.get(`/employee/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        });
        response = await jwtAuthAxios.get(`/Student`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          signal,
        });
      }

      const { status, data } = response.data;

      if (status === "OK" && data) {
        if (valueStudent === "GUIDANCE_CLASS") {
          setStudentOptions([
            "All students",
            ...data.GuidanceClassMember?.filter(
              (item) => item.student.status === "ACTIVE"
            ).map((item) => item.student),
          ]);
        } else if (valueStudent === "MAJOR") {
          setStudentOptions([
            "All students",
            ...data.filter(
              (item) =>
                item.status === "ACTIVE" &&
                item.major === responseMajor.data.data.major
            ),
          ]);
        } else {
          setStudentOptions([
            "All students",
            ...data.filter((item) => item.status === "ACTIVE"),
          ]);
        }
      }
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error.response && error.response.status === 403) {
        handlePermissionError();
        setTimeout(() => {
          navigate(-1);
        }, 2000);
        return;
      } else if (error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.log("ini error: ", error);
        handleOpenErrorModal();
        setIsLoading(false);
        return;
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (validation()) {
        const { id } = JSON.parse(localStorage.getItem("user"));

        const requestBody = {
          title: title,
          description: description ? description : "-",
          dueDate: dueDate,
          isAttendance: attendance,
          activityType: valueStudent,
          employeeId: id,
          members: selectedStudent
            .filter((item) => item !== "All students")
            .map((item) => ({ studentId: item.id })),
        };

        const response = await jwtAuthAxios.post(`/activity`, requestBody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          signal,
        });

        const { status } = response.data;
        if (status === "OK") {
          hideAlert();
          handleSubmitFirstModal();
          setTitle("");
          setDescription("");
          setDueDate(null);
          setTime("00:00");
          setDate(null);
          setAttendance("");
          setStudentOptions([]);
          setSelectedStudent([]);
          setValueStudent("");
          setShowLabel(true);
          setShowLabel2(true);
        }
      } else {
        showAlert("Fill in all the fields or make sure the data is valid.");
      }
      setIsLoading(false);
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error.response && error.response.status === 403) {
        handlePermissionError();
        setTimeout(() => {
          navigate(-1);
        }, 2000);
        return;
      } else if (error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.log("ini error: ", error);
        handleOpenErrorModal();
        handleCloseFirstModal();
        setIsLoading(false);
        return;
      }
    }
  };

  const validation = () => {
    const current = new Date();
    return (
      title !== "" &&
      dueDate !== null &&
      dueDate > current &&
      attendance !== "" &&
      selectedStudent.length > 0
    );
  };

  useEffect(() => {
    setSelectedStudent([]);
    setStudentOptions([]);
    if (valueStudent) {
      getStudentList();
    }
    return () => controller.abort();
  }, [valueStudent]);

  useEffect(() => {
    combinedDateTime();
  }, [time, date]);

  const combinedDateTime = () => {
    if (!date || isNaN(date)) {
      return null;
    }

    const combinedDateTime = new Date(date);
    const [hours, minutes] = time.split(":");

    combinedDateTime.setHours(hours);
    combinedDateTime.setMinutes(minutes);
    setDueDate(combinedDateTime);
  };

  const handleSelectStudent = (_, newValue) => {
    const wasAllSelected =
      prevSelectedStudentRef.current.includes("All students");
    if (newValue.includes("All students")) {
      if (newValue.length === studentOptions.length - 1) {
        setSelectedStudent(
          wasAllSelected
            ? newValue.filter((student) => student !== "All students")
            : studentOptions
        );
      } else {
        setSelectedStudent(studentOptions);
      }
    } else {
      if (newValue.length >= studentOptions.length - 1) {
        setSelectedStudent(wasAllSelected ? [] : studentOptions);
      } else {
        setSelectedStudent(newValue);
      }
    }
  };

  return (
    <div>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 500,
          paddingBottom: "15px",
        }}
      >
        Add Activity
      </Typography>

      <Stack spacing={2} sx={{ paddingBottom: 3 }}>
        <RTypography>Title</RTypography>
        <TextField
          id="outlined-textarea"
          placeholder="Enter Title"
          multiline
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ backgroundColor: "white", marginTop: "2px" }}
        />
      </Stack>

      <Stack spacing={2} sx={{ paddingBottom: 3 }}>
        <Typography>Descriptions</Typography>
        <TextField
          id="outlined-textarea"
          placeholder="Enter Description"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ backgroundColor: "white", marginTop: "2px" }}
        />
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <RTypography sx={{ paddingBottom: "15px" }}>Date</RTypography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              sx={{ backgroundColor: "white", width: "100%" }}
              label={date ? "" : "No Due Date"}
              value={date}
              onChange={(e) => setDate(e)}
              // renderInput={(params) => <TextField {...params} />}
              text
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={{ paddingBottom: "15px" }}>
            Clock (Optional)
          </Typography>
          <TextField
            fullWidth
            id="time-controlled"
            type="time"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
            inputProps={{
              step: 300,
            }}
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ paddingBottom: 3, paddingTop: 3 }}>
        <Grid item xs={12} md={6}>
          <RTypography sx={{ paddingBottom: "15px" }}>
            Form Attendance
          </RTypography>
          <FormControl sx={{ backgroundColor: "white" }} fullWidth>
            <InputLabel shrink={false}>
              {showLabel ? "Select Option" : ""}
            </InputLabel>
            <Select
              value={attendance}
              onChange={handleAttendanceChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "37%",
                  },
                },
              }}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <RTypography sx={{ paddingBottom: "15px" }}>For</RTypography>
          <FormControl sx={{ backgroundColor: "white" }} fullWidth>
            <InputLabel shrink={false}>
              {showLabel2 ? "Select Option" : ""}
            </InputLabel>
            <Select
              value={valueStudent}
              onChange={handleStudentChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "37%",
                  },
                },
              }}
            >
              <MenuItem value="GUIDANCE_CLASS">Mahasiswa Bimbingan</MenuItem>
              {getRole() === "dekan" && (
                <MenuItem value="FACULTY">Mahasiswa Fakultas</MenuItem>
              )}
              {getRole() === "kaprodi" && (
                <MenuItem value="MAJOR">Mahasiswa Prodi</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Stack spacing={2}>
        <RTypography>Student</RTypography>
        <Autocomplete
          sx={{ backgroundColor: "white" }}
          multiple
          value={selectedStudent}
          key={studentOptions[1] ? "All students" : studentOptions.id}
          onChange={handleSelectStudent}
          id="checkboxes-tags-demo"
          options={studentOptions}
          disableCloseOnSelect
          getOptionLabel={(option) =>
            option === "All students"
              ? option
              : `${option.lastName}, ${option.firstName}`
          }
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option === "All students"
                ? option
                : `${option.lastName}, ${option.firstName}`}
            </li>
          )}
          renderInput={(params) => {
            params.InputProps.startAdornment =
              params.InputProps.startAdornment?.filter(
                (adornment) => !adornment.props.label.includes("All students")
              );
            return (
              <TextField
                {...params}
                label="Students"
                placeholder="Add Student"
              />
            );
          }}
        />
      </Stack>

      <Grid
        sx={{
          padding: 2,
          paddingTop: "30px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => setOpenFirstModal(true)}
          sx={{
            backgroundColor: "#006AF5",
            borderRadius: "24px",
            color: "white",
            whiteSpace: "nowrap",
            minWidth: "132px",
            fontSize: "12px",
            padding: "10px",
            gap: "6px",

            "&:hover": {
              backgroundColor: "#025ED8",
            },
          }}
        >
          Submit
        </Button>
      </Grid>

      <Modal
        open={openFirstModal}
        onClose={() => setOpenFirstModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          {alert && <CustomAlert message={alert.message} onClose={hideAlert} />}
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              paddingTop: 2,
            }}
          >
            Send Activity?
          </Typography>
          <Typography
            id="modal-modal-description"
            style={{ marginTop: "16px", marginBottom: "20px" }}
          >
            Are you sure you want to submit this? Forms that have been submitted
            cannot be edited again.
          </Typography>

          <Grid container spacing={1} justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={() => setOpenFirstModal(false)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  color: "black",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "lightgrey",
                  },
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleSubmit()}
                sx={{
                  backgroundColor: "#006AF5",
                  borderRadius: "5px",
                  color: "white",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#025ED8",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
      <SuccessOrError
        open={openSuccessModal}
        handleClose={handleCloseSuccessModal}
        title="Successful Submission!"
        description="You have successfully create activity."
      />
      <SuccessOrError
        open={openErrorModal}
        handleClose={handleCloseErrorModal}
        title="Error Submission!"
        description="Error: Failed to create activity. Please try again."
      />
    </div>
  );
};

export default AddActivity;
