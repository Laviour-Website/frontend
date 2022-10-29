import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TbDiscount2 } from "react-icons/tb";
import { apply, reset } from "../../features/coupon/couponSlice";

function PriceContent() {
  const [mrp, setMrp] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [couponVal, setCouponVal] = useState("");
  const { cart } = useSelector((state) => {
    return state.cart;
  });

  const { code, discountPrice, isError, message } = useSelector(
    (state) => state.coupon
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
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
    dispatch(reset());
  }, [cart]);

  useEffect(() => {
    const fun = async () => {
      const response = await axios.get(
        "https://laviour.herokuapp.com/api/coupon/getVisible"
      );
      if (response.data) {
        setCoupons(response.data);
      }
    };
    fun();
  }, []);

  return (
    <div className="px-2 lg:w-[25%] md:w-[30%] md:mt-12 md:ml-4 md:pt-12">
      <h3 className="text-xl font-bold">PRICE SUMMARY</h3>
      <p className="mb-4 text-[#5c6874]">Prices are inculsive of all taxes</p>
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
          <p className={`${discountPrice && "text-[#db1d8f] font-semibold"}`}>
            Coupon Discount
          </p>
          <p className={`${discountPrice && "font-semibold text-[#db1d8f]"}`}>
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
          <Link className="" to="/checkout/address">
            <button className=" text-[#fff] bg-[#db1d8f] w-[100%] py-2 font-semibold">
              PLACE ORDER
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-4 font-extrabold text-lg">APPLY COUPONS</div>
      <div className="flex justify-around items-center">
        <input
          className="form-input px-2 py-1 my-2 border-2 w-[70%] focus:outline-gray-400"
          type="text"
          value={couponVal}
          onChange={(e) => {
            setCouponVal(e.target.value.toUpperCase());
          }}
        />
        <button
          className="w-[25%] bg-[#db1d8f] text-white py-1.5 mx-2 font-bold focus:outline-none"
          onClick={() => {
            if (!user) {
              navigate("/signin?referrer=/checkout/cart");
            } else {
              dispatch(apply({ code: couponVal, orderValue: price, quantity }));
            }
          }}
        >
          APPLY
        </button>
      </div>
      <div className="text-xs my-0 pt-0 flex items-center">
        {code && (
          <>
            <p>CODE {code} has been applied!</p>
            <button
              className="text-[#db1d8f] font-extrabold px-2"
              onClick={() => {
                dispatch(reset());
              }}
            >
              REMOVE
            </button>
          </>
        )}
      </div>
      <div>{isError && message && <p>{message}</p>}</div>
      <div className="mb-48 md:mb-24 ">
        {coupons?.length > 0 && (
          <>
            {coupons?.map((coupon) => {
              return (
                <div className="w-[100%] border-1 p-2 mt-2">
                  <div className="flex items-center font-semibold">
                    <TbDiscount2 className="mr-2" /> <p>{coupon.name} </p>
                  </div>
                  <p>CODE - {coupon.code}</p>
                  <p className="text-sm mt-1">{coupon.description}</p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default PriceContent;
