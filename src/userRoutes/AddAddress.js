import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartNavbar from "../userComponents/ShoppingCart/CartNavbar";
import { useState, useEffect } from "react";
import PriceContent from "../userComponents/ShoppingCart/PriceContent";
import axios from "axios";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { add, selectAddress } from "../features/address/addressSlice";
import AddressCard from "../userComponents/AddAddress/AddressCard";
import { logout, userRefreshToken } from "../features/userAuth/userAuthSlice";
import { reset as resetAuth } from "../features/userAuth/userAuthSlice";

import { useContext } from "react";
import SidebarContext from "../context/SidebarContext";

export default function AddAddress() {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [pincode, setPincode] = useState("");
  const [localityTown, setLocalityTown] = useState("");
  const [cityDistrict, setCityDistrict] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("home");
  const [def, setDefault] = useState(false);
  const addressArray = useSelector((state) => state?.address?.address?.address); //user and address array in it
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addAddr, setAddAddr] = useState(false);

  const { user, isError: isRefreshError } = useSelector(
    (state) => state.userAuth
  );
  const { discountPrice } = useSelector((state) => state.coupon);
  const Adda = useSelector((state) => state.address.address);

  const { selected, isError: isAddressError } = useSelector(
    (state) => state.address
  );
  const [mrp, setMrp] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const { cart, isError: isCartError } = useSelector((state) => {
    return state.cart;
  });

  const dispatch = useDispatch();

  let { sidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if (user && (isCartError || isAddressError)) {
      dispatch(resetAuth());
      dispatch(userRefreshToken());
    }
    if (user && isRefreshError) {
      dispatch(logout());
      setTimeout(() => {
        navigate("/signin");
      }, 200);
    }
  }, [isCartError, isRefreshError, isAddressError]);

  useEffect(() => {
    if (addressArray?.length > 0) {
      setSelectedAddress(addressArray[0]._id);
    }
  }, [addressArray?.length]);

  useEffect(() => {
    let total = 0;
    let pp = 0;
    let qty = 0;
    cart.cartItems?.forEach((prod) => {
      total = total + prod.quantity * prod.MRP;
      pp = pp + prod.quantity * prod.price;
      qty += prod.quantity;
    });

    setQuantity(qty);
    setMrp(total);
    setPrice(pp);
    setDiscount(total - pp);
  }, [cart]);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const addr = {
      user: user._id,
      addAddress: {
        name,
        mobileNumber,
        pincode,
        address,
        localityTown,
        cityDistrict,
        addressType: type,
        state,
        default: def,
      },
    };
    dispatch(add(addr));

    setAddAddr(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin?referrer=/checkout/cart");
    }
  });
  useEffect(() => {
    const getDeets = async () => {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      if (response.data[0].Status == "Success") {
        console.log(response.data[0].PostOffice[0]);
        setLocalityTown(response.data[0].PostOffice[0].Block);
        setCityDistrict(response.data[0].PostOffice[0].District);
        setState(response.data[0].PostOffice[0].State);
      } else {
        console.log(response.data[0]);
      }
    };
    if (pincode.length == 6) {
      getDeets();
    }
  }, [pincode]);

  useEffect(() => {
    dispatch(selectAddress({ id: Adda?.address[0]?._id }));
  }, []);

  const handleProceedToPay = () => {
    if (selected) {
      navigate("/checkout/payment");
    } else {
      return;
    }
  };

  return (
    <div>
      <CartNavbar current="address" />
      <hr />
      <div className="md:flex items-start justify-center">
        <div className="w-[90%] md:w-[60%] lg:mr-4 mx-auto">
          <div className="text-2xl font-extrabold mt-4 mx-auto ml-12">
            {" "}
            Select Address
          </div>
          {addressArray?.length > 0 && !addAddr ? (
            <div className="w-[95%] border-1 mx-auto my-4 flex  flex-col justify-between">
              {addressArray.map((obj, index) => {
                return (
                  <AddressCard
                    {...obj}
                    id={obj._id}
                    def={obj.default}
                    key={Math.floor(Math.random() * 10000)}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                  />
                );
              })}
              <button
                className="py-2 px-8 bg-[#000] text-[#fff] mx-4"
                onClick={() => setAddAddr(true)}
              >
                + ADD NEW ADDRESS
              </button>
            </div>
          ) : (
            <div className="w-[95%] border-1 mx-auto my-4 lg:flex justify-between">
              <form className="w-[100%] " onSubmit={handleAddressSubmit}>
                <label className="font-bold ml-12 mt-4 mb-2">
                  CONTACT DETAILS
                </label>
                <div className="flex flex-col items-center">
                  <div className="relative flex w-[90%]">
                    <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2">
                      Name*
                    </label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder=""
                      className=" py-2 px-4 border-1 focus:outline-[#999] my-2 w-[100%] rounded-md text-sm"
                    ></input>
                  </div>
                  <div className="relative flex w-[90%]">
                    <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2">
                      Mobile No*
                    </label>
                    <input
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      type="text"
                      placeholder=""
                      className="py-2 px-4 border-1 focus:outline-[#999] my-2 w-[100%] rounded-md text-sm"
                    ></input>
                  </div>
                </div>
                <label className="font-bold ml-12 mt-4 mb-2">ADDRESS</label>

                <div className="flex flex-col items-center">
                  <div className="relative flex w-[90%]">
                    <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2">
                      Pincode*
                    </label>
                    {pincode.length == 6 ? (
                      <span
                        onClick={() => {
                          setPincode("");
                          setLocalityTown("");
                          setCityDistrict("");
                          setState("");
                        }}
                        className="absolute right-2 top-4 text-[#db1d8f] text-sm font-bold hover:cursor-pointer"
                      >
                        CHANGE{" "}
                      </span>
                    ) : (
                      <></>
                    )}
                    <input
                      required
                      minLength={6}
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => {
                        setPincode(e.target.value);
                      }}
                      disabled={pincode.length == 6}
                      type="text"
                      className="py-2 px-4 border-1 focus:outline-[#999] my-2 w-[100%] rounded-md text-sm"
                    ></input>
                  </div>
                  <div className="relative flex w-[90%]">
                    <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2 truncate">
                      Address (House No,Building,Street,Area)*
                    </label>
                    <textarea
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder=""
                      className="py-2 px-4 border-1 focus:outline-[#999] my-2 w-[100%] rounded-md text-sm"
                    ></textarea>
                  </div>
                  <div className="relative flex w-[90%]">
                    <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2">
                      Locality / Town*
                    </label>
                    <input
                      required
                      value={localityTown}
                      disabled={localityTown}
                      type="text"
                      placeholder=""
                      className="py-2 px-4 border-1 focus:outline-[#999] my-2 w-[100%] rounded-md text-sm"
                    ></input>
                  </div>

                  <div className="flex justify-around w-[90%]">
                    <div className="relative flex w-[50%] mr-2">
                      <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2">
                        City / District*
                      </label>
                      <input
                        required
                        value={cityDistrict}
                        disabled={cityDistrict}
                        type="text"
                        placeholder=""
                        className="py-2 px-4 border-1 focus:outline-[#999] my-2 w-[100%] rounded-md text-sm"
                      ></input>
                    </div>
                    <div className="relative flex w-[50%]">
                      <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2">
                        State*
                      </label>
                      <input
                        required
                        value={state}
                        disabled={state}
                        type="text"
                        placeholder=""
                        className="py-2 px-4 border-1 focus:outline-[#999] my-2 w-[100%] rounded-md text-sm"
                      ></input>
                    </div>
                  </div>
                </div>
                <label className="font-bold ml-12 mt-2 mb-2">
                  SAVE ADDRESS AS
                </label>
                <div className="flex ml-12 ">
                  <label
                    for="home"
                    className={`pt-2 pb-2 pl-2 pr-5 border-2 ${
                      type === "home"
                        ? "border-[#db1d8f] text-[#db1d8f] "
                        : "text-[#000] border-[#000]"
                    } rounded-full text-sm font-bold`}
                  >
                    <input
                      type="radio"
                      value="home"
                      id="home"
                      className="text-white invisible"
                      checked={type === "home"}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    ></input>
                    HOME
                  </label>
                  <label
                    for="work"
                    className={`pt-2 pb-2 pl-2 pr-5 border-2 ${
                      type === "work"
                        ? "border-[#db1d8f] text-[#db1d8f] "
                        : "text-[#000] border-[#000]"
                    } rounded-full text-sm font-bold mx-2`}
                  >
                    <input
                      type="radio"
                      value="work"
                      id="work"
                      className="text-white invisible"
                      checked={type === "work"}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                    ></input>
                    WORK
                  </label>
                </div>
                <div className="mt-4 ml-12 flex items-center">
                  <input
                    className="w-4 h-4 mr-2"
                    type="checkbox"
                    onChange={() => {
                      setDefault(!def);
                    }}
                  ></input>
                  <label className="font-bold text-md">
                    Make this Your Default Address?
                  </label>
                </div>
                <div className="flex justify-center">
                  <input
                    type="submit"
                    value="ADD ADDRESS"
                    className="bg-[#db1d8f] text-[#fff] w-[90%] py-2 mt-4"
                  ></input>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="md:w-[25%] mb-32 md:mb-12 mt-12 ml-4 pt-12 lg:mr-32 md:mr-12">
          <h3 className="text-xl font-bold">PRICE SUMMARY</h3>
          <p className="mb-4 text-[#5c6874]">
            Prices are inculsive of all taxes
          </p>
          <div className=" md:mb-0">
            <div className="flex justify-between my-1">
              <p>Total MRP</p>
              <p>Rs.{mrp}</p>
            </div>
            <div className="flex justify-between my-1 font-semibold text-[#db1d8f]">
              <p>Discount on MRP</p>
              <p>-Rs.{discount}</p>
            </div>
            <div className="flex justify-between my-1">
              <p
                className={`${discountPrice && "text-[#db1d8f] font-semibold"}`}
              >
                Coupon Discount
              </p>
              <p
                className={`${discountPrice && "font-semibold text-[#db1d8f]"}`}
              >
                {discountPrice == 0 ? "Rs.0" : `-Rs.${discountPrice}`}
              </p>
            </div>
            <div className="flex justify-between mb-4 mt-1">
              <p>Shipping Charges</p>
              <p>Rs.0</p>
            </div>
            <hr />
          </div>
          <div className="fixed bottom-0 md:relative w-[100%] bg-[#fff] ">
            <hr />
            <div className="flex justify-between py-3 font-bold text-xl md:text-lg">
              <p>Total Amount</p>
              <p className="mr-8 md:mr-0">
                Rs.{Math.max(price - discountPrice, 0)}
              </p>
            </div>
            <div className="">
              {selected && (
                <button
                  className="text-[#fff] bg-[#db1d8f] w-[100%] py-2 font-semibold"
                  onClick={handleProceedToPay}
                >
                  PROCEED TO PAY
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
