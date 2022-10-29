import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Card({ imgSrc, brand, name, price, productId, isApproved }) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/seller/products/edit/" + productId);
  };
  return (
    <div className="mt-12 max-w-[252px] relative border-2 rounded-tr-xl rounded-tl-xl mx-1">
      <div className="relative">
        <button
          className="absolute w-20 border-2 rounded-xl top-[87%] left-[63%] bg-gray-300 font-bold"
          onClick={handleEdit}
        >
          <BiEditAlt className="inline" /> Edit
        </button>
        <img
          src={imgSrc}
          className=" rounded-tr-xl rounded-tl-xl object-cover border-b-2 w-60 h-80"
        />
      </div>
      <div className="flex flex-col content-center justify-center items-left ml-2">
        <h3>{brand}</h3>
        <p className="truncate">{name}</p>
        <p className="flex">Rs. {price}</p>
      </div>
      <div
        className={`${
          isApproved ? "bg-green-700" : "bg-red-800"
        } p-1 font-semibold text-white`}
      >
        STATUS: {isApproved ? "APPROVED" : "UNDER REVIEW"}
      </div>
    </div>
  );
}

export default Card;
