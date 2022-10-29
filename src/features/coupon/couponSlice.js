import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : null;

const initialState = {
  code: "",
  discountPrice: 0,
  isError: false,
  isSuccess: false,
  message: "",
  minOrderValue: 0,
  minQuantity: 1,
  isLoading: false,
};

export const apply = createAsyncThunk(
  "coupon/apply",
  async (couponData, thunkAPI) => {
    try {
      const { _id } = thunkAPI.getState().userAuth.user;
      couponData.user = _id;
      const token = thunkAPI.getState().userAuth.accessToken;
      const quantity = thunkAPI.getState().cart.cart.cartItems.length;
      couponData.quantity = quantity;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "https://laviour.herokuapp.com/api/coupon/apply",
        couponData,
        config
      );
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

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.discountPrice = 0;
      state.code = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apply.pending, (state) => {
        state.isLoading = true;
        state.code = "";
        state.discountPrice = 0;
        state.message = "";
      })
      .addCase(apply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.discountPrice = action.payload.discountPrice;
        state.code = action.payload.code;
        state.message = "";
      })
      .addCase(apply.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default couponSlice.reducer;
export const { reset } = couponSlice.actions;
