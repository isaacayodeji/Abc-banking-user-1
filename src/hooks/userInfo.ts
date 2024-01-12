import { Encryption } from "./../fuction/encryption";
import { useLayoutEffect, useState } from "react";
import { ApiResponse } from "../application/client/response";

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(new ApiResponse.UserInfo());

  useLayoutEffect(() => {
    if (localStorage.getItem("*****")) {
      const loginResponse: ApiResponse.UserInfo = JSON.parse(
        Encryption.decrypt(localStorage.getItem("*****") as string)
      );

      setUserInfo(loginResponse);
    } else {
    //  window.location.href = "/";
    }
  }, []);

  return { userInfo };
};
