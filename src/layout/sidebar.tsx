import profile from "../images/profile.png";
import { AiOutlineAppstore } from "react-icons/ai";
import { AiOutlineUser, AiFillTool } from "react-icons/ai";
import { GoVerified } from "react-icons/go";
import { useUserInfo } from "../hooks/userInfo";

const Sidebar = () => {

  const {userInfo} = useUserInfo()
  
  return (
    <nav className="border-r border-[#c4c4c4] hidden lg:block overflow-auto">
      <div className="flex flex-col items-center space-y-2 pb-4 text-[14px] font-semibold text-black">
        <div className=" mx-auto px-4 flex items-center  object-fill ">
          <img
            className="rounded-full px-4 py-4 w-[140px] h-[134px] border"
            src={profile}
            alt=""
          />
        </div>
        <h2>{userInfo.fullName}</h2>
        <h2>{userInfo.email}</h2>
      </div>
      <hr />
      {/*admin menu */}
      <ul className="flex pl-12 flex-col gap-6  p-4 pt-8">
        <li className="text-[18px] font-bold ">
          <a
            className="flex items-center gap-2"
            href="/admin/overview"
            target=""
          >
            <AiOutlineAppstore />
            Overview
          </a>
        </li>
        <li className="text-[18px] font-bold ">
          <a
            className="flex items-center gap-2"
            href="/admin/account"
            target=""
          >
            <AiOutlineUser />
            Account
          </a>
        </li>
        {/* <li className="text-[18px] font-bold ">
          <a className="flex items-center gap-2" href="/admin/transaction" target="">
            <AiOutlineCreditCard />
            Transactions
          </a>
        </li> */}
        <li className="text-[18px] font-bold ">
          <a
            className="flex items-center gap-2"
            href="/admin/approval"
            target=""
          >
            <GoVerified />
            Approval
          </a>
        </li>
        <li className="text-[18px] font-bold ">
          <a
            className="flex items-center gap-2"
            href="/admin/user-management"
            target=""
          >
            <AiFillTool />
            Management
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Sidebar;
