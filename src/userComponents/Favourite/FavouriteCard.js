import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import {
  removeNotLoggedIn,
  remove,
} from "../../features/favourite/favouriteSlice";

export default function FavouriteCard({
  cover,
  name,
  brandName,
  price,
  id,
  mrp,
}) {
  const { user } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const discount = Math.floor(((mrp - price) / mrp) * 100);

  const handleRemove = (e) => {
    e.stopPropagation();
    if (!user) {
      dispatch(removeNotLoggedIn({ id }));
    } else if (user) {
      dispatch(remove({ id, userId: user._id }));
    }
  };

  return (
    <div className=" max-w-[252px] border mx-[auto] sm:mx-[10px] h-[100%] my-2 pb-4 max-h-[420px] relative hover:cursor-pointer">
      <div
        onClick={() => {
          navigate(`/product/${id}`);
        }}
        className="hover:text-[#000]"
      >
        <TiDeleteOutline
          onClick={handleRemove}
          className="absolute w-8 h-8 right-0 font-semibold text-[#808080] hover:cursor-pointer"
        />
        <div>
          <img className=" w-[252px] h-[336px] object-cover " src={cover}></img>
        </div>
        <div className="ml-2">
          <div className="flex justify-between">
            <p className="text-lg font-bold tracking-wide text-[#142536]">
              {brandName}
            </p>
          </div>
          <p className="text-md truncate text-[#5c6874]">{name}</p>
          <div className="flex">
            <p className="text-md font-bold">Rs.{price} </p>
            <p className="text-md font-medium line-through text-[#a3aab0] ml-2">
              Rs.{mrp}{" "}
            </p>
            <p className="text-[#db1d8f] font-medium ml-2">{discount}% off</p>
          </div>
        </div>
      </div>
    </div>
  );
}
