import { Button, Dropdown, Select, Space, Spin, Table, Tag } from "antd";
import React, { useLayoutEffect } from "react";
import DropDown from "../../../icons/dropdown.svg";
import { ColumnProps } from "mdb-react-ui-kit/dist/types/free/layout/Column/types";

import more from "../../../icons/three-dot.svg";

import { useApi } from "../../../hooks/useApi";
import useApproval from "../../../hooks/useApproval";

const Approval: React.FC = () => {
  useLayoutEffect(() => {
    document.title = "Approval | Ziculture ";
  }, []);

  const { HandlePost, result } = useApproval();

  const { response, isFetching } = useApi("/Customer/GetAllPendingApproval");

  const dropDownItems = (record: any) => {
    return [
      {
        label: (
          <Button type="text" onClick={() => HandlePost(record?.id, "approve")}>
            Approve
          </Button>
        ),
        key: "0",
      },
      {
        label: (
          <Button
            type="text"
            onClick={() => HandlePost(record?.id, "disapprove")}
          >
            Disapprove
          </Button>
        ),
        key: "1",
      },
      // {
      //   label: (
      //     <Button type="text" onClick={() => HandlePost(record?.id, "delete")}>
      //       Delete
      //     </Button>
      //   ),
      //   key: "2",
      // },
      // {
      //   label: (
      //     <Button
      //       type="text"
      //       onClick={() => HandlePost(record?.id, "deactivate")}
      //     >
      //       Deactivate
      //     </Button>
      //   ),
      //   key: "3",
      // },
      // {
      //   label: (
      //     <Button
      //       type="text"
      //       onClick={() => HandlePost(record?.id, "activate")}
      //     >
      //       Activate
      //     </Button>
      //   ),
      //   key: "4",
      // },
    ];
  };

  const columns: ColumnProps[] = [
    {
      title: "SN",
      key: "01",
      dataIndex: "key",
      width: "60px",
    },
    {
      title: "First Name",
      key: "firstName",
      dataIndex: "firstName",
      ellipsis: true,
    },
    {
      title: "Middle Name",
      key: "firstName",
      dataIndex: "middleName",
      ellipsis: true,
    },
    {
      title: "Last Name",
      key: "lastName",
      dataIndex: "surname",
      ellipsis: true,
    },
    {
      title: "Email",
      key: "email",
      ellipsis: true,
      dataIndex: "email",
    },
    {
      title: "Phone No",
      key: "phoneNumber",
      ellipsis: true,
      dataIndex: "phoneNumber",
    },
    {
      title: "Address",
      key: "address",
      ellipsis: true,
      dataIndex: "address",
    },
    {
      title: "status",
      key: "status",
      ellipsis: true,
      render(_: any, record: any) {
        return (
          <div>
            {record?.status === "Approved" ? (
              <Tag color="green">Approved</Tag>
            ) : (
              <Tag color="orange">Pending</Tag>
            )}
          </div>
        );
      },
    },

    {
      title: "Action",
      key: "11",
      fixed: "right",
      ellipsis: true,
      width: "80px",
      render(_: any, record: any) {
        return (
          <Dropdown
            menu={{ items: dropDownItems(record) }}
            trigger={["click"]}
            placement="bottom"
          >
            <Space>
              <img
                src={more}
                alt=""
                className="cursor-pointer hover:scale-95 hover:transition-all"
              />
            </Space>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      <h2 className="border-b border-[#c4c4c4] py-5 flex justify-between items-center font-bold text-[20px]">
        Approval
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
export default Approval;
