/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import Transfer from "./transfer";
import { CiLogout } from "react-icons/ci";
import {
  Button,
  Drawer,
  DrawerProps,
  Dropdown,
  Menu,
  MenuProps,
  Space,
} from "antd";
import {
  AiOutlineAppstore,
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import dropdown from "../../images/dropdown.svg";
import notify from "../../images/notify.svg";
import { useUserInfo } from "../../hooks/userInfo";
import { useGetDataOnActionMutation } from "../../service/global";
import useDetails from "../../hooks/useDetails";
import { motion } from "framer-motion";

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
            <h2>
              <b>Account Number:</b> {details?.accountNumber}
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
        className="text-[20px] font-semibold py-2"
        href="/user/overview"
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
        href="/user/transaction"
        target="_self"
      >
        Transactions
      </a>,
      "2",
      <AiOutlineUser />
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
  return (
    <header className="lg:border-[#c4c4c4] flex justify-between items-center px-3 md:px-10">
      <div className="flex justify-between  w-full items-center">
        <h2 className="font-extrabold text-[20px] text-orange-600">Abc bank</h2>
        <div className="flex gap-4 max-lg:hidden">
          <Transfer />
        </div>
        <div className="flex gap-5 items-center pr-2 max-lg:hidden">
          <motion.span
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <img src={notify} alt="" />
          </motion.span>
          <b>{`${userInfo.firstName?.toLocaleUpperCase()} ${userInfo.middleName?.toLocaleUpperCase()}`}</b>
          {/* <img src={profile} alt="" /> */}
          <div className="w-[3rem] h-[3rem] grid place-content-center rounded-full bg-[#f7cb9f] text-[1.2rem] text-center font-bold text-orange-600">
            {`${userInfo?.firstName
              ?.charAt(0)
              .toLocaleUpperCase()}${userInfo?.middleName
              ?.charAt(0)
              .toUpperCase()}`}
          </div>
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
