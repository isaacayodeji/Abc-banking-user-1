import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useUserLoginMutation } from "../service/authApi";
import { useCallback } from "react";
import { ApiResponse } from "../application/client/response";
import { Notify } from "../features/notification";
import { Encryption } from "../fuction/encryption";

const useUserLogin = () => {
  const state = useAppSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();
  const [login, result] = useUserLoginMutation();

  const handleLogin = useCallback(async () => {
    try {
        // console.log(state)
      const { data }: ApiResponse.Api = (await login(state)) as any;
      if (data?.status === 200) {
        Notify(data?.reasponseMessage as string, true);
        localStorage.setItem("***", Encryption.encrypt(data.token));
        localStorage.setItem("*****", Encryption.encrypt(data.data as any));
        return navigate("/user/overview", { replace: true });
      } else {
        Notify(data?.responseMessage as string, false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [login, navigate, state]);
  return { handleLogin, result };
};
export default useUserLogin;
