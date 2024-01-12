import { useCallback } from "react";
import { useAppSelector } from "../app/hooks";
import { ApiResponse } from "../application/client/response";
import { Notify } from "../features/notification";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../service/authApi";
import { usePostDataMutation } from "../service/global";

const useResetPassword = () => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => {
    return state.globalState;
  });

  const [postData, result] = usePostDataMutation();

  const handleReset = useCallback(
    async (email: any) => {
      try {
        const { data }: ApiResponse.Api = (await postData({
          ...state,
          url: `${process.env.REACT_APP_BASE_URL_RESET}resetPassword?email=${email}`,
        })) as any;
        if (result.isSuccess && data?.status === 200) {
          Notify(data?.responseMessage as string, true);
          navigate("/user/reset-Password");
        } else {
          Notify(data?.responseMessage as string, false);
        }
      } catch (error) {
        console.log(error);
        // Notify(error as string, false);
      }
    },
    [navigate, postData, result.isSuccess, state]
  );
  return { handleReset, result };
};
export default useResetPassword;
