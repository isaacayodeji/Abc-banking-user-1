import { Button } from "antd";
import { Col, Form, Input, Row } from "antd";
import { motion } from "framer-motion";
import useRegister from "../../hooks/useRegister";
import useFieldRequest from "../../hooks/useFieldRequest";
import { useAppSelector } from "../../app/hooks";
import PasswordChecklist from "react-password-checklist";
import { useState } from "react";

const Register = () => {
  const [password, setPassword] = useState("");
  const { hnadleRegister, result } = useRegister();
  const state = useAppSelector((state) => {
    return state.auth;
  });
  const { AuthRequest } = useFieldRequest(state);

  return (
    <div className="h-screen sm:h-[100vh] grid grid-rows-[4rem_1fr] ">
      {/* <header className="flex items-center justify-between px-10">
        <h2 className="font-bold text-[22px] font-[gelionRegular] text-orange-600">
          Ziculture  Banking & Groups
        </h2>
        <img src={"/images/logo.png"} alt="" width={200} />
        <div className="hidden lg:flex justify-center items-center gap-1">
          <p className="text-black font-[gelionLight] font-bold">
            Already have an account?
          </p>
          <Button
            type="text"
            className="py-5 border border-solid border-[#0b67f3] flex items-center text-orange-600"
          >
            Sign in
          </Button>
        </div>
      </header> */}
      <main className="flex justify-center items-center py-6 ">
        <motion.div
          initial={{ scale: 0.7 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.4,
            type: "spring",
            stiffness: 200,
          }}
          className="p-5 lg:p-20 h-[90%] w-[95%] max-w-[50rem]"
        >
          <h1 className=" text-orange-600 font-bold font-[gelionRegular] text-xl lg:text-3xl text-center lg:text-start ">
            Register your account
          </h1>

          <Form
            requiredMark="optional"
            layout="vertical"
            wrapperCol={{ span: 24 }}
            className="my-[1.60rem] pb-6 "
            onFinish={hnadleRegister}
          >
            <Row gutter={12} style={{ width: "100%" }}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<div className="font-semibold">First Name</div>}
                  rules={[{ required: true, message: "First Name required" }]}
                  name="firstName"
                >
                  <Input
                    type="text"
                    // value={email}
                    name="firstName"
                    className="py-3"
                    onChange={(e) => AuthRequest("firstName", e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<div className="font-semibold">Middle Name</div>}
                  rules={[{ required: true, message: "Middle Name required" }]}
                  name="middleName"
                >
                  <Input
                    type="middleName"
                    // value={email}
                    name="middleName"
                    className="py-3"
                    onChange={(e) => AuthRequest("middleName", e.target.value)}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<div className="font-semibold">Surname</div>}
                  rules={[{ required: true, message: "Surname required" }]}
                  name="surname"
                >
                  <Input
                    type="text"
                    // value={email}
                    name="surname"
                    className="py-3"
                    onChange={(e) => AuthRequest("surname", e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<div className="font-semibold">Phone Number</div>}
                  rules={[{ required: true, message: "Phone Number required" }]}
                  name="phoneNumber"
                >
                  <Input
                    type="number"
                    // value={email}
                    name="phoneNumber"
                    className="py-3"
                    onChange={(e) => AuthRequest("phoneNumber", e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<div className="font-semibold">Email</div>}
                  rules={[{ required: true, message: "Email required" }]}
                  name="email"
                >
                  <Input
                    type="email"
                    // value={email}
                    name="email"
                    className="py-3"
                    onChange={(e) => AuthRequest("email", e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<div className="font-semibold">Date of birth</div>}
                  rules={[{ required: true, message: "Email required" }]}
                  name="Date of Birth"
                >
                  <Input
                    type="text"
                    // value={email}
                    name="dob"
                    className="py-3"
                    placeholder="MM/DD/YYYY"
                    onChange={(e) => AuthRequest("dob", e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label={<div className="font-semibold">Address</div>}
                  rules={[{ required: true, message: "Address required" }]}
                  name="Address"
                >
                  <Input
                    type="text"
                    // value={email}
                    name="address"
                    className="py-3"
                    onChange={(e) => AuthRequest("address", e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<div className="font-semibold">Gender</div>}
                  rules={[{ required: true, message: "Gender" }]}
                  name="Gender"
                >
                  <Input
                    type="gender"
                    // value={email}
                    name="gender"
                    className="py-3"
                    onChange={(e) => AuthRequest("gender", e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<div className="font-semibold">Password</div>}
                  rules={[
                    { required: true, message: "Password required" },
                    {
                      required: true,
                      pattern: new RegExp(
                        "^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"
                      ),
                      message: "Password is not strong enough",
                    },
                  ]}
                  name="password"
                >
                  <Input.Password
                    type="password"
                    // value={password}
                    name="password"
                    className="py-3"
                    onChange={(e) => {
                      AuthRequest("password", e.target.value);
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
                  htmlType="submit"
                  block
                  loading={result.isLoading}
                  className={`flex items-center font-bold justify-center py-5 mt-4 mx-auto bg-orange-600 text-white `}
                >
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="flex lg:hidden justify-center items-center gap-1">
            <p className="text-[#333333] font-[gelionLight] font-bold">
              Don't have an account?
            </p>
            <Button type="text" className="py-5 flex items-center">
              Register
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
export default Register;
