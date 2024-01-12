import { useCallback } from "react";
import { useAppDispatch } from "../app/hooks";
import { setAllGlobalState } from "../features/globalSlice";

const useGlobalFieldRequest = (state: any) => {
  const dispatch = useAppDispatch();
  const GlobalRequest = useCallback((key: string, value: any) => {
    dispatch(
      setAllGlobalState({
        ...state,
        request: {
          ...state.request,
          [key]: value,
        },
      })
    );
  }, [dispatch, state]);
  return {GlobalRequest}
};
export default useGlobalFieldRequest;
