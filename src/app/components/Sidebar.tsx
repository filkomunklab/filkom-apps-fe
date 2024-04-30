"use client";

import { Fragment, useState } from "react";
import Div from "./Div";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { menus } from "../lib/constants/menus";
import Link from "next/link";
import { ArrowDropDown, Circle, VpnKey } from "@mui/icons-material";
import { TMenuItem } from "../../../global";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  return (
    <Stack className="space-y-5 w-72 h-screen shadow-md p-4 divide-y">
      <SidebarHeader />
      {menus.map((menu, index) => (
        <Div className="py-2 space-y-3" key={index}>
          <Typography variant="subtitle2">{menu.label}</Typography>
          <ul>
            {menu.children?.map((item, index) =>
              item.type === "collapsible" ? (
                <CollapsibleItem menuItem={item} key={index} />
              ) : (
                <NavItem key={index} menuItem={item} />
              )
            )}
          </ul>
        </Div>
      ))}
      <SidebarFooter />
    </Stack>
  );
};

const SidebarHeader = () => {
  return (
    <Fragment>
      <Link href={"/"} className="flex flex-row items-center space-x-2">
        <Avatar alt={"avatar"} className="size-11" />
        <Div>
          <Typography variant={"h6"}>Darell Mona</Typography>
          <Typography variant={"subtitle1"}>STUDENT</Typography>
        </Div>
      </Link>
    </Fragment>
  );
};

const NavItem = ({ menuItem }: { menuItem: TMenuItem }) => {
  return (
    <Link href={"/"}>
      <li className="py-1 px-2 flex flex-row gap-4 hover:bg-[#e5f0fe] hover:text-[#006af5] rounded-md relative cursor-pointer duration-200">
        <span>{menuItem.icon ?? <Circle className="text-[8px]" />}</span>
        <Typography variant="body1" className="line-clamp-1 hover:line-clamp-2">
          {menuItem.label}
        </Typography>
      </li>
    </Link>
  );
};

const CollapsibleItem = ({ menuItem }: { menuItem: TMenuItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <li
        className="py-1 px-2 flex flex-row gap-4 hover:bg-[#e5f0fe] hover:text-[#006af5] rounded-md relative cursor-pointer duration-200"
        onClick={() => setOpen(!open)}
      >
        <span>{menuItem.icon ?? <Circle className="text-[8px]" />}</span>
        <Typography variant="body1" className="line-clamp-1 hover:line-clamp-2">
          {menuItem.label}
        </Typography>
        {menuItem.children && (
          <ArrowDropDown
            className={`absolute right-0 ${open ? "rotate-180" : ""}`}
          />
        )}
      </li>
      {open && menuItem.children && (
        <ul className="pl-4">
          {menuItem.children.map((item, index) => (
            <NavItem key={index} menuItem={item} />
          ))}
        </ul>
      )}
    </>
  );
};

const SidebarFooter = () => {
  const router = useRouter();
  return (
    <Div className="py-2 space-y-3">
      <Typography variant="subtitle2">Settings</Typography>
      <Link
        href={"/"}
        className="flex flex-row gap-4 py-1 px-2 rounded-md hover:border-yellow-500 border-[2px] duration-300"
      >
        <VpnKey />
        <Typography variant="body1">Change Password</Typography>
      </Link>
      <Button
        variant="contained"
        color="error"
        className="w-full"
        onClick={async () => {
          fetch("/api/auth/signout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: await fetch("/api/auth/csrf").then((rs) => rs.text()),
          }).then(() => {
            router.push("/login");
            console.log("success");
          });
        }}
      >
        Logout
      </Button>
    </Div>
  );
};

export default Sidebar;
