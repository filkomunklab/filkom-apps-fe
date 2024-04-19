import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Autocomplete,
  Checkbox,
  IconButton,
  Alert,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const RoleSchema = Yup.array()
  .min(1, "Role cannot be empty")
  .of(
    Yup.object().shape({
      role: Yup.string()
        .oneOf([
          "ADMIN",
          "SUPER_ADMIN",
          "MAHASISWA",
          "ADMIN_LPMI",
          "OPERATOR_LPMI",
          "ALUMNI",
          "DEKAN",
          "KAPRODI",
          "DOSEN",
          "DOSEN_MK",
          "OPERATOR_FAKULTAS",
          "SEKERTARIS",
          "REGISTER",
        ])
        .required("Role is Required"),
    })
  );

const EditDataSchema = Yup.object().shape({
  nim: Yup.string()
    .trim("NIM cannot include leading and trailing spaces")
    .strict(true)
    .matches(/^\d+$/, "NIM must only contain digits")
    .length(12, "must be 10 digits")
    .required(),
  reg_num: Yup.string()
    .trim("Registration Number cannot include leading and trailing spaces")
    .strict(true)
    .matches(/^[sS]\d{7}$/, "must format like: 's2200021'")
    .length(8, "must be 8 characters long")
    .required(),
  firstName: Yup.string()
    .trim("First Name cannot include leading and trailing spaces")
    .strict(true)
    .min(3, "must be at least 3 characters")
    .max(50, "cannot be more than 50 characters")
    .required(),
  lastName: Yup.string()
    .trim("Last Name cannot include leading and trailing spaces")
    .strict(true)
    .min(3, "must be at least 3 characters")
    .max(50, "cannot be more than 50 characters")
    .required(),
  gender: Yup.string()
    .oneOf(["MALE", "FEMALE"], "Must be either MALE or FEMALE")
    .required(),
  dateOfBirth: Yup.string().nullable(),
  major: Yup.string().oneOf(["IF", "SI", "TI"]).required(),
  curriculumId: Yup.string(),
  religion: Yup.string()
    .trim("Religion cannot include leading and trailing spaces")
    .strict(true)
    .min(3, "must be at least 3 characters")
    .required(),
  status: Yup.string().oneOf(["GRADUATE", "ACTIVE", "INACTIVE"]).required(),
  arrivalYear: Yup.string().nullable(),
  graduate_year: Yup.string().nullable(),
  phoneNo: Yup.string()
    .trim("Phone Number cannot include leading and trailing spaces")
    .strict(true)
    .matches(/^\d+$/, "phone number must only contain digits")
    .min(10, "must be at least 10 digits")
    .max(13, "cannot be more than 13 digits"),
  studentEmail: Yup.string()
    .trim("Student Email cannot include leading and trailing spaces")
    .strict(true)
    .email(),
  areaOfConcentration: Yup.string()
    .trim("Area Of Concentration cannot include leading and trailing spaces")
    .strict(true)
    .min(3, "must be at least 3 digits")
    .max(70, "cannot be more than 70 digits")
    .nullable(),
  address: Yup.string()
    .trim("Address cannot include leading and trailing spaces")
    .strict(true)
    .min(3, "must be at least 3 characters")
    .nullable(),
  currentResidenceStatus: Yup.string()
    .trim("Current Address cannot include leading and trailing spaces")
    .strict(true)
    .min(3, "must be at least 3 characters")
    .nullable(),
  guardianName: Yup.string()
    .trim("Parent / guardian name cannot include leading and trailing spaces")
    .strict(true)
    .min(3, "must be at least 3 characters")
    .max(50, "cannot be more than 50 characters")
    .nullable(),
  familyRelation: Yup.string()
    .trim(
      "Parent / guardian Relation cannot include leading and trailing spaces"
    )
    .strict(true)
    .min(3, "must be at least 3 characters")
    .nullable(),
  guardianEmail: Yup.string()
    .trim("Parent / guardian Email cannot include leading and trailing spaces")
    .strict(true)
    .email()
    .nullable(),
  guardianPhoneNo: Yup.string()
    .trim(
      "Parent / Guardian Phone Number cannot include leading and trailing spaces"
    )
    .strict(true)
    .matches(/^\d+$/, "Parent / Guardian phone number must only contain digits")
    .min(10, "must be at least 10 digits")
    .max(13, "cannot be more than 13 digits")
    .nullable(),
});

const EditDataModal = ({
  openModalEditData,
  setOpenModalEditData,
  setStudents,
  setStudentsFromApi,
  passingData,
  curriculumList,
}) => {
  const [selectedRoles, setSelectedRoles] = useState(passingData.role || []);
  const [styleBorderRoles, setStyleBorderRoles] = useState("");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSelectedRoles(passingData.role);
  }, [passingData]);

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedRoles(newValue);
    console.log("ini selected row: ", selectedRoles);
  };

  const isOptionEqualToValue = (option, value) => {
    return option.role === value.role;
  };

  const roles = [
    { role: "ADMIN" },
    { role: "SUPER_ADMIN" },
    { role: "MAHASISWA" },
    { role: "ADMIN_LPMI" },
    { role: "OPERATOR_LPMI" },
    { role: "ALUMNI" },
    { role: "DEKAN" },
    { role: "KAPRODI" },
    { role: "DOSEN" },
    { role: "DOSEN_MK" },
    { role: "OPERATOR_FAKULTAS" },
    { role: "SEKERTARIS" },
    { role: "REGISTER" },
  ];
  return (
    <Formik
      initialValues={{
        nim: passingData.nim,
        reg_num: passingData.reg_num,
        firstName: passingData.firstName,
        lastName: passingData.lastName,
        gender: passingData.gender,
        dateOfBirth: passingData.dateOfBirth,
        major: passingData.major,
        curriculumId: passingData.curriculum?.id,
        religion: passingData.religion,
        status: passingData.status,
        arrivalYear: passingData.arrivalYear,
        graduate_year: passingData.graduate_year,
        phoneNo: passingData.phoneNo,
        studentEmail: passingData.studentEmail,
        areaOfConcentration: passingData.areaOfConcentration,
        address: passingData.address,
        currentResidenceStatus: passingData.currentResidenceStatus,
        guardianName: passingData.guardianName,
        familyRelation: passingData.familyRelation,
        guardianEmail: passingData.guardianEmail,
        guardianPhoneNo: passingData.guardianPhoneNo,
      }}
      validationSchema={EditDataSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("Submitting form...");
        values.nim = values.nim?.trim();
        values.reg_num = values.reg_num?.trim();
        values.firstName = values.firstName?.trim();
        values.lastName = values.lastName?.trim();
        values.gender = values.gender?.trim();
        // values.dateOfBirth = values.dateOfBirth?.trim();
        values.major = values.major?.trim();
        values.curriculumId = values.curriculumId?.trim();
        values.religion = values.religion?.trim();
        values.status = values.status?.trim();
        // values.arrivalYear = values.arrivalYear?.trim();
        // values.graduate_year = values.graduate_year?.trim();
        values.phoneNo = values.phoneNo?.trim();
        values.studentEmail = values.studentEmail?.trim();
        values.areaOfConcentration = values.areaOfConcentration?.trim();
        values.address = values.address?.trim();
        values.currentResidenceStatus = values.currentResidenceStatus?.trim();
        values.guardianName = values.guardianName?.trim();
        values.familyRelation = values.familyRelation?.trim();
        values.guardianEmail = values.guardianEmail?.trim();
        values.guardianPhoneNo = values.guardianPhoneNo?.trim();

        values.arrivalYear = values.arrivalYear?.toString().match(/\b\d{4}\b/)
          ? values.arrivalYear.toString().match(/\b\d{4}\b/)[0]
          : null;

        values.graduate_year = values.graduate_year
          ?.toString()
          .match(/\b\d{4}\b/)
          ? values.graduate_year.toString().match(/\b\d{4}\b/)[0]
          : null;

        setLoading(true);
        try {
          const dataRoles = selectedRoles.map((item) => {
            return {
              ...item,
              userId: passingData.id,
            };
          });

          try {
            console.log("ini selected role pas submit: ", selectedRoles);
            await RoleSchema.validate(selectedRoles, { abortEarly: false });
          } catch (error) {
            setLoading(false);
            setError(error.message);
            setOpen(true);
            setStyleBorderRoles("1px solid red");
            return;
          }

          await jwtAuthAxios.patch(
            `/user-management/role/user/${passingData.id}`,
            {
              data: dataRoles,
            }
          );

          const { curriculumId, ...valuesWithoutCurriculumId } = values;

          await jwtAuthAxios.put(
            `/student/update/id/${passingData.id}`,
            {
              ...valuesWithoutCurriculumId,
              curriculum: {
                connect: { id: curriculumId },
              },
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const response = await jwtAuthAxios.get(`/Student`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setLoading(false);
          setOpen(false);
          setStudents(response.data.data);
          setStudentsFromApi(response.data.data);
          setSubmitting(false);
          setOpenModalEditData(false);
          setStyleBorderRoles("");
        } catch (error) {
          setLoading(false);
          if (error.response) {
            setError(error.response.data.data.error);
          } else if (error.message) {
            setError(error.message);
          } else {
            setError("Something wrong!!");
          }

          setOpen(true);
          setSubmitting(false);
        }
      }}
      enableReinitialize={true}
    >
      {({
        isSubmitting,
        handleSubmit,
        handleChange,
        errors,
        touched,
        setFieldValue,
      }) => (
        <Form>
          <Dialog
            open={openModalEditData}
            onClose={() => {
              setSelectedRoles(passingData.role);
              setOpenModalEditData(false);
              setOpen(false);
              setStyleBorderRoles("");
            }}
            fullWidth
          >
            <Collapse in={open}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {error}
              </Alert>
            </Collapse>
            <DialogTitle>Edit Student Data</DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="NIM"
                  aria-readonly
                  name="nim"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.nim && touched.nim}
                  helperText={errors.nim}
                  defaultValue={passingData.nim}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />
                <TextField
                  label="Registration Number"
                  aria-readonly
                  name="reg_num"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.reg_num && touched.reg_num}
                  helperText={errors.reg_num}
                  defaultValue={passingData.reg_num}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />
                <TextField
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.firstName && touched.firstName}
                  helperText={errors.firstName}
                  defaultValue={passingData.firstName}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.lastName && touched.lastName}
                  helperText={errors.lastName}
                  defaultValue={passingData.lastName}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="gender"
                    id="demo-simple-select"
                    label="Gender"
                    defaultValue={passingData.gender}
                    onChange={(event) => {
                      setFieldValue("gender", event.target.value);
                    }}
                  >
                    <MenuItem value={"MALE"}>MALE</MenuItem>
                    <MenuItem value={"FEMALE"}>Female</MenuItem>
                  </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={"Date Of Birth"}
                    views={["day", "month", "year"]}
                    name="dateOfBirth"
                    defaultValue={
                      passingData.dateOfBirth
                        ? dayjs(passingData.dateOfBirth)
                        : null
                    }
                    error={errors.dateOfBirth && touched.dateOfBirth}
                    helperText={errors.dateOfBirth}
                    onChange={(event) => {
                      setFieldValue("dateOfBirth", event.$d);
                    }}
                  />
                </LocalizationProvider>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Major</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="major"
                    id="demo-simple-select"
                    label="Major"
                    defaultValue={passingData.major}
                    onChange={(event) => {
                      setFieldValue("major", event.target.value);
                    }}
                  >
                    <MenuItem value={"IF"}>Informatics</MenuItem>
                    <MenuItem value={"SI"}>Information System</MenuItem>
                    <MenuItem value={"TI"}>Information Technology</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Curriculum
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="curriculumId"
                    id="demo-simple-select"
                    label="Curriculum"
                    defaultValue={passingData.curriculumId}
                    onChange={(event) => {
                      setFieldValue("curriculumId", event.target.value);
                    }}
                  >
                    {curriculumList &&
                      curriculumList.map((item, index) => (
                        <MenuItem key={index} value={item.id}>
                          {item.major} {item.year}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Religion"
                  name="religion"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.religion && touched.religion}
                  helperText={errors.religion}
                  defaultValue={passingData.religion}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="status"
                    id="demo-simple-select"
                    label="Status"
                    defaultValue={passingData.status}
                    onChange={(event) => {
                      setFieldValue("status", event.target.value);
                    }}
                  >
                    <MenuItem value={"ACTIVE"}>ACTIVE</MenuItem>
                    <MenuItem value={"INACTIVE"}>INACTIVE</MenuItem>
                    <MenuItem value={"GRADUATE"}>GRADUATE</MenuItem>
                  </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={"Arrival Year"}
                    views={["year"]}
                    name="arrivalYear"
                    defaultValue={
                      passingData.arrivalYear
                        ? dayjs(passingData.arrivalYear)
                        : null
                    }
                    error={errors.arrivalYear && touched.arrivalYear}
                    helperText={errors.arrivalYear}
                    onChange={(event) => {
                      console.log("ini arival year: ", event.$d);
                      setFieldValue("arrivalYear", event.$d);
                    }}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label={"Graduate Year"}
                    views={["year"]}
                    name="graduate_year"
                    defaultValue={
                      passingData.graduate_year
                        ? dayjs(passingData.graduate_year)
                        : null
                    }
                    error={errors.graduate_year && touched.graduate_year}
                    helperText={errors.graduate_year}
                    onChange={(event) => {
                      console.log("ini graduate year: ", event.$d);
                      setFieldValue("graduate_year", event.$d);
                    }}
                  />
                </LocalizationProvider>

                <TextField
                  label="Phone Number"
                  name="phoneNo"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.phoneNo && touched.phoneNo}
                  helperText={errors.phoneNo}
                  defaultValue={passingData.phoneNo}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />

                <TextField
                  label="Student Email"
                  name="studentEmail"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.studentEmail && touched.studentEmail}
                  helperText={errors.studentEmail}
                  defaultValue={passingData.studentEmail}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />

                <TextField
                  label="Are Of Concentration"
                  name="areaOfConcentration"
                  variant="outlined"
                  onChange={handleChange}
                  error={
                    errors.areaOfConcentration && touched.areaOfConcentration
                  }
                  helperText={errors.areaOfConcentration}
                  defaultValue={passingData.areaOfConcentration}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />

                <TextField
                  label="Address"
                  name="address"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.address && touched.address}
                  helperText={errors.address}
                  defaultValue={passingData.address}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />

                <TextField
                  label="Current Residence Status"
                  name="currentResidenceStatus"
                  variant="outlined"
                  onChange={handleChange}
                  error={
                    errors.currentResidenceStatus &&
                    touched.currentResidenceStatus
                  }
                  helperText={errors.currentResidenceStatus}
                  defaultValue={passingData.currentResidenceStatus}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />

                <TextField
                  label="Parent / Guardion Full Name"
                  name="guardianName"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.guardianName && touched.guardianName}
                  helperText={errors.guardianName}
                  defaultValue={passingData.guardianName}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />

                <TextField
                  label="Parent / Guardion Family Relationship"
                  name="familyRelation"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.familyRelation && touched.familyRelation}
                  helperText={errors.familyRelation}
                  defaultValue={passingData.familyRelation}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />

                <TextField
                  label="Parent / Guardion Email"
                  name="guardianEmail"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.guardianEmail && touched.guardianEmail}
                  helperText={errors.guardianEmail}
                  defaultValue={passingData.guardianEmail}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />

                <TextField
                  label="Parent / Guardion Phone Number"
                  name="guardianPhoneNo"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.guardianPhoneNo && touched.guardianPhoneNo}
                  helperText={errors.guardianPhoneNo}
                  defaultValue={passingData.guardianPhoneNo}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />

                <Autocomplete
                  disableCloseOnSelect
                  multiple
                  id="checkboxes-tags-demo"
                  options={roles}
                  getOptionLabel={(option) => option.role}
                  value={selectedRoles}
                  isOptionEqualToValue={isOptionEqualToValue}
                  onChange={handleAutocompleteChange}
                  renderOption={(props, option, { selected }) => {
                    selected = selectedRoles.some(
                      (item) => item.role === option.role
                    );
                    console.log("ini selected role: ", selectedRoles);
                    console.log("ini isi selected: ", selected);

                    return (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          checked={selected}
                          onChange={() => {
                            if (selected) {
                              // Unselect item
                              setSelectedRoles(
                                selectedRoles.filter(
                                  (item) => item.role !== option.role
                                )
                              );
                            } else {
                              // Select item
                              setSelectedRoles([
                                ...selectedRoles,
                                { role: option.role },
                              ]);
                            }
                          }}
                        />
                        {option.role}
                      </li>
                    );
                  }}
                  style={{}}
                  renderInput={(params) => (
                    <>
                      <TextField
                        fullWidth
                        {...params}
                        label="Roles"
                        sx={{
                          border: styleBorderRoles ? styleBorderRoles : "none",
                        }}
                      />
                    </>
                  )}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => {
                  setOpen(false);
                  setStyleBorderRoles("");
                  setSelectedRoles(passingData.role);
                  setOpenModalEditData(false);
                }}
                sx={{ textTransform: "capitalize" }}
                color="primary"
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                size="small"
                onClick={handleSubmit}
                aria-disabled={isSubmitting}
                loading={loading}
                loadingIndicator="Loading…"
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  paddingTop: 0.7,
                  paddingBottom: 0.7,
                  paddingLeft: 2,
                  paddingRight: 2,
                }}
              >
                <span style={{ fontSize: "14.5px" }}>Confirm</span>
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default EditDataModal;
