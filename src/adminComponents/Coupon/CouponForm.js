import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/admin/adminAuthSlice";

const CouponForm = ({ create, setCreate }) => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    discountPrice: 0,
    isFirstOrder: 0,
    minOrderValue: 0,
    minQuantity: 1,
    visible: 0,
  });
  const {
    name,
    description,
    discountPrice,
    isFirstOrder,
    minOrderValue,
    minQuantity,
    code,
    visible,
  } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !discountPrice || !code) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.post(
        "https://laviour.herokuapp.com/api/coupon/create",
        formData,
        config
      );
      if (response.data) {
        setCreate(false);
      }
    } catch (err) {
      dispatch(logout());
      navigate("/admin/signin");
    }
  };
  const navigate = useNavigate();
  return (
    <div className="w-[50%] mx-auto">
      <form onSubmit={onSubmit}>
        <label for="name" className="mt-2 font-bold">
          Coupon Name
        </label>
        <input
          className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={onChange}
          required
        />
        <label for="code" className="mt-2 font-bold">
          Coupon Code
        </label>
        <input
          className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
          type="text"
          id="code"
          name="code"
          placeholder="Coupon Code"
          value={code}
          onChange={onChange}
          required
        />
        <label for="description" className="mt-2 font-bold">
          Description of the coupon
        </label>
        <input
          className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={description}
          onChange={onChange}
          required
        />
        <label for="isFirstOrder" className="mt-2 font-bold">
          Will this coupon be valid only for first order of every user? (Write 1
          for Yes and 0 for No)
        </label>
        <input
          className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
          type="number"
          id="isFirstOrder"
          name="isFirstOrder"
          placeholder="First Order?"
          value={isFirstOrder}
          onChange={onChange}
          min="0"
          max="1"
          required
        />
        <label for="discountPrice" className="mt-2 font-bold">
          Discount Price that this coupon will give
        </label>
        <input
          className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
          type="number"
          id="discountPrice"
          name="discountPrice"
          placeholder="Discount"
          value={discountPrice}
          onChange={onChange}
          required
        />
        <label for="minQuantity" className="mt-2 font-bold">
          Min number of products that a user has to buy to be eligible for this
          coupon -
        </label>
        <input
          className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
          type="number"
          id="minQuantity"
          name="minQuantity"
          placeholder="Minimum number of products"
          value={minQuantity}
          onChange={onChange}
          required
        />
        <label for="minOrderValue" className="mt-2 font-bold">
          Min cart value that user needs to be eligible for this coupon -
        </label>
        <input
          className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
          type="number"
          id="minOrderValue"
          name="minOrderValue"
          placeholder="Minimum order value"
          value={minOrderValue}
          onChange={onChange}
          required
        />
        <label for="visible" className="mt-2 font-bold">
          Will this coupon be visible to users? (Write 1 for Yes and 0 for No)
        </label>
        <input
          className="form-input px-4 py-2 rounded-xl border-2 w-[100%] focus:outline-black"
          type="number"
          id="visible"
          name="visible"
          placeholder="Visible?"
          value={visible}
          onChange={onChange}
          required
        />

        <input
          type="submit"
          className="bg-[#db1d8f] py-2 px-4 mt-4 text-white font-bold"
        />
      </form>
    </div>
  );
};

export default CouponForm;
