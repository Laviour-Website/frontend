import React from "react";
import SidebarXL from "../components/Sidebar/SidebarXL";
import Sidebar from "../components/Sidebar/Sidebar";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import SellerProtectedRoute from "./SellerProtectedRoute";

const Settings = () => {
  const { seller } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SellerProtectedRoute>
      <div className="lg:flex ">
        <SidebarXL isActive="settings" />
        <nav className="lg:hidden bg-[#000] w-full h-20 sticky">
          <div className="h-20 w-full flex lg:flex-none justify-between">
            <FaBars
              onClick={toggle}
              className="lg:hidden w-14 h-14 p-2 mt-2.5 ml-1 text-[#fff]"
            />
            <CgProfile className="w-14 h-14 p-1 mt-2.5 text-[#fff] mr-1" />
          </div>
        </nav>
        {isOpen ? (
          <Sidebar isOpen={isOpen} isActive="settings" toggle={toggle} />
        ) : (
          <></>
        )}
        <div className="lg:ml-[22%] lg:w-[80%] lg:rounded-l-[4%] lg:border-2 md:z-50 lg:bg-white lg:pt-[2%] pl-[1%] min-h-[100vh] h-[100%]">
          <div className="ml-4 mt-4">
            <p className="text-3xl font-extrabold md:ml-56">Settings</p>
            <p className="mt-4 text-xl">
              Business Name - {seller?.businessName}
            </p>
            <p className="text-xl">Email - {seller?.email}</p>
            <p className="text-xl">Mobile Number - {seller?.mobile}</p>
            <p className="text-xl">Username - {seller?.username}</p>
            <p className="text-xl">Payment Details - {seller?.payment}</p>
          </div>
          {console.log(seller)}
        </div>
      </div>
    </SellerProtectedRoute>
  );
};

export default Settings;
