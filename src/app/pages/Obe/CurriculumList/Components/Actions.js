import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const Actions = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { major } = useParams();
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton aria-label="delete" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        className="*:!shadow-sm"
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => navigate(`/obe/curriculum/${major}/${row.id}`)}
        >
          Lihat Mata Kuliah
        </MenuItem>
        <hr />
        <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default Actions;
