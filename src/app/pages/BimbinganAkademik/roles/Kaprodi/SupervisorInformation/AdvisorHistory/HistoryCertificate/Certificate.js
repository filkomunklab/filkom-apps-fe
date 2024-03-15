import React from "react";
import {
  Grid,
  Typography,
  Box,
  Breadcrumbs,
  Paper,
  experimentalStyled as styled,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const HistoryCertificate = () => {
  const { state } = useLocation();
  const certificateDetails = state ? state.certificateDetails : {};
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    SupervisorFirstName,
    SupervisorLastName,
    submissionDate,
    pathFile,
    level,
    category,
    description,
    status,
    title,
    comments,
    approvalDate,
    id,
  } = certificateDetails;
  const pdfURL = pathFile;
  console.log("comment", comments);

  const commentContent =
    comments && comments.trim() !== "" ? comments.trim() : "-";

  const getCategoryLabel = (category) => {
    switch (category) {
      case "PENALARAN_KEILMUAN":
        return "Reasoning and Scholarship";
      case "ORGANISASI_KEPEMIMPINAN":
        return "Organization and Leadership";
      case "BAKAT_MINAT":
        return "Talents and Interests";
      case "PENGABDIAN_MASYARAKAT":
        return "Community Service";
      case "OTHER":
        return "Others";
      default:
        return category;
    }
  };

  const getLevelLabel = (level) => {
    switch (level) {
      case "REGION":
        return "Region";
      case "NATIONAL":
        return "National";
      case "INTERNATIONAL":
        return "International";
      case "UNIVERSITY":
        return "University";
      case "MAJOR":
        return "Study Program";
      default:
        return level;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={6} id="detail-item">
        <Box style={{ height: "100%", overflowY: "auto" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledLink
              onClick={() =>
                navigate("/bimbingan-akademik/kaprodi/supervisor-information/")
              }
            >
              Supervisor Information
            </StyledLink>
            <StyledLink onClick={() => navigate(-1)}>History</StyledLink>
            <Typography color="text.primary">Certificate</Typography>
          </Breadcrumbs>
          <Grid item>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: { xs: "20px", md: "24px" },
                marginBottom: 2,
                paddingTop: "20px",
              }}
            >
              Certificate
            </Typography>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4} md={4} xl={3} pb={1}>
                  <Typography variant="h5">Title</Typography>
                </Grid>
                <Grid item xs={1} xl={0.5}>
                  <Typography variant="h5">:</Typography>
                </Grid>
                <Grid item xs={7} md={7} xl={8.5} paddingLeft={1}>
                  <Typography variant="h5">
                    {title
                      ? title.charAt(0).toUpperCase() + title.slice(1)
                      : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4} md={4} xl={3} pb={1}>
                  <Typography variant="h5">Student Name</Typography>
                </Grid>
                <Grid item xs={1} xl={0.5}>
                  <Typography variant="h5">:</Typography>
                </Grid>
                <Grid item xs={7} md={7} xl={8.5} paddingLeft={1}>
                  <Typography variant="h5">
                    {lastName}, {firstName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4} md={4} xl={3} pb={1}>
                  <Typography variant="h5">Supervisor Name</Typography>
                </Grid>
                <Grid item xs={1} xl={0.5}>
                  <Typography variant="h5">:</Typography>
                </Grid>
                <Grid item xs={7} md={7} xl={8.5} paddingLeft={1}>
                  <Typography variant="h5">
                    {SupervisorLastName}, {SupervisorFirstName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4} md={4} xl={3} pb={1}>
                  <Typography variant="h5">Submission Date</Typography>
                </Grid>
                <Grid item xs={1} xl={0.5}>
                  <Typography variant="h5">:</Typography>
                </Grid>
                <Grid item xs={7} md={7} xl={8.5} paddingLeft={1}>
                  <Typography variant="h5">
                    {new Date(submissionDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      day: "numeric",
                      month: "long",
                    })}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4} md={4} xl={3} pb={1}>
                  <Typography variant="h5">Approval Date</Typography>
                </Grid>
                <Grid item xs={1} xl={0.5}>
                  <Typography variant="h5">:</Typography>
                </Grid>
                <Grid item xs={7} md={7} xl={8.5} paddingLeft={1}>
                  <Typography variant="h5">
                    {new Date(approvalDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      day: "numeric",
                      month: "long",
                    })}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4} md={4} xl={3} pb={1}>
                  <Typography variant="h5">Category</Typography>
                </Grid>
                <Grid item xs={1} xl={0.5}>
                  <Typography variant="h5">:</Typography>
                </Grid>
                <Grid item xs={7} md={7} xl={8.5} paddingLeft={1}>
                  <Typography variant="h5">
                    {getCategoryLabel(category)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4} md={4} xl={3} pb={1}>
                  <Typography variant="h5">Level</Typography>
                </Grid>
                <Grid item xs={1} xl={0.5}>
                  <Typography variant="h5">:</Typography>
                </Grid>
                <Grid item xs={7} md={7} xl={8.5} paddingLeft={1}>
                  <Typography variant="h5">{getLevelLabel(level)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4} md={4} xl={3} pb={1}>
                  <Typography variant="h5">Status</Typography>
                </Grid>
                <Grid item xs={1} xl={0.5}>
                  <Typography variant="h5">:</Typography>
                </Grid>
                <Grid item xs={7} md={7} xl={8.5} paddingLeft={1}>
                  <Typography
                    variant="h5"
                    sx={{
                      color:
                        status === "REJECTED"
                          ? "red"
                          : status === "APPROVED"
                          ? "blue"
                          : "#005FDB",
                    }}
                  >
                    {status
                      ? status.charAt(0) + status.slice(1).toLowerCase()
                      : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4} md={4} xl={3} pb={1}>
                  <Typography variant="h5">Descriptions</Typography>
                </Grid>
                <Grid item xs={1} xl={0.5}>
                  <Typography variant="h5">:</Typography>
                </Grid>
                <Grid item xs={7} md={6.5} xl={8} paddingLeft={1}>
                  <Typography variant="h5" sx={{ textAlign: "justify" }}>
                    {description
                      ? description.charAt(0).toUpperCase() +
                        description.slice(1)
                      : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={11.5} xl={11.5} paddingTop={2}>
            <Box component="form" noValidate autoComplete="off">
              <Typography variant="h5" sx={{ fontWeight: 500 }}>
                Comment from Supervisor
              </Typography>
              <Paper
                elevation={0}
                variant="outlined"
                fullWidth
                sx={{ backgroundColor: "background.default" }}
              >
                <Typography variant="body1" sx={{ p: 2 }}>
                  {commentContent}
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <iframe
          src={pdfURL}
          title="Certificate-pdf"
          style={{ width: "100%", height: "80vh" }}
        />
      </Grid>
    </Grid>
  );
};

export default HistoryCertificate;
