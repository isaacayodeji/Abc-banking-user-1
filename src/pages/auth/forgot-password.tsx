import { Button, Col, Form, Input, Row } from "antd";
import Back from "../../icons/back.svg";
import useFieldRequest from "../../hooks/useFieldRequest";
import { useAppSelector } from "../../app/hooks";
import { motion } from "framer-motion";
import useResetPassword from "../../hooks/useResetPassword";

const ForgotPassword = () => {
  const state = useAppSelector((state) => {
    return state.auth;
  });

  const { AuthRequest } = useFieldRequest(state);
  const { handleReset, result } = useResetPassword();

  return (
    <motion.div
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.4,
        type: "spring",
        stiffness: 200,
      }}
      className=""
    >
      <div className="p-5 lg:px-20 h-[80%] w-[95%] max-w-[40rem] mx-auto pt-20">
        <img
          src={Back}
          alt="back-icon"
          onClick={() => window.history.back()}
          className="mb-4 hover:scale-90 hover:transition-all cursor-pointer"
        />
        <h1 className="text-orange-500 font-bold font-[gelionRegular] text-xl lg:text-3xl text-center lg:text-left">
          Forgot your Password?
        </h1>
        <p className="my-3 font-[gelionRegular]">
          Enter your email address and we’ll send you an TOKEN to reset your
          password.
        </p>
        <Form
          requiredMark="optional"
          layout="vertical"
          wrapperCol={{ span: 24 }}
          className="my-[1.60rem]"
          onFinish={(record: any) => handleReset(record?.email)}
        >
          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Form.Item
                label={<div className="font-semibold">Email Address</div>}
                rules={[{ required: true, message: "Email Address required" }]}
                name="email"
              >
                <Input
                  type="email"
                  onChange={(e) => AuthRequest("email", e.target.value)}
                  className="py-3"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Button
                type="primary"
                block
                htmlType="submit"
                loading={result.isLoading}
                className={`flex items-center font-bold justify-center py-5 mt-4 mx-auto bg-orange-600 text-white `}
              >
                Continue
              </Button>
            </Col>
          </Row>
        </Form>
        <div className="flex lg:hidden justify-center items-center gap-1">
          <p className="text-[#333333] font-[gelionLight] font-bold">
            Don't have an account?
          </p>
          <Button type="text" className="py-5 flex items-center">
            Sign up
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
export default ForgotPassword;
