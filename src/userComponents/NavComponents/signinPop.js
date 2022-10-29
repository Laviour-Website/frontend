import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/userAuth/userAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrUserSettings } from "react-icons/gr";
import { BsSuitHeart, BsBoxSeam } from "react-icons/bs";
import { clearCart } from "../../features/cart/cartSlice";
import { clearAddress } from "../../features/address/addressSlice";
import { clearFavourite } from "../../features/favourite/favouriteSlice";

export default function SigninPop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(clearCart());
    await dispatch(clearAddress());
    await dispatch(clearFavourite());
    if (user === null) {
      toast.success("Logged out Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    navigate("/");
  };
  const { user} = useSelector(
    (state) => state.userAuth
  );
  return (
    <div className="z-30 absolute w-[250px] right-0 bg-white shadow-md p-4">
      {user ? (
        <div>
          <button
            onClick={handleLogout}
            className="w-[200px] h-[50px] bg-[#000] hover:bg-[rgb(85,85,85)] tracking-wider text-white p-2 font-bold text-[16px] "
          >
            Logout
          </button>
          <p className="mt-4 text-xl font-extrabold">Welcome,</p>
          <p className="text-xl font-extrabold">{user?.firstName}</p>
        </div>
      ) : (
        <Link to="/signin" className="hover:text-[#fff]">
          <button className="w-[200px] h-[50px] bg-[#000] hover:bg-[rgb(85,85,85)] tracking-wider text-white p-2 font-bold text-[16px] ">
            Sign in
          </button>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Link>
      )}
      <Link
        to={user ? "/account" : "/signin"}
        className="hover:text-[rgb(85,85,85)]"
      >
        <p className="mt-4 font-bold flex content-center items-center">
          <GrUserSettings className="mr-2" />
          My Account
        </p>
      </Link>
      {user ? (
        <div>
          <Link to="/favourite" className="hover:text-[rgb(85,85,85)]">
            <p className=" mt-2 font-bold flex content-center items-center">
              <BsSuitHeart className="mr-2" />
              Favourites
            </p>
          </Link>
          <Link to="/orders" className="hover:text-[rgb(85,85,85)]">
            <p className=" mt-2 font-bold flex content-center items-center">
              <BsBoxSeam className="mr-2" />
              Orders
            </p>
          </Link>
        </div>
      ) : (
        <Link to="/signup" className="hover:text-[#000] hover:underline">
          <p className="mt-2 text-[12px] text-[rgb(34,34,34)] font-semibold">
            Not a member yet? Join here!
          </p>
        </Link>
      )}
      <Link to="/seller" className=" hover:text-[#000] ">
        {" "}
        <p className="mt-2 text-[#db1d8f] font-extrabold tracking-wider">
          Want to sell on Laviour?
        </p>
      </Link>
    </div>
  );
}
