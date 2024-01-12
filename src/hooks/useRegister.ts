import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useRegisterMutation } from "../service/authApi";
import { ApiResponse } from "../application/client/response";
import { Notify } from "../features/notification";

const useRegister = () => {
  const state = useAppSelector((state) => {
    return state.auth;
  });
  const navigate = useNavigate();
  const [register, result] = useRegisterMutation();

  const hnadleRegister = useCallback(async () => {
    try {
      const { data }: ApiResponse.Api = (await register(state)) as any;
      if (data?.status === 200) {
        Notify(data?.responseMessage, true);
        navigate("/");
      } else {
        Notify(data?.responseMessage, false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigate, register, state]);
  return { hnadleRegister, result };
};
export default useRegister;
