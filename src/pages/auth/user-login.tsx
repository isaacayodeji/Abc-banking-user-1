import { Button, Col, Form, Input, Row } from "antd";
import { motion } from "framer-motion";
import { useAppSelector } from "../../app/hooks";
import useFieldRequest from "../../hooks/useFieldRequest";
import useUserLogin from "../../hooks/useUserLogin";
import { Link } from "react-router-dom";
import bank from "../../images/bank.svg";

const UserLogin = () => {
  const state = useAppSelector((state) => {
    return state.auth;
  });
  const { AuthRequest } = useFieldRequest(state);

  const { result, handleLogin } = useUserLogin();

  return (
    <>
      <div className="min-h-[100svh] h-[full] ">
        <div className="flex items-center justify-around ">
          <section className=" h-screen sm:h-[100vh] grid items-center max-lg:hidden">
            {" "}
            <img
              src={bank}
              alt="bank image"
              className="w-96 h-96 max-lg:hidden "
            />
          </section>
          <section className="flex items-center justify-center ">
            <div className="h-screen sm:h-[100vh] grid items-center">
              <main className="flex justify-center items-center pt-20 ">
                <motion.div
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="p-5 lg:p-20 h-[90%] w-[95%] max-w-[41rem] "
                >
                  <h1 className=" text-black font-bold font-[gelionRegular] text-xl lg:text-3xl text-center lg:text-start lg:w-[50rem]">
                    Welcome, Sign in to your account
                  </h1>

                  <Form
                    requiredMark="optional"
                    onFinish={handleLogin}
                    layout="vertical"
                    wrapperCol={{ span: 24 }}
                    className="my-[1.60rem] "
                  >
                    <Row style={{ width: "100%" }}>
                      <Col span={24} className="relative">
                        <Form.Item
                          label={
                            <div className="font-semibold">Email Address</div>
                          }
                          rules={[
                            {
                              required: true,
                              message: "Email Address required",
                            },
                          ]}
                          name="email"
                        >
                          <Input
                            type="email"
                            name="email"
                            className="py-3"
                            onChange={(e) =>
                              AuthRequest("email", e.target.value)
                            }
                          />
                        </Form.Item>

                        <Form.Item
                          label={<div className="font-semibold">Password</div>}
                          rules={[
                            { required: true, message: "Password required" },
                          ]}
                          name="password"
                        >
                          <Input.Password
                            type="password"
                            className="py-3"
                            onChange={(e) =>
                              AuthRequest("password", e.target.value)
                            }
                          />
                        </Form.Item>
                        <Link to="user/forgot-password">
                          <p className="text-orange-600 font-semibold absolute bottom-0 right-0 cursor-pointer hover:transition-all ">
                            Forgot password?
                          </p>
                        </Link>
                      </Col>

                      <Col span={24}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          block
                          loading={result.isLoading}
                          className={`flex items-center font-bold justify-center py-5 mt-4 mx-auto bg-slate-500 text-white `}
                        >
                          Sign In
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
                </motion.div>
              </main>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
export default UserLogin;
