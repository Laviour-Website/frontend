import React, { useState } from "react";
import axios from "axios";
import AdminProtectedRoute from "../adminRoutes/AdminProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/admin/adminAuthSlice";

const SellerSignupCard = ({
  name,
  businessName,
  username,
  email,
  mobile,
  address,
  payment,
  _id,
  toggle,
  setToggle,
  description,
}) => {
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleApprove = async () => {
    setApproveLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `https://laviour.herokuapp.com/api/admin/approveseller/${_id}`,
        config
      );
      if (response) {
        setTimeout(() => {
          setToggle(!toggle);
          setApproveLoading(false);
        }, 500);
      }
    } catch (err) {
      dispatch(logout());
      navigate("/admin/signin");
    }
  };
  const handleReject = async () => {
    setRejectLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `https://laviour.herokuapp.com/api/admin/rejectseller/${_id}`,
        config
      );
      setToggle(!toggle);
      setTimeout(() => {
        setToggle(!toggle);
        setRejectLoading(false);
      }, 500);
    } catch (err) {
      dispatch(logout());
      navigate("/admin/signin");
    }
  };
  return (
    <AdminProtectedRoute>
      <div className="w-[50%] bg-gray-200 mx-auto my-4 p-4 flex justify-between">
        <div>
          <p className="text-lg font-bold">Details - </p>

          <p>Person's Name - {name}</p>
          <p>Business Name - {businessName}</p>
          <p>Username - {username}</p>
          <p>Description - {description}</p>
          <p>Email - {email}</p>
          <p>Phone number - {mobile}</p>
        </div>
        <div>
          <p className="text-lg font-bold">Address - </p>
          <p>{address.address}</p>
          <p>{address.localityTown}</p>
          <p>PINCODE - {address.pincode}</p>
          <p>{address.cityDistrict}</p>
        </div>
        <div className="w-[25%]">
          <p className="text-lg font-bold">PAYMENT DETAILS</p>
          <p className="w-25%">{payment}</p>
        </div>
        <div>
          {approveLoading ? (
            <button className="block bg-green-600 p-2 my-2 text-white font-bold">
              ...
            </button>
          ) : (
            <button
              onClick={handleApprove}
              className="block bg-green-600 p-2 my-2 text-white font-bold"
            >
              ACCEPT
            </button>
          )}
          {rejectLoading ? (
            <button className="block bg-red-600 p-2 text-white font-bold">
              ...
            </button>
          ) : (
            <button
              onClick={handleReject}
              className="block bg-red-600 p-2 text-white font-bold"
            >
              REJECT
            </button>
          )}
        </div>
      </div>
    </AdminProtectedRoute>
  );
};

export default SellerSignupCard;
