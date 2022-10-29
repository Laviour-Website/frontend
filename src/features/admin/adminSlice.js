import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  // banner: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const URL_ADD = "https://laviour.herokuapp.com/api/addBanners/";

export const add = createAsyncThunk(
  "banner/add",
  async (bannerData, thunkAPI) => {
    try {
      const { accessToken } = thunkAPI.getState().admin;
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(URL_ADD, bannerData, config);
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

export const banner = createSlice({
  name: "banner",
  initialState,
  reducers: {
    reset: (state) => {
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
      .addCase(add.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.banner = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = banner.actions;
export default banner.reducer;
