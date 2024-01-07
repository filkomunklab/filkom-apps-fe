import {
  Stack,
  Typography,
  Button,
  Modal,
  IconButton,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import Collapse from "@mui/material/Collapse";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import jwtAuthAxios from "app/services/Auth/jwtAuth";
import { useState } from "react";

const DeleteDataModal = ({
  openModalDeleteData,
  setOpenModalDeleteData,
  passingData,
  setStudents,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#FFFFFF",
    border: "2px solid #E0E0E0",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    padding: "24px 24px 0 24px",
  };

  const deleteData = async () => {
    setLoading(true);
    try {
      await jwtAuthAxios.delete(`/student/${passingData.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const response = await jwtAuthAxios.get(`/Student`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      setOpen(false);
      setOpenModalDeleteData(false);
      setStudents(response.data.data);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.data.error);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Something wrong!!");
      }

      setOpen(true);
    }
  };

  return (
    <Modal
      open={openModalDeleteData}
      onClose={() => {
        setOpen(false);
        setOpenModalDeleteData(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {error}
          </Alert>
        </Collapse>
        <Typography
          id="modal-modal-title"
          variant="h2"
          component="h2"
          sx={{
            fontWeight: "400",
            color: "#0A0A0A",
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            width: "260px",
          }}
        >
          <WarningRoundedIcon sx={{ padding: 0, marginRight: "3px" }} />
          Delete Data?
        </Typography>

        <Typography
          id="modal-modal-description"
          sx={{
            fontSize: "12px",
            color: "#616161",
            marginLeft: "28px",
            marginBottom: "16px",
          }}
        >
          Are you sure want to delete this data?
        </Typography>

        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          columnGap="12px"
          sx={{
            backgroundColor: "#F5F5F5",
            width: "calc(100% + 75px)",
            height: "100%",
            marginLeft: "-50px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "#E0E0E0",
              color: "#0A0A0A",
              padding: 1,
            }}
            onClick={() => {
              setOpen(false);
              setOpenModalDeleteData(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            color="error"
            size="small"
            onClick={deleteData}
            loading={loading}
            loadingIndicator="Loading…"
            variant="contained"
            sx={{
              width: "79px",
              height: "32px",
              paddingTop: 2.5,
              paddingBottom: 2.5,
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <span style={{ fontSize: "14px" }}>CONFIRM</span>
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteDataModal;
