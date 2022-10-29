import { useSelector } from "react-redux";

function CartPop() {
  const { cart } = useSelector((state) => state.cart);

  let price = 0;
  let shipping = 0;

  if (cart?.cartItems?.length > 0) {
    shipping = 100;
    cart.cartItems.forEach((prod) => {
      price += prod.price;
    });
  }

  return (
    <div
      // onMouseEnter={()=>setCartHover(true)}
      // onMouseLeave={()=>setCartHover(false)}
      className="z-30 absolute w-[375px] right-0 bg-white  p-4 shadow-md"
    >
      <p className="font-extrabold tracking-wider text-[17px] mt-4 mb-8">
        {cart?.cartItems?.length > 0
          ? `You have ${cart.cartItems.length} items in your cart`
          : "Your shopping bag is empty"}
      </p>
      <hr />

      <div className="flex justify-between mt-4 mb-4 font-bold">
        <p className="text-[#808080]">Order Value</p>
        <p className="text-[#808080]">Rs. {price}.00</p>
      </div>
      <div className="flex justify-between mt-4 mb-4 font-bold">
        <p className="text-[#808080]">Shipping</p>
        <p className="text-[#808080]">Rs. {shipping}.00</p>
      </div>

      <hr />
      <div className="flex justify-between mt-2 mb-4 font-bold text-lg">
        <p className="text-[#000]">Total</p>
        <p className="text-[#000]">Rs. {price + shipping}.00</p>
      </div>
    </div>
  );
}

export default CartPop;
