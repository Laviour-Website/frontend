import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartNavbar from "../userComponents/ShoppingCart/CartNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getPaymentStatus } from "../features/order/orderSlice";
import { clearCartBackend } from "../features/cart/cartSlice";

function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId, paymentType, paymentStatus } = useSelector(
    (state) => state.order
  );
  const { discountPrice, code } = useSelector((state) => state.coupon);

  const [quantity, setQuantity] = useState(0);

  const [failed, setFailed] = useState(false);

  const [paymentMode, setPaymentMode] = useState("");

  const [mrp, setMrp] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const { cart } = useSelector((state) => {
    return state.cart;
  });

  const { user, accessToken } = useSelector((state) => state.userAuth);
  const { selected } = useSelector((state) => state.address);

  //sid, productId, payablePrice, purchasedQty, orderStatus: type: ordered, date
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
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

  useEffect(() => {
    if (orderId && paymentType == "cod") {
      dispatch(clearCartBackend());
      navigate("/checkout/success");
    } else if (
      orderId &&
      paymentType == "razorpay" &&
      paymentStatus == "completed"
    ) {
      dispatch(clearCartBackend());
      navigate("/checkout/success");
    } else if (
      orderId &&
      paymentType == "razorpay" &&
      paymentStatus == "pending"
    ) {
      dispatch(clearCartBackend());
      navigate("/checkout/pending");
    }
  }, [orderId]);

  const handleCod = async () => {
    const sub = discountPrice / quantity;
    const items = cart.cartItems.map((obj) => {
      return {
        sid: obj.soldBy,
        productId: obj.product,
        userPaidPrice: Math.floor(
          obj.price * obj.quantity - sub * obj.quantity
        ),
        sellerPayablePrice: obj.sellerPayablePrice * obj.quantity,
        purchasedQty: obj.quantity,
        selectedSize: obj.size,
        orderStatus: {
          type: "ordered",
          date: new Date().toISOString(),
        },
      };
    });

    const orderData = {
      userId: user._id,
      addressId: selected,
      totalAmount: Math.max(price - discountPrice, 0),
      couponCode: code,
      items,
      paymentStatus: "pending",
      paymentType: paymentMode,
    };

    const response = await axios.post(
      "https://laviour.herokuapp.com/api/createOrder",
      orderData,
      config
    );
    if (response) {
      dispatch(getPaymentStatus({ id: response?.data?._id }));
    }
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const items = cart.cartItems.map((obj) => {
      const sub = discountPrice / quantity;
      return {
        sid: obj.soldBy,
        productId: obj.product,
        userPaidPrice: Math.floor(
          obj.price * obj.quantity - sub * obj.quantity
        ),
        sellerPayablePrice: obj.sellerPayablePrice * obj.quantity,
        purchasedQty: obj.quantity,
        selectedSize: obj.size,
        orderStatus: {
          type: "ordered",
          date: new Date().toISOString(),
        },
      };
    });

    const orderData = {
      userId: user._id,
      addressId: selected,
      totalAmount: Math.max(price - discountPrice, 0),
      couponCode: code,
      items,
      paymentStatus: "pending",
      paymentType: paymentMode,
    };

    const { data } = await axios.post(
      "https://laviour.herokuapp.com/api/createOrder",
      orderData,
      config
    );

    const options = {
      key: "rzp_test_MZARoypfVedceQ",
      currency: data.currency,
      amount: data.amount.toString(),
      fixed_amount: true,
      order_id: data.id,
      name: "Laviour",
      description: "Proceed to choose your mode of payment",
      image:
        "https://res.cloudinary.com/dfudzgnoo/image/upload/v1658127474/laviour-main/L_1_obxwzx.png",
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        dispatch(getPaymentStatus({ id: data.notes.backendOrderId }));
      },
      prefill: {
        name: "",
        email: "",
        phone_number: "",
      },
      theme: {
        color: "#fff",
        width: "100%",
      },
      modal: {
        ondismiss: async function () {
          const response = await axios.post(
            "https://laviour.herokuapp.com/api/closedRazorpay",
            { backendOrderId: data.notes.backendOrderId }
          );
          console.log(response.data);
        },
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", (response) => {
      alert(
        "Oh No! Your payment failed! Click on the retry button to try again"
      );
    });
  };
  return (
    <div>
      <CartNavbar current="payment" />
      <hr />
      <div className="md:flex items-start justify-center">
        <div className="md:w-[40%] mx-4">
          <div className="text-2xl font-extrabold mt-4 md:ml-12">
            {" "}
            Select Payment Mode
          </div>

          <p className="md:ml-12 text-[#5c6874]">
            All transactions are secure and encrypted.
          </p>
          <div className="border rounded-sm mt-4">
            <div
              className="py-3 px-2 border-b flex items-center font-bold"
              onClick={() => setPaymentMode("cod")}
            >
              <input
                className="w-4 h-4"
                type="radio"
                checked={paymentMode === "cod"}
              ></input>
              <label className="ml-2">Cash on Delivery</label>
            </div>
            <div
              className={`bg-gray-100 text-center py-10 px-4 text-sm ${
                paymentMode === "cod" ? "" : "hidden"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="163"
                height="80.9"
                class="mx-auto"
                viewBox="-252.3 356.1 163 80.9"
                enable-background="new -252.3 356.1 163 80.9"
              >
                <path
                  stroke="#B2B2B2"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  d="M-108.9 404.1v30c0 1.1-.9 2-2 2h-120.1c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"
                  fill="none"
                ></path>
                <circle fill="#B2B2B2" cx="-227.8" cy="361.9" r="1.8"></circle>
                <circle fill="#B2B2B2" cx="-222.2" cy="361.9" r="1.8"></circle>
                <circle fill="#B2B2B2" cx="-216.6" cy="361.9" r="1.8"></circle>
                <path
                  stroke="#B2B2B2"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  d="M-128.7 400.1h36.7m-3.6-4.1l4 4.1-4 4.1"
                  fill="none"
                ></path>
              </svg>
              <p className="mt-4">Click on confirm order to place the order</p>
            </div>

            <div
              className="py-3 px-2 border-b font-bold flex items-center"
              onClick={() => setPaymentMode("razorpay")}
            >
              <input
                className="w-4 h-4"
                type="radio"
                checked={paymentMode === "razorpay"}
              ></input>
              <label className="ml-2">Card/UPI/NET Banking</label>
            </div>
            <div
              className={`bg-gray-100 text-center py-10 px-4 text-sm ${
                paymentMode === "razorpay" ? "" : "hidden"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="163"
                height="80.9"
                class="mx-auto"
                viewBox="-252.3 356.1 163 80.9"
                enable-background="new -252.3 356.1 163 80.9"
              >
                <path
                  stroke="#B2B2B2"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  d="M-108.9 404.1v30c0 1.1-.9 2-2 2h-120.1c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"
                  fill="none"
                ></path>
                <circle fill="#B2B2B2" cx="-227.8" cy="361.9" r="1.8"></circle>
                <circle fill="#B2B2B2" cx="-222.2" cy="361.9" r="1.8"></circle>
                <circle fill="#B2B2B2" cx="-216.6" cy="361.9" r="1.8"></circle>
                <path
                  stroke="#B2B2B2"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  d="M-128.7 400.1h36.7m-3.6-4.1l4 4.1-4 4.1"
                  fill="none"
                ></path>
              </svg>
              <p className="mt-4">
                After clicking “Complete Order”, you will be redirected to
                Razorpay (Cards, UPI, NetBanking, Wallets) to complete your
                purchase securely.
              </p>
            </div>
          </div>

          {paymentMode === "cod" ? (
            <a onClick={handleCod} target="_blank" rel="no opener noreferrer">
              <button className="text-[#fff] bg-[#db1d8f] w-[100%] py-2 font-semibold">
                CONFIRM COD ORDER
              </button>
            </a>
          ) : (
            <></>
          )}
          {paymentMode === "razorpay" ? (
            <a
              onClick={displayRazorpay}
              target="_blank"
              rel="no opener noreferrer"
            >
              <button className="text-[#fff] bg-[#db1d8f] w-[100%] py-2 font-semibold">
                PROCEED TO PAY
              </button>
            </a>
          ) : (
            <></>
          )}
        </div>

        <div className="md:w-[25%] mt-12 mx-4 pt-12">
          <h3 className="text-xl font-bold">PRICE SUMMARY</h3>
          <p className="mb-4 text-[#5c6874]">
            Prices are inculsive of all taxes
          </p>
          <div className="mb-32 md:mb-0">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
