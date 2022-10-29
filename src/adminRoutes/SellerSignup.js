import React, { useEffect, useState } from "react";
import Layout from "./layout";
import axios from "axios";
import SellerSignupCard from "../adminComponents/SellerSignupCard";
import uniqid from "uniqid";
import AdminProtectedRoute from "./AdminProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/admin/adminAuthSlice";

const SellerSignup = () => {
  const [sellers, setSellers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.admin);
  useEffect(() => {
    const fun = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get(
          "https://laviour.herokuapp.com/api/admin/pendingsellers",
          config
        );
        if (response.data) {
          setSellers(response.data);
        }
      } catch (err) {
        dispatch(logout());
        navigate("/admin/signin");
      }
    };
    fun();
  }, [toggle]);
  return (
    <AdminProtectedRoute>
      <Layout name="Verify Sellers">
        <div className="w-full">
          {sellers?.map((data) => {
            return (
              <SellerSignupCard
                {...data}
                key={uniqid()}
                toggle={toggle}
                setToggle={setToggle}
              />
            );
          })}
        </div>
      </Layout>
    </AdminProtectedRoute>
  );
};

export default SellerSignup;
