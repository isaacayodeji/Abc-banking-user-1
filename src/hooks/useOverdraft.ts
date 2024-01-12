import { useCallback, useEffect, useState } from "react";
import {
  useGetDataOnActionMutation,
  usePostDataMutation,
} from "../service/global";
import { ApiResponse } from "../application/client/response";
import { useAppSelector } from "../app/hooks";
import { useUserInfo } from "./userInfo";
import { Notify } from "../features/notification";

const useOverdraft = () => {
  const state = useAppSelector((state) => {
    return state.auth;
  });

  const [response, setResponse] = useState();
  const [getData, getResults] = useGetDataOnActionMutation();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    getData({ url: `Customer/GetAccountDetails/${userInfo.id}` });
  }, [getData, userInfo.id]);
  // console.log(result);
  useEffect(() => {
    if (getResults.data) {
      if (result.data?.status === 200) {
        setResponse(result.data.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getResults.data]);
  // console.log(response)

  const [postData, result] = usePostDataMutation();

  const handleOverdraft = useCallback(
    async (action: string) => {
      try {
        const { data }: ApiResponse.Api = (await getData({
          ...state,
          url:
            action === "withdraw"
              ? `Transaction/WithdrawOverDraft?customerId=${userInfo.id}`
              : `Transaction/Overdraft?customerId=${userInfo.id}`,
        })) as any;
        if (data.status === 200) {
          Notify(data?.responseMessage as string, true);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          Notify(data?.responseMessage as string, false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [getData, state, userInfo.id]
  );
  return { handleOverdraft, result };
};
export default useOverdraft;
