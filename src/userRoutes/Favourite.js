import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../userComponents/Layout";
import FavouriteCard from "../userComponents/Favourite/FavouriteCard";
import uniqid from "uniqid";
import { logout, userRefreshToken } from "../features/userAuth/userAuthSlice";
import { reset as resetAuth } from "../features/userAuth/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import SidebarContext from "../context/SidebarContext";

export default function Favourite() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favourite, isError: isFavError } = useSelector(
    (state) => state.favourite
  );
  const { user, isError: isRefreshError } = useSelector(
    (state) => state.userAuth
  );
  useEffect(() => {
    if (user && isFavError) {
      dispatch(resetAuth());
      dispatch(userRefreshToken());
    }
    if (user && isRefreshError) {
      dispatch(logout());
      setTimeout(() => {
        navigate("/signin");
      }, 200);
    }
  }, [isFavError, isRefreshError]);
  let { sidebarOpen } = useContext(SidebarContext);
  return (
    <Layout>
      <div className={`${sidebarOpen ? "hidden w-[90%]" : ""}`}>
        <hr />
        <h2>{Favourite}</h2>
        <div className="w-full">
          <div className="flex w-[90%] mx-[auto] justify-start content-start flex-wrap">
            {favourite?.favouriteItems?.length > 0 ? (
              favourite?.favouriteItems?.map((product, index) => {
                return (
                  <FavouriteCard
                    key={uniqid()}
                    id={product.product}
                    cover={product.cover}
                    brandName={product.brandName}
                    name={product.name}
                    price={product.price}
                    soldBy={product.soldBy}
                    mrp={product.mrp}
                  />
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-between w-[100%]">
                <p className="mt-20 text-xl"> You have no Favourites :( </p>
                <button
                  className="bg-black text-white font-bold px-2 mt-2 py-1"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Let's Go Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
