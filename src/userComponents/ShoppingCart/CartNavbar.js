import { Link } from "react-router-dom";
import { BsPerson, BsSuitHeart, BsHandbag } from "react-icons/bs";
import logo from "../../images/laviour_logo.jpeg";
import { useState } from "react";
import { useSelector } from "react-redux";
import CartPop from "../NavComponents/cartPop";
import SigninPop from "../NavComponents/signinPop";
import Category from "../NavComponents/category";
function CartNavbar({ current }) {
  const [signinHover, setSigninHover] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.userAuth
  );
  return (
    <div className="w-full">
      <nav className="bg-[#fff] font-[Lato] font-medium text-sm tracking-wide relative mt-3">
        <div className="flex  content-center pt-2 mb-4">
          <div className="hidden md:block md:ml-4 ">
            <Link to="/">
              <img src={logo} className="w-48 h-12"></img>
            </Link>
          </div>
          <div className="flex justify-evenly lg:justify-between items-center  lg:mx-auto w-[100%] md:w-[80%] lg:w-auto">
            <p
              className={`font-bold text-md flex items-center ${
                current === "bag" ? "text-[#000]" : "text-[#999]"
              }`}
            >
              <div
                className={` ${
                  current === "bag" ? "bg-[#000]" : "bg-[#999]"
                } text-[#fff]  px-[0.75rem] py-1.5 rounded-full mr-2`}
              >
                1
              </div>
              BAG
              {/* <span className="text-[#999] sm:hidden">------</span> */}
              <span className="hidden md:text-[#999] lg:block">
                --------------
              </span>
            </p>
            <p
              className={`font-bold text-md flex items-center ${
                current === "address" ? "text-[#000]" : "text-[#999]"
              }`}
            >
              <span
                className={`${
                  current === "address" ? "bg-[#000]" : "bg-[#999]"
                }  text-[#fff]  px-[0.75rem] py-1.5 rounded-full mr-2`}
              >
                2
              </span>
              ADDRESS
              {/* <span className="text-[#999] sm:hidden">------</span> */}
              <span className="hidden md:text-[#999] lg:block">
                --------------
              </span>
            </p>
            <p
              className={`font-bold text-md flex items-center ${
                current === "payment" ? "text-[#000]" : "text-[#999]"
              }`}
            >
              <span
                className={`${
                  current === "payment" ? "bg-[#000]" : "bg-[#999]"
                } text-[#fff]  px-[0.75rem] py-1.5 rounded-full mr-2`}
              >
                3
              </span>
              PAYMENT
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default CartNavbar;
