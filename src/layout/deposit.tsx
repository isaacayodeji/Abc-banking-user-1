import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import useDeposit from "../hooks/useDeposit";
import useGlobalFieldRequest from "../hooks/useGlobalFieldRequest";

const Deposit = () => {
  const state = useAppSelector((state) => {
    return state.globalState;
  });

  const { GlobalRequest } = useGlobalFieldRequest(state);

  const { handleDeposit, result } = useDeposit();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (record: any) => {
    handleDeposit(record?.accountNumber, record?.amount);
    if (result.isSuccess) {
     return setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <Button
        className="text-white border rounded bg-green-400 "
        onClick={showModal}
      >
        Deposit
      </Button>
      <Modal
        okText="Deposit"
        style={{ color: "black" }}
        title="Deposit Transaction"
        open={isModalOpen}
        onOk={() => handleDeposit}
        confirmLoading={result.isLoading}
        okType="primary"
        footer={null}
        onCancel={handleCancel}
      >
        <div className="pt-4">
          <Form layout="vertical" requiredMark="optional" onFinish={handleOk}>
            <Row gutter={12}>
              <Col md={12} xs={24}>
                <Form.Item
                  label={<div className="font-semibold">Account Number</div>}
                  rules={[
                    { required: true, message: "Account Number required" },
                  ]}
                  name="accountNumber"
                >
                  <Input
                    type="number"
                    maxLength={10}
                    // value={state.request}
                    placeholder="0128873645"
                    name="accountNumber"
                    className="py-2"
                    onChange={(e) =>
                      GlobalRequest("accountNumber", e.target.value)
                    }
                  />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  label={<div className="font-semibold">Amount(₦)</div>}
                  rules={[{ required: true, message: "Amount required" }]}
                  name="amount"
                >
                  <Input
                    type="number"
                    // value={state.request}
                    name="amount"
                    placeholder="£ 0.00"
                    className="py-2"
                    onChange={(e) => GlobalRequest("amount", e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Col span={24}>
              <Button
                // onClick={() => handleDeposit}
                loading={result.isLoading}
                htmlType="submit"
                className="w-[100%] h-10"
              >
                Deposit
              </Button>
            </Col>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default Deposit;
