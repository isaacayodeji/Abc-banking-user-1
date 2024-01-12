import { AiOutlineAppstore, AiOutlineCreditCard } from "react-icons/ai";
import { useUserInfo } from "../../hooks/userInfo";
import profile from "../../images/profile.png";
import { useEffect, useLayoutEffect, useState } from "react";
import { useGetDataOnActionMutation } from "../../service/global";
import React from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useLocation } from "react-router-dom";


const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <nav className=" border-[#c4c4c4] hidden lg:block overflow-auto bg-[#f7cb9f]">
      {/* user menu */}
      <ul className="flex flex-col gap-6  py-4 pt-6 w-[100vw] ">
        <li
          className={`text-[18px] font-bold rounded-full ${
            pathname.toLocaleLowerCase().includes("overview")
              ? "bg-white text-orange-600 p-3"
              : "hover:bg-white p-3"
          }`}
        >
          <a
            className="flex items-center gap-2"
            href="/user/overview"
            target=""
          >
            <AiOutlineAppstore />
            Overview
          </a>
        </li>
        <li
          className={`text-[18px] font-bold rounded-full w-[full] ${
            pathname.toLocaleLowerCase().includes("transaction")
              ? "bg-white text-orange-600 p-3"
              : "hover:bg-white p-3"
          }`}
        >
          <a
            className="flex items-center gap-2"
            href="/user/transaction"
            target=""
          >
            <AiOutlineCreditCard />
            Transactions
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Sidebar;
