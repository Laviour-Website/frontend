import React, { useState, useEffect } from "react";
import SidebarXL from "../components/Sidebar/SidebarXL";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Card from "../components/Product/card";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, reset } from "../features/product/productSlice";
import { logout, refreshToken } from "../features/auth/authSlice";
import { reset as resetAuth } from "../features/auth/authSlice";
import { reset as resetProd } from "../features/product/productSlice";

import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";
import SellerProtectedRoute from "./SellerProtectedRoute";

export default function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const {
    isError: isProductError,
    isLoading,
    products,
    message,
  } = useSelector((state) => state.product);
  const isRefreshError = useSelector((state) => state.auth.isError);
  const { seller } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!seller) {
      navigate("/seller/signin");
    } else {
      dispatch(getProducts());
    }
    if (isProductError) {
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

    return () => {
      dispatch(reset());
    };
  }, [seller, navigate, isProductError, isRefreshError, message, dispatch]);

  return (
    <SellerProtectedRoute>
      <div className="lg:flex ">
        <SidebarXL isActive="products" />
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
          <Sidebar isOpen={isOpen} isActive="products" toggle={toggle} />
        ) : (
          <></>
        )}
        <div className=" w-[100%] lg:ml-[25%] lg:w-[75%]  ">
          <div className="h-12 flex justify-end mr-12 mt-12">
            <Link to="/seller/products/add">
              <button className="bg-[#dd00ae] rounded-full py-2 pl-4 pr-3 font-extrabold text-lg text-white ">
                Add New Product
              </button>
            </Link>
          </div>

          <div className=" flex  flex-wrap  justify-center ">
            {isLoading ? (
              <svg
                role="status"
                className="inline w-12 h-12 mx-auto my-auto text-[#df1f98de] animate-spin dark:text-[#df1f98de] fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              products.map((product) => {
                return (
                  <Card
                    imgSrc={product.cover}
                    brand={product.brandName}
                    name={product.name}
                    price={product.price}
                    productId={product._id}
                    isApproved={product.isApproved}
                    key={uniqid()}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </SellerProtectedRoute>
  );
}
