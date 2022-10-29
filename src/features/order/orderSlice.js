import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderId: "",
  userId: "",
  paymentStatus: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const URL_GET = "https://laviour.herokuapp.com/api/order/";

export const getPaymentStatus = createAsyncThunk(
  "order/getPaymentStatus",
  async (orderId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userAuth.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = URL_GET + orderId.id;

      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.orderId = "";
      state.userId = "";
      state.paymentStatus = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaymentStatus.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.userId = action.payload.user;
        state.orderId = action.payload._id;
        state.paymentStatus = action.payload.paymentStatus;
        state.paymentType = action.payload.paymentType;
      })
      .addCase(getPaymentStatus.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default orderSlice.reducer;
export const { reset } = orderSlice.actions;
