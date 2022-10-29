import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState } from "react";
import Active from "../components/orders/active";
import Completed from "../components/orders/completed";
import Cancelled from "../components/orders/cancelled";
import { useEffect } from "react";
import SidebarXL from "../components/Sidebar/SidebarXL";
import Barchart from "../components/Barchart";
import Profile from "../components/Dashboard/profile";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../features/sellerOrder/sellerOrderSlice";
import { getProducts } from "../features/product/productSlice";
import { reset as resetProd } from "../features/product/productSlice";
import { reset as resetOrders } from "../features/sellerOrder/sellerOrderSlice";
import { useNavigate } from "react-router-dom";
import { logout, refreshToken } from "../features/auth/authSlice";
import { reset as resetAuth } from "../features/auth/authSlice";
import SellerProtectedRoute from "./SellerProtectedRoute";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { isError: isProductError } = useSelector((state) => state.product);
  const { isError: isOrderError } = useSelector((state) => state.sellerOrder);
  const isRefreshError = useSelector((state) => state.auth.isError);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [order, setOrder] = useState("Active");
  const navigate = useNavigate();

  const { seller } = useSelector((state) => state.auth);

  useEffect(() => {
    try {
      if (seller) {
        dispatch(getProducts());
        dispatch(getOrders());
      }
    } catch (err) {
      console.error(err);
    }
    if (isProductError || isOrderError) {
      dispatch(resetAuth());
      dispatch(refreshToken());
    }
    if (isRefreshError) {
      dispatch(logout());
      dispatch(resetProd());
      dispatch(resetOrders());
      setTimeout(() => {
        navigate("/seller/signin");
      }, 200);
    }
  }, [isProductError, isOrderError, isRefreshError]);

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

  return (
    <SellerProtectedRoute>
      <div className="lg:flex ">
        {seller ? (
          <>
            <SidebarXL isActive="dashboard" />
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
            <div className="lg:ml-[22%] lg:w-[55%] lg:rounded-l-[4%] lg:border-2 md:z-50 lg:bg-white lg:pt-[2%] pl-[1%] h-[100%]">
              <h1 className="text-2xl font-bold ml-4 mt-4">
                Welcome back, {seller?.businessName}
              </h1>
              <Barchart />

              <ul className="flex mt-4 border-b-2 ">
                <li
                  className={`mx-3 text-xl  ${
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
                  className={`mx-2 text-xl font-bold ${
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
                  className={`mx-2 text-xl font-bold ${
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
            <div className="lg:w-[24%] lg:h-[100%] lg:rounded-tl-[6%] lg:z-50 lg:bg-[#000] lg:ml-[76%] fixed">
              <Profile />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </SellerProtectedRoute>
  );
};

export default Dashboard;
