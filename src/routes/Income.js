import React from "react";
import SidebarXL from "../components/Sidebar/SidebarXL";
import Sidebar from "../components/Sidebar/Sidebar";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import uniqid from "uniqid";
import SellerProtectedRoute from "./SellerProtectedRoute";

const Income = () => {
  const { seller } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const { token } = useSelector((state) => state.auth.seller);
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fun = async () => {
      try {
        setIsLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `https://laviour.herokuapp.com/api/admin/sellerIncome/${seller._id}`,
          config
        );
        if (response.data) {
          setItems(response.data);
          setIsLoading(false);
        }
      } catch (err) {
        alert("An error occured");
      }
    };
    fun();
  }, [items.length]);
  return (
    <SellerProtectedRoute>
      <div className="lg:flex ">
        <SidebarXL isActive="income" />
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
          <Sidebar isOpen={isOpen} isActive="income" toggle={toggle} />
        ) : (
          <></>
        )}
        <div className="lg:ml-[22%] lg:w-[80%] lg:rounded-l-[4%] lg:border-2 md:z-50 lg:bg-white lg:pt-[2%] pl-[1%] min-h-[100vh] h-[100%]">
          <div>
            {isLoading ? (
              <div className="w-[100%] mt-8">
                <div className="flex items-center mx-auto w-[10%]">
                  <svg
                    role="status"
                    className="inline w-8 h-8 mx-2 text-[#df1f98de] text-center animate-spin dark:text-[#df1f98de] fill-white"
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
                </div>
              </div>
            ) : (
              <div>
                <p className="text-3xl font-extrabold ml-56">Income</p>
                {items.map((order) => {
                  return (
                    <div
                      className="sm:w-[60%] border-1 p-2 mt-2 mx-auto"
                      key={uniqid()}
                    >
                      <p className="text-sm mt-1">
                        <span className="font-bold">ORDER ID: </span>
                        {order?.orderId}
                      </p>

                      <p
                        className={`text-sm mt-1 ${
                          order?.orderStatus == "cancelled" ||
                          order?.orderStatus == "returning" ||
                          order?.orderStatus == "returned"
                            ? "bg-red-600"
                            : "bg-green-600"
                        }
                        ${
                          order?.orderStatus == "delivered" &&
                          order?.owedToLaviour
                            ? "bg-blue-600"
                            : ""
                        }
                        `}
                      >
                        <span className={`font-bold `}>STATUS: </span>
                        {order?.orderStatus}
                      </p>
                      <p className="text-sm mt-1">
                        <span className="font-bold">PRODUCT ID: </span>
                        {order?.productId}
                      </p>
                      <p className="text-sm mt-1">
                        <span className="font-bold">USER PAYMENT METHOD: </span>
                        {order?.paymentType}
                      </p>
                      {order?.orderStatus == "delivered" && order?.isSettled && (
                        <div>
                          <p className="text-sm mt-1">
                            <span className="font-bold">USER PAID: </span>
                            Rs.{order?.userPaidPrice}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">AMOUNT YOU EARN: </span>
                            Rs.{order?.sellerPayablePrice}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">
                              Amount Paid By Laviour -{" "}
                            </span>
                            Rs.{order?.transactionAmount}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">Transaction ID - </span>
                            {order?.transactionID}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">
                              Transaction Date -{" "}
                            </span>
                            {order?.transactionDate}
                          </p>
                        </div>
                      )}
                      {(order?.orderStatus == "returning" ||
                        order?.orderStatus == "returned") && (
                        <div>
                          <p className="text-sm mt-1">
                            <span className="font-bold">Owed To Laviour -</span>
                            {order?.owedToLaviour || 0}
                          </p>
                        </div>
                      )}
                      {order?.orderStatus == "delivered" && !order?.isSettled && (
                        <div>
                          <p className="text-sm mt-1">
                            <span className="font-bold">User Paid -</span>
                            {order?.userPaidPrice || 0}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">Your Earning -</span>
                            {order?.sellerPayablePrice || 0}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">Owed To Laviour -</span>
                            {order?.owedToLaviour || 0}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </SellerProtectedRoute>
  );
};

export default Income;
