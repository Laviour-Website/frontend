import { Link, useNavigate } from "react-router-dom";
import { BsPerson, BsSuitHeart, BsHandbag } from "react-icons/bs";
import logo from "../../images/laviour_logo.jpeg";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CartPop from "../NavComponents/cartPop";
import SigninPop from "../NavComponents/signinPop";
import Category from "../NavComponents/category";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiArrowLeft } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import Sidebar from "../NavComponents/sidebar";
import SidebarContext from "../../context/SidebarContext";

function Navbar() {
  const [searchClick, setSearchClick] = useState(false); //for mobile view
  const [signinHover, setSigninHover] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const { user } = useSelector((state) => state.userAuth);
  const [searchText, setSearchText] = useState("");
  const [autoComplete, setAutoComplete] = useState([]);

  const { cart } = useSelector((state) => state.cart);
  const { setSidebarOpen, sidebarOpen } = useContext(SidebarContext);
  const toggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (searchText.length > 0) {
      try {
        const fun = async () => {
          let URL = `https://laviour.herokuapp.com/api/autocomplete?searchTerm=${searchText}`;
          const response = await axios.get(URL);
          setAutoComplete(response.data);
          console.log(autoComplete);
        };
        fun();
      } catch (err) {}
    } else {
      setAutoComplete([]);
    }
  }, [searchText]);

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/search/${searchText}`);
  };

  return (
    <div className=" sticky top-0 z-40">
      <nav className="bg-[#fff] relative font-[Lato] font-medium text-sm tracking-wide pt-4 hidden lg:block w-full">
        <div className="flex justify-between content-center pt-2 pb-3 ">
          <div className="flex justify-center ">
            <Link to="/" className="w-48">
              <img src={logo} className="w-48 h-12 ml-4"></img>
            </Link>
          </div>
          <Category />

          <div className="flex justify-center relative ">
            <div className="relative min-w-[200px] xl:min-w-[275px] 2xl:min-w-[350px] mb-3">
              <form className="flex items-center " onSubmit={handleSearch}>
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-[#fff] border-1 border-gray-500 text-gray-900 text-sm rounded-full  block w-full pl-10 p-2.5 focus:outline-[#db1d8f]"
                  placeholder="Search"
                  autoComplete="off"
                  required
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    if (e.key === "Enter") {
                      navigate(`/search/${searchText}`);
                      setSearchText("");
                      setAutoComplete([]);
                    }
                  }}
                />
                {autoComplete?.length > 0 ? (
                  <ul className="absolute inset-x-0 top-full bg-[#fff]">
                    {autoComplete?.map((prod, index) => {
                      return (
                        <li
                          className="px-4 py-2 cursor-pointer "
                          key={index}
                          onClick={() => {
                            navigate(`/search/${prod?.name}`);
                            setSearchText("");
                          }}
                        >
                          {prod?.name}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <></>
                )}
              </form>
            </div>

            <div
              onMouseEnter={() => setSigninHover(true)}
              onMouseLeave={() => setSigninHover(false)}
              className="relative"
            >
              <Link
                to={user ? "/account" : "/signin"}
                className="px-2 pt-2 pb-4 flex hover:text-[#000]"
              >
                <BsPerson className="w-8 h-8 mr-2 " />
              </Link>
              {signinHover ? <SigninPop /> : <></>}
            </div>
            <Link to="/favourite" className="px-2 pt-2 flex hover:text-[#000]">
              <BsSuitHeart className="w-7 h-8 mr-2 " />
            </Link>
            <div
              className="relative mr-4"
              onMouseEnter={() => setCartHover(true)}
              onMouseLeave={() => setCartHover(false)}
            >
              <Link
                to="/checkout/cart"
                className="px-2 pt-2 pb-4 flex hover:text-[#000]"
              >
                <BsHandbag className="w-7 h-7  " />
              </Link>
              {cartHover ? <CartPop /> : <></>}
              {cart?.cartItems?.length > 0 ? (
                <div className="absolute font-bold top-0 right-0 bg-[#df1d8f] w-5 h-5 rounded-full text-center text-[#fff] flex items-center justify-center p-2 ">
                  {cart?.cartItems?.length}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </nav>

      <nav className="lg:hidden bg-[#fff] sticky top-0 w-full z-40">
        <div
          className={`justify-between items-center py-3 ${
            searchClick === true ? "hidden" : "flex"
          }`}
        >
          <div onClick={toggle} className="ml-2">
            {sidebarOpen ? (
              <GrClose className="w-8 h-8" />
            ) : (
              <AiOutlineMenu className="w-8 h-8" />
            )}
          </div>
          <Link to="/">
            <img src={logo} className="sm:w-40 sm:h-10 w-32 h-8 ml-4"></img>
          </Link>
          <div className="flex items-center">
            <BiSearch
              className="w-7 h-7"
              onClick={() => setSearchClick(true)}
            />
            <div className="relative sm:mr-4">
              <Link
                to="/checkout/cart"
                className="px-2  flex hover:text-[#000]"
              >
                <BsHandbag className="w-7 h-7  " />
              </Link>
              {cartHover ? <CartPop /> : <></>}
              {cart?.cartItems?.length > 0 ? (
                <div className="absolute font-bold -top-2 right-0 bg-[#df1d8f] w-5 h-5 rounded-full text-center text-[#fff] flex items-center justify-center p-2 ">
                  {cart?.cartItems?.length}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div
          className={`w-[100%] items-center ${searchClick ? "flex" : "hidden"}`}
        >
          <FiArrowLeft
            className="w-7 h-7"
            onClick={() => setSearchClick(false)}
          />
          <form className={` items-center flex w-[100%] `}>
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-[95%] mt-2.5 mx-auto mb-2.5">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-[#fff] border-1 border-gray-500 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500  block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-[#db1d8f]"
                placeholder="Search"
                autoComplete="off"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/search/${searchText}`);
                    setSearchText("");
                    setAutoComplete([]);
                  }
                }}
              />
              {autoComplete?.length > 0 ? (
                <ul className="absolute inset-x-0 top-full bg-[#fff]">
                  {autoComplete?.map((prod, index) => {
                    return (
                      <li
                        className="px-4 py-2 cursor-pointer "
                        key={index}
                        onClick={() => {
                          navigate(`/search/${prod?.name}`);
                          setSearchText("");
                        }}
                      >
                        {prod?.name}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <></>
              )}
            </div>
          </form>
        </div>
      </nav>
      {sidebarOpen ? <Sidebar /> : <></>}
    </div>
  );
}

export default Navbar;
