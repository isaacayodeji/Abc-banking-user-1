import { useCallback } from "react";
import { usePostDataMutation } from "../service/global";
import { useAppSelector } from "../app/hooks";
import { ApiResponse } from "../application/client/response";
import { Notify } from "../features/notification";

const useWithdraw = () => {
 const state = useAppSelector((state) => {
   return state.globalState;
 });
 const [postData, result] = usePostDataMutation();

 const handleWithdraw = useCallback(
   async (accountNumber: number, amount: number) => {
    //  console.log(state);

     try {
       const { data }: ApiResponse.Api = (await postData({
         ...state,
         url: `Transaction/withdraw?accountNumber=${accountNumber}&amount=${amount}`,
       })) as any;

       if (data?.status === 200) {
         Notify(data?.responseMessage as string, true);
           setTimeout(() => {
             window.location.reload();
           }, 2000);
       } else {
         Notify('Invalid Account Number', false);
       }
     } catch (error) {
       console.log(error);
     }
   },
   [postData, state]
 );
 return { handleWithdraw, result };

}
export default useWithdraw