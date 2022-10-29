import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import {
  addNotLoggedIn as addNotLoggedInFav,
  add as addFav,
  removeNotLoggedIn,
  remove,
} from "../../features/favourite/favouriteSlice";
import { useSelector, useDispatch } from "react-redux";

export default function ProductCard({
  image,
  title,
  description,
  cost,
  id,
  soldBy,
  mrp,
}) {
  const { user } = useSelector((state) => state.userAuth);
  const { favourite } = useSelector((state) => state.favourite);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const discount = Math.floor(((mrp - cost) / mrp) * 100);

  useEffect(() => {
    favourite?.favouriteItems?.map((item) => {
      if (item.product == id) {
        setClicked(true);
      }
    });
  }, []);

  return (
    <div
      onClick={() => {
        navigate(`/product/${id}`);
      }}
      className="hover:text-[#000] grid grid-cols-1  sm:max-w-[252px] border hover:cursor-pointer grid-rows-20 aspect-[3/5]"
    >
      <img
        className=" w-[100%] object-cover h-[100%] row-start-1 row-end-16  overflow-hidden"
        src={image}
      ></img>

      <div className="ml-2 row-start-16 row-end-21 self-center">
        <div className="flex justify-between">
          <p className="text-lg font-bold tracking-wide truncate text-[#142536]">
            {title}
          </p>
          <div
            className="hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              // console.log(e.isPropagationStopped);
              if (!user && !clicked) {
                dispatch(
                  addNotLoggedInFav({
                    product: id,
                    price: cost,
                    cover: image,
                    name: description,
                    brandName: title,
                    soldBy,
                    mrp,
                  })
                );
              } else if (user && !clicked) {
                dispatch(
                  addFav({
                    id: user._id,
                    product: {
                      product: id,
                      price: cost,
                      cover: image,
                      name: description,
                      brandName: title,
                      soldBy,
                      mrp,
                    },
                  })
                );
              } else if (!user && clicked) {
                dispatch(removeNotLoggedIn({ id }));
              } else if (user && clicked) {
                dispatch(remove({ id, userId: user._id }));
              }
              setClicked(!clicked);
            }}
          >
            {clicked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="#db1d8f"
                class="bi bi-suit-heart-fill"
                viewBox="0 0 20 20"
              >
                {" "}
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />{" "}
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-suit-heart"
                viewBox="0 0 20 20"
              >
                {" "}
                <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />{" "}
              </svg>
            )}
          </div>
        </div>
        <p className="text-md truncate text-[#5c6874]">{description}</p>
        <div className="flex">
          <p className="text-md font-bold">Rs.{cost} </p>
          <p className="text-md font-medium line-through text-[#a3aab0] ml-2">
            Rs.{mrp}{" "}
          </p>
          {discount > 0 ? (
            <p className="text-[#db1d8f] font-medium ml-2 truncate">
              {discount}% OFF
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
