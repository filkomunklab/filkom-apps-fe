import Div from "@jumbo/shared/Div";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const StudentGrade = () => {
  return (
    <Div>
      <Stack gap={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h1">Nilai Mahasiswa</Typography>
          <Typography variant="h6">Yuhu, Darell Deil</Typography>
        </Stack>
        <Typography variant="h5">Semester 1</Typography>
        <Table>
          <TableHead>
            <TableHeading />
          </TableHead>
          <TableBody>
            {[...Array(10)].map((item, index) => (
              <TableItem index={index} key={index} />
            ))}
          </TableBody>
        </Table>
        <Stack>
          <Typography variant="h2">
            Semester 1, Tahun Akademik 2022/2023
          </Typography>
          <Typography variant="h2">Total Grade: 3.92</Typography>
          <Typography variant="h2">Total Major Grade: 3.95</Typography>
        </Stack>
      </Stack>
    </Div>
  );
};

const TableHeading = () => {
  const style = { fontWeight: 400 };
  return (
    <TableRow sx={{ backgroundColor: "#1A38601A" }}>
      <TableCell sx={[style]}>No</TableCell>
      <TableCell sx={[style]}>Subject</TableCell>
      <TableCell sx={[style]}>Parallel</TableCell>
      <TableCell sx={[style]}>Teacher</TableCell>
      <TableCell sx={[style]}>Grade</TableCell>
      <TableCell sx={[style]}>The -th Enrollment</TableCell>
    </TableRow>
  );
};

const TableItem = ({ item, index }) => {
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{`[IF3263] Kecerdasan Buatan/ Artificial Intelligence`}</TableCell>
      <TableCell>{`A`}</TableCell>
      <TableCell>{`Adam, Stenly`}</TableCell>
      <TableCell>{`A (95)`}</TableCell>
      <TableCell>{`1`}</TableCell>
    </TableRow>
  );
};

export default StudentGrade;
