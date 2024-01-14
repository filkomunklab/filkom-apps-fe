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
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  IconButton,
  Autocomplete,
  Checkbox,
  Modal,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
import { newDate } from "date-fns-jalali";

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
  maxWidth: "90%",
  "@media (maxWidth: 768px)": {
    maxWidth: "80%",
  },
  "@media (maxWidth: 480px)": {
    maxWidth: "80%",
  },
};

const style2 = {
  position: "fixed",
  top: "15%",
  right: "2%",
  width: 400,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};

const AddActivity = () => {
  const prevSelectedStudentRef = useRef();
  const controller = new AbortController();
  const signal = controller.signal;
  const role = Boolean(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")).role
    : [];
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
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  prevSelectedStudentRef.current = selectedStudent;

  const getRole = () => {
    const filter = role.includes("KAPRODI")
      ? "kaprodi"
      : role.includes("DEKAN")
      ? "dekan"
      : role.includes("OPERATOR_FAKULTAS")
      ? "sek-dekan"
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
    setOpenFirstModal(false);
    setOpenSecondModal(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenSecondModal(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [openSecondModal === true]);

  const getStudentList = async () => {
    try {
      const { guidanceClassId } = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      console.log("ini token", token);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let response, responseMajor;

      if (valueStudent === "GUIDANCE_CLASS") {
        response = await axios.get(
          `${BASE_URL_API}/guidance-class/${guidanceClassId}`,
          { signal }
        );
      } else {
        const { id } = JSON.parse(localStorage.getItem("user"));

        responseMajor = await axios.get(`${BASE_URL_API}/employee/${id}`, {
          signal,
          headers,
        });
        response = await axios.get(`${BASE_URL_API}/Student`, { signal });
      }

      const { status, data } = response.data;
      console.log("ini data getStudentList", response);

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
          console.log("masok");
          setStudentOptions([
            "All students",
            ...data.filter((item) => item.status === "ACTIVE"),
          ]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (validation()) {
        const { nik } = JSON.parse(localStorage.getItem("user"));

        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        const response = await axios.post(
          `${BASE_URL_API}/activity`,
          {
            title: title,
            description: description ? description : "-",
            dueDate: dueDate,
            isAttendance: attendance,
            activityType: valueStudent,
            employeeNik: nik,
            members: selectedStudent
              .filter((item) => item !== "All students")
              .map((item) => ({ studentNim: item.nim })),
          },
          { signal }
          // {headers}
        );
        console.log("ini itu", response);

        const { status, data } = response.data;
        if (status === "OK") {
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
        console.log("data tidak valid");
        setOpenFirstModal(false);
        alert("Data tidak valid");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const validation = () => {
    const current = new Date();
    console.log("waktu skarang", current);
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
    console.log("ini time", time);
    console.log("ini date", date);
    combinedDateTime();
  }, [time, date]);

  useEffect(() => {
    console.log("due date: ", dueDate);
  }, [dueDate]);

  const combinedDateTime = () => {
    if (!date || isNaN(date)) {
      console.log("Invalid date");
      return null; // atau nilai default yang sesuai
    }

    // const dateString = date.toISOString().split("T")[0];
    // const combine = new Date(dateString + " " + time);
    // console.log("yoho", combine);
    // setDueDate(new Date(dateString + " " + time));
    const combinedDateTime = new Date(date);
    const [hours, minutes] = time.split(":");

    console.log("rrrrrrrrrrrrrrrr", hours);
    console.log("ddddddddddd", minutes);

    combinedDateTime.setHours(hours);
    combinedDateTime.setMinutes(minutes);
    setDueDate(combinedDateTime);
  };

  const handleSelectStudent = (_, newValue) => {
    console.log("yaho", newValue);
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
        <Grid item xs={12} md={4}>
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

        <Grid item xs={12} md={4}>
          <Typography sx={{ paddingBottom: "15px" }}>
            Clock (Optional)
          </Typography>
          <TextField
            fullWidth
            id="time-controlled"
            type="time"
            value={time}
            onChange={(e) => {
              console.log("wkwk", e);
              setTime(e.target.value);
            }}
            inputProps={{
              step: 300,
            }}
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
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
      </Grid>

      <Grid container spacing={2} paddingTop={3}>
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

        <Grid item xs={12} md={6}>
          <RTypography sx={{ paddingBottom: "15px" }}>Student</RTypography>
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
        </Grid>
      </Grid>

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
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
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
      <Modal
        open={openSecondModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style2}>
          <IconButton
            edge="end"
            color="#D9D9D9"
            onClick={() => setOpenSecondModal(false)}
            aria-label="close"
            sx={{
              position: "absolute",
              top: "10px",
              right: "20px",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
            }}
          >
            Successful Submission!
          </Typography>
          <Typography
            id="modal-modal-description"
            style={{ marginTop: "16px", marginBottom: "20px" }}
          >
            You have successfully preregistered for the course.
          </Typography>
        </div>
      </Modal>
    </div>
  );
};

export default AddActivity;
