import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  CircularProgress,
  FormHelperText,
  TablePagination,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  InputLabel,
  MenuItem,
  FormControl,
  IconButton,
  Select,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTeacher, postCurriculum } from "app/api";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { DeleteOutline } from "@mui/icons-material";
import Swal from "sweetalert2";
import getCurriculum from "app/api/getCurriculum";
import { OBE_BASE_URL_API } from "@jumbo/config/env";
import { convertShortMajor } from "app/utils/appHelpers";
import NotfoundAnimation from "app/shared/NotfoundAnimation";
import { Actions } from "./Components";

const CurriculumList = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const inputRef = useRef(null);
  const { major } = useParams();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const employee = useQuery({
    queryKey: ["employee"],
    queryFn: getTeacher,
  });
  const curriculumQuery = useQuery({
    queryKey: ["curriculum", { major }],
    queryFn: () => getCurriculum(major),
  });
  const curriculum = useMutation({
    mutationFn: postCurriculum,
    onSuccess: () => {
      curriculumQuery.refetch();
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
        text: error.response.data.message ?? error.message,
      });
    },
  });

  if (curriculumQuery.status === "pending" && !curriculumQuery.data) {
    return <CircularProgress color="info" />;
  }

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
              <h1 className="text-2xl font-semibold">Buat Kurikulum</h1>
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
                          <MenuItem value={"TI"}>Teknologi Informasi</MenuItem>
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
                          {employee.data?.map((item, index) => (
                            <MenuItem value={item.value} key={index}>
                              {item.label}
                            </MenuItem>
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
                      <Button
                        LinkComponent={"a"}
                        href={`${OBE_BASE_URL_API}/static/templates/Curriculum.xlsx`}
                        variant="text"
                      >
                        <span className="text-gray-400">Download Template</span>
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
          <h1 className="text-2xl font-medium">
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
          <h1 className="text-2xl font-medium">
            List Kurikulum {convertShortMajor(major)}
          </h1>
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
      {curriculumQuery.data ? (
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
                    hover
                    // component={Link}
                    // to={`/obe/curriculum/${major}/${row.id}`}
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
                      <Actions row={row} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={curriculumQuery.data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        <NotfoundAnimation />
      )}
    </div>
  );
};

const createCurriculumSchema = yup.object().shape({
  major: yup.string().oneOf(["IF", "SI", "TI"]).required("Required"),
  year: yup
    .string()
    .length(4, "Year must be 4 characters")
    .matches(/^\d+$/, "Year must be a number")
    .required("Required"),
  headOfProgramStudyId: yup.string().required("Required"),
  curriculumFile: yup.mixed().required("Required"),
});

export default CurriculumList;
