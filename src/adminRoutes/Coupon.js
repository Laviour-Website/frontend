import axios from "axios";
import React, { useEffect, useState } from "react";
import CouponForm from "../adminComponents/Coupon/CouponForm";
import Layout from "./layout";
import { TbDiscount2 } from "react-icons/tb";
import AdminProtectedRoute from "./AdminProtectedRoute";
import { logout } from "../features/admin/adminAuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Coupon = () => {
  const [create, setCreate] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [del, setDel] = useState(false);
  const { accessToken } = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fun = async () => {
      try {
        setIsLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get(
          "https://laviour.herokuapp.com/api/coupon/getAll",
          config
        );
        if (response.data) {
          // setCoupons(response.data);
          const codeCountPromise = response.data.map(async (coupon) => {
            return axios.get(
              `https://laviour.herokuapp.com/api/coupon/count/${coupon.code}`,
              config
            );
          });
          Promise.all(codeCountPromise).then((d) => {
            const finalAns = response.data.map((coupon, index) => {
              coupon.count = d[index].data.count;
              return coupon;
            });
            setCoupons(finalAns);
            setIsLoading(false);
          });
        } else {
          console.log("no coupons");
        }
      } catch (err) {
        dispatch(logout());
        navigate("/admin/signin");
      }
    };
    fun();
  }, [create, coupons.length, del]);
  return (
    <AdminProtectedRoute>
      <Layout name="Add Coupons">
        {create ? (
          <CouponForm create={create} setCreate={setCreate} />
        ) : (
          <div className="w-[100%]">
            <div className="flex justify-around w-[50%] mx-auto mt-4 items-center mb-2 ">
              <p>Create a Coupon</p>{" "}
              <button
                onClick={() => {
                  setCreate(true);
                }}
                className="bg-[#db1d8f] font-bold text-white px-4 py-2 "
              >
                Create
              </button>
            </div>
            <div className="mx-auto flex justify-center">
              {isLoading ? (
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
              ) : (
                <div className="w-[100%]">
                  {coupons &&
                    coupons?.map((coupon) => {
                      return (
                        <div className="sm:w-[50%] border-1 p-2 mt-2 mx-auto">
                          <div className="flex justify-between">
                            <TbDiscount2 className="mr-2" />{" "}
                            <button
                              className="bg-[#db1d8f] text-white font-bold px-2"
                              onClick={async () => {
                                try {
                                  const config = {
                                    headers: {
                                      Authorization: `Bearer ${accessToken}`,
                                    },
                                  };
                                  const response = await axios.delete(
                                    `https://laviour.herokuapp.com/api/coupon/delete/${coupon._id}`,
                                    config
                                  );

                                  if (response.data) {
                                    setDel(!del);
                                  }
                                } catch (err) {
                                  dispatch(logout());
                                  navigate("/admin/signin");
                                }
                              }}
                            >
                              DELETE
                            </button>
                          </div>
                          <div className="flex items-center">
                            <p>
                              <span className="font-bold">NAME - </span>
                              {coupon.name}
                            </p>
                          </div>
                          <p className="text-sm mt-1">
                            <span className="font-bold">DESCRIPTION - </span>
                            {coupon.description}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">CODE - </span>
                            {coupon.code}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">DISCOUNT - </span>
                            Rs.{coupon.discountPrice}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">FIRST ORDERS - </span>
                            {coupon.isFirstOrder == 1 ? "TRUE" : "FALSE"}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">VISIBLE - </span>
                            {coupon.visible == 1 ? "TRUE" : "FALSE"}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">
                              MIN ORDER VALUE -{" "}
                            </span>
                            {coupon.minOrderValue}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold">
                              MIN QUANTITY OF PRODUCTS -{" "}
                            </span>
                            {coupon.minQuantity}
                          </p>
                          <p className="text-sm mt-1">
                            <span className="font-bold ">
                              NUMBER OF TIMES USED -{" "}
                            </span>
                            {coupon.count}
                          </p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}
      </Layout>
    </AdminProtectedRoute>
  );
};

export default Coupon;
