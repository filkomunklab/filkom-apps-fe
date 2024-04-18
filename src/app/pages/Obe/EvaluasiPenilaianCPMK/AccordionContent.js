import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GradingModal } from "./Components";

export default function AccordionContent({ item, cpmkGrading }) {
  const [open, setOpen] = useState(false);
  const [selectedGrading, setSelectedGrading] = useState(null);

  const handleOpen = (selectedItem) => {
    setOpen(true);
    setSelectedGrading(selectedItem);
  };

  const grading = cpmkGrading.find((cpmk) => cpmk.code === item.code);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-primary *:!text-white">
              <TableCell>No</TableCell>
              <TableCell>Nama Mahasiswa</TableCell>
              <TableCell>Nomor Induk Mahasiswa</TableCell>
              {grading.GradingSystem.map((item, index) => (
                <TableCell
                  key={index}
                  onClick={() => handleOpen(item)}
                  className="hover:cursor-pointer hover:bg-blue-400"
                >
                  {`${item.gradingName} - /${item.gradingWeight}`}
                </TableCell>
              ))}
              <TableCell>{`Total Bobot - /${grading.totalGradingWeight}`}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item.studentList.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell
                  style={{ cursor: "pointer", color: "black" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "blue";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "black";
                  }}
                >
                  {row.name}
                </TableCell>

                <TableCell>{row.nim}</TableCell>
                {row.grading.map((item, index) => (
                  <TableCell key={index}>{item.score}</TableCell>
                ))}
                <TableCell>
                  {row.grading.reduce((acc, curr) => acc + curr.score, 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow className="bg-primary *:!text-white">
            <TableCell
              colSpan={3 + item.studentList[0].grading.length}
              align="center"
            >
              TOTAL
            </TableCell>
            <TableCell>
              {`${item.studentList.reduce(
                (acc, curr) =>
                  acc + curr.grading.reduce((acc, curr) => acc + curr.score, 0),
                0
              )} / ${item.studentList.length * grading.totalGradingWeight}`}
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <GradingModal
        open={open}
        setOpen={(value) => {
          setOpen(value);
          setSelectedGrading(null);
        }}
        item={selectedGrading}
      />
    </div>
  );
}
