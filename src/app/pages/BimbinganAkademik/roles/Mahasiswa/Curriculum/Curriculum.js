import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Grid,
} from "@mui/material";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";

const Curriculum = () => {
  const [curriculumDetails, setCurriculumDetails] = useState({
    name: "",
    year: "",
  });
  const [listSubject, setListSubject] = useState([]);

  useEffect(() => {
    getCurriculumDetails();
  }, []);

  const getCurriculumDetails = async () => {
    try {
      const curriculumResult = await axios.get(`${BASE_URL_API}/curriculum`);

      if (curriculumResult.data.status === "OK") {
        const firstCurriculum = curriculumResult.data.data[0];

        setCurriculumDetails({
          name: firstCurriculum.major,
          year: firstCurriculum.year,
        });

        const result = await axios.get(
          `${BASE_URL_API}/subject/${firstCurriculum.id}`
        );

        if (result.data.status === "OK") {
          setListSubject(result.data.data);
        }
      }
    } catch (error) {
      console.error("Ini error:", error);
    }
  };

  const renderRows = () => {
    const rows = [];
    let currentSemester = null;

    listSubject.forEach((value, index) => {
      if (value.semester !== currentSemester) {
        rows.push(
          <TableRow key={`semester-${value.semester}`}>
            <TableCell
              colSpan={6}
              sx={{
                lign: "left",
                fontWeight: 500,
                fontSize: "15px",
                color: "black",
              }}
            >
              {value.semester === 0
                ? "Pre-Requisite"
                : value.semester === 9
                ? "Elective"
                : `Semester ${value.semester}`}
            </TableCell>
          </TableRow>
        );
        currentSemester = value.semester;
      }

      rows.push(
        <TableRow key={value.id}>
          <TableCell>{value.code}</TableCell>
          <TableCell>{value.name}</TableCell>
          <TableCell>{value.credits}</TableCell>
          <TableCell>{value.type}</TableCell>
          <TableCell sx={{ width: "400px" }}>
            {value.prerequisite === null || value.prerequisite === ""
              ? "-"
              : value.prerequisite
                  .split(/(?<=\])\s-\s|\n/)
                  .map((prereq, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && (
                        <>
                          <br /> <br />
                        </>
                      )}
                      {prereq}
                    </React.Fragment>
                  ))}
          </TableCell>
        </TableRow>
      );
    });

    return rows;
  };

  return (
    <div>
      <div>
        <Typography
          sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: "10px" }}
        >
          Curriculum{` ${curriculumDetails.name} - ${curriculumDetails.year}`}
        </Typography>
      </div>

      <Grid container pt={2}>
        <TableContainer sx={{ maxHeight: 530 }} component={Paper}>
          <Table>
            <TableHead
              sx={{
                position: "-webkit-sticky",
                position: "sticky",
                top: 0,
                backgroundColor: "rgb(245, 247, 250)",
              }}
            >
              <TableRow>
                <TableCell sx={{ width: "80px" }}>Code</TableCell>
                <TableCell sx={{ width: "400px" }}>Name</TableCell>
                <TableCell sx={{ width: "80px", lign: "right" }}>
                  Credit(s)
                </TableCell>
                <TableCell sx={{ width: "130px" }}>Type</TableCell>
                <TableCell sx={{ width: "400px" }}>Prerequisite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderRows()}</TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default Curriculum;
