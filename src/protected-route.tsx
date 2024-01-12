import { Navigate } from "react-router-dom";



export const ProtectedRoutes = ({ children }: any) => {
//   const { fullName } = useAppSelector(selectAuth);

  if (!localStorage.getItem('***')) {
    // return <Navigate to={"/"} replace />;
  }
  return children;
};
