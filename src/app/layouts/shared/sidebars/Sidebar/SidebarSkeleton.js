import React from "react";
import { ListItem, ListItemIcon, ListItemText, Skeleton } from "@mui/material";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";

const SidebarSkeleton = () => {
  return (
    <List
      disablePadding
      sx={{
        mr: 2,
        pb: 2,
      }}
    >
      {[...Array(3).keys()].map((index) => (
        <React.Fragment key={index}>
          <ListSubheader
            component="li"
            disableSticky
            sx={{
              backgroundColor: "transparent",
              p: (theme) => theme.spacing(3, 0, 2),
            }}
          >
            <Skeleton width={80} height={18} />
          </ListSubheader>
        </React.Fragment>
      ))}
    </List>
  );
};
export default SidebarSkeleton;
