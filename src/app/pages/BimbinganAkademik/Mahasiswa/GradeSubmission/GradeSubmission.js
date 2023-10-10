import React, { useState } from "react";
import {
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

const GradeSubmission = () => {
  const [semester, setSemester] = useState("");
  const [row, setRow] = useState();
  const [showLabel, setShowLabel] = useState(true);
  const [showLabel2, setShowLabel2] = useState(true);

  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
    setShowLabel(false);
  };

  const handleRowChange = (event) => {
    setRow(event.target.value);
    setShowLabel2(false);
  };

  const generateTableData = (rowCount) => {
    const dataTemplate = {
      number: 1,
      subjectName: "",
      parallel: "",
      lecturer: "",
      grade: "",
      retrievalTo: "",
    };

    return Array.from({ length: rowCount }, (_, index) => {
      return { ...dataTemplate, number: index + 1 };
    });
  };

  const tableData = generateTableData(row);

  return (
    <div>
      <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>
        Grade Submission
      </Typography>
      <Typography
        sx={{
          paddingTop: "22px",
          paddingBottom: "28px",
          fontSize: "15px",
          fontWeight: 400,
          color: "rgba(27, 43, 65, 0.69)",
        }}
      >
        Every student is allowed to input grades for courses completed in the
        previous semester. Please input your grades honestly, and if any
        dishonesty is detected (such as altering your own grades, etc.), the
        individual involved must be prepared to face the consequences imposed by
        the faculty.
      </Typography>
      <Grid container spacing={2} sx={{ paddingBottom: "28px" }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Stack spacing={2}>
            <FormControl size="small" sx={{ backgroundColor: "white" }}>
              <InputLabel shrink={false}>
                {showLabel ? "Select Semester" : ""}
              </InputLabel>
              <Select
                value={semester}
                onChange={handleSemesterChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: "37%",
                    },
                  },
                }}
              >
                {Array.from({ length: 14 }, (_, i) => i + 1).map((num) => (
                  <MenuItem key={num} value={`Semester ${num}`}>
                    Semester {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Stack spacing={2}>
            <FormControl size="small" sx={{ backgroundColor: "white" }}>
              <InputLabel shrink={false}>
                {showLabel2 ? "Select Row" : ""}
              </InputLabel>
              <Select
                value={row}
                onChange={handleRowChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: "37%",
                    },
                  },
                }}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "rgba(26, 56, 96, 0.1)" }}>
            <TableRow>
              <TableCell sx={{ width: "60px" }}>Number</TableCell>
              <TableCell sx={{ width: "350px" }}>Subject Name</TableCell>
              <TableCell sx={{ width: "130px" }}>Parallel</TableCell>
              <TableCell sx={{ width: "200px" }}>Lecturer</TableCell>
              <TableCell sx={{ width: "80px" }}>Grade</TableCell>
              <TableCell sx={{ width: "105px" }}>Retrieval to-</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "white" }}>
            {tableData.map((data, index) => (
              <TableRow key={data.number}>
                <TableCell>{data.number}</TableCell>
                <TableCell>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <InputLabel shrink={false}>Select Subject Name</InputLabel>
                    <Select
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "15%",
                          },
                        },
                      }}
                    >
                      <MenuItem value="Math">
                        [BIU101] Pre-Elementary English
                      </MenuItem>
                      <MenuItem value="Physics">
                        [IS1113] Computer Programming
                      </MenuItem>
                      <MenuItem value="Physics">
                        [IF1112] Aljabar Linear Fundamental
                      </MenuItem>
                      <MenuItem value="Math">
                        [BIU101] Pre-Elementary English
                      </MenuItem>
                      <MenuItem value="Physics">
                        [IS1113] Computer Programming
                      </MenuItem>
                      <MenuItem value="Physics">
                        [IF1112] Aljabar Linear Fundamental
                      </MenuItem>
                      <MenuItem value="Math">
                        [BIU101] Pre-Elementary English
                      </MenuItem>
                      <MenuItem value="Physics">
                        [IS1113] Computer Programming
                      </MenuItem>
                      <MenuItem value="Physics">
                        [IF1112] Aljabar Linear Fundamental
                      </MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <InputLabel shrink={false}>Parallel</InputLabel>
                    <Select
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "15%",
                          },
                        },
                      }}
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="B">C</MenuItem>
                      <MenuItem value="B">D</MenuItem>
                      <MenuItem value="B">E</MenuItem>
                      <MenuItem value="B">F</MenuItem>
                      <MenuItem value="B">G</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <InputLabel shrink={false}>Lecturer</InputLabel>
                    <Select
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "15%",
                          },
                        },
                      }}
                    >
                      <MenuItem value="Sandag, Green A">
                        Sandag, Green A
                      </MenuItem>
                      <MenuItem value="Pungus, Stenly">Pungus, Stenly</MenuItem>
                      <MenuItem value="Adam, Stenly">Adam, Stenly</MenuItem>
                      <MenuItem value="Liem, Andrew T">Liem, Andrew T</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <TextField />
                </TableCell>
                <TableCell>
                  <TextField />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GradeSubmission;
