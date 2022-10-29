import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./routes/signin";
import Signup from "./routes/signup";
import Seller from "./routes/seller";
import Dashboard from "./routes/dashboard";
import Products from "./routes/products";
import AddProduct from "./routes/addProduct";
import EditProduct from "./routes/editProduct";
import Home from "./userRoutes/home";
import UserSignUp from "./userRoutes/UserSignup";
import UserSignin from "./userRoutes/UserSignin";
import Account from "./userRoutes/Account";
import Address from "./userRoutes/Address";
import Orders from "./userRoutes/Orders";
import EditAccount from "./userRoutes/EditAccount";
import UserProducts from "./userRoutes/Products";
import SingleProduct from "./userRoutes/SingleProduct";
import Cart from "./userRoutes/Cart";
import AddAddress from "./userRoutes/AddAddress";
import Payment from "./userRoutes/Payment";
import PaymentSuccess from "./userRoutes/PaymentSuccess";
import SingleSellerProduct from "./routes/singleSellerProduct";
import Favourite from "./userRoutes/Favourite";
import { SidebarProvider } from "./context/SidebarContext";
import Search from "./userRoutes/Search";
import SellerOrders from "./routes/order";
import Admin from "./adminRoutes/admin";
import Banner from "./adminRoutes/banner";
import SellerSignup from "./adminRoutes/SellerSignup";
import { VerifyProducts } from "./adminRoutes/VerifyProducts";
import VerifyOne from "./adminComponents/VerifyProducts/VerifyOne";
import ChangePrice from "./adminRoutes/ChangePrice";
import Coupon from "./adminRoutes/Coupon";
import TrackOrders from "./adminRoutes/trackorders";
import SingleOrder from "./adminComponents/trackerOrders/singleOrder";
import "./App.css";
import Income from "./routes/Income";
import Settings from "./routes/Settings";
import AdminPayment from "./adminRoutes/Payment";
import Returns from "./adminRoutes/return";
import AdminSignin from "./adminRoutes/Signin";
import ForgotPassword from "./userRoutes/ForgotPassword";
import ResetPassword from "./userRoutes/ResetPassword";
import PaymentPending from "./userRoutes/PaymentPending";
import uniqid from "uniqid";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <SidebarProvider>
            <Routes>
              <Route exact path="/seller" element={<Seller />} />
              <Route path="/seller/signin" element={<Signin />} />
              <Route path="/seller/signup" element={<Signup />} />
              <Route path="/signup" element={<UserSignUp />} />
              <Route path="/signin" element={<UserSignin />} />
              <Route exact path="/seller/dashboard" element={<Dashboard />} />
              <Route path="/seller/products" element={<Products />} />
              <Route path="/seller/orders" element={<SellerOrders />} />
              <Route path="/seller/income" element={<Income />} />
              <Route path="/seller/settings" element={<Settings />} />
              <Route
                exact
                path="/seller/products/add"
                element={<AddProduct />}
              />
              <Route
                exact
                path="/seller/products/edit/:productId"
                element={<EditProduct />}
              />
              <Route
                path="/seller/orderproduct"
                element={<SingleSellerProduct />}
              />
              <Route path="/account" element={<Account />} />
              <Route
                path="/user/forgot-password"
                element={<ForgotPassword />}
              />
              <Route
                path="/user/reset-password/:id/:token"
                element={<ResetPassword />}
              />
              <Route path="/address" element={<Address />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/account/edit" element={<EditAccount />} />
              <Route path="/products" element={<UserProducts />} />
              <Route
                path="/product/:id"
                element={<SingleProduct key={uniqid()} />}
              />
              <Route path="/checkout/address" element={<AddAddress />} />
              <Route path="/checkout/cart" element={<Cart />} />
              <Route path="/checkout/payment" element={<Payment />} />
              <Route path="/checkout/success" element={<PaymentSuccess />} />
              <Route path="/checkout/pending" element={<PaymentPending />} />
              <Route path="/favourite" element={<Favourite />} />
              <Route path="/category/:category" element={<UserProducts />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="*" element={<Home />} />
              //admin routes
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/banners" element={<Banner />} />
              <Route path="/admin/sellersignup" element={<SellerSignup />} />
              <Route path="/admin/verify/product/:id" element={<VerifyOne />} />
              <Route
                path="/admin/verifyproducts"
                element={<VerifyProducts />}
              />
              <Route path="/admin/changeprice" element={<ChangePrice />} />
              <Route path="/admin/coupons" element={<Coupon />} />
              <Route path="/admin/trackOrders" element={<TrackOrders />} />
              <Route path="/admin/returns" element={<Returns />} />
              <Route path="/admin/trackSingleOrder" element={<SingleOrder />} />
              <Route path="/admin/payment" element={<AdminPayment />} />
              <Route path="/admin/signin" element={<AdminSignin />} />
            </Routes>
          </SidebarProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
