import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  // banner: null,
  admin: null,
  accessToken: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const URL_S = "https://laviour.herokuapp.com/api/admin/signin";

export const signin = createAsyncThunk(
  "admin/signin",
  async (adminData, thunkAPI) => {
    try {
      const response = await axios({
        url: URL_S,
        method: "POST",
        data: adminData,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://laviour.herokuapp.com",
          "Content-Type": "application/json",
        },
      });
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

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
    logout: (state) => {
      state.admin = null;
      state.accessToken = "";
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.accessToken = action.payload.accessToken;
        state.admin = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logout } = adminSlice.actions;

export default adminSlice.reducer;
