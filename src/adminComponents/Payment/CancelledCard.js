import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/admin/adminAuthSlice";

const CancelledCard = (order) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.admin);

  const handleSettle = async (e) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(
        "https://laviour.herokuapp.com/api/admin/settleCancel",
        {
          productId: order.productId,
          orderId: order.orderId,
          userPaidPrice: order.userPaidPrice,
          size: order.size,
          quantity: order.quantity,
          sellerId: order.sellerId._id,
          sellerPayablePrice: order.sellerPayablePrice,
        },
        config
      );
      if (response.data) {
        order.setClicked(!order.clicked);
      }
    } catch (err) {
      dispatch(logout());
      navigate("/admin/signin");
    }
  };

  return (
    <div className="flex justify-between ">
      <div>
        <p className="text-sm mt-1">
          <span className="font-bold">ORDER ID: </span>
          {order?.orderId}
        </p>
        <div className="flex items-center">
          <p className="text-sm mt-1">
            <span className="font-bold">BUSINESS NAME: </span>
            {order?.sellerId?.businessName}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-sm mt-1">
            <span className="font-bold">SELLER ID: </span>
            {order?.sellerId?._id}
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-sm mt-1">
            <span className="font-bold">SELLER USERNAME: </span>
            {order?.sellerId?.username}
          </p>
        </div>
        <p className="text-sm mt-1">
          <span className="font-bold">PRODUCT ID: </span>
          {order?.productId}
        </p>
        <p className="text-sm mt-1">
          <span className="font-bold">USER PAID: </span>
          Rs.{order?.userPaidPrice}
        </p>
        <p className="text-sm mt-1">
          <span className="font-bold">SELLER PAYABLE: </span>
          Rs.{order?.sellerPayablePrice}
        </p>
        <p className="text-sm mt-1">
          <span className="font-bold">MODE OF PAYMENT: </span>
          {order?.paymentType}
        </p>
        {order?.paymentType == "razorpay" && (
          <div className="mt-2">
            <p className="underline">RAZORPAY DETAILS</p>

            <p>
              <span className="font-bold">Payment ID -</span>{" "}
              {order?.razorpayPayment?.id}
            </p>
            <p>
              <span className="font-bold">Razorpay Order ID -</span>{" "}
              {order?.razorpayPayment?.order_id}
            </p>
          </div>
        )}

        <p className="text-sm mt-4">
          <span className="font-bold">OWED TO/BY SELLER: </span>
          {order?.owedToSeller < 0
            ? `-Rs.${order?.owedToSeller}`
            : `Rs.${order?.owedToSeller}`}
        </p>
      </div>
      <div>
        <p>If COD then just settle</p>
        <p>If RAZORPAY then settle after refund is finished</p>
        <button
          onClick={handleSettle}
          className="bg-[#db1d8f] text-white font-bold px-4 py-0.5 mt-2"
        >
          SETTLE
        </button>
      </div>
    </div>
  );
};

export default CancelledCard;
