import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL_R = "https://laviour.herokuapp.com/api/signup";
const URL_S = "https://laviour.herokuapp.com/api/signin";
const URL_GOOGLESIGNUP = "https://laviour.herokuapp.com/api/googleSignup";
const URL_GOOGLECHECK = "https://laviour.herokuapp.com/api/googleCheck";
const URL_EDIT = "https://laviour.herokuapp.com/api/editData";

const URL_FORGOT = "https://laviour.herokuapp.com/api/user/forgotPassword";
const URL_RESET = "https://laviour.herokuapp.com/api/user/reset-password";

const initialState = {
  user: null,
  accessToken: "",
  isError: false,
  isForgotSuccess: false,
  isResetSuccess: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const sendForgotLink = createAsyncThunk(
  "userAuth/sendForgotLink",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(URL_FORGOT, data);
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
export const checkResetLink = createAsyncThunk(
  "userAuth/checkResetLink",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${URL_RESET}/${data.id}/${data.token}`);
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
export const performReset = createAsyncThunk(
  "userAuth/performReset",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${URL_RESET}`, data);
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

export const googleCheck = createAsyncThunk(
  "userAuth/googleCheck",
  async (userData, thunkAPI) => {
    try {
      const response = await axios({
        url: URL_GOOGLECHECK,
        method: "POST",
        data: userData,
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

export const editData = createAsyncThunk(
  "userAuth/editData",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userAuth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(URL_EDIT, userData, config);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
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

export const signup = createAsyncThunk(
  "userAuth/signup",
  async (userData, thunkAPI) => {
    try {
      if (!userData.isGoogleLogin) {
        const response = await axios.post(URL_R, userData);

        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      } else if (userData.isGoogleLogin) {
        const response = await axios.post(URL_GOOGLESIGNUP, userData);

        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      }
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
export const userRefreshToken = createAsyncThunk(
  "userAuth/userRefreshToken",
  async (_, thunkAPI) => {
    try {
      const config = {
        withCredentials: true,
      };
      const response = await axios.get(
        "https://laviour.herokuapp.com/api/userRefreshToken",
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
  "userAuth/signin",
  async (userData, thunkAPI) => {
    try {
      if (userData.googleLogin) {
        const response = await axios({
          url: URL_GOOGLECHECK,
          method: "POST",
          data: userData,
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "https://laviour.herokuapp.com",
            "Content-Type": "application/json",
          },
        });

        return response.data;
      } else {
        const response = await axios({
          url: URL_S,
          method: "POST",
          data: userData,
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "https://laviour.herokuapp.com",
            "Content-Type": "application/json",
          },
        });

        // if (response.data) {
        //   localStorage.setItem("user", JSON.stringify(response.data));
        // }
        return response.data;
      }
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

export const logout = createAsyncThunk("userAuth/logout", async (data, _) => {
  await localStorage.removeItem("user");
});

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.isForgotSuccess = false;
      state.isResetSuccess = false;
      // state.message = "";
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.user = action.payload;
        state.message = "";
        state.accessToken = action.payload.token;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.message = "";
        state.user = null;
      })
      .addCase(googleCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isSuccess = true;
      })
      .addCase(editData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "";
        state.accessToken = action.payload.token;
      })
      .addCase(editData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(userRefreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        if (action.payload.message == "FAILED") {
          state.isError = true;
        }
      })
      .addCase(userRefreshToken.rejected, (state) => {
        state.accessToken = "";
        state.isError = true;
      })
      .addCase(sendForgotLink.pending, (state) => {
        state.message = "";
        state.isLoading = true;
      })
      .addCase(sendForgotLink.fulfilled, (state) => {
        state.isLoading = false;
        state.message = "";
        state.isForgotSuccess = true;
      })
      .addCase(sendForgotLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(checkResetLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkResetLink.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(checkResetLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(performReset.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(performReset.fulfilled, (state) => {
        state.isLoading = false;
        state.isResetSuccess = true;
        state.message = "";
      })
      .addCase(performReset.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userAuthSlice.actions;

export default userAuthSlice.reducer;
