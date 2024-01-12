import { useLayoutEffect,} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Redirect = () => {
  
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useLayoutEffect(() => {
     if (pathname === "/") {
       return navigate("/admin/login");
     }
  }, [ navigate, pathname]);


  return <div></div>;
};
export default Redirect;
