import { useAppSelector } from "../app/hooks";
import {
  useGetDataOnActionMutation,
  usePostDataMutation,
} from "../service/global";
import { useCallback, useEffect, useState } from "react";
import { ApiResponse } from "../application/client/response";
import { Notify } from "../features/notification";
import { useUserInfo } from "./userInfo";

const useTransfer = () => {
  const state = useAppSelector((state) => {
    return state.globalState;
  });
  const { userInfo } = useUserInfo();
  const [response, setResponse] = useState();
  const [getData, result] = useGetDataOnActionMutation();

  useEffect(() => {
    getData({ url: `Customer/GetAccountDetails/${userInfo.id}` });
  }, [getData, userInfo.id]);
  // console.log(result);

  useEffect(() => {
    if (result.data) {
      if (result.data?.status === 200) {
        setResponse(result.data.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);
  // console.log(response);

  const [postData, Result] = usePostDataMutation();

  const handleTransfer = useCallback(
    async (amount: number, targetAccountNumber: number) => {
      try {
        const { data }: ApiResponse.Api = await (postData({
          ...state,
          url: `Transaction/transfer?sourceAccountNumber=${result?.data?.data?.accountNumber}&amount=${amount}&targetAccountNumber=${targetAccountNumber}`,
        }) as any);
        if (data.status === 200) {
          Notify(data?.responseMessage as string, true);
         setTimeout(() => {
           window.location.reload();
         }, 2000);
        } else {
          Notify("Invalid Account Number", false);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [postData, result?.data?.data.accountNumber, state]
  );
  return { handleTransfer, Result };
};
export default useTransfer;
