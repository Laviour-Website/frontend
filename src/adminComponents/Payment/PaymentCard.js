import React, { useState } from "react";
import { MdOutlinePayments } from "react-icons/md";
import DeliveredCard from "./DeliveredCard";
import ReturnCard from "./ReturnCard";
import CancelledCard from "./CancelledCard";

const PaymentCard = (order) => {

  return (
    <div className="sm:w-[60%] border-1 p-2 mt-2 mx-auto">
      <div
        className={`flex justify-between p-1 ${
          order.type == "delivered" ? "bg-green-600" : ""
        }${order.type == "cancelled" ? "bg-red-600" : ""}${
          order.type == "return" ? "bg-blue-600" : ""
        }`}
      >
        <MdOutlinePayments className="mr-2" />{" "}
      </div>
      {order.type == "delivered" && <DeliveredCard {...order} />}
      {order.type == "return" && <ReturnCard {...order} />}
      {order.type == "cancelled" && <CancelledCard {...order} />}
    </div>
  );
};

export default PaymentCard;
