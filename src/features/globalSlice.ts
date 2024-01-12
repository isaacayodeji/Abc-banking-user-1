import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Payload } from "../application/payload";
import { State } from "../application/state";

const initialState: State.Page = {
  response: [],
  current: 0,
  btnDisabled: true,
  showFormModal: false,
};

const GlobalSlice = createSlice({
  name: "GlobalSlice",
  initialState,
  reducers: {
    setGlobalState: (state, action: PayloadAction<Payload.Global>) => {
      const key: keyof State.Page = action.payload.key;
      state = {
        ...state,
        [key]: action.payload?.value,
      };
      return state;
    },
    setAllGlobalState(state, action: PayloadAction<State.Page>) {
      state = action.payload as any;
      return state;
    },
  },
});
export const { setGlobalState, setAllGlobalState } = GlobalSlice.actions;
export const globalReducer = GlobalSlice.reducer
