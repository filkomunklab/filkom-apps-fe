import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  experimentalStyled as styled,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import Div from "@jumbo/shared/Div";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 402,
  bgcolor: "background.paper",
  border: "1px solid #000",
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

const CertificateStudent = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [isApprove, setIsApprove] = useState(false);

  const handleSubmit = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleReject = () => {
    setIsReject(!isReject);
  };
  const handleApprove = () => {
    setIsApprove(!isApprove);
  };

  const handleClick = (event) => {
    event.preventDefault();
  };

  const imageUrl =
    "https://i.pinimg.com/originals/fc/fa/29/fcfa2911e796d71f1bf6aa25ee1d8d89.jpg";

  return (
    <Div>
      <Div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledLink to="/bimbingan-akademik/dekan/review-activities/certificate">
            Review Certificates
          </StyledLink>
          <Typography color="text.primary">Certificate</Typography>
        </Breadcrumbs>
      </Div>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 500,
          marginTop: "16px",
          marginLeft: "24px",
        }}
      >
        Certificate
      </Typography>
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ flex: 0.4 }}>
          <Typography variant="h3" fontWeight="500" sx={{ marginBottom: 2 }}>
            Title
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Student Name
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Supervisor Name
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Category
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Submission Date
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Status
          </Typography>
        </Box>
        <Box sx={{ flex: 0.04 }}>
          <Typography variant="h3" fontWeight="500" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            :
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" fontWeight="500" sx={{ marginBottom: 2 }}>
            Menang lomba desain prototype
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Awuy, Diany Mariska
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Adzanu, Shaliha Alifyaa
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Local
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            10 May 2000
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: 2, color: "#FFCC00" }}>
            Waiting
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }}>
          <img
            src={imageUrl}
            alt="Certificate-pic"
            style={{ maxWidth: "100%" }}
          />
        </Box>
      </Container>
      <Box sx={{ paddingLeft: 3, marginTop: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Descriptions:
        </Typography>
        <Typography variant="h5">
          Saya mengikuti lomba desain prototype website kampus yang
          diselenggarakan oleh Fakultas Ilmu Komputer.
        </Typography>
      </Box>
      <Box component="form" noValidate autoComplete="off" sx={{ marginTop: 5 }}>
        <Typography variant="h6">Comments</Typography>
        <TextField
          id="outlined-multiline-static"
          placeholder="Add comment"
          multiline
          minRows={4}
          fullWidth
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
          loading
          variant="contained"
          color="error"
          sx={{ borderRadius: 50, textTransform: "capitalize", width: "152px" }}
          onClick={handleReject}
        >
          Reject
        </Button>
        <Button
          loading
          variant="contained"
          //   color="success"
          sx={{ borderRadius: 50, textTransform: "capitalize", width: "152px" }}
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
              <Typography id="modal-modal-title" variant="h3" color={`#0A0A0A`}>
                Reject this Student Certificate?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please remember to leave comments for the student regarding the
                reasons of the rejection.
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
                onClick={() => setIsReject(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" sx={{ textTransform: "capitalize" }}>
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
              <Typography id="modal-modal-title" variant="h3" color={`#0A0A0A`}>
                Approve this Student Certificate?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please note that agreeing to this certificate will save the data
                for statistical analysis before making it available.
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
              <Button variant="contained" sx={{ textTransform: "capitalize" }}>
                Submit
              </Button>
            </Div>
          </Box>
        </Modal>
      </Div>
    </Div>
  );
};

export default CertificateStudent;
