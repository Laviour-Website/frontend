import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDoneOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/admin/adminAuthSlice";

export default function ChangePriceCard({
  image,
  title,
  cost,
  id,
  sellerprice,
  mrp,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [newPrice, setNewPrice] = useState(cost);

  const { accessToken } = useSelector((state) => state.admin);

  const handlePriceChange = async () => {
    try {
      if (newPrice != cost) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await axios.put(
          `https://laviour.herokuapp.com/api/product/changePrice/${id}`,
          { newPrice },
          config
        );
        if (response.data?.message == "priceupdated") {
          setEdit(false);
          cost = newPrice;
          navigate("/admin/changeprice");
        }
      } else {
        setEdit(false);
      }
    } catch (err) {
      dispatch(logout());
      navigate("/admin/signin");
    }
  };

  return (
    <div className="hover:text-[#000] grid grid-cols-1  sm:max-w-[252px] border hover:cursor-pointer grid-rows-20 aspect-[3/5]">
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
        <div className="">
          {edit ? (
            <div className="flex ">
              <label for="newPrice text-sm font-bold ">New Price -</label>
              <input
                className="w-[40%] ml-2 px-1 border-black border-2"
                type="number"
                id="newPrice"
                name="newPrice"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <button
                onClick={handlePriceChange}
                className="ml-4 bg-gray-200 px-2 "
              >
                <MdOutlineDoneOutline />
              </button>
            </div>
          ) : (
            <p className="text-md font-bold flex items-center">
              Selling Price: Rs.{newPrice}{" "}
              <button
                onClick={() => {
                  setEdit(true);
                }}
                className="ml-2 bg-gray-200 p-1 "
              >
                <TbEdit />{" "}
              </button>
            </p>
          )}
          <p className="text-md font-bold">Seller - Rs.{sellerprice} </p>
          <p className="text-md font-bold">MRP - Rs.{mrp} </p>
        </div>
      </div>
    </div>
  );
}
