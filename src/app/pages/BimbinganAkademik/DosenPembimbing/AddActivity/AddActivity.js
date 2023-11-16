import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

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
  "@media (max-width: 768px)": {
    maxWidth: "80%",
  },
  "@media (max-width: 480px)": {
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
  const [studentOptions, setStudentOptions] = useState([]);

  const [valueDueDate, setValueDueDate] = useState(null);
  const [valueTimePicker, setValueTimePicker] = useState(null);
  const [valueAttendance, setValueAttendance] = React.useState("");
  const [showLabel, setShowLabel] = useState(true);
  const handleAttendanceChange = (event) => {
    setValueAttendance(event.target.value);
    setShowLabel(false);
  };
  const [valueStudent, setValueStudent] = React.useState("");
  const [showLabel2, setShowLabel2] = useState(true);
  const handleStudentChange = (event) => {
    setValueStudent(event.target.value);
    setShowLabel2(false);
  };

  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [openSecondModal, setOpenSecondModal] = React.useState(false);
  const handleOpenFirstModal = () => setOpenFirstModal(true);
  const handleCloseFirstModal = () => setOpenFirstModal(false);
  const handleOpenSecondModal = () => setOpenSecondModal(true);
  const handleCloseSecondModal = () => setOpenSecondModal(false);
  const handleSubmitFirstModal = () => {
    handleCloseFirstModal();
    handleOpenSecondModal();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseSecondModal();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleOpenSecondModal]);

  useEffect(() => {
    if (valueStudent === "MahasiswaBimbingan") {
      setStudentOptions([...Array(10).keys()].map((i) => `Student ${i + 1}`));
    } else if (valueStudent === "MahasiswaFakultas") {
      setStudentOptions([...Array(10).keys()].map((i) => `Student ${i + 11}`));
    }
  }, [valueStudent]);

  return (
    <div>
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
          id="outlined-basic-1"
          variant="outlined"
          placeholder="Ex. Akan diadakan pertemuan bimbingan akademik pada Rabu, 13 September, 2023"
          fullWidth
          multiline
          sx={{ backgroundColor: "white", marginTop: "2px" }}
        />
      </Stack>

      <Stack spacing={2} sx={{ paddingBottom: 3 }}>
        <Typography>Descriptions</Typography>
        <TextField
          sx={{
            backgroundColor: "white",
            marginTop: "2px",
          }}
          id="outlined-basic"
          variant="outlined"
          placeholder="Ex. Pertemuan akan diadakan di GK2. Harap sediakan alat tulis masing-masing dan jangan lupa membawa ID Card. Jangan lupa juga menyiapkan transkrip nilai untuk menjadi pembahasan nanti."
          fullWidth
          multiline
        />
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography sx={{ paddingBottom: "15px" }}>Due Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              sx={{ backgroundColor: "white", width: "100%" }}
              label={valueDueDate ? "" : "No Due Date"}
              inputFormat="MM/dd/yyyy"
              value={valueDueDate}
              onChange={(event, newValue) => setValueDueDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography sx={{ paddingBottom: "15px" }}>
            Clock (Optional)
          </Typography>
          <TextField
            fullWidth
            id="time"
            type="time"
            value={valueTimePicker}
            onChange={(event, newValue) => setValueTimePicker(newValue)}
            inputProps={{
              step: 300,
            }}
            sx={{ backgroundColor: "white" }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography sx={{ paddingBottom: "15px" }}>
            Form Attendance
          </Typography>
          <FormControl sx={{ backgroundColor: "white" }} fullWidth>
            <InputLabel shrink={false}>
              {showLabel ? "Select Option" : ""}
            </InputLabel>
            <Select
              value={valueAttendance}
              onChange={handleAttendanceChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "37%",
                  },
                },
              }}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
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
              <MenuItem value="MahasiswaBimbingan">
                Mahasiswa Bimbingan
              </MenuItem>
              <MenuItem value="MahasiswaFakultas">Mahasiswa Fakultas</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <RTypography sx={{ paddingBottom: "15px" }}>Student</RTypography>
          <Autocomplete
            sx={{ backgroundColor: "white" }}
            multiple
            id="checkboxes-tags-demo"
            options={studentOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="All Student"
                placeholder="Add Student"
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid container paddingTop={3}>
        <Grid item xs={12} md={4}>
          <FormGroup sx={{ paddingLeft: { xs: 1, md: 3 } }}>
            <FormControlLabel
              control={<Switch size="small" color="primary" />}
              label="Add Grade Submission Page"
              sx={{ whiteSpace: "nowrap", gap: 2 }}
            />
          </FormGroup>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormGroup sx={{ paddingLeft: { xs: 1, md: 3 } }}>
            <FormControlLabel
              control={<Switch size="small" color="primary" />}
              label="Add Pre-Registration Page"
              sx={{ whiteSpace: "nowrap", gap: 2 }}
            />
          </FormGroup>
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
          onClick={handleOpenFirstModal}
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
        onClose={handleCloseFirstModal}
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
            Send Certificate?
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
                onClick={handleCloseFirstModal}
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
                onClick={handleSubmitFirstModal}
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
            onClick={handleCloseSecondModal}
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
