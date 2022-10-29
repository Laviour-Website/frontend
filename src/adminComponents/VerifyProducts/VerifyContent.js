import React, { useEffect, useState } from "react";
import { TbCurrencyRupee } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import uniqid from "uniqid";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/admin/adminAuthSlice";

const VerifyContent = ({
  brandName,
  name,
  description,
  countInStock,
  color,
  sellingPrice,
  gender,
  sizeChart,
  soldBy,
  MRP,
  _id,
  category,
  subcategory,
  isApproved,
}) => {
  const { accessToken } = useSelector((state) => state.admin);
  const discount = Math.floor(((MRP - sellingPrice) / MRP) * 100);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isApproved) {
      navigate("/admin/verifyproducts");
    }
  }, isApproved);
  const [isApprove, setIsApprove] = useState(false);

  const handleApprove = async () => {
    setIsApprove(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `https://laviour.herokuapp.com/api/products/verifyOne/${_id}`,
        config
      );

      if (response.data == "verified") {
        isApproved = true;
        navigate("/admin/verifyproducts");
      }
      setIsApprove(false);
    } catch (err) {
      dispatch(logout());
      navigate("/admin/signin");
    }
  };

  return (
    <div className="sm:mt-4 sm:w-[50%] sm:mx-auto mx-4 mb-20 ">
      <h2 className="text-3xl md:text-4xl font-bold">{brandName}</h2>
      <h3 className="tracking-wider text-[#5c6874]">{name}</h3>
      <div className="flex items-end">
        <p className="text-xl mt-4 flex items-center font-semibold">
          Seller's Earning -
          <TbCurrencyRupee className="w-6 h-6 font-bold " />
          {sellingPrice}{" "}
        </p>
        <p className="text-md mb-px font-bold ml-1 text-[#db1d8f]">
          {discount}% OFF
        </p>
      </div>

      <p className="flex text-md text-xl font-semibold">
        Claimed MRP -{" "}
        <span className="flex items-center ml-1 mr-1">
          {" "}
          {<TbCurrencyRupee />}
          {MRP}
        </span>
      </p>
      <p>Category - {category}</p>
      <p>Subcategory - {subcategory}</p>
      <p>Description - {description}</p>
      <p>Color - {color}</p>
      <p>Gender - {gender}</p>
      <h3 className="mt-4 font-bold text-lg">Seller Details - </h3>
      <p>Business Name - {soldBy.businessName}</p>
      <p>IG username - {soldBy.username}</p>
      <p>Email - {soldBy.email}</p>
      <p>Mobile - {soldBy.mobile}</p>

      <h3 className="mt-4 font-bold text-lg">Size Chart - </h3>
      <img src={sizeChart} alt="size chart" className="w-[100%] h-auto" />

      <p>AVAILABLE SIZES</p>
      <div>
        {countInStock?.map((item) => {
          return (
            <p key={uniqid()}>
              {item.size} - {item.qty}
            </p>
          );
        })}
      </div>

      <h3 className="mt-4 font-bold text-lg mb-2">
        Note - If you approve this product then it will go live{" "}
      </h3>
      {isApprove ? (
        <button
          onClick={handleApprove}
          className="p-2 w-24 bg-green-700 text-white font-extrabold"
        >
          ...
        </button>
      ) : (
        <button
          onClick={handleApprove}
          className="p-2 bg-green-700 text-white font-bold"
        >
          APPROVE
        </button>
      )}
    </div>
  );
};

export default VerifyContent;
