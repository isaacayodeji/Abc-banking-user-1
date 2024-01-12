import { Button, Col, Form, Input, Popover, Row } from "antd";
import Back from "../../icons/back.svg";
import { useAppSelector } from "../../app/hooks";
import useFieldRequest from "../../hooks/useFieldRequest";
import UsechangePassword from "../../hooks/usechangePassword";
import PasswordChecklist from "react-password-checklist";
import { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const state = useAppSelector((state) => {
    return state.auth;
  });
  const { AuthRequest } = useFieldRequest(state);
  const { handleChangePassword, result } = UsechangePassword();

  return (
    <div className="flex w-[full] h-[screen] items-center justify-center pt-10">
      <div className="p-5 lg:px-20 h-[80%] w-[95%] max-w-[40rem] ">
        <img
          src={Back}
          alt="back-icon"
          onClick={() => window.history.back()}
          className="mb-4 hover:transition-all cursor-pointer"
        />
        <h1 className="text-orange-600 font-bold font-[gelionRegular] text-xl lg:text-3xl text-center lg:text-left">
          Reset Password
        </h1>
        <p className="my-3 font-[gelionRegular]">
          Create your new password to proceed
        </p>
        <Form
          layout="vertical"
          wrapperCol={{ span: 24 }}
          className="my-[1.60rem]"
          autoComplete="off"
          requiredMark="optional"
          onFinish={(record: any) =>
            handleChangePassword(
              record?.email,
              record?.token,
              record?.newPassword
            )
          }
          // fields={[
          //   {
          //     name: "token",
          //     value: oldPassword,
          //   },
          //   {
          //     name: "newPassword",
          //     value: state.request?.newPassword,
          //   },
          //   {
          //     name: "password",
          //     value: state.request?.password,
          //   },
          // ]}
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
              <Form.Item
                label={<div className="font-semibold">Token</div>}
                rules={[{ required: true, message: "Token required" }]}
                name="token"
              >
                <Input
                  className=" py-3"
                  onChange={(e) => AuthRequest(e.target.value, "token")}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={<div className="font-semibold">New Password</div>}
                rules={[
                  { required: true, message: "New Password required" },
                  {
                    required: true,
                    pattern: new RegExp(
                      "^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"
                    ),
                    message: "Password is not strong enough",
                  },
                ]}
                name="newPassword"
              >
                <Input.Password
                  className=" py-3"
                  onChange={(e) => {
                    AuthRequest("newPassword", e.target.value);
                    setPassword(e.target.value); // Update the password state
                  }}
                />
              </Form.Item>
              {password ? (
                <PasswordChecklist
                  rules={[
                    "minLength",
                    "specialChar",
                    "number",
                    "capital",
                    "lowercase",
                  ]}
                  minLength={8}
                  value={password}
                  // onChange={(isValid) => {}}
                />
              ) : (
                ""
              )}
            </Col>
            <Col span={24}>
              <Button
                type="primary"
                block
                htmlType="submit"
                loading={result.isLoading}
                className={`flex items-center font-bold justify-center py-5 mt-4 mx-auto bg-orange-600 text-white `}
              >
                Reset my Password
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
    </div>
  );
};
export default ResetPassword;
