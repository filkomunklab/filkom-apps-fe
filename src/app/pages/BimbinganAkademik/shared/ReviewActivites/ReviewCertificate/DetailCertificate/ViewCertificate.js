import React, { useState } from "react";
import {
  Grid,
  Stack,
  TextField,
  Typography,
  Box,
  Modal,
  Button,
  Breadcrumbs,
  experimentalStyled as styled,
  CircularProgress,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { format } from "date-fns";
import axios from "axios";
import { BASE_URL_API } from "@jumbo/config/env";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 402,
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 24,
  overflow: "hidden",
};
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(27, 43, 65, 0.69)",

  "&:hover": {
    textDecoration: "underline",
  },
}));

const CertificateWaiting = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmitCertificate = async () => {
    setLoading(true);
    try {
      setIsModalVisible(!isModalVisible);
      const bodyData = {
        approval_status: isApprove ? "APPROVED" : "REJECTED",
        comments: commentText || null,
      };
      await axios.put(
        `${BASE_URL_API}/certificate/approval/status/${id}`,
        bodyData
      );
      setLoading(false);
      const { role } = JSON.parse(localStorage.getItem("user"));
      let path = "";

      if (role.includes("DEKAN")) {
        path = "/bimbingan-akademik/dekan/review-activities/certificate";
      } else if (role.includes("KAPRODI")) {
        path = "/bimbingan-akademik/kaprodi/review-activities/certificate";
      } else {
        path =
          "/bimbingan-akademik/dosen-pembimbing/review-activities/certificate";
      }
      navigate(path);
    } catch (error) {
      setLoading(false);
      console.error("Error completing status:", error);
    }
  };

  const handleReject = () => {
    setIsReject(!isReject);
  };
  const handleApprove = () => {
    setIsApprove(!isApprove);
  };

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
    id,
  } = certificateDetails;
  const pdfURL = pathFile;

  const handleBreadcrumbsClick = () => {
    const { role } = JSON.parse(localStorage.getItem("user"));
    let path = "";

    if (role.includes("DEKAN")) {
      path = "/bimbingan-akademik/dekan/review-activities/certificate";
    } else if (role.includes("KAPRODI")) {
      path = "/bimbingan-akademik/kaprodi/review-activities/certificate";
    } else {
      path =
        "/bimbingan-akademik/dosen-pembimbing/review-activities/certificate";
    }
    return <StyledLink to={path}>Review Certificate</StyledLink>;
  };

  return (
    <Grid container spacing={2}>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(34, 34, 34, 0.7)",
            zIndex: 2003,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <Grid item md={6} id="detail-item">
        <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: 1 }}>
          {handleBreadcrumbsClick()}
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
                <Typography variant="h5" sx={{ color: "#FFCC00" }}>
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
                    ? description.charAt(0).toUpperCase() + description.slice(1)
                    : "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={11.5} xl={11.5} pt={1}>
            <Box component="form" noValidate autoComplete="off">
              <Typography pb={1} variant="h5">
                Comment
              </Typography>
              <TextField
                id="outlined-multiline-static"
                placeholder="Add comment here"
                multiline
                fullWidth
                minRows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </Box>
            <Div
              sx={{
                mt: 3,
                mb: 6,
                display: "flex",
                justifyContent: "flex-end",
                columnGap: 2,
              }}
            >
              <Button
                variant="contained"
                color="error"
                sx={{
                  borderRadius: 50,
                  textTransform: "capitalize",
                  width: "152px",
                }}
                onClick={handleReject}
              >
                Reject
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 50,
                  textTransform: "capitalize",
                  width: "152px",
                }}
                onClick={handleApprove}
              >
                Approve
              </Button>
              <Modal
                open={isReject}
                onClose={handleReject}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Div sx={{ py: 2, px: 3 }}>
                    <Typography
                      id="modal-modal-title"
                      variant="h3"
                      color={`#0A0A0A`}
                    >
                      Reject this Student Certificate?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Please remember to leave comments for the student
                      regarding the reasons of the rejection.
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      columnGap: 2,
                      justifyContent: "flex-end",
                      bgcolor: "#F5F5F5",
                      px: 2,
                      py: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#E0E0E0",
                        color: "#0A0A0A",
                        textTransform: "capitalize",
                      }}
                      onClick={() => {
                        setIsReject(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ textTransform: "capitalize" }}
                      onClick={() => {
                        handleSubmitCertificate();
                        setIsReject(false);
                      }}
                    >
                      Submit
                    </Button>
                  </Div>
                </Box>
              </Modal>
              <Modal
                open={isApprove}
                onClose={handleApprove}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Div sx={{ py: 2, px: 3 }}>
                    <Typography
                      id="modal-modal-title"
                      variant="h3"
                      color={`#0A0A0A`}
                    >
                      Approve this Student Certificate?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Please note that agreeing to this certificate will save
                      the data for statistical analysis before making it
                      available.
                    </Typography>
                  </Div>
                  <Div
                    sx={{
                      display: "flex",
                      columnGap: 2,
                      justifyContent: "flex-end",
                      bgcolor: "#F5F5F5",
                      px: 2,
                      py: 1,
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#E0E0E0",
                        color: "#0A0A0A",
                        textTransform: "capitalize",
                      }}
                      onClick={() => setIsApprove(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitCertificate}
                      variant="contained"
                      sx={{ textTransform: "capitalize" }}
                    >
                      Submit
                    </Button>
                  </Div>
                </Box>
              </Modal>
            </Div>
          </Grid>
        </Grid>
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

export default CertificateWaiting;
