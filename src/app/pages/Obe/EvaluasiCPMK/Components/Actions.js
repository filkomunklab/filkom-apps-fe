import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Link } from "react-router-dom";

const Actions = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div>
      <IconButton aria-label="Action" size="small" onClick={handleMenuClick}>
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
        <Link to={`/obe/evaluasi-matakuliah/${row.id}`}>
          <MenuItem>View Report CPMK</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};

export default Actions;
