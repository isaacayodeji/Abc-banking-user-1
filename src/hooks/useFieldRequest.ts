import { useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import { setAllAuthKey } from "../features/authSlice";


const useFieldRequest = (state: any) => {
  const dispatch = useAppDispatch();
  const AuthRequest = useCallback(
    (key: string, value: any) => {
      dispatch(
        setAllAuthKey({
          ...state,
          request: {
            ...state.request,
            [key]: value,
          },
        })
      );
    },
    [dispatch, state]
  );
  return { AuthRequest }
};

export default useFieldRequest;
