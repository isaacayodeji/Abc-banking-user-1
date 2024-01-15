import { Result } from "antd";
import { useAppSelector } from "../app/hooks";
import {
  useGetDataOnActionMutation,
  usePostDataMutation,
} from "../service/global";
import { useCallback, useEffect, useState } from "react";
import { ApiResponse } from "../application/client/response";
import { useUserInfo } from "./userInfo";
import { Notify } from "../features/notification";

const useStatusAction = () => {
  const state = useAppSelector((state) => {
    return state.globalState;
  });

  const [postData, resultDetails] = usePostDataMutation();
//   const [response, setResponse] = useState();
//   const [getData, result] = useGetDataOnActionMutation();

//   useEffect(() => {
//     getData({ url: `Customer/GetAllCustomer/` });
//   }, [getData]);
//   // console.log(result);

//   useEffect(() => {
//     if (result.data) {
//       if (result.data?.status === 200) {
//         setResponse(result.data.id);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [result.data]);
//   // console.log(response);

  const HandleValidation = useCallback(
    async (id: any, action: string) => {
      try {
        const { data }: ApiResponse.Api = (await postData({
          ...state,
          url:
            action === "activate"
              ? `Customer/ReActivateCustomerAccount/${id}`
              : action === "delete"
              ? `Customer/Delete/${id}`
              : `Customer/DeActivateCustomerAccount/${id}` || "",
        })) as any;
        if (data.status === 200) {
          Notify(data.responseMessage, true);
        } else {
          Notify(data.responseMessage, false);
        }
      } catch (error) {
        console.log(error);
        
      }
    },
    [postData, state]
  );
  return { HandleValidation, resultDetails };
};

export default useStatusAction;
