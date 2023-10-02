import React from "react";
import { Typography, Grid, experimentalStyled as styled, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "rgba(26, 56, 96, 0.1)",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer", 
  transition: "background-color 0.3s ease-in-out",

  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 106, 254, 0.1)",
    color: theme.palette.mode === "dark" ? "rgba(0, 95, 219, 1)" : "rgba(0, 95, 219, 1)",
  },

}));

const Grades = () => {
  const semesterNames = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5"];

  return (
    <div>
      <Typography sx={{ fontSize: "24px", fontWeight: 500 }}>Student Grades</Typography>
      <Typography sx={{ paddingTop: "22px", paddingBottom: "26px", fontSize: "15px", fontWeight: 400, color: "rgba(27, 43, 65, 0.69)" }}>Select a semester to view grades.</Typography>
      <div sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {semesterNames.map((semester, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Link to={`/semester/${index + 1}`} style={{ textDecoration: "none" }}>
                <Item>
                  <Typography  sx={{ fontSize: "11px", fontWeight: "400", color: "rgba(27, 43, 65, 0.69)", textAlign: "left"  }}>
                    Student Grades
                  </Typography>
                  <Typography sx={{ fontSize: "17px", fontWeight: "600", textAlign: "left"  }}>{semester} </Typography>
                                   
                </Item>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Grades;
