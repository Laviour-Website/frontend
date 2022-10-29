import { TbCurrencyRupee, TbDiscount2 } from "react-icons/tb";
import { BsHandbag, BsSuitHeart, BsFillSuitHeartFill } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import SizechartModal from "./SizechartModal";
import { addNotLoggedIn, add } from "../../features/cart/cartSlice";
import {
  addNotLoggedIn as addNotLoggedInFav,
  add as addFav,
} from "../../features/favourite/favouriteSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  logout,
  userRefreshToken,
} from "../../features/userAuth/userAuthSlice";
import { reset as resetAuth } from "../../features/userAuth/userAuthSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { WiStars } from "react-icons/wi";
import uniqid from "uniqid";

function ProductContent({
  brandName,
  name,
  cover,
  description,
  countInStock,
  color,
  reviews,
  sellingPrice,
  price,
  sizeChart,
  soldBy,
  MRP,
  _id,
}) {
  const [size, setSize] = useState("");
  const [showSizeNotSel, setShowSizeNotSel] = useState(false);
  const [pincode, setPincode] = useState("");
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    cart,
    isSuccess,
    isLoading,
    isError: isCartError,
  } = useSelector((state) => state.cart);

  const [coupons, setCoupons] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewPic, setReviewPic] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [addedToFav, setAddedToFav] = useState(false);
  useEffect(() => {
    const fun = async () => {
      const response = await axios.get(
        "https://laviour.herokuapp.com/api/coupon/getThree"
      );
      if (response?.data) {
        setCoupons(response?.data);
      }
    };
    fun();
  }, []);

  const [added, setAdded] = useState(false);
  const { user, isError: isRefreshError } = useSelector(
    (state) => state.userAuth
  );
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const { accessToken } = useSelector((state) => state.userAuth);

  const onChange = (e) => {
    const file = e.target.files[0];

    console.log(file.size, "size");

    if (file.size > 1048576 * 5) {
      alert("Image size greater than 5mb");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setReviewPic(reader.result);
      };
    }
  };

  const discount = Math.floor(((MRP - sellingPrice) / MRP) * 100);
  useEffect(() => {
    if (user && isCartError) {
      dispatch(resetAuth());
      dispatch(userRefreshToken());
    }
    if (user && isRefreshError) {
      dispatch(logout());
      setTimeout(() => {
        navigate("/signin");
      }, 200);
    }
  }, [isCartError, isRefreshError]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (size) {
      if (!user) {
        dispatch(
          addNotLoggedIn({
            product: _id,
            size,
            price: sellingPrice,
            sellerPayablePrice: price,
            quantity: 1,
            cover,
            name,
            brandName,
            soldBy,
            MRP,
          })
        );
      } else {
        dispatch(
          add({
            id: user._id,
            product: {
              product: _id,
              size,
              price: sellingPrice,
              quantity: 1,
              sellerPayablePrice: price,
              cover,
              name,
              brandName,
              soldBy,
              MRP,
            },
          })
        );
      }
      setAdded(true);
    } else {
      setShowSizeNotSel(true);
    }
  };

  const handleAddToFav = (e) => {
    e.preventDefault();
    if (!user) {
      dispatch(
        addNotLoggedInFav({
          product: _id,
          price: sellingPrice,
          cover,
          name,
          brandName,
          soldBy,
          mrp: MRP,
        })
      );
    } else {
      dispatch(
        addFav({
          id: user._id,
          product: {
            product: _id,
            price: sellingPrice,
            cover,
            name,
            brandName,
            soldBy,
            mrp: MRP,
          },
        })
      );
    }
    setAddedToFav(true);
  };

  return (
    <div className="sm:mt-4 sm:w-[50%] sm:mx-auto mx-4 ">
      {modalOpen ? (
        <SizechartModal sizeChart={sizeChart} setModalOpen={setModalOpen} />
      ) : (
        <></>
      )}
      <h2 className="text-3xl md:text-4xl font-bold">{brandName}</h2>
      <h3 className="tracking-wider text-[#5c6874]">{name}</h3>
      <div className="flex items-end">
        <p className="text-2xl md:text-3xl mt-4 flex items-center font-semibold">
          <TbCurrencyRupee className="w-8 h-8 font-bold " />
          {sellingPrice}{" "}
        </p>
        <p className="text-md mb-px font-bold ml-1 text-[#db1d8f]">
          {discount}% OFF
        </p>
      </div>

      <p className="flex text-[#5c6874]">
        MRP{" "}
        <span className="flex items-center ml-1 mr-1">
          {" "}
          {<TbCurrencyRupee />}
          {MRP}
        </span>{" "}
        inclusive of all taxes
      </p>
      <div className="flex items-end">
        <p className="text-2xl mt-4 font-semibold">Select Size</p>
        <button
          className="mb-px ml-4 font-bold text-[#db1d8f]"
          onClick={() => setModalOpen(true)}
        >
          Size Guide
        </button>
      </div>
      <div className="mt-3 flex flex-wrap">
        {countInStock?.map((obj, ind) => {
          return (
            <button
              key={ind}
              onClick={() => setSize(obj?.size)}
              className={`border-1 border-[#000] py-2 px-4 mx-1 mb-2 sm:mx-2 ${
                size === obj?.size ? "bg-[#000] text-[#fff]" : ""
              } ${
                obj.qty > 3 ? "" : "bg-[#f2f0f0] border-none text-[#b8b8b8]"
              }`}
              disabled={obj?.qty > 0 ? false : true}
            >
              {" "}
              {obj?.size}
            </button>
          );
        })}
      </div>
      {showSizeNotSel && !size ? (
        <p className="text-[#db1d8f] mt-2">You need to select a Size First!</p>
      ) : (
        <></>
      )}
      <div
        className={`flex items-center ${
          showSizeNotSel && !size ? "mt-2" : "mt-4"
        }`}
      >
        {added ? (
          <button className="  bg-[#000] text-[#fff] py-1 px-4 md:px-4 sm:px-2 lg:py-2 lg:px-12 flex items-center">
            <Link to="/checkout/cart" className="hover:text-[#fff]">
              <div className="flex items-center">
                <span className="sm:my-2  text-[11px] sm:text-[18px] font-bold sm:font-semibold">
                  GO TO CART
                </span>
                <AiOutlineArrowRight className="w-6 h-6 m-2" />
              </div>
            </Link>
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="  bg-[#000] text-[#fff] py-1 px-4 md:px-4 sm:px-2 lg:py-2 lg:px-12 flex items-center"
          >
            <div className="flex items-center">
              <BsHandbag className="w-6 h-6 my-2 sm:m-2 mr-2" />
              <span className="sm:m-2 text-xs sm:text-lg font-bold sm:font-normal ">
                ADD TO BAG
              </span>
            </div>
          </button>
        )}
        <button
          onClick={handleAddToFav}
          className="border-2 border-[#db1d8f] text-[#db1d8f] font-bold ml-4 py-0.5 px-2 lg:py-2 lg:px-12 flex items-center"
        >
          {addedToFav ? (
            <BsFillSuitHeartFill className="w-6 h-6 my-2 text-[#db1d8f]" />
          ) : (
            <BsSuitHeart className="w-6 h-6 my-2" />
          )}
          <span className="py-0.5 px-2">FAVOURITE</span>
        </button>
      </div>
      <div>
        {coupons?.length > 0 && (
          <>
            <p className="mt-4 text-2xl font-semibold">Offers For You</p>
            {coupons?.map((coupon) => {
              return (
                <div className="sm:w-[50%] border-1 p-2 mt-2" key={uniqid()}>
                  <div className="flex items-center font-semibold">
                    <TbDiscount2 className="mr-2" /> <p>{coupon?.name} </p>
                  </div>
                  <p className="text-sm mt-1">{coupon?.description}</p>
                </div>
              );
            })}
          </>
        )}
      </div>
      {/* <div className="mt-4">
        <p className="mt-4 text-2xl font-semibold">Check Delivery Speed</p>
        <div className="flex flex-col sm:w-[40%] w-[75%] relative">
          <label className="bg-[#f2f0f0] text-[#777676] absolute top-2.5 left-2 text-xs">
            Enter pincode
          </label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="border-1 focus:outline-none focus:border-b-[#db1d8f] focus:border-2 pt-3 pl-2 mt-2 bg-[#f2f0f0] h-12"
            minLength={6}
            maxLength={6}
            placeholder="560001"
          />
          <button className="absolute left-[80%] top-[35%] font-bold text-[#db1d8f]">
            Apply
          </button>
        </div>
      </div> */}

      <div>
        <p className="mt-4 text-2xl font-semibold">Product Details</p>
        <p>{description}</p>
      </div>
      <div>
        <p className="mt-4 text-2xl font-semibold">Write a Review</p>
        <form>
          <div className="flex flex-col mb-4 relative pb-12">
            Upload image of the product you recieved and give us feedback
            <input
              type="file"
              accept="image/*"
              className="text-sm text-grey-500 mt-2 mb-4
            file:mr-5 file:py-2 file:px-6
            file:border-0
            file:text-md file:font-bold
            hover:file:bg-[#f4efef] hover:file:text-[#000]
            file:cursor-pointer file:bg-pink-100
          file:text-[#db1d8f]"
              onChange={onChange}
            />
            <textarea
              className="border-1 border-[#000] w-[50%]"
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
              }}
              required
            ></textarea>
            <button
              className="bg-[#000] hover:bg-slate-400 text-[#fff] mx-auto absolute bottom-0 p-2 font-medium"
              onClick={async (e) => {
                e.preventDefault();
                let URL = `https://laviour.herokuapp.com/api/product/review`;
                const config = {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                };
                const response = await axios.post(
                  URL,
                  {
                    productId: _id,
                    userId: user?._id,
                    reviewPic: reviewPic,
                    reviewText: reviewText,
                  },
                  config
                );
                if (response.data) {
                  setReviewText("");
                  setReviewPic("");
                  if (response?.data?.message) {
                    setMessage(response.data.message);
                    navigate(`/`);
                  }
                }
              }}
            >
              Post Review
            </button>
          </div>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-bold flex justify-start items-center">
          <span className="text-2xl">Customer Reviews</span>
          <WiStars className="text-[#db1d8f] self-center w-10 h-10" />
        </h2>
        {message ? (
          <div className="text-red-500 font-bold">{message}</div>
        ) : (
          <></>
        )}
        {reviews?.map((obj, i) => {
          return (
            <div className=" relative" key={uniqid()}>
              {/* <AiFillStar className="text-center " /> */}
              <div className="ml-4 flex  my-2">
                {obj?.img ? (
                  <img
                    className="w-[20%] h-auto object-cover"
                    src={obj?.img}
                  ></img>
                ) : (
                  <></>
                )}
                <div className="mx-2">
                  <p className="text-sm font-bold ">
                    {obj?.userId?.firstName} {obj?.userId?.lastName}
                  </p>
                  <p className="relative bottom-0"> {obj?.review}</p>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
        {reviews?.length ? (
          <></>
        ) : (
          <div className="mb-8 text-lg">
            Be the first one to write a review!
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductContent;
