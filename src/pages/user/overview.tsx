import icon1 from "../../icons/ellipse1.svg";
import icon2 from "../../icons/ellips2.svg";
import icon3 from "../../icons/ellips3.svg";
import icon4 from "../../icons/ellips4.svg";
import { useGetDataOnActionMutation } from "../../service/global";
import { useEffect, useLayoutEffect, useState } from "react";
import { useUserInfo } from "../../hooks/userInfo";
import { Button, Dropdown, MenuProps, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Transfer from "../../layout/userLayout/transfer";
import useOverdraft from "../../hooks/useOverdraft";

const UserOverview = () => {
  useLayoutEffect(() => {
    document.title = "Overview | Abc ";
  }, []);

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

  const { handleOverdraft } = useOverdraft();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button
          onClick={() => {
            handleOverdraft("withdraw");
          }}
        >
          withdraw Overdraft
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          onClick={() => {
            handleOverdraft("get");
          }}
        >
          Get Overdraft
        </button>
      ),
    },
  ];
  return (
    <div>
      <h2 className="border-b border-[#c4c4c4] py-5 flex justify-between items-center font-bold text-[20px]">
        Overview
      </h2>
      {/* Parent container */}
      {!result.data ? (
        <div className="text-center flex items-center justify-center h-screen font-bold w-full">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 34 }} spin />} />
        </div>
      ) : (
        <div className="w-full  flex justify-between gap-5 overflow-auto pt-8">
          {/* row1 */}
          <div className="p-4 w-[25%] min-w-[14rem] space-y-3">
            <div className="space-y-2">
              <img src={icon1} alt="" />
              <p className="text-[19px] font-medium">Total Balance</p>
              <b className="text-[22px]">
                £{" "}
                {details.currentBalance.toLocaleString("en-UK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </b>
            </div>
          </div>
          {/* row2 */}
          <div className="p-4 border-l w-[25%] min-w-[14rem]  space-y-3">
            <div className="space-y-2">
              <img src={icon3} alt="" />
              <p className="text-[19px] font-medium">Debit</p>
              <b className="text-[22px]">
                £{" "}
                {details.drAmount.toLocaleString("en-UK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </b>
            </div>
          </div>
          {/* row3 */}
          <div className="p-4  border-l w-[25%] min-w-[14rem] space-y-3">
            <div className="space-y-2">
              <img src={icon2} alt="" />
              <p className="text-[19px] font-medium">Credit</p>
              <b className="text-[22px]">
                £{" "}
                {details.crAmount.toLocaleString("en-UK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </b>
            </div>
          </div>
          {/* row4 */}
          <div className="p-4  border-l w-[25%] min-w-[14rem] space-y-3">
            <div className="space-y-2">
              <img src={icon4} alt="" />
              <p className="text-[19px] font-medium">Overdraft</p>

              <b className="text-[22px]">
                £{" "}
                {details.overDraft.toLocaleString("en-UK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </b>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-5 pt-6 ">
        <div className="flex gap-4 lg:hidden">
          <Transfer />
        </div>
        <Dropdown menu={{ items }}>
          <Button
            className="bg-black text-white hover:bg-[#f2f0f0!important]"
            onClick={(e) => e.preventDefault()}
          >
            <Space>Overdraft details</Space>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};
export default UserOverview;
