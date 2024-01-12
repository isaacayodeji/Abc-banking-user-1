import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import useTransfer from "../../hooks/useTransfer";
import { useAppSelector } from "../../app/hooks";
import useGlobalFieldRequest from "../../hooks/useGlobalFieldRequest";

const Transfer = () => {
  const state = useAppSelector((state) => {
    return state.globalState;
  });

  const { GlobalRequest } = useGlobalFieldRequest(state);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handleTransfer, Result } = useTransfer();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (record: any) => {
    handleTransfer(record?.amount, record?.targetAccountNumber);
    if (!Result.isLoading) {
      return setIsModalOpen(false);
    }
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <Button
        className="text-white bg-green-400 border rounded hover:translate-y-1"
        onClick={showModal}
      >
        Transfer
      </Button>
      <Modal
        okText="Transfer"
        style={{ color: "black" }}
        title="Transfer Transaction"
        open={isModalOpen}
        onOk={(record: any) => {
          handleTransfer(record?.amount, record?.targetAccountNumber);
        }}
        confirmLoading={Result.isLoading}
        okType="primary"
        footer
        onCancel={handleCancel}
      >
        <div className="pt-4">
          <Form layout="vertical" requiredMark="optional" onFinish={handleOk}>
            <Row gutter={12}>
              <Col md={12} xs={24}>
                <Form.Item
                  label={
                    <div className="font-semibold">Target Account Number</div>
                  }
                  rules={[{ required: true, message: "Amount required" }]}
                  name="targetAccountNumber"
                >
                  <Input
                    type="number"
                    // value={"amount"}
                    maxLength={10}
                    name="targetAccountNumber"
                    placeholder="09847264"
                    className="py-2"
                    onChange={(e) =>
                      GlobalRequest("targetAccountNumber", e.target.value)
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
                loading={Result.isLoading}
              >
                Transfer
              </Button>
            </Col>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
export default Transfer;
