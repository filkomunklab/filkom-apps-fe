import { Stack } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ReactNode } from "react";
import Div from "../components/Div";

const GeneralLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack direction={"row"}>
      <Sidebar />
      <Stack className="flex-1">
        <Header />
        <Div className="py-5 px-6">{children}</Div>
      </Stack>
    </Stack>
  );
};

export default GeneralLayout;
