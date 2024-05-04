import React, { useState, useEffect } from "react";
import {
  Typography,
  Accordion,
  styled,
  Button,
  Modal,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { handleAuthenticationError } from "app/pages/BimbinganAkademik/components/HandleErrorCode/HandleErrorCode";

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(26, 56, 96, 0.1)",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {},
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 550,
  bgcolor: "background.paper",
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
  maxWidth: "100%",
  "@media (maxWidth: 768px)": {
    maxWidth: "80%",
  },
  "@media (maxWidth: 480px)": {
    maxWidth: "80%",
  },
};

const AcademicGuide = () => {
  //abort
  const controller = new AbortController();
  const signal = controller.signal;

  const [dataAcademicGuide, setDataAcademicGuide] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editItemId, setEditItemId] = useState(null);

  //handle error
  const handleError = (error) => {
    if (error && error.code === "ERR_CANCELED") {
      console.log("request canceled");
    } else if (error && error.response && error.response.status === 401) {
      handleAuthenticationError();
    } else {
      console.error("error: ");
    }
  };

  const getAcademicGuide = async () => {
    try {
      const response = await jwtAuthAxios.get(`/academic-guide/detail`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        signal,
      });
      console.log("acad g data : ", response.data.data);
      setDataAcademicGuide(response.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getAcademicGuide();
    return () => controller.abort();
  }, []);

  const handleSubmit = async (itemId, updatedContent) => {
    try {
      await jwtAuthAxios.patch(
        `/academic-guide/update/${itemId}`,
        {
          content: updatedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOpenEditModal(false);
      getAcademicGuide();
    } catch (error) {
      handleError(error);
    }
  };

  const handleEdit = (itemId, content) => {
    setEditItemId(itemId);
    setEditedContent(content);
    setOpenEditModal(true);
  };

  const { role } = JSON.parse(localStorage.getItem("user"));
  const isDean = role.includes("DEKAN");

  return (
    <div>
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: 500,
          paddingBottom: "24px",
        }}
      >
        Academic Guide
      </Typography>
      <div sx={{ flex: 1 }}>
        {dataAcademicGuide.map((item) => (
          <Accordion defaultExpanded>
            <AccordionSummary
              sx={{ paddingLeft: "24px" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography sx={{ fontWeight: 500 }}>
                {item.part}. {item.title}
                {isDean ? (
                  <>
                    <span>{" | "}</span>
                    <span
                      style={{
                        cursor: "pointer",
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#004EE9";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "";
                      }}
                      onClick={() => handleEdit(item.id, item.content)}
                    >
                      Edit
                    </span>
                  </>
                ) : null}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  textAlign: "justify",
                  "@media (maxWidth: 390px)": {
                    fontSize: "12px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  },
                }}
              >
                {item.content &&
                  item.content.split("\n").map((part, index) => (
                    <>
                      {part}
                      <br />
                    </>
                  ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="edit-visi-misi-tujuan-modal"
      >
        <Box style={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              paddingTop: 2,
            }}
          >
            Edit Vision, Mission, or Goals
          </Typography>
          <TextField
            multiline
            fullWidth
            rows={17}
            variant="outlined"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Grid container pt={4} spacing={1} justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={() => setOpenEditModal(false)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  color: "black",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "lightgrey",
                  },
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleSubmit(editItemId, editedContent)}
                sx={{
                  backgroundColor: "#006AF5",
                  borderRadius: "5px",
                  color: "white",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "#025ED8",
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default AcademicGuide;
