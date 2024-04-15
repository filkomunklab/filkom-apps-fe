import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { patchRpsStatus } from "app/api";

const Actions = ({ row, major }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const queryClient = useQueryClient();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const rpsMutation = useMutation({
    mutationFn: patchRpsStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rps", { major }] });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "RPS status updated",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update RPS status",
      });
    },
  });
  return (
    <div>
      <IconButton
        aria-label="Action"
        size="small"
        onClick={handleMenuClick}
        data-kodemk={row.kodeMK}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        className="*:!shadow-sm"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <Link to={`/obe/all-list-rps/${major}/${row.id}`}>View</Link>
        </MenuItem>
        <MenuItem
          onClick={() =>
            rpsMutation.mutate({ rpsId: row.id, status: "APPROVED" })
          }
          disabled={rpsMutation.isPending}
        >
          Approve
        </MenuItem>
        <MenuItem
          onClick={() =>
            rpsMutation.mutate({ rpsId: row.id, status: "REJECTED" })
          }
          disabled={rpsMutation.isPending}
        >
          Reject
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Actions;
