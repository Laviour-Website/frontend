import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SidebarXL from "../components/Sidebar/SidebarXL";
import Sidebar from "../components/Sidebar/Sidebar";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import {
  updatePacked,
  updateShipped,
  getOrders,
  reset,
} from "../features/sellerOrder/sellerOrderSlice";
import { reset as resetProd } from "../features/product/productSlice";
import { reset as resetOrders } from "../features/sellerOrder/sellerOrderSlice";
import { logout, refreshToken } from "../features/auth/authSlice";
import { reset as resetAuth } from "../features/auth/authSlice";
import axios from "axios";
import { MdLocationOn } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import SellerProtectedRoute from "./SellerProtectedRoute";

function SingleSellerProduct() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const productId = searchParams.get("productId");
  const selectedSize = searchParams.get("selectedSize");

  const {
    orders,
    isSuccess,
    isError: isSellerOrderError,
  } = useSelector((state) => state.sellerOrder);
  const { products } = useSelector((state) => {
    return state.product;
  });
  const [findOrder, setFindOrder] = useState({});
  const [findProduct, setFindProduct] = useState({});
  const [trackingLink, setTrackLink] = useState("");
  const [orderState, setOrderState] = useState("");
  const [edit, setEdit] = useState(false);
  const isRefreshError = useSelector((state) => state.auth.isError);

  const { token } = useSelector((state) => state.auth.seller);
  const [address, setAddress] = useState({});

  useEffect(() => {
    if (isSuccess) {
      const findOrder = orders?.find((order) => {
        return (
          order.orderId === orderId &&
          order.productId === productId &&
          order.selectedSize === selectedSize
        );
      });
      setFindOrder(findOrder);
      const findProduct = products?.find((product) => {
        return product._id == productId;
      });
      setFindProduct(findProduct);
      setOrderState(findOrder?.orderStatus?.type);

      if (findOrder?.addressId) {
        console.log(findOrder, "order");

        try {
          const fun = async () => {
            let URL = `https://laviour.herokuapp.com/api/getAddress/${findOrder?.addressId}`;
            const response = await axios.get(URL);
            if (response.data) {
              setAddress(response.data);
              console.log(address, "address");
            }
          };
          fun();
        } catch (err) {
          alert("An error occured");
        }
      }
    }
    return () => {
      dispatch(reset());
    };
  }, [findOrder?.orderStatus, orderState, isSuccess]);

  useEffect(() => {
    if (isSellerOrderError) {
      dispatch(resetAuth());
      dispatch(refreshToken());
    }
    if (isRefreshError) {
      dispatch(logout());
      dispatch(resetProd());
      dispatch(resetOrders());
      setTimeout(() => {
        navigate("/seller/signin");
      }, 200);
    }
  }, [isSellerOrderError, isRefreshError]);

  const handlePacked = () => {
    // const d = new Date().toISOString();
    // setPackedDate(d);
    dispatch(
      updatePacked({
        orderId,
        productId,
        selectedSize: findOrder.selectedSize,
      })
    );
    setTimeout(() => {
      dispatch(getOrders());
      setOrderState(findOrder?.orderStatus?.type);
    }, 1000);
  };
  const handleShipped = () => {
    // const d = new Date().toISOString();
    // setShippedDate(d);
    dispatch(
      updateShipped({
        orderId,
        productId,
        trackingLink,
        selectedSize: findOrder.selectedSize,
      })
    );
    // setOrderState("shipped")
    setTimeout(() => {
      dispatch(getOrders());

      setOrderState(findOrder?.orderStatus?.type);
    }, 1000);
  };
  return (
    <SellerProtectedRoute>
      <div className="lg:flex ">
        <SidebarXL isActive="orders" />
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
          <Sidebar isOpen={isOpen} isActive="products" toggle={toggle} />
        ) : (
          <></>
        )}
        <div className=" w-[100%] lg:ml-[25%] lg:w-[75%]">
          <div className="ml-20 mt-20 md:flex">
            <img src={findProduct?.cover} className="w-60 h-80"></img>
            <div className="ml-8">
              <p className="text-2xl font-bold">{findProduct?.brandName}</p>
              <p>{findProduct?.name}</p>
              <p>Selected Size - {findOrder?.selectedSize}</p>
              <p>Selected Quantity - {findOrder?.quantity}</p>
              <p>
                Amount to be earned -{" "}
                {findOrder?.sellerPayablePrice * findOrder?.quantity}
              </p>
              <p>User Payment Mode - {findOrder?.paymentType}</p>
              <div className="border-1 border-[#424040] p-2 w-[70%] my-2">
                <div className="flex">
                  {" "}
                  <MdLocationOn className="w-6 h-6" />
                  Delivery Address
                </div>
                <div className="ml-6 mt-2 ">
                  <h3 className=" font-semibold">{address?.name}</h3>
                  <p>
                    {address?.address},{address?.localityTown},
                    {address?.cityDistrict},{address?.pincode}
                  </p>
                  <p> Mobile - {address?.mobileNumber}</p>
                </div>
              </div>
              <p>Order Status - {orderState} </p>
              {orderState == "shipped" || orderState == "delivered" ? (
                <div>
                  Thank you for confirming the shipping
                  <p>
                    The tracking link is{" "}
                    <a
                      href={findOrder?.trackingLink}
                      className="text-"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {findOrder?.trackingLink}
                    </a>{" "}
                    {orderState == "shipped" ? (
                      <button
                        onClick={() => {
                          setEdit(true);
                          console.log(edit);
                        }}
                        className="bg-[#000] text-[#fff] py-1 px-4"
                      >
                        Edit
                      </button>
                    ) : (
                      <></>
                    )}
                    {edit ? (
                      <div className="relative flex flex-col border-2 border-[#000] bg-[#fff] text-[#000] py-8 px-4 mt-2">
                        <label>
                          Paste the changed tracking Link in the input field
                        </label>
                        <input
                          type="text"
                          value={trackingLink}
                          onChange={(e) => setTrackLink(e.target.value)}
                          className="border-1 border-black rounded-md py-1 px-12 text-[#000] "
                        ></input>
                        <RiCloseLine
                          onClick={() => {
                            setEdit(false);
                          }}
                          className="absolute right-0 top-0"
                        />
                        <button
                          className="bg-[#df1f98de] py-1 px-4 font-bold mt-2"
                          onClick={async () => {
                            let URL = `https://laviour.herokuapp.com/api/updateTrackingLink`;
                            const config = {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            };
                            const response = await axios.post(
                              URL,
                              {
                                orderId: orderId,
                                productId: productId,
                                selectedSize: selectedSize,
                                trackingLink: trackingLink,
                              },
                              config
                            );
                            if (response) {
                              navigate("/seller/dashboard");
                            }
                          }}
                        >
                          SUBMIT
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              ) : (
                <></>
              )}
              {findOrder?.orderStatus?.returningDate ? (
                <div>
                  <span className="font-bold">Return Applied on Date : </span>
                  {new Date(findOrder?.orderStatus.returningDate).getDate()}/
                  {new Date(findOrder?.orderStatus.returningDate).getMonth() +
                    1}
                  /
                  {new Date(findOrder?.orderStatus.returningDate).getFullYear()}
                  {findOrder?.orderStatus.type === "returning" ? (
                    <div className="flex flex-col mt-4">
                      <span>
                        Click on the button once the returned product is
                        recieved update the returned status
                      </span>
                      <button
                        className=" md:w-[30%] bg-[#000] font-bold text-[#df1f98de] p-2 my-2 hover:bg-[#272626]"
                        onClick={async () => {
                          try {
                            let URL = `https://laviour.herokuapp.com/api/orderReturned`;
                            const config = {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            };
                            const response = await axios.post(
                              URL,
                              {
                                orderId: findOrder?.orderId,
                                productId: findOrder?.productId,
                                selectedSize: findOrder?.selectedSize,
                              },
                              config
                            );
                            if (response) {
                              navigate("/seller/orders");
                            }
                          } catch (err) {
                            dispatch(logout());
                            navigate("/seller/signin");
                          }
                        }}
                      >
                        Returned
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
              {orderState == "ordered" ? (
                <div className="flex flex-col mt-4">
                  Click on the button after the order is packed and is ready to
                  be shipped
                  <button
                    className="bg-[#000] md:w-[30%] text-[#fff] py-2 px-8 text-lg font-semibold mt-1"
                    onClick={handlePacked}
                  >
                    PACKED
                  </button>
                </div>
              ) : (
                <></>
              )}
              {orderState == "packed" ? (
                <div className="flex flex-col mt-4">
                  <div>
                    <p>Paste the tracking Link in the input field</p>
                    <input
                      type="text"
                      value={trackingLink}
                      onChange={(e) => setTrackLink(e.target.value)}
                      className="border-1 border-black rounded-md py-1 px-2 w-[50%]"
                    ></input>
                  </div>
                  Click on the button after the order is picked up by delivery
                  person or has been shipped
                  <button
                    className="bg-[#000] text-[#fff] py-2 px-8 text-lg font-semibold md:w-[30%]"
                    onClick={handleShipped}
                  >
                    Shipped
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </SellerProtectedRoute>
  );
}

export default SingleSellerProduct;
