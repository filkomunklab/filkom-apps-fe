import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Fragment, useState } from "react";
import { TMenuItem } from "../../../global";
import { Circle } from "@mui/icons-material";

export default function SidebarItem({ menuItem }: { menuItem: TMenuItem }) {
  return (
    <List
      sx={{ width: "100%" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {menuItem.label}
        </ListSubheader>
      }
    >
      {menuItem.children?.map((child, index) => {
        if (child.type === "nav-item") {
          return (
            <ListItemButton key={index}>
              <ListItemIcon
                children={child.icon ?? <Circle className="text-[8px]" />}
              />
              <ListItemText primary={child.label} className="select-none" />
            </ListItemButton>
          );
        } else if (child.type === "collapsible") {
          return <CollapsibleItem menuItem={child} key={index} />;
        }
      })}
    </List>
  );
}

const CollapsibleItem = ({ menuItem }: { menuItem: TMenuItem }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon children={menuItem.icon} />
        <ListItemText
          className="auto-scroll select-none"
          primary={menuItem.label}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menuItem.children?.map((subChild, index) => (
            <ListItemButton key={index} sx={{ pl: 4 }}>
              <ListItemIcon children={<Circle className="text-[8px]" />} />
              <ListItemText primary={subChild.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </Fragment>
  );
};
