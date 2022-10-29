import { useSelector, useDispatch } from "react-redux";
import CartNavbar from "../userComponents/ShoppingCart/CartNavbar";
import CartCard from "../userComponents/ShoppingCart/CartCard";
import PriceContent from "../userComponents/ShoppingCart/PriceContent";
import bag from "../images/bag.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout, userRefreshToken } from "../features/userAuth/userAuthSlice";
import { reset as resetAuth } from "../features/userAuth/userAuthSlice";

import { useContext } from "react";
import SidebarContext from "../context/SidebarContext";

function Cart() {
  const { cart, isError: isCartError } = useSelector((state) => {
    return state.cart;
  });
  const { user, isError: isRefreshError } = useSelector(
    (state) => state.userAuth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && isCartError) {
      dispatch(resetAuth());
      dispatch(userRefreshToken());
    }
    if (user && isRefreshError) {
      dispatch(logout());
      setTimeout(() => {
        navigate("/signin");
      }, 200);
    }
  }, [isCartError, isRefreshError]);

  let { sidebarOpen } = useContext(SidebarContext);

  return (
    <div className={`${sidebarOpen ? "hidden w-[90%]" : "w-full"}`}>
      <CartNavbar current="bag" />
      <hr />
      {cart?.cartItems?.length > 0 ? (
        <div className="md:flex items-start justify-center">
          <div className="lg:w-[40%] md:mr-4">
            <div className="text-2xl font-extrabold mt-8 ml-12">
              {" "}
              Shopping Bag
            </div>
            {cart?.cartItems.map((prod, index) => {
              return (
                <CartCard {...prod} key={Math.floor(Math.random() * 10000)} />
              );
            })}
          </div>

          <PriceContent buttonTo="/checkout/address" button=" PLACE ORDER" />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[500px]">
          <img className="w-32 h-32" src={bag}></img>
          {/* <p className="mt-2">Your bag is empty!</p> */}
          <button
            className="border-2 border-[#db1d8f] text-[#db1d8f] font-bold ml-4  mt-8 py-2 px-2 flex items-center"
            onClick={() => {
              navigate("/favourite");
            }}
          >
            ADD ITEMS FROM FAVOURITES
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
