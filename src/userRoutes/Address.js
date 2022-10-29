import React from "react";
import { useState, useEffect } from "react";
import userAuthSlice from "../features/userAuth/userAuthSlice";
import Layout from "../userComponents/Layout";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import axios from "axios";
import { logout, userRefreshToken } from "../features/userAuth/userAuthSlice";
import { reset as resetAuth } from "../features/userAuth/userAuthSlice";

import { add, selectAddress } from "../features/address/addressSlice";

import AddressCard from "../userComponents/AddAddress/AddressCard";

import { useContext } from "react";
import SidebarContext from "../context/SidebarContext";

export default function Address() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [localityTown, setLocalityTown] = useState("");
  const [cityDistrict, setCityDistrict] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("home");
  const [def, setDefault] = useState(false);
  let { user, isError: isRefreshError } = useSelector(
    (state) => state.userAuth
  );
  const { isError: isAddressError } = useSelector((state) => state.address);
  const [addAddr, setAddAddr] = useState(false);
  const addressArray = useSelector((state) => state.address.address.address); //user and address array in it
  const dispatch = useDispatch();

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
    if (user && isAddressError) {
      dispatch(resetAuth());
      dispatch(userRefreshToken());
    }
    if (user && isRefreshError) {
      dispatch(logout());
      setTimeout(() => {
        navigate("/signin");
      }, 200);
    }
  }, [isRefreshError, isAddressError]);

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

  let { sidebarOpen } = useContext(SidebarContext);
  return (
    <ProtectedRoute referrer="/account">
      {user ? (
        <Layout>
          <hr />
          <div className={`${sidebarOpen ? "hidden w-[90%]" : "w-full mt-4"}`}>
            <h2 className="text-3xl text-center font-bold mb-4">
              Welcome, {user.firstName}
            </h2>
            <div className="flex w-[60%] sm:w-[50%] justify-between mx-auto text-xs sm:text-lg">
              <Link to="/account" className="font-bold mx-1">
                ACCOUNT
              </Link>
              <Link to="/address" className="font-bold mx-1">
                ADDRESS
              </Link>
              <Link to="/orders" className="font-bold mx-1">
                ORDERS
              </Link>
            </div>
            <div className="flex w-[60%] sm:w-[50%] h-4 rounded-full bg-[#e5e6e7] justify-between mx-auto mt-2">
              <div className="w-[20%] h-4 bg-[#e5e6e7] rounded-full"></div>
              <div className=" w-[30%] h-4 bg-[#000] rounded-full"></div>
              <div className=" w-[20%] h-4 bg-[#e5e6e7] rounded-full"></div>
            </div>
            <div className="text-center">
              <h2 className=" mt-12 text-2xl">Your Addresses</h2>
              <p>You can manage your addresses here!</p>
            </div>
            {addressArray?.length > 0 && !addAddr ? (
              <div className="sm:w-[55%] border-1 mx-auto my-4 flex  flex-col justify-between">
                {addressArray.map((obj, index) => {
                  return (
                    <AddressCard
                      {...obj}
                      id={obj._id}
                      def={obj.default}
                      key={Math.floor(Math.random() * 10000)}
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
              <div className="w-[80%] md:w-[55%] border-1 mx-auto my-4 flex justify-between">
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
                      <label className="absolute top-0 text-sm left-4 text-[#999] bg-[#fff] px-2">
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
        </Layout>
      ) : (
        <></>
      )}
    </ProtectedRoute>
  );
}
