import { useCallback } from "react";
import { useAdminLoginMutation } from "../service/authApi";
import { useAppSelector } from "../app/hooks";

import { Notify } from "../features/notification";
import { ApiResponse } from "../application/client/response";
import { Encryption } from "../fuction/encryption";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const state = useAppSelector((state) => {
    return state.auth;
  });
  const navigate = useNavigate();
  const [login, result] = useAdminLoginMutation();

  const handleLogin = useCallback(async () => {
    try {
      const { data }: ApiResponse.Api = (await login(state)) as any;
      if (data?.status === 200) {
        Notify(data?.responseMessage as string, true);
        localStorage.setItem("****", Encryption.encrypt(data.token));
        localStorage.setItem("*****", Encryption.encrypt(data?.data as any));
       
        navigate("/admin/overview")
        // return navigate("/admin/overview", {
        //   replace: true,
        // });
      } else {
        Notify(data?.responseMessage as string, false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [login, navigate, state]);

  return { handleLogin, result };
};
