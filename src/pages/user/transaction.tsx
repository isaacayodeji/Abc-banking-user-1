import { Button, Col, Form, Input, Row, Spin, Table } from "antd";
import { ColumnProps } from "mdb-react-ui-kit/dist/types/free/layout/Column/types";
import { useApi } from "../../hooks/useApi";
import { useUserInfo } from "../../hooks/userInfo";
import { useGetDataOnActionMutation } from "../../service/global";
import { useEffect, useLayoutEffect, useState } from "react";
import "jspdf-autotable";
import jsPDF from "jspdf";

const UserTransaction = () => {
  useLayoutEffect(() => {
    document.title = "Transaction | Abc ";
  }, []);

  const { userInfo } = useUserInfo();

  const [responses, setResponse] = useState();
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

  let account = result?.data?.data?.accountNumber;
  const { response, isFetching } = useApi(
    `Transaction/statement?accountNumber=${account}`
  );

  function createHeaders(keys: string | any[]) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 30,
        align: "center",
        padding: 0,
      } as any);
    }
    return result;
  }

  const headers = createHeaders([
    "accountNumber",
    "amount",
    "beneficiaryBank",
    "beneficiaryName",
    "customerAccountId",
    "dateCreated",
    "remarks",
    "senderAccount",
    "senderBank",
    "senderName",
    "sessionId",
    "transMethod",
    "type",
  ]);
  const generateData = function (response: any) {
    const data = response
      .map((user: any) => ({
        accountNumber: user?.accountNumber || "N/A",
        amount: user?.amount?.toString().trim() || "N/A",
        dateCreated: user?.dateCreated || "N/A",
        senderName: user?.senderName || "N/A",
        senderAccount: user?.senderAccount || "N/A",
        senderBank: user?.senderBank || "N/A",
        remarks: user?.remarks || "N/A",
        beneficiaryName: user?.beneficiaryName || "N/A",
        beneficiaryBank: user?.beneficiaryBank || "N/A",
        type: user?.type || "N/A",
        transMethod: user?.transMethod || "N/A",
        sessionId: user?.sessionId?.toString() || "N/A",
        customerAccountId: user?.customerAccountId?.toString() || "N/A",
      }))
      .map((user: any) => ({
        ...user,
        accountNumber: user.accountNumber === "" ? "N/A" : user.accountNumber,
        amount: user.amount === "" ? "N/A" : user.amount,
        dateCreated: user.dateCreated === "" ? "N/A" : user.dateCreated,
        senderName: user.senderName === "" ? "N/A" : user.senderName,
        senderAccount: user.senderAccount === "" ? "N/A" : user.senderAccount,
        senderBank: user.senderBank === "" ? "N/A" : user.senderBank,
        remarks: user.remarks === "" ? "N/A" : user.remarks,
        beneficiaryName:
          user.beneficiaryName === "" ? "N/A" : user.beneficiaryName,
        beneficiaryBank:
          user.beneficiaryBank === "" ? "N/A" : user.beneficiaryBank,
        type: user.type === "" ? "N/A" : user.type,
        transMethod: user.transMethod === "" ? "N/A" : user.transMethod,
        sessionId: user.sessionId === "" ? "N/A" : user.sessionId,
        customerAccountId:
          user.customerAccountId === "" ? "N/A" : user.customerAccountId,
      }));
    // console.log("data", data);

    const pdf = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    pdf.setFontSize(5);
    pdf.table(1, 15, data, headers, { autoSize: false, fontSize: 7 });

    pdf.save("statements.pdf");
  };

  const columns: ColumnProps[] = [
    {
      title: "SN",
      key: "01",
      dataIndex: "key",
      width: "60px",
    },
    {
      title: "Account Number",
      key: "accountNumber",
      dataIndex: "accountNumber",
      ellipsis: true,
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      ellipsis: true,
    },
    {
      title: "Date Created",
      key: "dateCreated",
      dataIndex: "dateCreated",
      ellipsis: true,
    },
    {
      title: "Sender Name",
      key: "senderName",
      ellipsis: true,
      dataIndex: "senderName",
    },
    {
      title: "Sender Account",
      key: "senderAccount",
      ellipsis: true,
      dataIndex: "senderAccount",
    },
    {
      title: "Sender Bank",
      key: "senderBank",
      ellipsis: true,
      dataIndex: "senderBank",
    },
    {
      title: "Remarks",
      key: "remarks",
      ellipsis: true,
      dataIndex: "remarks",
    },
    {
      title: "Beneficiary Name",
      key: "beneficiaryName",
      ellipsis: true,
      dataIndex: "beneficiaryName",
    },
    {
      title: "type",
      key: "type",
      ellipsis: true,
      dataIndex: "type",
    },
    {
      title: "TransMethod",
      key: "transMethod",
      ellipsis: true,
      dataIndex: "transMethod",
    },
    {
      title: "Session Id",
      key: "sessionId",
      ellipsis: true,
      dataIndex: "sessionId",
    },
    {
      title: "Customer AccountId",
      key: "customerAccountId",
      ellipsis: true,
      dataIndex: "customerAccountId",
    },
  ];
  return (
    <div className="pl-10">
      <h2 className="border-b border-[#c4c4c4] py-5 px-4 flex justify-between items-center font-bold text-[20px] bg-[#f7cb9f] w-[100%] rounded-l-full">
        Transactions
      </h2>
      <div className="pt-8 border-b border-[#c4c4c4] flex justify-between">
        <div>
          <Form requiredMark="optional">
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  label={<div className="font-semibold">Start Date</div>}
                  rules={[{ required: true, message: "Start Date" }]}
                  name="startDate"
                >
                  <Input
                    type="number"
                    maxLength={10}
                    // value={"email"}
                    placeholder="MM/DD/YYYY"
                    name="startDate"
                    className=" py-2 min-w-[5rem] md:w-[12rem] h-10"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<div className="font-semibold">End Date</div>}
                  rules={[{ required: true, message: "End Date" }]}
                  name="endDate"
                >
                  <Input
                    type="number"
                    maxLength={10}
                    // value={"email"}
                    placeholder="MM/DD/YYYY"
                    name="endDate"
                    className=" py-2 min-w-[5rem] md:w-[12rem] h-10"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Col span={12}>
              <Button>Filter</Button>
            </Col>
          </Form>
        </div>

        <Button
          type="default"
          className="bg-[#f7cb9f] hover:translate-y-1"
          onClick={() => generateData(response)}
        >
          Download statement
        </Button>
      </div>

      <div>
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
    </div>
  );
};
export default UserTransaction;
