import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdPersonOutline } from "react-icons/md";
import { BsSuitHeart, BsBoxSeam } from "react-icons/bs";
import { womenSubcategorySidebar } from "./sidebar/womenSubcategorySidebar";
import { MenSubcategorySidebar } from "./sidebar/menSubcategorySidebar";
import { AccSubcategorySidebar } from "./sidebar/accSubcategorySidebar";
import { FootSubcategorySidebar } from "./sidebar/footSubcategorySidebar";
import { logout } from "../../features/userAuth/userAuthSlice";
import { clearCart } from "../../features/cart/cartSlice";
import { clearAddress } from "../../features/address/addressSlice";
import { clearFavourite } from "../../features/favourite/favouriteSlice";

function Sidebar() {
  const { user } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(clearCart());
    await dispatch(clearAddress());
    await dispatch(clearFavourite());
    navigate("/");
  };
  return (
    <div className="fixed top-18 h-[100%] overflow-y-auto  bg-[#fff] w-full z-50">
      <div
        className="w-[100vw] bg-white lg:hidden overflow-y-auto"
        id="sidenavSecExample"
      >
        <div class="pt-4 relative  ">
          <a
            href={user ? "/account" : "/signin"}
            className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-[#db1d8f] hover:bg-pink-50 transition duration-300 ease-in-out font-semibold"
            data-mdb-ripple="true"
            data-mdb-ripple-color="primary"
          >
            <div class="flex items-center ml-1">
              <div class="">
                <MdPersonOutline className="w-7 h-7" />
              </div>
              <div class=" ml-2">
                {user ? (
                  <div class="text-lg font-semibold ">
                    <p>{user?.firstName}</p>
                  </div>
                ) : (
                  <button className="text-lg">Sign In</button>
                )}
              </div>
            </div>
          </a>
        </div>
        <ul class="relative px-1">
          <li class="relative">
            <a
              class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-[#db1d8f] hover:bg-blue-50 transition duration-300 ease-in-out"
              href="/orders"
              data-mdb-ripple="true"
              data-mdb-ripple-color="primary"
            >
              <BsBoxSeam className="w-7 h-7" />
              <span className="text-lg font-semibold ml-2">Orders</span>
            </a>
          </li>
          <li class="relative">
            <a
              class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-[#db1d8f] hover:bg-pink-50 transition duration-300 ease-in-out font-semibold"
              href="/favourite"
              data-mdb-ripple="true"
              data-mdb-ripple-color="primary"
            >
              <BsSuitHeart className="w-7 h-6" />
              <span className="text-lg  ml-2">Favourites</span>
            </a>
          </li>
          <li class="relative" id="sidenavSecEx2">
            <a
              class="flex items-center text-sm py-8 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-[#db1d8f] hover:bg-pink-50 transition duration-300 ease-in-out cursor-pointer"
              data-mdb-ripple="true"
              data-mdb-ripple-color="primary"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSidenavSecEx2"
              aria-expanded="false"
              aria-controls="collapseSidenavSecEx2"
            >
              <span className="font-bold text-xl">WOMEN</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                class="w-3 h-3 ml-auto"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                ></path>
              </svg>
            </a>
            {womenSubcategorySidebar}
          </li>
          <li class="relative" id="sidenavSecEx3">
            <a
              class="flex items-center text-sm py-8 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-[#db1d8f] hover:bg-pink-50 transition duration-300 ease-in-out cursor-pointer"
              data-mdb-ripple="true"
              data-mdb-ripple-color="primary"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSidenavSecEx3"
              aria-expanded="false"
              aria-controls="collapseSidenavSecEx3"
            >
              <span className="font-bold text-xl">MEN</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                class="w-3 h-3 ml-auto"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                ></path>
              </svg>
            </a>
            {MenSubcategorySidebar}
          </li>
          <li class="relative" id="sidenavSecEx4">
            <a
              class="flex items-center text-sm py-8 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-[#db1d8f] hover:bg-pink-50 transition duration-300 ease-in-out cursor-pointer"
              data-mdb-ripple="true"
              data-mdb-ripple-color="primary"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSidenavSecEx4"
              aria-expanded="false"
              aria-controls="collapseSidenavSecEx4"
            >
              <span className="font-bold text-xl">ACCESSORIES</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                class="w-3 h-3 ml-auto"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                ></path>
              </svg>
            </a>
            {AccSubcategorySidebar}
          </li>
          <li class="relative" id="sidenavSecEx5">
            <a
              class="flex items-center text-sm py-8 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-[#db1d8f] hover:bg-pink-50 transition duration-300 ease-in-out cursor-pointer"
              data-mdb-ripple="true"
              data-mdb-ripple-color="primary"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSidenavSecEx5"
              aria-expanded="false"
              aria-controls="collapseSidenavSecEx5"
            >
              <span className="font-bold text-xl">FOOTWEAR</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                class="w-3 h-3 ml-auto"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                ></path>
              </svg>
            </a>
            {FootSubcategorySidebar}
          </li>
          <li class="relative">
            <a
              class="flex items-center text-sm py-8 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-[#db1d8f] hover:bg-pink-50 transition duration-300 ease-in-out"
              href="/thrift"
              data-mdb-ripple="true"
              data-mdb-ripple-color="primary"
            >
              <span className="font-bold text-xl">THRIFT</span>
            </a>
          </li>
        </ul>

        <div class="text-center bottom-0 w-full">
          <button
            onClick={handleLogout}
            className="w-[200px] h-[50px] bg-[#000] hover:bg-[rgb(85,85,85)] tracking-wider text-white p-2 font-bold text-[16px] "
          >
            Logout
          </button>
          <hr class="m-0" />
          <p class="py-2 text-sm text-gray-700">laviour.com</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
