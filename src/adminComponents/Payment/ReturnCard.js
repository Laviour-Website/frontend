import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/admin/adminAuthSlice";

const ReturnCard = (order) => {
  const [transactionID, setTransactionID] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [paymentNotes, setPaymentNotes] = useState("");
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

      const response = await axios.post(
        "https://laviour.herokuapp.com/api/admin/settleCodReturn",
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
          paymentNotes,
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

  const handleRazorpay = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(
        "https://laviour.herokuapp.com/api/admin/settleRazReturn",
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
          paymentNotes,
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
        <p className="text-sm mt-1">
          <span className="font-bold">PRODUCT ID: </span>
          {order?.productId}
        </p>
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
          <span className="font-bold">USER PAID: </span>
          Rs.{order?.userPaidPrice}
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
      </div>
      <div>
        {order?.paymentType == "cod" && (
          <form onSubmit={handleSettle}>
            <p className="font-bold">COLLECTED FROM SELLER</p>
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
            <div>
              <label>User Payment Notes</label>
              <div>
                <input
                  type="text"
                  className="border-2 border-black px-1"
                  value={paymentNotes}
                  onChange={(e) => {
                    setPaymentNotes(e.target.value);
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
        )}
        {order?.paymentType == "razorpay" && (
          <div>
            <p>Has the refund been completed on Razorpay?</p>
            <button
              className="bg-[#db1d8f] text-white font-bold px-4 py-0.5 mt-2"
              onClick={handleRazorpay}
            >
              REFUND COMPLETE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnCard;
