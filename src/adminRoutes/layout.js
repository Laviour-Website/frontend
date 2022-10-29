import { useNavigate } from "react-router-dom";
import logo from "../images/laviour_logo.jpeg";
import { logout } from "../features/admin/adminAuthSlice";
import { useDispatch } from "react-redux";

const Layout = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div className="relative flex py-4 justify-center items-center">
        <img
          src={logo}
          alt="logo"
          className="py-2 w-48 h-16"
          onClick={() => {
            navigate("/admin/banners");
          }}
        ></img>
        <p className="text-3xl font-bold italic">-Admin</p>
        <button
          className="absolute right-0"
          onClick={() => {
            dispatch(logout());
            navigate("/admin/signin");
          }}
        >
          LOGOUT
        </button>
      </div>
      <hr />
      <div className="flex justify-center mt-2">
        <button
          className="bg-[#000]  text-[#fff] mx-2 p-2 font-semibold"
          style={{
            color: props.name == "Home" ? "#dd00ae" : "#fff",
          }}
          onClick={() => {
            navigate("/admin/banners");
          }}
        >
          Banners
        </button>
        <button
          className="bg-[#000] text-[#fff] mx-2 p-2 font-semibold"
          style={{
            color: props.name == "Verify Sellers" ? "#dd00ae" : "#fff",
          }}
          onClick={() => {
            navigate("/admin/sellersignup");
          }}
        >
          Verify Sellers
        </button>
        <button
          className="bg-[#000] text-[#fff] mx-2 p-2 font-semibold"
          style={{
            color: props.name == "Verify Products" ? "#dd00ae" : "#fff",
          }}
          onClick={() => {
            navigate("/admin/verifyproducts");
          }}
        >
          Verify Products
        </button>
        <button
          className="bg-[#000] text-[#fff] mx-2 p-2 font-semibold"
          style={{
            color: props.name == "Add Coupons" ? "#dd00ae" : "#fff",
          }}
          onClick={() => {
            navigate("/admin/coupons");
          }}
        >
          Add Coupons
        </button>
        <button
          className="bg-[#000] text-[#fff] mx-2 p-2 font-semibold"
          style={{
            color: props.name == "Change Price" ? "#dd00ae" : "#fff",
          }}
          onClick={() => {
            navigate("/admin/changeprice");
          }}
        >
          Change Price
        </button>
        <button
          className="bg-[#000] text-[#fff] mx-2 p-2 font-semibold"
          style={{
            color: props.name == "Payment" ? "#dd00ae" : "#fff",
          }}
          onClick={() => {
            navigate("/admin/payment");
          }}
        >
          Payment
        </button>
        <button
          className="bg-[#000] text-[#fff] mx-2 p-2 font-semibold"
          style={{
            color: props.name == "Track orders" ? "#dd00ae" : "#fff",
          }}
          onClick={() => {
            navigate("/admin/trackOrders");
          }}
        >
          Track orders
        </button>
        <button
          className="bg-[#000] text-[#fff] mx-2 p-2 font-semibold"
          style={{
            color: props.name == "Returns" ? "#dd00ae" : "#fff",
          }}
          onClick={() => {
            navigate("/admin/returns");
          }}
        >
          Returns & completed Orders
        </button>
      </div>
      {props.children}
    </>
  );
};

export default Layout;
