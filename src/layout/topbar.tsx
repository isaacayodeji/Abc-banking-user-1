import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Deposit from "./deposit";
import Withdraw from "./withdraw";
import {} from "antd";
import {
  AiFillDollarCircle,
  AiOutlineAppstore,
  AiOutlineCreditCard,
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import { useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import { Divider, Menu, Switch } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import { GoVerified } from "react-icons/go";
import { logOut } from "../features/authSlice";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem(
    <a
      className="text-[20px] font-semibold py-2"
      href="/admin/overview"
      target="_self"
    >
      Overview
    </a>,
    "1",
    <AiOutlineAppstore />
  ),
  getItem(
    <a
      className="text-[20px] font-semibold py-2"
      href="/admin/account"
      target="_self"
    >
      Account
    </a>,
    "2",
    <AiOutlineUser />
  ),

  // getItem(
  //   <a
  //     className="text-[20px] font-semibold py-2"
  //     href="/admin/transaction"
  //     target="_self"
  //   >
  //     Transaction
  //   </a>,
  //   "3",
  //   <AiOutlineCreditCard />
  // ),

  getItem(
    <a
      className="text-[20px] font-semibold py-2"
      href="/admin/approval"
      target="_self"
    >
      Approval
    </a>,
    "3",
    <GoVerified />
  ),
  getItem(
    <Button
      className="text-[20px] font-semibold flex items-center gap-2 p-2"
      href="/"
      target="_self"
      // onClick={() =>}
    >
      <CiLogout />
      Logout
    </Button>,
    "4"
  ),
];
const Topbar = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const [current, setCurrent] = useState("1");

  const onClose = () => {
    setOpen(false);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <header className="lg:border-[#c4c4c4] lg:border flex justify-between items-center px-3 md:px-10">
      <div className="flex justify-between  w-full items-center">
        <h2 className="font-extrabold lg:text-[20px] text-orange-600 ">
          Abc bank
        </h2>
        <div className="flex gap-4 max-lg:hidden">
          <Deposit />
          <Withdraw />
        </div>
        <Button
          className="font-bold text-[15px] text-white flex items-center gap-2 px-4 py-2 rounded bg-orange-600 max-lg:hidden translate-x-0"
          onClick={() => handleLogout()}
        >
          Logout
          <CiLogout />
        </Button>

        <Space className="block lg:hidden">
          <Button className="text-black" onClick={showDrawer}>
            <AiOutlineMenu size={18} />
          </Button>
        </Space>
        <Drawer
          // title="Drawer with extra actions"
          placement={placement}
          // width={500}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              {/* <Button onClick={onClose}>Cancel</Button>
              <Button className="text-red-500" onClick={onClose}>
                OK
              </Button> */}
            </Space>
          }
        >
          <Menu
            style={{ width: "auto", border: "none", paddingTop: "40px" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Drawer>
      </div>
    </header>
  );
};
export default Topbar;
