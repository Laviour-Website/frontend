import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import userAuthReducer from "../features/userAuth/userAuthSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import addressReducer from "../features/address/addressSlice";
import orderReducer from "../features/order/orderSlice";
import sellerOrderReducer from "../features/sellerOrder/sellerOrderSlice";
import favouriteReducer from "../features/favourite/favouriteSlice";
import bannerReducer from "../features/admin/adminSlice";
import couponReducer from "../features/coupon/couponSlice";
import singleOrder from "../features/admin/singleOrderSlice";
import adminReducer from "../features/admin/adminAuthSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  userAuth: userAuthReducer,
  product: productReducer,
  cart: cartReducer,
  address: addressReducer,
  order: orderReducer,
  sellerOrder: sellerOrderReducer,
  favourite: favouriteReducer,
  banner: bannerReducer,
  admin: adminReducer,
  coupon: couponReducer,
  adminSingleOrder: singleOrder,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }
export const store = configureStore({
  reducer: persistedReducer,
});

// export const store=configureStore({
//   reducer: {
//   auth: authReducer,
//   product: productReducer,
// }
// })
