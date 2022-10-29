import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  address: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  selected: "",
};

const URL_ADD = "https://laviour.herokuapp.com/api/address/";

export const add = createAsyncThunk(
  "address/add",
  async (addressData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userAuth.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(URL_ADD, addressData, config);

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

export const getAddress = createAsyncThunk(
  "address/getAddress",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userAuth.accessToken;
      const userId = thunkAPI.getState().userAuth.user._id;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const url = URL_ADD + userId;

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

export const address = createSlice({
  name: "address",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    selectAddress: (state, action) => {
      state.selected = action.payload.id;
    },
    clearAddress: (state) => {
      state.address = null;
      state.selected = "";
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(add.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.address = action.payload;
        state.selected = action.payload.addedId;
      })
      .addCase(add.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.address = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default address.reducer;
export const { reset, selectAddress, clearAddress } = address.actions;
