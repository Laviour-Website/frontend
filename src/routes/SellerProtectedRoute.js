import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SellerProtectedRoute = (props) => {
  const { seller } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!seller) {
      const url = `/seller/signin`;
      navigate(url);
    }
  }, [seller]);
  return <div>{props.children}</div>;
};

export default SellerProtectedRoute;
