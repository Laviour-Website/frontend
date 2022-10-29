import {  useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cancelled() {
  const { orders } = useSelector((state) => state.sellerOrder);
  const { products } = useSelector((state) => state.product);
  const navigate = useNavigate();

  const orderComponents = orders
    ?.filter((order, index) => {
      if (
        order?.orderStatus?.type === "cancelled" ||
        order?.orderStatus?.type === "returned"
      ) {
        return true;
      } else {
        return false;
      }
    })
    .map((order, index) => {
      const singleProduct = products?.filter((obj) => {
        if (obj?._id == order?.productId) {
          return true;
        } else {
          return false;
        }
      });
      return (
        <div
          key={index}
          className="w-[100%]  h-48 md:h-36 flex border-1 relative hover:cursor-pointer"
          onClick={() => {
            navigate(
              `/seller/orderproduct?orderId=${order?.orderId}&productId=${order?.productId}&selectedSize=${order?.selectedSize}`
            );
          }}
        >
          <div className="w-32 h-32">
            <img
              className="w-24 h-32  object-contain"
              src={singleProduct[0]?.cover}
              alt="Product"
            ></img>
          </div>
          <div className="ml-8 w-[100%]">
            <div className="flex justify-between">
              <p className="text-xl font-bold">{singleProduct[0]?.brandName}</p>
              <p
                className={`mr-2 font-bold ${
                  order?.orderStatus?.type === "packed"
                    ? "text-green-500"
                    : "text-[#000]"
                } `}
              >
                Status: {order?.orderStatus?.type}
              </p>
            </div>
            <p>{singleProduct[0]?.name}</p>
            <p>Selected Size: {order?.selectedSize}</p>
            <p>Quantity: {order?.quantity}</p>
            <div className="flex justify-between w-[100%]">
              <p className="text-[#db1d8f] font-bold ">
                Total Earnings:{" "}
                <span className="">
                  {singleProduct[0]?.price * order?.quantity}
                </span>
              </p>
              
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className=" mt-0 lg:w-[80%] min-h-[400px]">
      {orders?.length > 0 ? (
        <ul className="pt-2 ">{orderComponents}</ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Cancelled;
