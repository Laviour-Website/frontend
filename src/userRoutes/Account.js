import React, { useEffect } from "react";
import Layout from "../userComponents/Layout";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import { useContext } from "react";
import SidebarContext from "../context/SidebarContext";

export default function Account() {
  const dispatch = useDispatch();
  let { user, isError: isRefreshError } = useSelector(
    (state) => state.userAuth
  );

  let { sidebarOpen } = useContext(SidebarContext);
  return (
    <ProtectedRoute referrer="/account">
      {user ? (
        <Layout>
          <hr />
          <div className={`${sidebarOpen ? "hidden w-[90%]" : "w-full mt-4"}`}>
            <h2 className="text-3xl text-center font-bold mb-4">
              Welcome, {user.firstName}
            </h2>
            <div className="flex w-[60%] sm:w-[50%] justify-between mx-auto text-xs sm:text-lg ">
              <Link to="/account" className="font-bold mx-1">
                ACCOUNT
              </Link>
              <Link to="/address" className="font-bold mx-1">
                ADDRESS
              </Link>
              <Link to="/orders" className="font-bold mx-1">
                ORDERS
              </Link>
            </div>
            <div className="flex w-[60%] sm:w-[50%] h-4 rounded-full bg-[#e5e6e7] justify-between mx-auto mt-2">
              <div className="w-[30%] sm:w-[20%] h-4 bg-[#000] rounded-full"></div>
              <div className=" w-[20%] h-4 bg-[#e5e6e7] rounded-full"></div>
              <div className=" w-[20%]  h-4 bg-[#e5e6e7] rounded-full"></div>
            </div>

            <div className="text-center">
              <h2 className=" mt-12 text-2xl font-bold">PERSONAL INFO</h2>
              <p>You can manage your account here!</p>
            </div>
            <div className="w-[50%] mx-auto  ">
              <div>
                <p className="mt-4 font-bold">EMAIL</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="mt-2 font-bold">FIRST NAME</p>
                <p>{user.firstName}</p>
              </div>
              <div>
                <p className="mt-2 font-bold">LAST NAME</p>
                <p>{user.lastName}</p>
              </div>
              <div>
                <p className="mt-2 font-bold">MOBILE NUMBER</p>
                <p>+91 {user.phno}</p>
              </div>
              <Link to="/account/edit">
                <button className="text-center  bg-[#000] py-2 px-28 mt-2 text-[#fff]">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </Layout>
      ) : (
        <></>
      )}
    </ProtectedRoute>
  );
}
