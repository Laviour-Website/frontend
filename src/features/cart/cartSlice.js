import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_GET = "https://laviour.herokuapp.com/api/cart/";
const URL_POST = "https://laviour.herokuapp.com/api/cart/";
const URL_REMOVE = "https://laviour.herokuapp.com/api/cart/";
const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : null;

const initialState = {
  cart: {
    user: "",
    cartItems: cart ? cart : [],
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const clearCartBackend = createAsyncThunk(
  "cart/clearCartBackend",
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
        "https://laviour.herokuapp.com/api/cart/" + _id,
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

export const qtyChange = createAsyncThunk(
  "cart/qtyChange",
  async (product, thunkAPI) => {
    try {
      const token = thunkAPI.getState().userAuth.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        "https://laviour.herokuapp.com/api/cartQty",
        product,
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

export const get = createAsyncThunk("cart/get", async (user, thunkAPI) => {
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

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (data, thunkAPI) => {
    try {
      const localProducts = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : null;
      localStorage.removeItem("cart");
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
          "https://laviour.herokuapp.com/api/cartUpdate",
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

export const add = createAsyncThunk("cart/add", async (cartData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().userAuth.accessToken;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(URL_POST, cartData, config);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const remove = createAsyncThunk("cart/remove", async (id, thunkAPI) => {
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
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    addNotLoggedIn: (state, action) => {
      let flag = false;
      const arr = state.cart.cartItems.map((prod) => {
        if (
          prod.product === action.payload.product &&
          prod.size === action.payload.size
        ) {
          prod.quantity = Math.min(prod.quantity + 1, 3);
          flag = true;
        }
        return prod;
      });
      if (!flag) {
        arr.push(action.payload);
      }
      state.cart.cartItems = arr;
      localStorage.setItem("cart", JSON.stringify(state.cart.cartItems));
    },
    removeNotLoggedIn: (state, action) => {
      const arr = state.cart.cartItems.filter((prod) => {
        return !(
          prod.product == action.payload.id && prod.size == action.payload.size
        );
      });
      state.cart.cartItems = arr;
      localStorage.setItem("cart", JSON.stringify(state.cart.cartItems));
    },
    qtyUpdateNotLoggedIn: (state, action) => {
      const arr = state.cart.cartItems.map((prod) => {
        if (
          prod.product === action.payload.product &&
          prod.size === action.payload.size
        ) {
          prod.quantity = Math.min(action.payload.qty, 3);
        }
        return prod;
      });
      state.cart.cartItems = arr;
      localStorage.setItem("cart", JSON.stringify(state.cart.cartItems));
    },
    clearCart: (state) => {
      state.cart = {
        user: "",
        cartItems: [],
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
        state.cart = action.payload;
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
        state.cart = action.payload;
      })
      .addCase(add.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(remove.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(remove.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(qtyChange.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(qtyChange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(qtyChange.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(clearCartBackend.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clearCartBackend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
      })
      .addCase(clearCartBackend.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default cartSlice.reducer;
export const {
  reset,
  addNotLoggedIn,
  clearCart,
  removeNotLoggedIn,
  qtyUpdateNotLoggedIn,
} = cartSlice.actions;
