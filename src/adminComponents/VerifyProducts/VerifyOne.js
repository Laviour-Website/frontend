import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../adminRoutes/layout";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../userComponents/SingleProduct/prod.css";
import VerifyContent from "./VerifyContent.js";
import Slider from "react-slick";
import uniqid from "uniqid";
import AdminProtectedRoute from "../../adminRoutes/AdminProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/admin/adminAuthSlice";

const VerifyOne = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [soldBy, setSoldBy] = useState({});
  const [prodLoading, setProdLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.admin);
  const { id } = useParams();
  const dispatch = useDispatch();
  let arr = [];
  let pics = [];
  useEffect(() => {
    const fun = async () => {
      try {
        setProdLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get(
          `https://laviour.herokuapp.com/api/products/pendingOne/${id}`,
          config
        );
        if (response.data) {
          setProduct(response.data);
          setSoldBy(response.data.soldBy);
          setProdLoading(false);
        } else {
          navigate("/admin/verifyproducts");
        }
      } catch (err) {
        dispatch(logout());
        navigate("/admin/signin");
      }
    };
    fun();
  }, []);

  useEffect(() => {
    if (product?.pictures?.length > 0) {
      pics = product.pictures.map((obj) => {
        return obj.img;
      });
    }
    arr = [product.cover, ...pics];
  }, [product]);

  var settings = {
    customPaging: function (i) {
      return (
        <div>
          <img src={arr[i]} />
        </div>
      );
    },
    speed: 500,
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    arrow: false,
    infinite: false,
    speed: 500,
    adaptiveHeight: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <MdArrowForwardIos className="text-2xl" />,
    prevArrow: <MdArrowBackIos className="w-40 h-40 " />,
    swipeToScroll: true,
    initialSlide: 0,
    className: "react__slick__slider__parent",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrow: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
          arrow: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrow: true,
        },
      },
    ],
  };

  return (
    <AdminProtectedRoute>
      <Layout>
        {prodLoading ? (
          <div className="flex justify-between items-center h-[100vh]">
            <svg
              role="status"
              className="inline w-12 h-12 mx-auto my-auto text-[#df1f98de] animate-spin dark:text-[#df1f98de] fill-white"
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
        ) : (
          <div className="sm:flex lg:justify-between justify-around mx-auto">
            <div className="lg:w-[30%] md:mt-4 lg:ml-56 sm:w-[45%] ml-24 w-[80%] mx-auto sm:mx-none ">
              <Slider className="" {...settings}>
                {product ? (
                  [
                    <img src={product.cover} className="object-contain"></img>,

                    product.pictures?.map((obj, ind) => {
                      return (
                        <img
                          key={uniqid()}
                          src={obj.img}
                          className=" object-contain"
                        ></img>
                      );
                    }),
                  ]
                ) : (
                  <></>
                )}
              </Slider>
            </div>

            {product ? <VerifyContent {...product} soldBy={soldBy} /> : <></>}
          </div>
        )}
      </Layout>
    </AdminProtectedRoute>
  );
};

export default VerifyOne;
