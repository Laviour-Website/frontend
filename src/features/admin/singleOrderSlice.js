import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const singleOrder = createSlice({
  name: "singleOrder",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.order=null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    addSingleOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export default singleOrder.reducer;
export const { reset, addSingleOrder } = singleOrder.actions;
