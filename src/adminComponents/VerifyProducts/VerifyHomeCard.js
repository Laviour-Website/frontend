import React from "react";
import {  useNavigate } from "react-router-dom";

import {  useDispatch } from "react-redux";

export default function VerifyHomeCard({
  image,
  title,
  description,
  cost,
  id,
  mrp,
}) {
  const navigate = useNavigate();
  const discount = Math.floor(((mrp - cost) / mrp) * 100);

  return (
    <div
      onClick={() => {
        navigate(`/admin/verify/product/${id}`);
      }}
      className="hover:text-[#000] grid grid-cols-1  sm:max-w-[252px] border hover:cursor-pointer grid-rows-20 aspect-[3/5]"
    >
      <img
        className=" w-[100%] object-cover h-[100%] row-start-1 row-end-16  overflow-hidden"
        src={image}
      ></img>

      <div className="ml-2 row-start-16 row-end-21 self-center">
        <div className="flex justify-between">
          <p className="text-lg font-bold tracking-wide text-[#142536]">
            {title}
          </p>
        </div>
        <p className="text-md truncate text-[#5c6874]">{description}</p>
        <div className="flex">
          <p className="text-md font-bold">Rs.{cost} </p>
          <p className="text-md font-medium line-through text-[#a3aab0] ml-2">
            Rs.{mrp}{" "}
          </p>
          {discount > 0 ? (
            <p className="text-[#db1d8f] font-medium ml-2 truncate">
              {discount}% OFF
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
