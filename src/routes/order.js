import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
import Active from "../components/orders/active";
import Completed from "../components/orders/completed";
import Cancelled from "../components/orders/cancelled";
import SidebarXL from "../components/Sidebar/SidebarXL";
import Sidebar from "../components/Sidebar/Sidebar";
import { CgProfile } from "react-icons/cg";
import { logout, refreshToken } from "../features/auth/authSlice";
import { reset as resetAuth } from "../features/auth/authSlice";
import { reset as resetProd } from "../features/product/productSlice";
import { getOrders } from "../features/sellerOrder/sellerOrderSlice";
import SellerProtectedRoute from "./SellerProtectedRoute";

function SellerOrders() {
  const dispatch = useDispatch();
  const {  isError: isOrderError } = useSelector(
    (state) => state.sellerOrder
  );
  const isRefreshError = useSelector((state) => state.auth.isError);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [order, setOrder] = useState("Active");

  const { seller } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (seller) dispatch(getOrders());
  }, []);

  const renderTab = () => {
    switch (order) {
      case "Active":
        return <Active />;
      case "Completed":
        return <Completed />;
      case "Cancelled":
        return <Cancelled />;
    }
  };
  useEffect(() => {
    if (isOrderError) {
      dispatch(resetAuth());
      dispatch(refreshToken());
    }

    if (isRefreshError) {
      dispatch(logout());
      dispatch(resetProd());
      setTimeout(() => {
        navigate("/seller/signin");
      }, 200);
    }
  }, [isOrderError, isRefreshError]);
  return (
    <SellerProtectedRoute>
      <div className="lg:flex ">
        <SidebarXL isActive="orders" />
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
          <Sidebar isOpen={isOpen} isActive="dashboard" toggle={toggle} />
        ) : (
          <></>
        )}
        <div className="lg:ml-[22%] lg:w-[80%] lg:rounded-l-[4%] lg:border-2 md:z-50 lg:bg-white lg:pt-[2%] pl-[1%] min-h-[100vh] h-[100%]">
          <ul className="flex mt-4 border-b-2 hover:cursor-pointer  ">
            <li
              className={`mx-3 text-xl hover:cursor-pointer ${
                order === "Active"
                  ? "text-[#000] font-extrabold border-b-4 pb-2 border-[#000]"
                  : "text-[#000] font-bold pb-2"
              }`}
              key="1"
              onClick={() => setOrder("Active")}
            >
              Active
            </li>
            <li
              className={`mx-2 text-xl font-bold hover:cursor-pointer ${
                order === "Completed"
                  ? "text-[#000] font-extrabold border-b-4 pb-2 border-[#000]"
                  : "text-[#000] pb-2 font-bold"
              }`}
              key="2"
              onClick={() => setOrder("Completed")}
            >
              Completed
            </li>
            <li
              className={`mx-2 text-xl font-bold hover:cursor-pointer ${
                order === "Cancelled"
                  ? "text-[#000] font-extrabold border-b-4 pb-2 border-[#000]"
                  : "text-[#000] pb-2 font-bold"
              }`}
              key="3"
              onClick={() => setOrder("Cancelled")}
            >
              Cancelled
            </li>
          </ul>
          {renderTab()}
        </div>
      </div>
    </SellerProtectedRoute>
  );
}

export default SellerOrders;
