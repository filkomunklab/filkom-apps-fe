import React, { useEffect } from "react";
import { Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "fixed",
  top: "15%",
  right: "2%",
  width: 400,
  boxShadow: 24,
  padding: 24,
  backgroundColor: "white",
  borderRadius: 10,
};

const SuccessOrError = ({ open, handleClose, title, description }) => {
  useEffect(() => {
    let timer;

    if (open) {
      timer = setTimeout(() => {
        handleClose();
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [open, handleClose]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={style}>
        <IconButton
          edge="end"
          color="#D9D9D9"
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: "absolute",
            top: "10px",
            right: "20px",
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        <Typography
          id="modal-modal-description"
          style={{ marginTop: "16px", marginBottom: "20px" }}
        >
          {description}
        </Typography>
      </div>
    </Modal>
  );
};

export default SuccessOrError;
