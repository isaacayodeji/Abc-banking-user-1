import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { ApiResponse } from "../application/client/response";
import { usePostDataMutation } from "../service/global";
import { Notify } from "../features/notification";

const UsechangePassword = () => {
  const navigate = useNavigate();
  const state = useAppSelector((state) => {
    return state.globalState;
  });
  const [PostData, result] = usePostDataMutation();

  const handleChangePassword = useCallback(
    async (email: any, token: any, newPassword: any) => {
      try {
        const { data }: ApiResponse.Api = (await PostData({
          ...state,
          url: `${process.env.REACT_APP_BASE_URL_RESET}changepassword?email=${email}&enteredToken=${token}&newPassword=${newPassword}`,
        })) as any;
        if (result.isSuccess && data?.status === 200) {
          Notify(data?.responseMessage as string, true);
          navigate("/");
        } else {
          Notify(data?.responseMessage as string, false);
        }
      } catch (error) {
        console.log(error);
        // Notify(error as string, false);
      }
    },
    [PostData, navigate, result.isSuccess, state]
  );
  return { handleChangePassword, result };
};
export default UsechangePassword;
