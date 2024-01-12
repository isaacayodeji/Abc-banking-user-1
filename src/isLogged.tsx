import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const IsLoggedIn = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("***")) {
      navigate("/overview");
    }
  }, [navigate]);
  return children;
};
