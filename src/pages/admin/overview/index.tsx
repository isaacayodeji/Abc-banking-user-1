import React, { useEffect, useLayoutEffect, useState } from "react";
import icon1 from "../../../icons/ellipse1.svg";
import icon2 from "../../../icons/ellips2.svg";
import icon3 from "../../../icons/ellips3.svg";
import icon4 from "../../../icons/ellips4.svg";
import Withdraw from "../../../layout/withdraw";
import Deposit from "../../../layout/deposit";
import { LoadingOutlined } from "@ant-design/icons";
import { usePostDataMutation } from "../../../service/global";
import { Spin } from "antd";

const Overview: React.FC = () => {
  useLayoutEffect(() => {
    document.title = "Overview | Abc ";
  }, []);

  const [response, setResponse] = useState();
  // const [getData, result] = useGetDataOnActionMutation();
  const [postData, result] = usePostDataMutation();

  useEffect(() => {
    postData({ url: `Customer/summary` });
  }, [postData]);
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

  return (
    <div className="md:pl-10 pl-2">
      <h2 className="border-b border-[#c4c4c4] py-5 px-4 flex justify-between items-center font-bold text-[20px] bg-[#f7cb9f] w-[100%] rounded-l-full">
        Overview
      </h2>
      {/* Parent container */}
      {result.isLoading ? (
        <div className="text-center flex items-center justify-center h-screen font-bold w-full">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 34 }} spin />} />
        </div>
      ) : (
        <div className="w-full  flex justify-between gap-5 overflow-auto pt-8">
          {/* row1 */}
          <div className="p-4 w-[25%] min-w-[14rem] space-y-3">
            <div className="space-y-2">
              <img src={icon1} alt="" />
              <p className="text-[19px] font-medium">Total Users</p>
              <b className="text-[22px]">
                {details?.totalUser.toLocaleString("en-UK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </b>
            </div>
          </div>
          {/* row2 */}
          <div className="p-4  border-l w-[25%] min-w-[14rem]  space-y-3">
            <div className="space-y-2">
              <img src={icon3} alt="" />
              <p className="text-[19px] font-medium">Deposit</p>
              <b className="text-[22px]">
                £{" "}
                {details?.totalCredit.toLocaleString("en-UK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
              </b>
            </div>
          </div>
          {/* row3 */}
          <div className="p-4  border-l w-[25%] min-w-[14rem] space-y-3">
            <div className="space-y-2">
              <img src={icon2} alt="" />
              <p className="text-[19px] font-medium">withdraw</p>
              <b className="text-[22px]">
                £{" "}
                {details?.totalDebit.toLocaleString("en-UK", {
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
                {details?.totalOverDraft.toLocaleString("en-UK", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </b>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 ">
        <Withdraw />
        <Deposit />
      </div>
    </div>
  );
};
export default Overview;
