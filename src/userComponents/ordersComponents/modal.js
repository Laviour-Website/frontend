import React, { useEffect } from "react";
import "./modal.css";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Modal = ({
  setIsOpen,
  orderId,
  productId,
  isCancelled,
  setIsCancelled,
  name,
  selectedSize,
}) => {
  useEffect(() => {
    console.log("SELECTED");
    console.log(selectedSize);
  }, []);

  const { accessToken } = useSelector((state) => state.userAuth);
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)}>
        <div className="bg-[#fff] rounded-lg text-center  text-[#000] z-20 fixed top-[50%] left-[50%] h-[200px] md:h-[150px] translate-x-[-50%] translate-y-[-50%] md:w-[30%] w-[80%]">
          <button
            className="fixed right-2 top-2"
            onClick={() => setIsOpen(false)}
          >
            <RiCloseLine />
          </button>
          <div className="flex justify-between ">
            <p className="mx-16 mt-4">
              Are you sure you want to {name} the order?
            </p>
          </div>

          <button
            className="bg-[#db1d8f] text-[#fff] font-bold py-2 px-8 mx-2 sm:mx-4 mt-8"
            onClick={async () => {
              let URL = `https://laviour.herokuapp.com/api/${
                name == "cancel" ? "orderCancelled" : ""
              }${name == "return" ? "orderReturning" : ""}`;
              const config = {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              };
              try {
                const response = await axios.post(
                  URL,
                  {
                    selectedSize,
                    orderId: orderId,
                    productId: productId,
                  },
                  config
                );
                if (response.data) {
                  console.log(response.data);
                }
                setIsOpen(false);
                setIsCancelled(!isCancelled);
              } catch (err) {
                alert("an error occurred");
              }
            }}
          >
            Yes
          </button>
          <button
            className="bg-[#db1d8f] text-[#fff] font-bold py-2 px-8 mx-2 sm:mx-4 mt-8"
            onClick={() => setIsOpen(false)}
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
