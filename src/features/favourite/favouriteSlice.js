import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_GET = "https://laviour.herokuapp.com/api/favourite/";
const URL_POST = "https://laviour.herokuapp.com/api/favourite/";
const URL_REMOVE = "https://laviour.herokuapp.com/api/favourite/";
const favourite = localStorage.getItem("favourite")
  ? JSON.parse(localStorage.getItem("favourite"))
  : null;

const initialState = {
  favourite: {
    user: "",
    favouriteItems: favourite ? favourite : [],
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const clearFavouriteBackend = createAsyncThunk(
  "favourite/clearFavouriteBackend",
  async (user, thunkAPI) => {
    try {
      const { _id } = thunkAPI.getState().userAuth.user;
      const token = thunkAPI.getState().userAuth.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        "https://laviour.herokuapp.com/api/favourite/" + _id,
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

export const get = createAsyncThunk("favourite/get", async (user, thunkAPI) => {
  try {
    const token = thunkAPI.getState().userAuth.accessToken;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(URL_GET + user.id, config);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateFavourite = createAsyncThunk(
  "favourite/updateFavourite",
  async (data, thunkAPI) => {
    try {
      const localProducts = localStorage.getItem("favourite")
        ? JSON.parse(localStorage.getItem("favourite"))
        : null;
      localStorage.removeItem("favourite");
      if (localProducts) {
        const body = {
          id: data.id,
          products: localProducts,
        };
        const config = {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
        const response = await axios.post(
          "https://laviour.herokuapp.com/api/favouriteUpdate",
          body,
          config
        );
        return response.data;
      } else {
        thunkAPI.dispatch(get({ id: data.id }));
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

export const add = createAsyncThunk(
  "favourite/add",
  async (favouriteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userAuth.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(URL_POST, favouriteData, config);
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

export const remove = createAsyncThunk(
  "favourite/remove",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userAuth.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(URL_REMOVE, id, config);
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

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    addNotLoggedIn: (state, action) => {
      let flag = false;
      const arr = state.favourite.favouriteItems.map((prod) => {
        if (prod.product === action.payload.product) {
          flag = true;
        }
        return prod;
      });
      if (!flag) {
        arr.push(action.payload);
      }
      state.favourite.favouriteItems = arr;
      localStorage.setItem(
        "favourite",
        JSON.stringify(state.favourite.favouriteItems)
      );
    },
    removeNotLoggedIn: (state, action) => {
      const arr = state.favourite.favouriteItems.filter((prod) => {
        return !(prod.product == action.payload.id);
      });
      state.favourite.favouriteItems = arr;
      localStorage.setItem(
        "favourite",
        JSON.stringify(state.favourite.favouriteItems)
      );
    },

    clearFavourite: (state) => {
      state.favourite = {
        user: "",
        favouriteItems: [],
      };
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favourite = action.payload;
      })
      .addCase(get.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(add.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(add.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favourite = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateFavourite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFavourite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favourite = action.payload;
      })
      .addCase(updateFavourite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(remove.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favourite = action.payload;
      })
      .addCase(remove.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(clearFavouriteBackend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearFavouriteBackend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favourite = action.payload;
      })
      .addCase(clearFavouriteBackend.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default favouriteSlice.reducer;
export const { reset, addNotLoggedIn, clearFavourite, removeNotLoggedIn } =
  favouriteSlice.actions;
