import { useAppSelector } from "../app/hooks";
import { ApiResponse } from "../application/client/response";
import { usePostDataMutation } from "../service/global";
import { useCallback } from "react";
import { Notify } from "../features/notification";

const useApproval = () => {
  const state = useAppSelector((state) => {
    return state.globalState;
  });

  const [postData, result] = usePostDataMutation();

  const HandlePost = useCallback(async (id: any, action: string) => {
    try {
      const { data }: ApiResponse.Api = (await postData({
        ...state,
        url:
          action === "approve"
            ? `Customer/ApprovePendingUser/${id}?isApprove=true`
            : `Customer/ApprovePendingUser/${id}?isApprove=false`,
      })) as any;

      if (data?.status === 200) {
        Notify(data?.responseMessage as string, true);
      } else {
        Notify(data?.responseMessage as string, false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [postData, state]);
  return { HandlePost, result };
};
export default useApproval;
