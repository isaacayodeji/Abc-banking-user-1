import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import useGlobalFieldRequest from "../hooks/useGlobalFieldRequest";
import useWithdraw from "../hooks/useWithdraw";

const Withdraw = () => {
  const state = useAppSelector((state) => {
    return state.globalState;
  });
  const { GlobalRequest } = useGlobalFieldRequest(state);

  const { handleWithdraw, result } = useWithdraw();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (record: any) => {
    handleWithdraw(record?.accountNumber, record?.amount);
    if (result.isSuccess) {
      return setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button
        className="text-white border rounded bg-orange-400 hover:text-black"
        onClick={showModal}
      >
        Withdraw
      </Button>
      <Modal
        okText="Withdraw"
        style={{ color: "black" }}
        title="Withdraw Transaction"
        open={isModalOpen}
        onOk={() => handleWithdraw}
        confirmLoading={result.isLoading}
        okType="primary"
        footer
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
                    type="accountNumber"
                    maxLength={10}
                    value={"accountNumber"}
                    name="AccountNumber"
                    placeholder="0128873645"
                    className="py-2"
                    onChange={(e) =>
                      GlobalRequest("accounNumber", e.target.value)
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
                    value={"amount"}
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
                className="w-[100%] h-10"
                htmlType="submit"
                loading={result.isLoading}
              >
                Withdraw
              </Button>
            </Col>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default Withdraw;
