import React, { useState } from "react";
import uniqid from "uniqid";
import Modal from "./modal";
import { MdLocationOn } from "react-icons/md";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const OrderCard = (order) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const addressArray = useSelector((state) => state.address.address.address);
  return (
    <div key={uniqid()} className="w-[100%]  flex border-2 relative my-4">
      <div className="">
        <img
          src={order.productId.cover}
          className="w-64 h-auto object-cover"
          alt="image"
          onClick={() => {
            navigate(`/product/${order.productId._id}`);
          }}
        ></img>
      </div>
      <div className="flex flex-col md:ml-8 ml-2 overflow-hidden">
        <p className="text-xl font-bold">{order.productId.brandName}</p>
        <p className="truncate ">{order.name}</p>
        <p className="truncate ">Order ID - {order.orderId}</p>
        {order?.orderStatus?.type === "ordered" ||
        order?.orderStatus?.type === "packed" ? (
          <div>
            <button className="primaryBtn" onClick={() => setIsOpen(true)}>
              Cancel
            </button>
            {isOpen ? (
              <Modal
                setIsOpen={setIsOpen}
                orderId={order?.orderId}
                name="cancel"
                productId={order.productId._id}
                isCancelled={order.isCancelled}
                setIsCancelled={order.setIsCancelled}
                selectedSize={order?.selectedSize}
              />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}

        {order?.orderStatus?.type === "delivered" &&
        order?.orderStatus?.isReturnWindow ? (
          <div>
            <button
              className="absolute right-2 bg-[#000] text-[#fff] p-2 hover:bg-[#7b7878] "
              onClick={() => setIsOpen(true)}
            >
              Return
            </button>
            {isOpen ? (
              <Modal
                setIsOpen={setIsOpen}
                name="return"
                orderId={order?.orderId}
                productId={order.productId._id}
                isCancelled={order.isCancelled}
                setIsCancelled={order.setIsCancelled}
                selectedSize={order?.selectedSize}
              />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {order ? (
          <div>
            <p>Size: {order.selectedSize}</p>
            <p>Quantity: {order.purchasedQty}</p>
            {addressArray?.map((addr) => {
              if (addr._id === order.addressId) {
                return (
                  <div className="border-1 border-[#424040] p-2">
                    <div className="flex">
                      {" "}
                      <MdLocationOn className="w-6 h-6" />
                      Delivery Address
                    </div>
                    <div className="ml-6 mt-2">
                      <h3 className=" font-semibold">{addr.name}</h3>
                      <p>
                        {addr.address},{addr.localityTown},{addr.cityDistrict},
                        {addr.pincode}
                      </p>
                      <p> Mobile - {addr.mobileNumber}</p>
                    </div>
                  </div>
                );
              }
            })}
            <p className="font-bold">Your order is {order.orderStatus.type}</p>
            <div>
              {order.orderStatus.type === "ordered" && (
                <div>
                  Ordered On -{new Date(order.orderStatus.date).getDate()}/
                  {new Date(order.orderStatus.date).getMonth() + 1}/
                  {new Date(order.orderStatus.date).getFullYear()}
                </div>
              )}
            </div>
            <div>
              {order.orderStatus.type === "packed" && (
                <div>
                  Packed Date -
                  {new Date(order.orderStatus.packedDate).getDate()}/
                  {new Date(order.orderStatus.packedDate).getMonth() + 1}/
                  {new Date(order.orderStatus.packedDate).getFullYear()}
                </div>
              )}
            </div>
            <div>
              {order.orderStatus.type === "shipped" && (
                <div>
                  Shipped Date -
                  {new Date(order.orderStatus.shippedDate).getDate()}/
                  {new Date(order.orderStatus.shippedDate).getMonth() + 1}/
                  {new Date(order.orderStatus.shippedDate).getFullYear()}
                </div>
              )}
            </div>
            <div>
              {order.orderStatus.type === "delivered" && (
                <div>
                  Delivered Date -
                  {new Date(order.orderStatus.deliveredDate).getDate()}/
                  {new Date(order.orderStatus.deliveredDate).getMonth() + 1}/
                  {new Date(order.orderStatus.deliveredDate).getFullYear()}
                </div>
              )}
            </div>
            <div>
              {order.orderStatus.type === "cancelled" && (
                <div>
                  Cancelled Date -
                  {new Date(order.orderStatus.cancelledDate).getDate()}/
                  {new Date(order.orderStatus.cancelledDate).getMonth() + 1}/
                  {new Date(order.orderStatus.cancelledDate).getFullYear()}
                </div>
              )}
            </div>
            <div>
              {order.orderStatus.type === "returning" && (
                <div>
                  Applied for Return on{" "}
                  {new Date(order.orderStatus.returningDate).getDate()}/
                  {new Date(order.orderStatus.returningDate).getMonth() + 1}/
                  {new Date(order.orderStatus.returningDate).getFullYear()}
                </div>
              )}
            </div>
            <div>
              {order.orderStatus.type === "returned" && (
                <div>
                  Return Date -{" "}
                  {new Date(order.orderStatus.returnedDate).getDate()}/
                  {new Date(order.orderStatus.returnedDate).getMonth() + 1}/
                  {new Date(order.orderStatus.returnedDate).getFullYear()}
                </div>
              )}
            </div>
            {order?.orderStatus?.refundStatus ? (
              <div className="font-bold">
                Your refund is {order?.orderStatus?.refundStatus}
              </div>
            ) : (
              <></>
            )}
            {order.orderStatus.type === "shipped" && (
              <div>
                <span>
                  Your tracking link is:{" "}
                  <a
                    href={order.trackingLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="underline text-blue-700 cursor-pointer"
                  >
                    {order.trackingLink}
                  </a>
                </span>
                <p className="text-[#db1d8f] font-bold text-sm">
                  Expected Delivery:{" "}
                  {new Date(
                    new Date(order.orderStatus.date).getTime() +
                      120 * 60 * 60 * 1000
                  ).getDate()}
                  {""}/{""}
                  {new Date(
                    new Date(order.orderStatus.date).getTime() +
                      120 * 60 * 60 * 1000
                  ).getMonth() + 1}
                  {""}/
                  {new Date(
                    new Date(order.orderStatus.date).getTime() +
                      120 * 60 * 60 * 1000
                  ).getFullYear()}
                </p>
              </div>
            )}
            {

            }
            <p>Mode of Payment - {order.paymentType}</p>
            <p>Payment Status - {order.paymentStatus}</p>
            {order.paymentType == "cod" ? (
              <p>Amount to be paid - Rs.{order.userPaidPrice}</p>
            ) : (
              <p>Amount paid - Rs.{order.userPaidPrice}</p>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
