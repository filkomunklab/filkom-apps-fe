import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Button, TablePagination, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSubjects, postCpl } from "app/api";
import { CplTable } from "./components";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";

function createData(namaMataKuliah, kodeMK, prodi, cpl) {
  return {
    namaMataKuliah,
    kodeMK,
    prodi,
    cpl,
  };
}

const rows = [
  createData(
    "Business Process Reengineering / Rekayasa Proses Bisnis",
    "IS3155",
    "Sistem Informasi",
    ["S10", "P12", "P12", "KU7", "KU13", "KK3"]
  ),
  createData(
    "Business Process Reengineering / Rekayasa Proses Bisnis",
    "IS3155",
    "Sistem Informasi",
    ["S10", "P12", "P12", "KU7", "KU13", "KK3"]
  ),
  createData(
    "Business Process Reengineering / Rekayasa Proses Bisnis",
    "IS3155",
    "Sistem Informasi",
    ["S10", "P12", "P12", "KU7", "KU13", "KK3"]
  ),
  createData(
    "Business Process Reengineering / Rekayasa Proses Bisnis",
    "IS3155",
    "Sistem Informasi",
    ["S10", "P12", "P12", "KU7", "KU13", "KK3"]
  ),
  createData(
    "Business Process Reengineering / Rekayasa Proses Bisnis",
    "IS3155",
    "Sistem Informasi",
    ["S10", "P12", "P12", "KU7", "KU13", "KK3"]
  ),
];

const SubjectList = () => {
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(0);
  const { major, curriculumId, subjectId } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const queryClient = useQueryClient();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const subjectsQuery = useQuery({
    queryKey: ["subjects", curriculumId],
    queryFn: () => getSubjects(curriculumId),
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
          <h1 className="text-2xl font-bold">
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
          <h1 className="text-2xl font-bold">List Data Matakuliah</h1>
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
                  {/* <TableCell>
                    <div className="flex gap-2">
                      {row.cpl.map((cpl, i) => (
                        <span
                          key={i}
                          className={`!p-1 !rounded-md ${
                            cpl[0] === "S"
                              ? "bg-blue-200"
                              : cpl[0] === "P"
                              ? "bg-red-200"
                              : cpl[0] === "K" && cpl[1] === "U"
                              ? "bg-green-200"
                              : cpl[0] === "K" && cpl[1] === "K"
                              ? "bg-yellow-200"
                              : ""
                          }`}
                        >
                          {cpl}
                        </span>
                      ))}
                    </div>
                  </TableCell> */}
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
                            `/obe/curriculum/${major}/${curriculumId}/${subjectId}`
                          )
                        }
                      >
                        Mapping CPL
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={subjectsQuery.data?.Curriculum_Subject.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, page) => setPage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      {subjectsQuery.data?.Cpl.length !== 0 ? (
        <CplTable />
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
        </div>
      )}
    </div>
  );
};

export default SubjectList;
