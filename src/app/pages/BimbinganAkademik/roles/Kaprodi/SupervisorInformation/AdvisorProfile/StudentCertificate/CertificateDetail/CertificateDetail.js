import Div from "@jumbo/shared/Div";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  experimentalStyled as styled,
} from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

const CertificateDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const certificateDetails = state ? state.certificateDetails : {};
  const {
    firstName,
    lastName,
    SupervisorFirstName,
    SupervisorLastName,
    submissionDate,
    pathFile,
    category,
    description,
    status,
    title,
    comments,
    approvalDate,
    id,
  } = certificateDetails;
  const pdfURL = pathFile;

  const commentContent =
    comments && comments.trim() !== "" ? comments.trim() : "-";

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
            <StyledLink onClick={() => navigate(-2)}>
              Advisor Profile
            </StyledLink>
            <StyledLink onClick={() => navigate(-1)}>
              Student Certificate
            </StyledLink>
            <Typography color="text.primary">Certificates</Typography>
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
                    {title.charAt(0).toUpperCase() + title.slice(1)}
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
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Typography>
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
                          ? "#005FDB"
                          : status === "WAITING"
                          ? "#FFCC00"
                          : "inherit",
                    }}
                  >
                    {status.charAt(0) + status.slice(1).toLowerCase()}
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

export default CertificateDetail;
