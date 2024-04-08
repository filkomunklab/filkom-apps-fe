import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Actions = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
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
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default Actions;
