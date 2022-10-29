import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearCartBackend } from "../features/cart/cartSlice";
import { reset } from "../features/order/orderSlice";
import { reset as resetCoupons } from "../features/coupon/couponSlice";
import Layout from "../userComponents/Layout";
import balloons from "../images/balloons.png";

export default function PaymentSuccess() {
  const { orderId } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!orderId) {
      navigate("/orders");
    }
    return () => {
      if (orderId) {
        dispatch(clearCartBackend());
      }
      dispatch(resetCoupons());
      dispatch(reset());
    };
  }, []);
  return (
    <Layout>
      <hr />
      <div className="flex flex-col justify-center mt-20 w-[100%] items-center">
        <img src={balloons} className="w-20 h-20"></img>
        <p className="text-bold text-xl mx-auto text-center font-bold mt-8">
          YAYYYYY!!!! ORDER SUCCESSFULLY PLACED{" "}
        </p>
        <Link to="/" className="bg-[#000] text-[#fff] py-2 px-8 mt-4">
          Back to shopping
        </Link>
      </div>
    </Layout>
  );
}
