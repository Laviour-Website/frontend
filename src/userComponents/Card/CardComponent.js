import React from "react";

export default function CardComponent({ image, title, description, cost }) {
  return (
    <div className="text-center border mx-2 h-[100%] my-2 pb-4 ">
      <div>
        <img className=" w-60 h-80 object-cover  " src={image}></img>
      </div>
      <p className="text-lg font-medium ">{title}</p>
      <p className="text-md  ">{description}</p>
      <p className="text-md">Rs. {cost}</p>
      <button className="border-1 border-[#000] bg-[#000] text-[#fff] mt-2  px-12 py-2 hover:bg-[#fff] hover:text-[#000]">
        ADD TO CART
      </button>
    </div>
  );
}
