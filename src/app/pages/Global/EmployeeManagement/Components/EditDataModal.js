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

const ChangePassSchema = Yup.object().shape({
  nik: Yup.string()
    .trim("NIK cannot include leading and trailing spaces")
    .strict(true)
    .matches(/^\d+$/, "NIK must only contain digits")
    .min(10, "must be at least 10 digits")
    .max(13, "cannot be more than 13 digits")
    .required(),
  nidn: Yup.string()
    .trim("NIDN cannot include leading and trailing spaces")
    .strict(true)
    .matches(/^\d+$/, "NIDN must only contain digits")
    .length(10, "must 10 digits"),
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
  degree: Yup.string(),
  major: Yup.string().oneOf(["IF", "SI", "TI", "NONE"]),
  phoneNum: Yup.string()
    .trim("Phone Number cannot include leading and trailing spaces")
    .strict(true)
    .matches(/^\d+$/, "phone number must only contain digits")
    .min(10, "must be at least 10 digits")
    .max(13, "cannot be more than 13 digits"),
  email: Yup.string()
    .trim("Email cannot include leading and trailing spaces")
    .strict(true)
    .email(),
});

const EditDataModal = ({
  openModalEditData,
  setOpenModalEditData,
  setEmployees,
  setEmployeesFromApi,
  passingData,
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
        nik: passingData.nik,
        nidn: passingData.nidn,
        firstName: passingData.firstName,
        lastName: passingData.lastName,
        degree: passingData.degree,
        major: passingData.major || "NONE",
        phoneNum: passingData.phoneNum,
        email: passingData.email,
      }}
      validationSchema={ChangePassSchema}
      onSubmit={async (values, { setSubmitting }) => {
        values.nik = values.nik.trim();
        values.nidn = values.nidn.trim();
        values.firstName = values.firstName.trim();
        values.lastName = values.lastName.trim();
        values.degree = values.degree.trim();
        values.phoneNum = values.phoneNum.trim();
        values.email = values.email.trim();

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

          await jwtAuthAxios.patch(`/employee/${passingData.id}`, values, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const response = await jwtAuthAxios.get(`/employee`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setLoading(false);
          setOpen(false);
          setEmployees(response.data.data);
          setEmployeesFromApi(response.data.data);
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
            <DialogTitle>Edit Employee Data</DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  label="NIK"
                  aria-readonly
                  name="nik"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.nik && touched.nik}
                  helperText={errors.nik}
                  defaultValue={passingData.nik}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />
                <TextField
                  label="NIDN"
                  aria-readonly
                  name="nidn"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.nidn && touched.nidn}
                  helperText={errors.nidn}
                  defaultValue={passingData.nidn}
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
                <TextField
                  label="Degree"
                  name="degree"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.degree && touched.degree}
                  helperText={errors.degree}
                  defaultValue={passingData.degree}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Major</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="major"
                    id="demo-simple-select"
                    label="Major"
                    defaultValue={passingData.major || "NONE"}
                    onChange={(event) => {
                      setFieldValue("major", event.target.value);
                    }}
                  >
                    <MenuItem value={"NONE"}>None</MenuItem>
                    <MenuItem value={"IF"}>Informatics</MenuItem>
                    <MenuItem value={"SI"}>Information System</MenuItem>
                    <MenuItem value={"TI"}>Information Technology</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Phone Number"
                  name="phoneNum"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.phoneNum && touched.phoneNum}
                  helperText={errors.phoneNum}
                  defaultValue={passingData.phoneNum}
                  FormHelperTextProps={{
                    style: { whiteSpace: "normal", color: "red" },
                  }}
                />
                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.email && touched.email}
                  helperText={errors.email}
                  defaultValue={passingData.email}
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
