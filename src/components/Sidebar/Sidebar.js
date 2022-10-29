import {
  MdSpaceDashboard,
  MdOutlineSettings,
  MdClose,
  MdLogout,
} from "react-icons/md";
import { CgBox } from "react-icons/cg";
import { TbHanger } from "react-icons/tb";
import { BiMoney } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const Sidebar = ({  isActive, toggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div
      className={`w-[100%] h-[100%] fixed z-100 top-0 left-0 bg-[#000] lg:hidden lg:flex-none z-30`}
    >
      <div className="mb-30 text-4xl text-white font-extrabold">
        <MdClose
          onClick={toggle}
          className=" fixed left-[75%] top-[8%] font-extrabold lg:hidden"
        />
      </div>

      <div
        className="h-[100%] flex flex-col items-center justify-center "
        styles={{ opacity: 1.0 }}
      >
        <ul>
          <Link to="/seller/dashboard">
            <li
              onClick={toggle}
              className={"flex text-2xl font-bold my-4 text-[#fff]  "}
              style={{ color: isActive == "dashboard" ? "#dd00ae" : "#fff" }}
            >
              <MdSpaceDashboard className="mr-4 w-8 h-8" /> Dashboard
            </li>
          </Link>
          <Link to="/seller/products">
            <li
              onClick={toggle}
              className="flex text-2xl font-bold my-4 text-[#fff] "
              style={{ color: isActive === "products" ? "#dd00ae" : "#fff" }}
            >
              <CgBox className="mr-4 w-8 h-8" />
              Products
            </li>
          </Link>
          <Link to="/seller/orders">
            <li
              onClick={toggle}
              className="flex text-2xl font-bold my-4 text-[#fff] "
              style={{ color: isActive === "orders" ? "#dd00ae" : "#fff" }}
            >
              <TbHanger className="mr-4 w-8 h-8" />
              Orders
            </li>
          </Link>
          <Link to="/seller/income">
            <li
              onClick={toggle}
              className="flex text-2xl font-bold my-4 text-[#fff] "
              style={{ color: isActive === "income" ? "#dd00ae" : "#fff" }}
            >
              <BiMoney className="mr-4 w-8 h-8" />
              Income
            </li>
          </Link>
          <Link to="/seller/settings">
            <li
              className="flex text-2xl font-bold my-4 text-white "
              style={{ color: isActive === "settings" ? "#dd00ae" : "#fff" }}
            >
              <MdOutlineSettings className="mr-4 w-8 h-8" />
              Settings
            </li>
          </Link>
          <button
            onClick={onLogout}
            className="flex text-2xl font-bold my-4 text-center rounded-full bg-[#dd00ae] px-4 py-1.5 self-center translate-y-[100%] text-[#fff] "
          >
            <MdLogout className="mr-4 w-8 h-8 text-white" />
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
