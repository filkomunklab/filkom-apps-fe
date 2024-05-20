import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Actions = ({ row }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { major, curriculumId } = useParams();
  const navigate = useNavigate();

  const openMenu = Boolean(anchorEl);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickMenuItem = () => {
    console.log(row);
    navigate(`/obe/curriculum/${major}/${curriculumId}/${row.subject.id}`);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <IconButton aria-label="" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        className="*:!shadow-sm"
        key={`menu-${row.subject.id}`}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          key={`menu-item-${row.subject.id}`}
          onClick={handleClickMenuItem}
        >
          Mapping CPL
        </MenuItem>
        <hr />
        <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default Actions;
