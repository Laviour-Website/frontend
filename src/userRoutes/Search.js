import React from "react";
import Layout from "../userComponents/Layout";
import Sidebar from "../userComponents/ProductsComponent/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "../userComponents/Card/CardComponent";
import ProductCard from "../userComponents/ProductsComponent/ProductCard";
import { useNavigate, useParams } from "react-router-dom";
import uniqid from "uniqid";

export default function Search() {
  const [search, setSearch] = useState("");
  let { searchTerm } = useParams();
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState("");
  const [color, setColor] = useState([]);
  const [size, setSize] = useState("");
  let { category } = useParams();
  let navigate = useNavigate();
  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const onSizeChange = (e) => {
    console.log(e.target.value);
    setSize(e.target.value);
  };
  let clearState = () => {
    setPrice("");
    setSize("");
  };
  let count = 0;

  let onChange = (e) => {
    console.log(e);
    if (color.includes(e.target.value) && !e.target.checked) {
      const index = color.indexOf(e.target.value);
      const newArray = [...color];
      newArray.splice(index, 1);
      setColor(newArray);

      // setColor(
      //   color.filter((col) => {
      //     return col != e.target.value;
      //   })
      // );
    } else {
      setColor([...color, e.target.value]);
    }
  };

  useEffect(() => {
    try {
      const fun = async () => {
        let URL = `https://laviour.herokuapp.com/api/searchtwo?searchTerm='${searchTerm}'`;
        console.log(URL);
        const response = await axios.get(URL);
        setProducts(response.data);
        console.log(products);
      };
      fun();
    } catch (error) {
      console.log(error);
    }
  }, [category, color.length, price, size, searchTerm]);

  return (
    <Layout>
      <hr />
      <div className="flex justify-start items-start">
        <Sidebar
          onChange={onChange}
          onPriceChange={onPriceChange}
          onSizeChange={onSizeChange}
          size={size}
          price={price}
          clearState={clearState}
        />
        {/* <div className="flex w-[100%] lg:w-[80%] lg:ml-16 justify-evenly sm:justify-start content-start flex-wrap"> */}
        <div className="grid mx-auto grid-cols-product-2 sm:grid-cols-product-3 lg:grid-cols-product-4 sm:gap-x-2 ml-4 items-start h-auto ">
          {products.length > 0 ? (
            products.map((product, index) => {
              return (
                <ProductCard
                  key={uniqid()}
                  id={product._id}
                  image={product.cover}
                  title={product.brandName}
                  description={product.name}
                  cost={product.sellingPrice}
                  soldBy={product.soldBy}
                  mrp={product.MRP}
                />
              );
            })
          ) : (
            <div className="">Sorry No Products found!</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
