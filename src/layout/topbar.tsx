import { CiLogout } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import Deposit from "./deposit";
import profile from "../images/profileImag.svg";
import Withdraw from "./withdraw";
import { Dropdown } from "antd";
import {
  AiFillDollarCircle,
  AiOutlineAppstore,
  AiOutlineCreditCard,
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import notify from "../images/notify.svg";
import dropdown from "../images/dropdown.svg";
import { useEffect, useState } from "react";
import { Button, Drawer, Radio, Space } from "antd";
import type { DrawerProps } from "antd/es/drawer";
import { Divider, Menu, Switch } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import { GoVerified } from "react-icons/go";
import { logOut } from "../features/authSlice";
import { motion } from "framer-motion";
import { useUserInfo } from "../hooks/userInfo";
import { useGetDataOnActionMutation } from "../service/global";

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

const Topbar = () => {
  const { userInfo } = useUserInfo();
  const [response, setResponse] = useState();
  const [getData, result] = useGetDataOnActionMutation();

  useEffect(() => {
    getData({ url: `Customer/GetAccountDetails/${userInfo.id}` });
  }, [getData, userInfo.id]);
  // console.log(result);

  useEffect(() => {
    if (result.data) {
      if (result.data?.status === 200) {
        setResponse(result.data.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);
  // console.log(response);
  let details = result?.data?.data;

  const items: MenuProps["items"] = [
    {
      label: (
        <>
          <div className=" text-center cursor-default p-4">
            <h2>
              <b>Email:</b> {userInfo.email}
            </h2>
          </div>
        </>
      ),
      key: "0",
    },
    {
      label: (
        <div className="flex justify-center">
          <Button
            className="font-bold text-[15px] text-white flex items-center gap-2 px-4 py-2 rounded bg-orange-600 max-lg:hidden"
            onClick={() => handleLogout()}
          >
            Logout
            <CiLogout />
          </Button>
        </div>
      ),
      key: "1",
    },
  ];
  const item: MenuItem[] = [
    getItem(
      <a
        className="text-[20px] text-black font-semibold py-2"
        href="/admin/overview"
        target="_self"
      >
        Overview
      </a>,
      "1",
      <AiOutlineAppstore className="text-black important!" />
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
    getItem(
      <a
        className="text-[20px] font-semibold py-2"
        href="/admin/approval"
        target="_self"
      >
        Approval
      </a>,
      "2",
      <GoVerified />
    ),
    getItem(
      <a
        className="text-[20px] font-semibold py-2"
        href="/admin/user-management"
        target="_self"
      >
        Management
      </a>,
      "2",
      <AiOutlineCreditCard />
    ),

    getItem(
      <Button
        className="text-[20px] font-semibold flex items-center gap-2 p-2"
        href="/"
        target="_self"
        onClick={() => handleLogout()}
      >
        <CiLogout />
        Logout
      </Button>,
      "3"
    ),
  ];
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const navLinkStyle = ({ isActive }: any) => {
    return {
      borderColor: isActive ? "#f7cb9f" : "",
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "rgb(234 88 12)" : "",
    };
  };

  return (
    <header className="lg:border-[#c4c4c4] flex justify-between items-center mx-3 my-3 md:px-10 ">
      <div className="flex justify-between  w-full items-center">
        <h2 className="font-extrabold text-[20px] text-orange-600">Abc bank</h2>
        <div className="max-lg:hidden">
          <ul className="flex gap-6">
            <li>
              <NavLink
                className="hover:border hover:border-[#f7cb9f] px-4 py-2 hover:rounded-lg"
                to={"/admin/overview"}
                style={navLinkStyle}
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:border hover:border-[#f7cb9f] px-4 py-2 hover:rounded-lg"
                to={"/admin/account"}
                style={navLinkStyle}
              >
                Account
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:border hover:border-[#f7cb9f] px-4 py-2 hover:rounded-lg"
                to={"/admin/approval"}
                style={navLinkStyle}
              >
                Approval
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:border hover:border-[#f7cb9f] px-4 py-2 hover:rounded-lg"
                to={"/admin/user-management"}
                style={navLinkStyle}
              >
                Management
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex gap-5 items-center pr-2 max-lg:hidden">
          <motion.span
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <img src={notify} alt="" />
          </motion.span>
          <b>{`${userInfo.fullName?.toLocaleUpperCase()}`}</b>

          <div className="w-[3rem] h-[3rem] grid place-content-center rounded-full bg-[#f7cb9f] text-[1.2rem] text-center font-bold text-orange-600">
            {`${userInfo?.fullName
              ?.charAt(0)
              .toLocaleUpperCase()}${userInfo?.fullName
              ?.charAt(0)
              .toUpperCase()}`}
          </div>
          {/* <img src={profile} alt="" /> */}
          <Dropdown menu={{ items }} placement="bottom">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <img src={dropdown} alt="" />
              </Space>
            </a>
          </Dropdown>
        </div>

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
            items={item}
          />
        </Drawer>
      </div>
    </header>
  );
};
export default Topbar;
