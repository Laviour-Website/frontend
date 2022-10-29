import React from "react";
import { useNavigate } from "react-router-dom";
import { addSingleOrder } from "../../features/admin/singleOrderSlice";
import { useDispatch } from "react-redux";

export default function TrackHomeCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(addSingleOrder(props));
        setTimeout(() => {
          navigate(`/admin/trackSingleOrder`);
        }, 200);
      }}
      className="hover:text-[#000] grid grid-cols-1  sm:max-w-[252px] border hover:cursor-pointer grid-rows-20 aspect-[4/8]"
    >
      <img
        className=" w-[100%] object-cover h-[100%] row-start-1 row-end-16  overflow-hidden"
        src={props.cover}
      ></img>

      <div className="ml-2 row-start-16 row-end-21 self-center">
        <div className="flex justify-start items-center">
          <p className="text-md truncate text-[#5c6874]">
            <span className="text-lg font-bold tracking-wide text-[#142536] mr-4">
              {props.brandname}
            </span>
            {props.name}
          </p>
        </div>
        <hr />
        <p className="text-md truncate text-[#5c6874]">
          Order no:{props.orderId}
        </p>
        <p className="text-md truncate text-[#5c6874]">
          Cust Name: {props.firstName + props.lastName}
        </p>
        <p className="text-md truncate text-[#5c6874]">
          Seller username: {props.sellerUsername}
        </p>
        <p className="text-md truncate text-[#df1f98de]">
          order status: {props.orderStatus.type}
        </p>
      </div>
    </div>
  );
}
