import React, { useLayoutEffect } from "react";
import { Select, Spin, Table } from "antd";
import useApproval from "../../../hooks/useApproval";
import { useApi } from "../../../hooks/useApi";
import DropDown from "../../../icons/dropdown.svg";
import { ColumnProps } from "mdb-react-ui-kit/dist/types/free/layout/Column/types";

const Account: React.FC = () => {
  useLayoutEffect(() => {
    document.title = "Account | Abc ";
  }, []);

  // const state = useAppSelector((state) => {
  //   return state.globalState;
  // });
  const { HandlePost, result } = useApproval();

  const { response, isFetching } = useApi(
    "/Customer/AllApprovedCustomerAccount"
  );

  const columns: ColumnProps[] = [
    {
      title: "SN",
      key: "01",
      dataIndex: "key",
      width: "60px",
      fixed: "left",
    },
    {
      title: "Account Name ",
      key: "accountName",
      dataIndex: "accountName",
      fixed: "left",

      ellipsis: true,
    },
    {
      title: "Account Number",
      key: "accountNumber",
      dataIndex: "accountNumber",
      ellipsis: true,
    },
    {
      title: "Total Balance (£)",
      key: "totalBalance",
      dataIndex: "totalBalance",
      ellipsis: true,
    },
    {
      title: "Credit Amount (£)",
      key: "crAmount",
      ellipsis: true,
      dataIndex: "crAmount",
    },
    {
      title: "Debit Amount (£)",
      key: "drAmount",
      ellipsis: true,
      dataIndex: "drAmount",
    },
    {
      title: "Over Draft (£)",
      key: "overDraft",
      ellipsis: true,
      dataIndex: "overDraft",
    },
    {
      title: "Current Balance",
      key: "currentBalance",
      ellipsis: true,
      dataIndex: "currentBalance",
    },
    {
      title: "Phone Number",
      key: "phoneNumber",
      ellipsis: true,
      dataIndex: "phoneNumber",
    },
  ];

  return (
    <div>
      <h2 className="border-b border-[#c4c4c4] py-5 flex justify-between items-center font-bold text-[20px]">
        Account
      </h2>
      <div className="grid md:flex md:items-center justify-between gap-5 pt-5 py-5">
        <Select
          defaultValue={"All"}
          suffixIcon={<img src={DropDown} alt="" />}
          className="w-[5rem] md:w-[12rem] h-10"
        >
          <Select.Option value="All">All</Select.Option>
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="Approved">Approved</Select.Option>
          <Select.Option value="Disapproved">Disapproved</Select.Option>
        </Select>

        {/* <Input
          placeholder="Search"
          prefix={<img src={SearchIcon} alt="" className="w-4 py-2" />}
          className="hidden md:flex w-[40%]"
          // onChange={(e) => onChangeSearch(e.target.value)}
        /> */}
      </div>
      <Spin
        tip="Please wait..."
        spinning={isFetching || result.isLoading}
        className="border border-[#C4C4C4] rounded-md mb-10 "
      >
        <Table
          scroll={{ x: "1600px" }}
          columns={columns}
          dataSource={response}
          bordered
        />
      </Spin>
    </div>
  );
};
export default Account;
