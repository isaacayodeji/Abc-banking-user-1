import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { State } from "../application/state";
import { Payload } from "../application/payload";
import { ApiRequest } from "../application/client/request";

const initialState: State.Auth = {
  request: new ApiRequest.Auth(),
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuthKey: (state, action: PayloadAction<Payload.Auth>) => {
      const key: keyof State.Auth = action.payload.key;
      state = {
        ...state,
        [key]: action.payload.value,
      };
      return state;
    },
    setAllAuthKey: (state, action: PayloadAction<State.Auth>) => {
      state = action.payload;
      return state;
    },
    logOut: (state,action: PayloadAction<State.Auth>) => {
      localStorage.clear();
     
    },
  },
});

export const { setAllAuthKey, setAuthKey,logOut } = authSlice.actions;

export default authSlice.reducer;
