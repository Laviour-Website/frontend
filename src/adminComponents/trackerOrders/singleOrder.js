import { useSelector } from "react-redux";
import Layout from "../../adminRoutes/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { reset } from "../../features/admin/singleOrderSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminProtectedRoute from "../../adminRoutes/AdminProtectedRoute";
import { logout } from "../../features/admin/adminAuthSlice";

function SingleOrder() {
  const { order } = useSelector((state) => state.adminSingleOrder);
  const [address, setAddress] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.admin);
  useEffect(() => {
    try {
      const fun = async () => {
        let URL = `https://laviour.herokuapp.com/api/getAddress/${order.addressId}`;
        const response = await axios.get(URL);
        if (response.data) {
          setAddress(response.data);
        }
      };
      fun();
    } catch (err) {
      console.log(err);
    }
    if (!order) {
      navigate("/admin/trackOrders");
    }
    return () => {
      dispatch(reset());
    };
  }, [address?.length]);
  return (
    <AdminProtectedRoute>
      <Layout>
        <div className=" mt-20 flex justify-evenly">
          <div className="flex">
            <img src={order?.cover} className="w-60 h-80"></img>
            <div className="ml-16">
              <p className="text-2xl font-bold">{order?.brandname}</p>
              <p>{order?.name}</p>
              <p>{order?.orderId}</p>
              <p>
                <span className="font-bold">Selected Size</span> -{" "}
                {order?.selectedSize}
              </p>
              <p>
                <span className="font-bold">Selected Quantity</span> -{" "}
                {order?.quantity}
              </p>
              <p>
                <span className="font-bold">Color of the product</span> -{" "}
                {order?.color}
              </p>
              <p>
                <span className="font-bold">CouponCode</span> -{" "}
                {order?.couponCode}
              </p>
              <h2 className="font-extrabold text-xl bg-[#df1f98de] mt-2 ">
                CUSTOMER DETAILS
              </h2>
              <div className=" my-2">
                <p>
                  <span className="font-bold">Customer Name </span>-{" "}
                  {order?.firstName} {order?.lastName}
                </p>
                <p>
                  <span className="font-bold">Customer Email</span> -{" "}
                  {order?.email}
                </p>
                <p>
                  <span className="font-bold">Customer Phone</span> -{" "}
                  {order?.phno}
                </p>
                <p>
                  <span className="font-bold">Customer paid amonut</span> -
                  {order?.userPaidPrice}{" "}
                </p>
                <p>
                  <span className="font-bold">Customer Payment Mode</span> -{" "}
                  {order?.paymentType}
                </p>
                <p>
                  <span className="font-bold">Customer Payment Status</span> -{" "}
                  {order?.paymentStatus}
                </p>
                <p>
                  <span className="font-bold">
                    Amount that the seller will recieve
                  </span>{" "}
                  - {order?.sellerPayablePrice}
                </p>
              </div>
            </div>
          </div>

          <div className="w-[30%]">
            <h2 className="font-extrabold text-xl bg-[#df1f98de]">
              SELLER DETAILS
            </h2>
            <p>
              <span className="font-bold">Seller user name</span> -{" "}
              {order?.sellerUsername}
            </p>
            <p>
              <span className="font-bold">Seller Email</span> -{" "}
              {order?.sellerEmail}
            </p>
            <p>
              <span className="font-bold">Seller user name</span> -{" "}
              {order?.sellerMobileno}
            </p>
            <p>
              <span className="font-bold">Order Status</span> -{" "}
              {order?.orderStatus.type}
            </p>
            <p>
              <span className="font-bold">Ordered Date</span> -{" "}
              {new Date(order?.orderStatus.date).getDate()}/
              {new Date(order?.orderStatus.date).getMonth() + 1}/
              {new Date(order?.orderStatus.date).getFullYear()}
            </p>
            {order?.orderStatus.packedDate ? (
              <div>
                <span className="font-bold">Packed Date</span>
                {new Date(order?.orderStatus.packedDate).getDate()}/
                {new Date(order?.orderStatus.packedDate).getMonth() + 1}/
                {new Date(order?.orderStatus.packedDate).getFullYear()}
              </div>
            ) : (
              <></>
            )}
            {order?.orderStatus.shippedDate ? (
              <div>
                <span className="font-bold">Shipped Date</span>
                {new Date(order?.orderStatus.shippedDate).getDate()}/
                {new Date(order?.orderStatus.shippedDate).getMonth() + 1}/
                {new Date(order?.orderStatus.shippedDate).getFullYear()}
                <p>
                  <span className="font-bold">Tracking Link:</span>
                  <a
                    href={`http://${order?.trackingLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {order?.trackingLink}
                  </a>
                </p>
                {order?.orderStatus.deliveredDate ? (
                  <div>
                    <span className="font-bold">Delivered Date</span>
                    {new Date(order?.orderStatus.deliveredDate).getDate()}/
                    {new Date(order?.orderStatus.deliveredDate).getMonth() + 1}/
                    {new Date(order?.orderStatus.deliveredDate).getFullYear()}
                  </div>
                ) : (
                  <></>
                )}
                {order?.orderStatus?.returningDate && (
                  <div>
                    <span className="font-bold">Return Applied on Date : </span>
                    {new Date(order?.orderStatus.returningDate).getDate()}/
                    {new Date(order?.orderStatus.returningDate).getMonth() + 1}/
                    {new Date(order?.orderStatus.returningDate).getFullYear()}
                  </div>
                )}
                {/* {order?.orderStatus.returningDate ? (
                  <div>
                    <span className="font-bold">Return Applied on Date : </span>
                    {new Date(order?.orderStatus.returningDate).getDate()}/
                    {new Date(order?.orderStatus.returningDate).getMonth() + 1}/
                    {new Date(order?.orderStatus.returningDate).getFullYear()}
                    {order?.orderStatus.type === "returning" ? (
                      <div className="flex flex-col">
                        <span>
                          Click on the button once the returned product is
                          recieved update the returned status
                        </span>
                        <button
                          className="bg-[#000] font-bold text-[#df1f98de] p-2 my-2 hover:bg-[#272626]"
                          onClick={async () => {
                            try {
                              let URL = `https://laviour.herokuapp.com/api/orderReturned`;
                              const config = {
                                headers: {
                                  Authorization: `Bearer ${accessToken}`,
                                },
                              };
                              const response = await axios.post(
                                URL,
                                {
                                  orderId: order?.orderId,
                                  productId: order?.productId,
                                  selectedSize: order?.selectedSize,
                                },
                                config
                              );
                              if (response) {
                                navigate("/admin/returns");
                              }
                            } catch (err) {
                              dispatch(logout());
                              navigate("/admin/signin");
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
                )} */}
                {order?.orderStatus.returnedDate ? (
                  <div>
                    <span className="font-bold">
                      Recieved the returned product :
                    </span>
                    {new Date(order?.orderStatus.returnedDate).getDate()}/
                    {new Date(order?.orderStatus.returnedDate).getMonth() + 1}/
                    {new Date(order?.orderStatus.returnedDate).getFullYear()}
                  </div>
                ) : (
                  <></>
                )}
                {order?.orderStatus?.refundStatus ? (
                  <div className="font-bold">
                    The refund is shown {order?.orderStatus?.refundStatus} on
                    the customer side
                  </div>
                ) : (
                  <></>
                )}
                {order?.orderStatus.deliveredDate ? (
                  <></>
                ) : (
                  <div>
                    <span className="mr-2">Update Delivery Status</span>
                    <button
                      className="bg-[#df1f98de] text-[#fff] p-2 font-bold "
                      onClick={async () => {
                        try {
                          let URL = `https://laviour.herokuapp.com/api/orderDelivered`;
                          const config = {
                            headers: {
                              Authorization: `Bearer ${accessToken}`,
                            },
                          };
                          const response = await axios.post(
                            URL,
                            {
                              orderId: order?.orderId,
                              productId: order?.productId,
                              selectedSize: order?.selectedSize,
                            },
                            config
                          );
                          if (response) {
                            navigate("/admin/trackOrders");
                          }
                        } catch (err) {
                          dispatch(logout());
                          navigate("/admin/signin");
                        }
                      }}
                    >
                      Delivered
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
            <div className="border-1 border-[#424040] p-2">
              <div className="flex">
                {" "}
                <MdLocationOn className="w-6 h-6" />
                Delivery Address
              </div>
              <div className="ml-6 mt-2">
                <h3 className=" font-semibold">{address?.name}</h3>
                <p>
                  {address?.address},{address?.localityTown},
                  {address?.cityDistrict},{address?.pincode}
                </p>
                <p> Mobile - {address?.mobileNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </AdminProtectedRoute>
  );
}

export default SingleOrder;
