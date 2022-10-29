import React from "react";
import { Link } from "react-router-dom";
import WomenCat from "./womenCat";
import { useState } from "react";
import MenCat from "./menCat";
import AccessoriesCat from "./accessoriesCat";
import FootwearCat from "./footwareCat";

export default function Category() {
  const [womenCat, setWomenCat] = useState(false);
  const [menCat, setMenCat] = useState(false);
  const [accessoriesCat, setAccessoriesCat] = useState(false);
  const [footwearCat, setFootwearCat] = useState(false);
  const [thriftCat, setThriftCat] = useState(false);
  return (
    <div className="flex justify-center mt-2 font-[Lato] w-[50%] ml-4 ">
      <div
        onMouseEnter={() => setWomenCat(true)}
        onMouseLeave={() => {
          setWomenCat(false);
        }}
        className="mx-auto"
      >
        <Link
          to="/category/women"
          className={`text-lg font-extrabold pb-8 ${
            womenCat ? "underline" : ""
          }  hover:text-[#000]`}
        >
          WOMEN
        </Link>
        {womenCat ? <WomenCat /> : <></>}
      </div>
      <div
        onMouseEnter={() => setMenCat(true)}
        onMouseLeave={() => {
          setMenCat(false);
        }}
        className="mx-auto"
      >
        <Link
          to="/category/men"
          className={`text-lg font-extrabold pb-8 ${
            menCat ? "underline" : ""
          }  hover:text-[#000]`}
        >
          MEN
        </Link>
        {menCat ? <MenCat /> : <></>}
      </div>
      <div
        onMouseEnter={() => setAccessoriesCat(true)}
        onMouseLeave={() => {
          setAccessoriesCat(false);
        }}
        className="mx-auto"
      >
        <Link
          to="/category/accessories"
          className={`text-lg font-extrabold h-[100%] pb-8 ${
            accessoriesCat ? "underline" : ""
          }  hover:text-[#000]`}
        >
          ACCESSORIES
        </Link>
        {accessoriesCat ? <AccessoriesCat /> : <></>}
      </div>
      <div
        onMouseEnter={() => setFootwearCat(true)}
        onMouseLeave={() => setFootwearCat(false)}
        className="mx-auto"
      >
        <Link
          to="/category/footwear"
          className={`text-lg font-extrabold pb-8 ${
            footwearCat ? "underline" : ""
          }  hover:text-[#000]`}
        >
          FOOTWEAR
        </Link>
        {footwearCat ? <FootwearCat /> : <></>}
      </div>

      <div
        onMouseEnter={() => setThriftCat(true)}
        onMouseLeave={() => setThriftCat(false)}
        className="mx-auto"
      >
        <Link
          to="/category/thrift"
          className={`text-lg font-extrabold pb-8 ${
            thriftCat ? "underline" : ""
          }  hover:text-[#000]`}
        >
          THRIFT
        </Link>
        {thriftCat ? <></> : <></>}
      </div>
    </div>
  );
}
