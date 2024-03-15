import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Button, FormHelperText, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTeacher, postCurriculum } from "app/api";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { DeleteOutline } from "@mui/icons-material";
import Swal from "sweetalert2";
import getCurriculum from "app/api/getCurriculum";

function createData(
  kurikulum,
  totalMK,
  programStudi,
  tahunKurikulum,
  ketuaProgramStudi
) {
  return {
    kurikulum,
    totalMK,
    programStudi,
    tahunKurikulum,
    ketuaProgramStudi,
  };
}

const rows = [
  createData(
    "Kurikulum 2020",
    54,
    "Sistem Informasi",
    2020,
    "Stenly R. Pungus, MT, PhD"
  ),
  createData(
    "Kurikulum 2018",
    33,
    "Sistem Informasi",
    2019,
    "Stenly R. Pungus, MT, PhD"
  ),
  createData(
    "Kurikulum 2020",
    21,
    "Informatika",
    2020,
    "Green Mandias, SKom, MCs"
  ),
  createData(
    "Kurikulum 2018",
    59,
    "Informatika",
    2018,
    "Green Mandias, SKom, MCs"
  ),
  createData(
    "Kurikulum 2020",
    44,
    "Teknologi Informasi",
    2020,
    "Oktoverano H. Lengkong, SKom, MDs, MM"
  ),
  createData(
    "Kurikulum 2020",
    54,
    "Sistem Informasi",
    2020,
    "Stenly R. Pungus, MT, PhD"
  ),
  createData(
    "Kurikulum 2020",
    54,
    "Sistem Informasi",
    2020,
    "Stenly R. Pungus, MT, PhD"
  ),
];

const CurriculumList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputRef = useRef(null);
  const { major } = useParams();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const employee = useQuery({
    queryKey: ["employee"],
    queryFn: getTeacher,
  });
  const curriculumQuery = useQuery({
    queryKey: ["curriculum", major],
    queryFn: () => getCurriculum(major),
  });
  const curriculum = useMutation({
    mutationFn: postCurriculum,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Kurikulum berhasil dibuat",
      });
      setOpen(false);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    },
  });
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white w-[400px]  rounded-md">
            <div className="p-3">
              <h1 className="text-2xl font-bold">Buat Kurikulum</h1>
            </div>
            <hr />
            <Formik
              initialValues={{
                major: "",
                year: "",
                headOfProgramStudyId: "",
                curriculumFile: undefined,
              }}
              validationSchema={createCurriculumSchema}
              onSubmit={(values, { setSubmitting }) => {
                curriculum.mutate(values);
              }}
            >
              {({
                handleChange,
                values,
                errors,
                isValid,
                handleBlur,
                setFieldValue,
                handleSubmit,
              }) => {
                console.log(errors);
                return (
                  <Form>
                    <div className="flex flex-col gap-3 p-3 py-6">
                      <FormControl fullWidth error={!isValid}>
                        <TextField
                          error={!isValid}
                          name="year"
                          id="year"
                          label="Tahun Kurikulum"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.year}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel id="program-studi">
                          Program Studi
                        </InputLabel>
                        <Select
                          error={!isValid}
                          name="major"
                          labelId="program-studi"
                          id="program-studi"
                          label="Program Studi"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <MenuItem value={"SI"}>Sistem Informasi</MenuItem>
                          <MenuItem value={"IF"}>Informatika</MenuItem>
                          <MenuItem value={"DKV"}>Teknologi Informasi</MenuItem>
                        </Select>
                        <FormHelperText
                          children={errors.major}
                          sx={{ color: "red" }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel id="ketua-program-studi">
                          Ketua Program Studi
                        </InputLabel>
                        <Select
                          error={!isValid}
                          name="headOfProgramStudyId"
                          labelId="ketua-program-studi"
                          id="ketua-program-studi"
                          label="Ketua Program Studi"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.headOfProgramStudyId}
                        >
                          {employee.data?.map((item) => (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                          ))}
                        </Select>
                        <FormHelperText
                          children={errors.headOfProgramStudyId}
                          sx={{ color: "red" }}
                        />
                      </FormControl>
                      <FormControl fullWidth>
                        <input
                          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          name="curriculumFile"
                          type="file"
                          ref={inputRef}
                          style={{ display: "none" }}
                          onChange={(e) => {
                            setFieldValue("curriculumFile", e.target.files[0]);
                          }}
                          onBlur={handleBlur}
                        />
                        {!values.curriculumFile ? (
                          <>
                            <Button
                              variant="contained"
                              className="!border-gray-400"
                              onClick={() => inputRef.current.click()}
                            >
                              <span>Pilih File</span>
                            </Button>
                            <FormHelperText
                              children={errors.curriculumFile}
                              sx={{ color: "red" }}
                            />
                          </>
                        ) : (
                          <div>
                            <h3>
                              {values.curriculumFile.name}
                              <span>
                                <IconButton
                                  color="error"
                                  aria-label="remove file"
                                  component="label"
                                  onClick={() => {
                                    setFieldValue("curriculumFile", undefined);
                                  }}
                                >
                                  <DeleteOutline />
                                </IconButton>
                              </span>
                            </h3>
                          </div>
                        )}
                      </FormControl>
                    </div>
                    <hr />
                    <div className="flex flex-row-reverse gap-3 p-3">
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={curriculum.isPending}
                      >
                        Simpan
                      </Button>
                      <Button
                        variant="outlined"
                        className="!border-gray-400"
                        onClick={handleClose}
                      >
                        <span className="text-gray-400">Batal</span>
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Modal>
      <div className="flex justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold">
            LIST KURIKULUM FAKULTAS ILMU KOMPUTER
          </h1>
        </div>
        <div>
          <Button
            className="!rounded-full"
            variant="contained"
            size="large"
            color="primary"
            endIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Tambah Kurikulum
          </Button>
        </div>
      </div>
      <div className="flex justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold">List Kurikulum {major}</h1>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            className="*:!rounded-full"
            label="Cari Kurikulum"
            variant="outlined"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </div>
      </div>
      <div className="mb-3">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                style={{ backgroundColor: "#006AF5", color: "white" }}
                className="*:!text-white"
              >
                <TableCell>No</TableCell>
                <TableCell>Program Studi</TableCell>
                <TableCell>Tahun Kurikulum</TableCell>
                <TableCell>Total MK</TableCell>
                <TableCell>Ketua Program Studi</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {curriculumQuery.data?.map((row, i) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{row.major}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell>{row._count.Curriculum_Subject}</TableCell>
                  <TableCell>{`${row.headOfProgramStudy.firstName} ${row.headOfProgramStudy.lastName} `}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      className="*:!shadow-sm"
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={() =>
                          navigate(
                            `/obe/curriculum/list/${major}/${row.tahunKurikulum}`
                          )
                        }
                      >
                        Lihat Mata Kuliah
                      </MenuItem>
                      <hr />
                      <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-gray-400">Showing 19 of 19</span>
        </div>
        <div className="flex gap-2">
          <div>
            <Button
              style={{ border: "2px solid" }}
              className="!rounded-full !p-0 !min-w-8 !min-h-8"
              variant="outlined"
              color="primary"
            >
              <ArrowBackIosNewIcon />
            </Button>
          </div>
          <div>
            <Button
              className="!rounded-full !p-0 !min-w-8 !min-h-8 font-bold"
              variant="contained"
              color="primary"
            >
              1
            </Button>
          </div>
          <div>
            <Button
              style={{ border: "2px solid" }}
              className="!rounded-full !p-0 !min-w-8 !min-h-8"
              variant="outlined"
              color="primary"
            >
              2
            </Button>
          </div>
          <div>
            <Button
              style={{ border: "2px solid" }}
              className="!rounded-full !p-0 !min-w-8 !min-h-8"
              variant="outlined"
              color="primary"
            >
              <ArrowForwardIosIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const createCurriculumSchema = yup.object().shape({
  major: yup.string().oneOf(["IF", "SI", "DKV"]).required("Required"),
  year: yup
    .string()
    .length(4, "Year must be 4 characters")
    .matches(/^\d+$/, "Year must be a number")
    .required("Required"),
  headOfProgramStudyId: yup.string().required("Required"),
  curriculumFile: yup.mixed().required("Required"),
});

export default CurriculumList;
