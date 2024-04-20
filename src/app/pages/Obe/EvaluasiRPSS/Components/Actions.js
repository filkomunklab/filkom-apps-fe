import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRps } from "app/api";
import Swal from "sweetalert2";

const Actions = ({ item, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This process will delete all data related to this RPS. You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait",
          allowEscapeKey: false,
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        rpsMutation.mutate(item.id);
      }
    });
  };

  const rpsMutation = useMutation({
    mutationFn: deleteRps,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rps", { teacherId: user.id }],
      });
      Swal.fire({
        title: "Success!",
        text: "RPS has been deleted.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
      });
    },
  });
  return (
    <div>
      <IconButton aria-label="Action" size="small" onClick={handleMenuClick}>
        <MoreVert />
      </IconButton>
      <Menu
        className="*:!shadow-sm"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <Link to={`/obe/list-rps/${item.id}`}>View RPS Detail</Link>
        </MenuItem>
        {/* <MenuItem>Edit</MenuItem> */}
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default Actions;
