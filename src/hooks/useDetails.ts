import { Result } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useGetDataOnActionMutation } from "../service/global";
import { useUserInfo } from "./userInfo";

const useDetails = () => {
  const { userInfo } = useUserInfo();
  const [response, setResponse] = useState();
  const [getData, result] = useGetDataOnActionMutation();

  const handleDetails = useCallback(() => {
    getData({ url: `Customer/GetAccountDetails/${userInfo.id}` });

    if (result.data) {
      if (result.data?.status === 200) {
        setResponse(result.data.data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData, result.data, userInfo.id]);

  const res = result.data;
  let details = result?.data?.data;
  return { details, handleDetails, res };
};
export default useDetails;
