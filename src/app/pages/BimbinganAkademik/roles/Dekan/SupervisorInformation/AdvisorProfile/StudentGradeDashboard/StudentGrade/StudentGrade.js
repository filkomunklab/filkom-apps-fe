import Div from "@jumbo/shared/Div";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Typography,
  Breadcrumbs,
  experimentalStyled as styled,
  Grid,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const StudentGrade = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const gradeDetails = state ? state.gradeDetails : {};
  const { semester, subject, firstName, lastName } = gradeDetails;
  console.log("ini grade detail", gradeDetails);

  const getLetterGrade = (grade) => {
    if (grade >= 91) return { letter: "A", weight: 4.0 };
    else if (grade >= 85) return { letter: "A-", weight: 3.7 };
    else if (grade >= 82) return { letter: "B+", weight: 3.3 };
    else if (grade >= 78) return { letter: "B", weight: 3.0 };
    else if (grade >= 75) return { letter: "B-", weight: 2.7 };
    else if (grade >= 70) return { letter: "C+", weight: 2.3 };
    else if (grade >= 67) return { letter: "C", weight: 2.0 };
    else if (grade >= 60) return { letter: "C-", weight: 1.7 };
    else if (grade >= 50) return { letter: "D", weight: 1.0 };
    else return { letter: "F", weight: 0.0 };
  };

  const calculateTotalGrade = (subjects) => {
    let totalGrade = 0;
    let totalMajorGrade = 0;
    let totalSKS = 0;

    subjects.forEach((data) => {
      const letterGrade = getLetterGrade(data.grades);
      const weightedGrade = letterGrade.weight * data.Subject.credits;

      totalSKS += data.Subject.credits;
      totalGrade += weightedGrade;

      if (data.Subject.type === "Major") {
        totalMajorGrade += weightedGrade;
      }
    });

    const ip = totalGrade / totalSKS;
    const majorIp = totalMajorGrade / totalSKS;

    return { ip, majorIp };
  };

  const { ip, majorIp } = calculateTotalGrade(subject);

  return (
    <Div>
      <Div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink
            onClick={() =>
              navigate("/bimbingan-akademik/dekan/supervisor-information/")
            }
          >
            Supervisor Information
          </StyledLink>
          <StyledLink onClick={() => navigate(-2)}>Advisor Profile</StyledLink>
          <StyledLink onClick={() => navigate(-1)}>Student Grade</StyledLink>
          <Typography color="text.primary">Grade</Typography>
        </Breadcrumbs>
      </Div>
      <Stack gap={3} paddingTop={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h1" fontWeight={500}>
            Student Grade {semester}
          </Typography>
          <Typography variant="h6" sx={{ paddingRight: "15px" }}>
            {lastName}, {firstName}
          </Typography>
        </Stack>

        <Grid item xs={12} paddingTop={1}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1A38601A" }}>
                  <TableCell>No</TableCell>
                  <TableCell>Subject Name</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Lecturer</TableCell>
                  <TableCell>Credit(s)</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subject &&
                  subject.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ width: "40px" }}>{index + 1}</TableCell>
                      <TableCell sx={{ width: "40px" }}>
                        {data.subjectName}
                      </TableCell>
                      <TableCell sx={{ width: "40px" }}>
                        {`${data.grades} (${
                          getLetterGrade(data.grades).letter
                        })`}
                      </TableCell>
                      <TableCell sx={{ width: "40px" }}>
                        {data.lecturer}
                      </TableCell>
                      <TableCell sx={{ width: "40px" }}>
                        {data.Subject.credits}
                      </TableCell>
                      <TableCell sx={{ width: "40px" }}>
                        {data.Subject.type}
                      </TableCell>
                      <TableCell sx={{ width: "40px" }}>
                        {data.description || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Stack paddingTop={2}>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: 14, md: 16, xl: 18 } }}
          >
            Total Grade: {ip.toFixed(2)}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: 14, md: 16, xl: 18 } }}
          >
            Total Major Grade: {majorIp.toFixed(2)}
          </Typography>
        </Stack>
      </Stack>
    </Div>
  );
};

export default StudentGrade;
