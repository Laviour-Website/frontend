import React, { useEffect } from "react";
import { useState } from "react";
import Layout from "../userComponents/Layout";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout, userRefreshToken } from "../features/userAuth/userAuthSlice";
import { reset as resetAuth } from "../features/userAuth/userAuthSlice";
import SidebarContext from "../context/SidebarContext";
import { useContext } from "react";
import "../userComponents/ordersComponents/orders.css";
import OrderCard from "../userComponents/ordersComponents/OrderCard";

export default function Orders() {
  let { user, isRefreshError, accessToken } = useSelector(
    (state) => state.userAuth
  );
  let URL_GET = `https://laviour.herokuapp.com/api/getorder/`;
  const [orders, setOrders] = useState([]);
  let arr = [];
  const navigate = useNavigate();
  const [isOrderError, setOrderError] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  let { sidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if (user && isOrderError) {
      dispatch(resetAuth());
      dispatch(userRefreshToken());
    }
    if (user && isRefreshError) {
      dispatch(logout());
      setTimeout(() => {
        navigate("/signin");
      }, 200);
    }
  }, [isOrderError, isRefreshError]);
  useEffect(() => {
    try {
      const fun = async () => {
        setIsLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get(URL_GET + user._id, config);
        setOrders(response.data);
        if (response.data) {
          console.log(orders);
          setIsLoading(false);
        }
      };
      fun();
    } catch (error) {
      setOrderError(true);
      console.log(error);
    }
  }, [orders.length, isCancelled]);

  return (
    <ProtectedRoute>
      <Layout>
        <hr />
        <div className={`${sidebarOpen ? "hidden w-[90%]" : "w-full mt-4 "}`}>
          <h2 className="text-3xl text-center font-bold mb-4">
            Welcome, {user.firstName}
          </h2>
          <div className="flex w-[60%] sm:w-[50%] justify-between mx-auto text-xs sm:text-lg">
            <Link to="/account" className="font-bold mx-1">
              ACCOUNT
            </Link>
            <Link to="/address" className="font-bold mx-1">
              ADDRESS
            </Link>
            <Link to="/orders" className="font-bold mx-1">
              ORDERS
            </Link>
          </div>
          <div className="flex w-[60%] sm:w-[50%] h-4 rounded-full bg-[#e5e6e7] justify-between mx-auto mt-2">
            <div className="w-[20%] h-4 bg-[#e5e6e7] rounded-full"></div>
            <div className=" w-[20%] h-4  bg-[#e5e6e7] rounded-full"></div>
            <div className=" w-[20%] h-4 bg-[#000] rounded-full"></div>
          </div>

          <div className=" lg:w-[60%] sm:mx-auto">
            <div className="mx-2 lg:mx-0">
              <h4 className="font-bold text-2xl mt-4">Your orders</h4>
              <p className="mb-4">
                Note: cannot cancel orders once they are shipped
              </p>

              {isLoading ? (
                <div className="w-[100%] flex justify-center">
                  <svg
                    role="status"
                    className="inline w-12 h-12 mx-auto my-auto text-[#df1f98de] animate-spin dark:text-[#df1f98de] fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                <>
                  {orders?.length > 0 ? (
                    orders?.map((order, index) => {
                      return (
                        <OrderCard
                          {...order}
                          isCancelled={isCancelled}
                          setIsCancelled={setIsCancelled}
                        />
                      );
                    })
                  ) : (
                    <div>No orders yet!</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
