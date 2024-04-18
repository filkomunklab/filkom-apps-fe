import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Chip, CircularProgress, Stack, TablePagination, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetSubjects, postCpl } from "app/api";
import { Actions, CplTable } from "./components";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import { OBE_BASE_URL_API } from "@jumbo/config/env";
import NotfoundAnimation from "app/shared/NotfoundAnimation";

const SubjectList = () => {
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const { major, curriculumId } = useParams();
  const inputRef = useRef(null);
  const queryClient = useQueryClient();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const subjectsQuery = useQuery({
    queryKey: ["subjects", curriculumId],
    queryFn: () => GetSubjects.byCurriculum(curriculumId),
  });

  const cplMutation = useMutation({
    mutationFn: postCpl,
    onSuccess: () => {
      queryClient.invalidateQueries(["subjects", curriculumId]);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "CPL uploaded successfully!",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
        didClose: () => {
          cplMutation.reset();
        },
      });
    },
  });

  if (subjectsQuery.status === "pending") {
    return <CircularProgress color="info" />;
  }

  if (!subjectsQuery.data) {
    return <NotfoundAnimation />;
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
              <h1 className="text-2xl font-bold">Buat Kurikulum</h1>
            </div>
            <hr />
            <div className="flex flex-col gap-3 p-3 py-6">
              <FormControl fullWidth>
                <InputLabel id="nama-kurikulum">Nama Kurikulum</InputLabel>
                <Select
                  labelId="nama-kurikulum"
                  id="nama-kurikulum"
                  label="Nama Kurikulum"
                >
                  <MenuItem value={10}>Kurikulum 2020</MenuItem>
                  <MenuItem value={20}>Kurikulum 2018</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="program-studi">Program Studi</InputLabel>
                <Select
                  labelId="program-studi"
                  id="program-studi"
                  label="Program Studi"
                >
                  <MenuItem value={10}>Sistem Informasi</MenuItem>
                  <MenuItem value={20}>Informatika</MenuItem>
                  <MenuItem value={20}>Teknologi Informasi</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="tahun-kurikulum">Tahun Kurikulum</InputLabel>
                <Select
                  labelId="tahun-kurikulum"
                  id="tahun-kurikulum"
                  label="Tahun Kurikulum"
                >
                  <MenuItem value={10}>2020</MenuItem>
                  <MenuItem value={20}>2018</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="ketua-program-studi">
                  Ketua Program Studi
                </InputLabel>
                <Select
                  labelId="ketua-program-studi"
                  id="ketua-program-studi"
                  label="Ketua Program Studi"
                >
                  <MenuItem value={10}>Green Mandias, SKom, MCs</MenuItem>
                  <MenuItem value={20}>Stenly R. Pungus, MT, PhD</MenuItem>
                  <MenuItem value={30}>
                    Oktoverano H. Lengkong, SKom, MDs, MM
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <hr />
            <div className="flex flex-row-reverse gap-3 p-3">
              <Button variant="contained">Simpan</Button>
              <Button
                variant="outlined"
                className="!border-gray-400"
                onClick={handleClose}
              >
                <span className="text-gray-400">Batal</span>
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex justify-between mb-3">
        <div>
          <h1 className="text-2xl font-semibold">
            MATAKULIAH PRODI{" "}
            {major === "SI"
              ? "SISTEM INFORMASI"
              : major === "IF"
              ? "INFORMATIKA"
              : major === "TI"
              ? "TEKNOLOGI INFORMASI"
              : ""}
          </h1>
        </div>
        {/* <div>
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
        </div> */}
      </div>
      <div className="flex justify-between mb-3">
        <div>
          <h1 className="text-2xl font-medium">List Data Matakuliah</h1>
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
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Nama Mata Kuliah</TableCell>
                <TableCell>Kode MK</TableCell>
                {/* <TableCell>PRODI</TableCell> */}
                <TableCell>CPL Terkait</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectsQuery.data?.Curriculum_Subject.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((row, i) => (
                <TableRow
                  key={row.subject.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell>{`${row.subject.englishName} / ${row.subject.indonesiaName}`}</TableCell>
                  <TableCell>{row.subject.code}</TableCell>
                  {/* <TableCell>{row.prodi}</TableCell> */}
                  <TableCell>
                    <div className="flex gap-2">
                      {row.subject.Subject_Cpl.length !== 0 ? (
                        row.subject.Subject_Cpl.map((item, i) => (
                          <span
                            key={i}
                            className={`!p-1 !rounded-md bg-cyan-500 text-white`}
                          >
                            {item.cpl.code}
                          </span>
                        ))
                      ) : (
                        <Chip
                          label={"CPL has not been mapped yet"}
                          color="error"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Actions row={row} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={subjectsQuery.data?.Curriculum_Subject?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, page) => setPage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      {subjectsQuery.data?.Cpl.length !== 0 ? (
        <CplTable data={subjectsQuery.data?.Cpl} />
      ) : (
        <div>
          <input
            ref={inputRef}
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              console.log(e.target.files[0], curriculumId);
              const payload = {
                file: e.target.files[0],
                curriculumId,
              };
              cplMutation.mutate(payload);
            }}
          />
          <p style={{ color: "red" }}>
            Cpl for this curriculum has not been created yet. Press the button
            below to upload Cpl.
          </p>
          <Stack direction={"row"} gap={2}>
            <LoadingButton
              variant="contained"
              color="primary"
              loadingPosition="end"
              endIcon={<UploadFileIcon />}
              loading={cplMutation.isPending}
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Upload CPL
            </LoadingButton>
            <Button
              LinkComponent={"a"}
              href={`${OBE_BASE_URL_API}/static/templates/CurriculumCpl.xlsx`}
              variant="text"
            >
              <span className="text-gray-400">Download Template</span>
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default SubjectList;
