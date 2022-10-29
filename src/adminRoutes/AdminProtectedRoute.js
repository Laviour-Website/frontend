import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminProtectedRoute(props) {
  const { admin, accessToken } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin || !accessToken) {
      const url = `/admin/signin`;
      navigate(url);
    }
  }, [admin, accessToken]);
  return <div>{props.children}</div>;
}
