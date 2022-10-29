import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const URL = "https://laviour.herokuapp.com/api/sellerOrder/";

const URL_PACKED = "https://laviour.herokuapp.com/api/order";
const URL_SHIPPED = "https://laviour.herokuapp.com/api/orderShipped";

export const updateShipped = createAsyncThunk(
  "order/updateShipped",
  async (orderDetails, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.seller;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(URL_SHIPPED, orderDetails, config);
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

export const updatePacked = createAsyncThunk(
  "order/updatePacked",
  async (orderDetails, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.seller;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(URL_PACKED, orderDetails, config);
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

export const getOrders = createAsyncThunk(
  "sellerOrder/getOrders",

  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const id = thunkAPI.getState().auth.seller._id;
      const response = await axios.get(URL + id, config);
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

export const sellerOrderSlice = createSlice({
  name: "sellerOrder",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.orders = [];
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePacked.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePacked.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(updatePacked.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateShipped.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateShipped.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(updateShipped.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default sellerOrderSlice.reducer;
export const { reset } = sellerOrderSlice.actions;
