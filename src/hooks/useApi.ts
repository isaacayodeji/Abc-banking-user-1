import { useEffect, useState } from "react";
import { useGetDataQuery } from "../service/global";
import { ApiResponse } from "../application/client/response";

export const useApi = (getUrl: string) => {
  const [response, setResponse] = useState([]);
  const { data, isFetching, isError, refetch } = useGetDataQuery(getUrl);
  useEffect(() => {
    if (data && !isError && !isFetching) {
      const response: ApiResponse.Api = data;
      if (response.status === 200) {
        let dataSource = [] as any;
        if (Array.isArray(response.data)) {
         dataSource = response?.data?.map((x: any, index: any) => ({
            ...x,
            key: index + 1,
          }));
          setResponse(dataSource);
        }
      }
    }
  }, [data, isError, isFetching]);

  return { isFetching, refetch, response };
};
