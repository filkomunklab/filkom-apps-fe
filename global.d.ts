import { ListItemIconProps } from "@mui/material";
import { ReactNode } from "react";

declare type TMenuItem = {
  label: string;
  type: "section" | "nav-item" | "collapsible";
  icon?: ReactNode;
  uri?: string;
  children?: TMenuItem[];
};
