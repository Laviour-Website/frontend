import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL_R = "https://laviour.herokuapp.com/api/seller/signup";
const URL_S = "https://laviour.herokuapp.com/api/seller/signin";
// const seller = JSON.parse(localStorage.getItem("seller"));

const initialState = {
  seller: null,
  accessToken: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (sellerData, thunkAPI) => {
    try {
      const response = await axios.post(URL_R, sellerData);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.get(
        "https://laviour.herokuapp.com/api/refreshToken",
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
      console.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (sellerData, thunkAPI) => {
    try {
      const response = await axios({
        url: URL_S,
        method: "POST",
        data: sellerData,
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "https://laviour.herokuapp.com",
          "Content-Type": "application/json",
        },
      });
      // if (response.data) {
      //   localStorage.setItem("seller", JSON.stringify(response.data));
      // }
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

export const logout = createAsyncThunk(
  "auth/logout",
  async () => await localStorage.removeItem("seller")
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.accessToken = action.payload.token;
        state.seller = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.seller = null;
        state.accessToken = "";
        state.refreshToken = "";
        state.message = "";
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        if (action.payload.message == "FAILED") {
          state.isError = true;
        }
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = "";
        state.isError = true;
      });
  },
});
export const { reset, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
