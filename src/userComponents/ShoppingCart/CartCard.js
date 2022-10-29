import React, { useState } from "react";
import { TbCurrencyRupee } from "react-icons/tb";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  qtyChange,
  qtyUpdateNotLoggedIn,
  remove,
  removeNotLoggedIn,
} from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartCard({
  cover,
  brandName,
  name,
  size,
  quantity,
  price,
  product,
  sellingPrice,
  MRP,
}) {
  const { user } = useSelector((state) => state.userAuth);
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveItem = () => {
    if (user) {
      dispatch(remove({ id: product, userId: user._id, size }));
    } else {
      dispatch(removeNotLoggedIn({ id: product, size }));
    }
  };

  

  const handleQtyChange = () => {
    if (user) {
      dispatch(qtyChange({ product, id: user._id, qty, size }));
    } else {
      dispatch(qtyUpdateNotLoggedIn({ product, qty, size }));
    }
  };

  const discount = Math.floor(((MRP - price) / MRP) * 100);
  return (
    <div className="w-[95%] border-1 mx-auto my-4 flex justify-between">
      <div className="flex w-[100%] relative">
        <div className="w-[30%] min-w-[80px] sm:w-[24%] h-40 flex items-center ">
          <img
            className=" h-36   ml-4 object-cover hover:cursor-pointer"
            onClick={() => {
              navigate(`/product/${product}`);
            }}
            src={cover}
          ></img>
        </div>
        <div className="my-2 mx-4 w-[76%] flex flex-col justify-around hover:cursor-pointer">
          <div
            onClick={() => {
              navigate(`/product/${product}`);
            }}
          >
            <h3 className="text-xl font-bold ">{brandName}</h3>
            <p className="text-[#5c6874]">{name}</p>
          </div>
          <div className="flex flex-col xs:flex-row xs:items-center xs:text-lg text-sm ">
            <p className="">
              <span className="font-bold">Size:</span> {size}
            </p>
            <p className="xs:ml-2 sm:ml-4  ">
              <span className="font-bold">Qty:</span>
              <button
                className={`px-1 text-center  sm:px-2 border-1 mx-2 bg-gray-100 ${
                  qty === 1 ? "text-gray-300 border-none" : ""
                }`}
                disabled={qty == 1}
                onClick={() => {
                  setQty(qty - 1);
                }}
              >
                -
              </button>
              {qty}
              <button
                className=" px-1  sm:px-2 border-1 mx-2 bg-gray-100 "
                onClick={() => {
                  setQty(qty + 1);
                }}
              >
                +
              </button>
              {quantity != qty ? (
                <button
                  onClick={handleQtyChange}
                  className="bg-[#db1d8f] py-1 px-3 text-[#fff]"
                >
                  UPDATE
                </button>
              ) : (
                <></>
              )}
            </p>
          </div>
          <div className="flex text-sm xs:text-lg items-center  mt-1">
            <p className="flex items-center mr-1">
              <TbCurrencyRupee /> {price}
            </p>
            <p className="line-through flex items-center mx-1">
              <TbCurrencyRupee />
              {MRP}
            </p>
            <p className="text-[#db1d8f] text-xs xs:text-sm mx-1 w-16">
              {discount}% OFF
            </p>
          </div>
          <div className="absolute top-0 right-0">
            <button
              className="flex items-center text-[#000]  p-2"
              onClick={handleRemoveItem}
            >
              <RiDeleteBin6Fill className="mr-2 w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
