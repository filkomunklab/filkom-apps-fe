import { Stack, Typography, Button, Modal, styled } from "@mui/material";
import { Box, margin } from "@mui/system";

import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import jwtAuthAxios from "app/services/Auth/jwtAuth";

const DeleteDataModal = ({ openModalDeleteData, setOpenModalDeleteData, passingData, setEmployees }) => {
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#FFFFFF",
    border: "2px solid #E0E0E0",
    borderRadius: "10px",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    padding: "24px 24px 0 24px",
  };

  const deleteData = async () => {
    try {
      await jwtAuthAxios.delete(`/employee/${passingData.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const response = await jwtAuthAxios.get(`/employee`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOpenModalDeleteData(false);
      setEmployees(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal open={openModalDeleteData} onClose={() => setOpenModalDeleteData(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={styleModal}>
        <Typography id="modal-modal-title" variant="h2" component="h2" sx={{ fontWeight: "400", color: "#0A0A0A", fontSize: "24px", display: "flex", alignItems: "center", width: "260px" }}>
          <WarningRoundedIcon sx={{ padding: 0, marginRight: "3px" }} />
          Delete Data?
        </Typography>

        <Typography id="modal-modal-description" sx={{ fontSize: "12px", color: "#616161", marginLeft: "28px", marginBottom: "16px" }}>
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
            onClick={() => setOpenModalDeleteData(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" sx={{ padding: 1 }} color="error" onClick={deleteData}>
            Confirm
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteDataModal;
