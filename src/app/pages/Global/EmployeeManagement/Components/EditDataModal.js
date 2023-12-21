import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputLabel, MenuItem, FormControl, Select, Autocomplete, Checkbox } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ChangePassSchema = Yup.object().shape({
  nik: Yup.string().trim("NIK cannot include leading and trailing spaces").strict(true).matches(/^\d+$/, "NIK must only contain digits").min(10, "must be at least 10 digits").max(13, "cannot be more than 13 digits").required(),
  firstName: Yup.string().trim("First Name cannot include leading and trailing spaces").strict(true).min(3, "must be at least 3 characters").max(50, "cannot be more than 50 characters").required(),
  lastName: Yup.string().trim("Last Name cannot include leading and trailing spaces").strict(true).min(3, "must be at least 3 characters").max(50, "cannot be more than 50 characters").required(),
  major: Yup.string().oneOf(["IF", "SI", "DKV", "NONE"]),
  phoneNum: Yup.string().trim("Phone Number cannot include leading and trailing spaces").strict(true).matches(/^\d+$/, "phone number must only contain digits").min(10, "must be at least 10 digits").max(13, "cannot be more than 13 digits"),
  email: Yup.string().trim("Email cannot include leading and trailing spaces").strict(true).email(),
});

const EditDataModal = ({ openModalEditData, setOpenModalEditData, setEmployees, passingData }) => {
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    {
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
    {
      title: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
    },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    {
      title: "The Lord of the Rings: The Two Towers",
      year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: "Goodfellas", year: 1990 },
    { title: "The Matrix", year: 1999 },
    { title: "Seven Samurai", year: 1954 },
    {
      title: "Star Wars: Episode IV - A New Hope",
      year: 1977,
    },
    { title: "City of God", year: 2002 },
    { title: "Se7en", year: 1995 },
    { title: "The Silence of the Lambs", year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: "Life Is Beautiful", year: 1997 },
    { title: "The Usual Suspects", year: 1995 },
    { title: "Léon: The Professional", year: 1994 },
    { title: "Spirited Away", year: 2001 },
    { title: "Saving Private Ryan", year: 1998 },
    { title: "Once Upon a Time in the West", year: 1968 },
    { title: "American History X", year: 1998 },
    { title: "Interstellar", year: 2014 },
  ];
  return (
    <Formik
      initialValues={{
        nik: passingData.nik,
        firstName: passingData.firstName,
        lastName: passingData.lastName,
        major: passingData.major || "NONE",
        phoneNum: passingData.phoneNum,
        email: passingData.email,
      }}
      validationSchema={ChangePassSchema}
      onSubmit={async (values, { setSubmitting }) => {
        values.nik = values.nik.trim();
        values.firstName = values.firstName.trim();
        values.lastName = values.lastName.trim();
        values.phoneNum = values.phoneNum.trim();
        values.email = values.email.trim();
        try {
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
          setEmployees(response.data.data);
          setSubmitting(false);
          setOpenModalEditData(false);
        } catch (error) {
          console.log(error);
          setSubmitting(false);
        }
      }}
      enableReinitialize={true}
    >
      {({ isSubmitting, handleSubmit, handleChange, errors, touched, setFieldValue }) => (
        <Form>
          <Dialog open={openModalEditData} onClose={() => setOpenModalEditData(false)} fullWidth>
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
                  FormHelperTextProps={{ style: { whiteSpace: "normal", color: "red" } }}
                />
                <TextField
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.firstName && touched.firstName}
                  helperText={errors.firstName}
                  defaultValue={passingData.firstName}
                  FormHelperTextProps={{ style: { whiteSpace: "normal", color: "red" } }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.lastName && touched.lastName}
                  helperText={errors.lastName}
                  defaultValue={passingData.lastName}
                  FormHelperTextProps={{ style: { whiteSpace: "normal", color: "red" } }}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Major</InputLabel>
                  <Select
                    helperText={errors.major}
                    labelId="demo-simple-select-label"
                    name="major"
                    id="demo-simple-select"
                    label="Major"
                    defaultValue={passingData.major || "NONE"}
                    onChange={(event) => {
                      setFieldValue("major", event.target.value);
                    }}
                  >
                    <MenuItem value={"NONE"}>None</MenuItem> {/* Tambahkan nilai kosong sebagai opsi pertama */}
                    <MenuItem value={"IF"}>Informatics</MenuItem>
                    <MenuItem value={"SI"}>Information System</MenuItem>
                    <MenuItem value={"DKV"}>Information Technology</MenuItem>
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
                  FormHelperTextProps={{ style: { whiteSpace: "normal", color: "red" } }}
                />
                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                  error={errors.email && touched.email}
                  helperText={errors.email}
                  defaultValue={passingData.email}
                  FormHelperTextProps={{ style: { whiteSpace: "normal", color: "red" } }}
                />
                <Autocomplete
                  fullWidth
                  multiple
                  id="checkboxes-tags-demo"
                  options={top100Films}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                      {option.title}
                    </li>
                  )}
                  style={{ width: 500 }}
                  renderInput={(params) => <TextField fullWidth {...params} label="Roles" />}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={() => setOpenModalEditData(false)} sx={{ textTransform: "capitalize" }} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ textTransform: "capitalize" }} onClick={handleSubmit} aria-disabled={isSubmitting}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default EditDataModal;
