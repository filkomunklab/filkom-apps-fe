import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const Actions = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //   const handleView = () => {
  //     const currentPath = window.location.pathname;
  //     const newPath = `${currentPath}/${selectedKodeMK}`;
  //     window.location.href = newPath;
  //   };
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
        <MenuItem
        //   onClick={handleView}
        >
          View
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default Actions;
