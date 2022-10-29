import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/admin/adminAuthSlice";

const DeliveredCard = (order) => {
  const [transactionID, setTransactionID] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.admin);

  const handleSettle = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      if (transactionAmount == Math.abs(order.owedToSeller)) {
        const response = await axios.post(
          "https://laviour.herokuapp.com/api/admin/settlePayment",
          {
            productId: order.productId,
            orderId: order.orderId,
            userPaidPrice: order.userPaidPrice,
            size: order.size,
            quantity: order.quantity,
            sellerId: order.sellerId._id,
            sellerPayablePrice: order.sellerPayablePrice,
            transactionID,
            transactionAmount,
            transactionDate,
          },
          config
        );
        if (response.data) {
          order.setClicked(!order.clicked);
        }
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
        <p className="text-sm mt-1">
          <span className="font-bold">RETURN DEADLINE: </span>
          {order?.returnDeadline}
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
            ? `-Rs.${Math.abs(order?.owedToSeller)}`
            : `Rs.${order?.owedToSeller}`}
        </p>
        <p>SELLER PAYMENT DETAILS</p>
        <p>{order?.sellerId?.payment}</p>
      </div>

      <div>
        <form onSubmit={handleSettle}>
          <div>
            <label>Transaction ID</label>
            <div>
              <input
                type="text"
                className="border-2 border-black px-1"
                value={transactionID}
                onChange={(e) => {
                  setTransactionID(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <label>Transaction Amount</label>
            <div>
              <input
                type="text"
                className="border-2 border-black px-1"
                value={transactionAmount}
                onChange={(e) => {
                  setTransactionAmount(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <label>Transaction Date</label>
            <div>
              <input
                type="text"
                className="border-2 border-black px-1"
                value={transactionDate}
                onChange={(e) => {
                  setTransactionDate(e.target.value);
                }}
              />
            </div>
          </div>
          <input
            type="submit"
            value="SETTLE"
            className="bg-[#db1d8f] text-white font-bold px-4 py-0.5 mt-2"
          />
        </form>
      </div>
    </div>
  );
};

export default DeliveredCard;
