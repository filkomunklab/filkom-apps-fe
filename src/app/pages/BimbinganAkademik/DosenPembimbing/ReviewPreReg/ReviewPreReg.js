import Div from "@jumbo/shared/Div";
import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import SearchLocal from "app/shared/SearchLocal";
import { useState } from "react";

const data = [...Array(15).keys()].map(() => ({
  nim: "105022010000",
  name: "John Doe",
  prodi: "Informatika",
  year: "2017",
  sks: "20",
  status: "Active",
  krs: "Sudah Mengisi",
}));

const ReviewPreReg = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Div>
      <Stack direction={"column"} gap={2}>
        <Typography variant="h1">Student's Study Plan</Typography>
        <Typography>
          Dalam halaman ini berisi informasi terkait pengisian Kartu Rencana
          Studi Mahasiswa terkhususnya mahasiswa bimbingan anda. Anda bisa
          menggunakan filter untuk menyortir list mahasiswa untuk mendapatkan
          informasi yang anda cari.
        </Typography>
        <Stack gap={2}>
          <Grid container>
            <Grid item sm={12} md={6} display={"flex"}>
              <Typography variant="h3">Daftar mahasiswa bimbingan</Typography>
            </Grid>
            <Grid item sm={12} md={6}>
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                <SearchLocal />
                <FormControl sx={{ width: "100%" }} size="small">
                  <InputLabel htmlFor="grouped-native-select">
                    Filter
                  </InputLabel>
                  <Select
                    native
                    defaultValue=""
                    id="grouped-native-select"
                    label="Filter"
                    sx={{ borderRadius: "60px" }}
                  >
                    <option aria-label="None" value="" />
                    <optgroup label="Category 1">
                      <option value={1}>Option 1</option>
                      <option value={2}>Option 2</option>
                    </optgroup>
                    <optgroup label="Category 2">
                      <option value={3}>Option 3</option>
                      <option value={4}>Option 4</option>
                    </optgroup>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
          <Div>
            <Table sx={{ overflowX: "auto" }}>
              <TableHead children={<TableHeading />} />
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableItem key={index} item={item} index={index} />
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component={"div"}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Div>
        </Stack>
      </Stack>
    </Div>
  );
};

const TableHeading = () => {
  const style = { fontWeight: 400, whiteSpace: "nowrap" };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>No</TableCell>
      <TableCell sx={[style]}>NIM</TableCell>
      <TableCell sx={[style]}>Nama Mahasiswa</TableCell>
      <TableCell sx={[style]}>Program Studi</TableCell>
      <TableCell sx={[style]}>Tahun Masuk</TableCell>
      <TableCell sx={[style]}>SKS Diambil</TableCell>
      <TableCell sx={[style]}>Status Akademik</TableCell>
      <TableCell sx={[style]}>Status KRS</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{`105022010000`}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.prodi}</TableCell>
      <TableCell>{item.year}</TableCell>
      <TableCell>{item.sks}</TableCell>
      <TableCell>{item.status}</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>{item.krs}</TableCell>
    </TableRow>
  );
};

export default ReviewPreReg;
