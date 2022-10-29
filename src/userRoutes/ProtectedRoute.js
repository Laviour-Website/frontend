import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import { logout, userRefreshToken } from "../features/userAuth/userAuthSlice";
import { reset as resetAuth } from "../features/userAuth/userAuthSlice";

export default function ProtectedRoute(props) {
  const dispatch = useDispatch();
  const {
    user,
    isLoading,
    isSuccess,
    isError: isRefreshError,
    message,
  } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      const url = `/signin${
        props.referrer ? `?referrer=${props.referrer}` : ""
      }`;
      navigate(url);
    }
  }, [user]);
  useEffect(() => {
    if (user && isRefreshError) {
      dispatch(logout());
      setTimeout(() => {
        navigate("/signin");
      }, 200);
    }
  }, [isRefreshError]);
  return <div>{props.children}</div>;
}
