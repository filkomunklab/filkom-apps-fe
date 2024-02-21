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
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import {
  handlePermissionError,
  handleAuthenticationError,
} from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const Curriculum = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [curriculumDetails, setCurriculumDetails] = useState({
    name: "",
    year: "",
  });
  const [listSubject, setListSubject] = useState([]);

  useEffect(() => {
    getCurriculumDetails();
    return () => controller.abort();
  }, []);

  const getCurriculumDetails = async () => {
    try {
      const curriculumResult = await jwtAuthAxios.get(`/curriculum`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      if (curriculumResult.data.status === "OK") {
        const firstCurriculum = curriculumResult.data.data[0];

        setCurriculumDetails({
          name: firstCurriculum.major,
          year: firstCurriculum.year,
        });

        const result = await jwtAuthAxios.get(
          `/subject/${firstCurriculum.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            signal,
          }
        );

        if (result.data.status === "OK") {
          setListSubject(result.data.data);
          setLoading(false);
        }
      }
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        console.log("request canceled");
      } else if (error.response && error.response.status === 403) {
        handlePermissionError();
        setTimeout(() => {
          navigate(-1);
        }, 2000);
        return;
      } else if (error.response && error.response.status === 401) {
        handleAuthenticationError();
      } else {
        console.log("ini error: ", error);
        return;
      }
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
      {loading ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : curriculumDetails &&
        (curriculumDetails.name === "" || curriculumDetails.year === "") ? (
        <Grid>
          <Typography
            sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: "20px" }}
          >
            Curriculum
          </Typography>
          <Paper
            sx={{
              backgroundColor: "rgba(0, 106, 245, 0.1)",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "50px",
              marginBottom: "15px",
            }}
          >
            <Typography variant="body1">
              You don't have a curriculum yet.
            </Typography>
          </Paper>
        </Grid>
      ) : (
        <Grid container>
          <div>
            <Typography
              sx={{ fontSize: "24px", fontWeight: 500, paddingBottom: "10px" }}
            >
              Curriculum
              {` ${curriculumDetails.name} - ${curriculumDetails.year}`}
            </Typography>
          </div>
          <Grid container pt={2}>
            <TableContainer sx={{ maxHeight: "70vh" }} component={Paper}>
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
        </Grid>
      )}
    </div>
  );
};

export default Curriculum;
