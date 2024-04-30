"use client";

import { IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { MenuOpen, Menu } from "@mui/icons-material";
import Div from "./Div";
import { ASSET_IMAGES } from "../lib/constants/config";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Stack direction={"row"} className="bg-blue-600 text-white">
      <IconButton onClick={() => setSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <MenuOpen /> : <Menu />}
      </IconButton>
      <Div className="flex flex-1 items-center justify-between">
        <Div
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={`${ASSET_IMAGES}/img-logo-short-white.png`}
            className="flex flex-1 h-[50px] object-contain object-left"
          />
          <Typography variant="h4">Fakultas Ilmu Komputer</Typography>
        </Div>
      </Div>
    </Stack>
  );
};

export default Header;
